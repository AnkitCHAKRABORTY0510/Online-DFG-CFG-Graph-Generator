#include "llvm/Support/CommandLine.h"
#include "llvm/Support/raw_ostream.h"
#include "llvm/Support/FileSystem.h"
#include "llvm/IRReader/IRReader.h"
#include <llvm/IR/GlobalVariable.h>
#include <llvm/Support/SourceMgr.h>
#include "llvm/Analysis/LoopInfo.h"
#include "llvm/IR/Instructions.h"
#include <llvm/Support/Casting.h>
#include "llvm/IR/LLVMContext.h"
#include <llvm/IR/Instruction.h>
#include <llvm/IR/Intrinsics.h>
#include <llvm/ADT/StringRef.h>
#include <llvm/IR/BasicBlock.h>
#include <llvm/IR/Constants.h>
#include "llvm/IR/IRBuilder.h"
#include <llvm/IR/Argument.h>
#include <llvm/IR/Constant.h>
#include <llvm/IR/Function.h>
#include <llvm/IR/Metadata.h>
#include "llvm/IR/Function.h"
#include "llvm/IR/Verifier.h"
#include "llvm/IR/Module.h"
#include <llvm/IR/Value.h>
#include <llvm-c/Types.h>
#include <llvm/IR/User.h>
#include <unordered_set>
#include "llvm/IR/CFG.h"
#include <llvm/IR/Use.h>
#include <cstddef>
#include <cstdlib>
#include <cstring>
#include <cctype>
#include <string>
#include <vector>
#include <cmath>
#include <map>
#include <set>


using namespace llvm;
using namespace std;


namespace DDG {

    // Data Dependency Graph (DDG) Node
    struct DDGNode {
        const Value *instr;
        bool isGlobal = false;
        vector<const Value *> defUseEdges;
        vector<const Value*> allDependentEdges;
        vector<pair<const Value *, char *>> memoryDepEdges; // char* value is holds W-A-R/R-A-W/W-A-W/R-A-R
    };

    // map that stores every instruction in the IR as node and its other properties in a struct
    map<const Value *, DDGNode> DDGNodes;

    // map that stores all the call-instruction of every called function
    std::map<const Function *, std::set<const CallInst *>> callGraph;

    // set that holds all the Global Variables
    std::unordered_set<const GlobalVariable *> allGlobalVariables;

    // Fcuntion that cleans the instruction by escaping some special characters that might disturb the viewing of DOT file
    string cleanInstruction(const Value *instr) {

        string instrStr;
        raw_string_ostream instrStream(instrStr);
        instr->print(instrStream);

        // erase all . in the string
        instrStr.erase(remove(instrStr.begin(), instrStr.end(), '.'),
                    instrStr.end());

        size_t pos = 0;
        // replace all " in te string with \"
        while ((pos = instrStr.find("\"", pos)) != string::npos) {
            instrStr.replace(pos, 1, "\\\"");
            pos += 2;
        }

        // replace all \n(new lines) with \l
        pos = 0;
        while ((pos = instrStr.find("\n", pos)) != string::npos) {
            instrStr.replace(pos, 1, "\\l");
            pos += 2;
        }

        return instrStr;
    }

    // Function to convert the DDG to DOT format and write to a file
    void writeDDGToDot(const map<const Value *, DDGNode> &ddgNodes) {

        // Construct the DDG (Code for constructing DDG, similar to the previous example)
        error_code EC;
        
        string fileName = dyn_cast<Instruction>(ddgNodes.begin()->first)->getParent()->getModule()->getSourceFileName();

        fileName = fileName.substr(0, fileName.find_last_of('.')) + "_ddg_graph.dot";
        
        raw_fd_ostream dotFile(fileName, EC, sys::fs::OpenFlags::OF_Text);

        if (!EC) {
            // Write DOT file header
            dotFile << "digraph DataDependencyGraph {\n";

            // Write DDG nodes and edges
            for (const auto &nodePair : ddgNodes) {

                const Value *instr = nodePair.first;
                const DDGNode &node = nodePair.second;

                string color = "crimson";
                string fontcolor = "crimson";

                if (node.defUseEdges.empty() && node.memoryDepEdges.empty())
                    continue;

                // Write the node representing the instruction
                dotFile << "  \"" << cleanInstruction(instr) << "\" [label=\"" << cleanInstruction(instr) << "\"];\n";

                // dyn_cast<string>(*instr)

                // Write Def-Use edges
                for (const Value *useInstr : node.defUseEdges) {
                    dotFile << "  \"" << cleanInstruction(instr) << "\" -> \"" << cleanInstruction(useInstr) << "\" [label=\"Def-Use\", color=" << color << " , fontcolor=" << fontcolor << " , fontstyle=italic];\n";
                }

                // Write Memory Dependence edges
                for (const auto &instPair : node.memoryDepEdges) {

                    const Value *memInstr = instPair.first;
                    const char *type = instPair.second;

                    if (strcmp(type, "W-A-W") == 0 || strcmp(type, "R-A-R") == 0) {
                        if (strcmp(type, "W-A-W") == 0) {
                            color = fontcolor = "goldenrod3";
                        } else {
                            color = fontcolor = "darkgreen";
                        }
                        dotFile << "  \"" << cleanInstruction(instr) << "\" -> \"" << cleanInstruction(memInstr) << "\" [label=\"" << type << "\", color=" << color <<" , fontcolor=" << fontcolor << " , fontstyle=italic, dir=both];\n";
                    } else {
                        if (strcmp(type, "W-A-R") == 0) {
                            color = fontcolor = "purple3";
                        } else if (strcmp(type, "R-A-W") == 0) {
                            color = fontcolor = "violetred";
                        }
                        dotFile << "  \"" << cleanInstruction(instr) << "\" -> \"" << cleanInstruction(memInstr) << "\" [label=\"" << type << "\", color=" << color << " , fontcolor=" << fontcolor << " , fontstyle=italic];\n";
                    }

                }
            }

            // Write DOT file footer
            dotFile << "}\n";

            dotFile.close();
            errs() << "\nData Dependency Graph (DDG) written to ddg_graph.dot\n";
        } else {
            errs() << "\nError: Unable to open ddg_graph.dot for writing.\n";
        }
    }

 void extractAnnotatedVar(Module &module) {
        for (auto &GV : module.globals()) {
            // ! -------------------------------------------- NEW CHANGES ------------------------------------------------------
            allGlobalVariables.insert(&GV);

            DDGNode node;
            node.instr = &GV;
            node.isGlobal = true;
            DDGNodes[&GV] = node;
        }
    }

    // Function to construct the Data Dependency Graph for the entire module
    map<const Value *, DDGNode> generateDDG(const Module *module) {

        map<const Value *, DDGNode> ddgNodes;

        const Instruction *loadAddress = nullptr;
        const Value *storeAddress = nullptr;

        for (const Function &func : *module) {
            for (const BasicBlock &BB : func) {
                for (const Instruction &I : BB) {

                    // ! -------------------------------------------- NEW CHANGES ------------------------------------------------------
                    //* Step 1: Create nodes for each instruction in the function
                    DDGNode node;
                    node.instr = &I;
                    ddgNodes[&I] = node;

                    for (const Use &U : I.operands()) {

                        //* Step 2(a): Create def-use edges for local instructions
                        if (const Instruction *defInstr = dyn_cast<Instruction>(U.get())) {
                            ddgNodes[defInstr].defUseEdges.push_back(&I);    // Defination dependent on the use (Def-USe)
                            ddgNodes[defInstr].allDependentEdges.push_back(&I);
                        }

                        //* Step 2(b): Create def-use edges for global instructions
                        Value* val = U.get();
                        if (allGlobalVariables.count(dyn_cast<GlobalVariable>(val))) {
                            ddgNodes[val].defUseEdges.push_back(&I);
                            ddgNodes[val].allDependentEdges.push_back(&I);
                        }
                    }
                    // ! -------------------------------------------- NEW CHANGES ------------------------------------------------------

                    //* Step 3: Create memory dependence edges
                    if (isa<LoadInst>(I) || isa<StoreInst>(I)) {
                        if (isa<LoadInst>(I)) {
                            // get the address returned by load, i.e., address of the operand that we will track to the store instruction
                            loadAddress = &I;
                            label1:
                            for (const Function &func1 : *module) {
                                for (const BasicBlock &otherBB : func1) {
                                    for (const Instruction &otherI : otherBB) {

                                        if (loadAddress != nullptr) {
                                            // check for further instructions that might use the address of loadAddress

                                            for (unsigned int i = 0; i < otherI.getNumOperands(); ++i) {
                                                Value *operandAddress = otherI.getOperand(i);

                                                if (operandAddress == loadAddress) {
                                                    if (isa<StoreInst>(otherI)) {
                                                        // RAW dependency found between the instruction I(load) and otherI(store), now give them an edge between them
                                                        ddgNodes[&I].memoryDepEdges.push_back({&otherI, (char*)"R-A-W"});   //! Read-After-Write
                                                        ddgNodes[&I].allDependentEdges.push_back(&otherI);
                                                    } else {
                                                        // get the return address of the other instruction that uses the primary operand returned by the load instruction
                                                        loadAddress = &otherI;
                                                        goto label1;
                                                        // now check for further store instruction that uses the address returned by the otherInstruction by iteratig the same thing by goint to label1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        int flag = 0;
                        if (isa<StoreInst>(I)) {
                            // get the address used by store, i.e., address of the operand to which we will store instruction, i.e. the 2nd operand at position 1
                            storeAddress = I.getOperand(1);

                            for (const Function &func2 : *module) {
                                for (const BasicBlock &otherBB : func2) {
                                    for (const Instruction &otherI : otherBB) {

                                        if (&otherI == &I) {
                                            flag = 1;
                                        }

                                        if (storeAddress != nullptr && flag == 1) {
                                        
                                            if (isa<LoadInst>(otherI)) {
                                                
                                                // Get the address of the operand used by the load to read from i.e., the first operand at position 0 
                                                Value *operandAddress = otherI.getOperand(0);

                                                if (operandAddress == storeAddress) {
                                                    // WAR dependency found between the instruction I(store) and otherI(load), now give them an edge between them
                                                    ddgNodes[&I].memoryDepEdges.push_back({&otherI, (char*)"W-A-R"});   //! Write-After-Read (W-A-R)
                                                    ddgNodes[&I].allDependentEdges.push_back(&otherI);
                                                } else {
                                                    continue;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // for (const Function &func3 : *module) {
                        //     for (const BasicBlock &otherBB : func3) {
                                for (const Instruction &otherI : BB) {

                                    bool edgeExists = false;

                                    // Check existing edges of I
                                    for (const auto &existingEdge : ddgNodes[&I].memoryDepEdges) {
                                        if (existingEdge.first == &otherI) {
                                            edgeExists = true;
                                            break;
                                        }
                                    }

                                    // Check existing edges of otherI
                                    if (!edgeExists) {
                                        for (const auto &existingEdge : ddgNodes[&otherI].memoryDepEdges) {
                                            if (existingEdge.first == &I) {
                                                edgeExists = true;
                                                break;
                                            }
                                        }
                                    }

                                    if (edgeExists) {
                                        continue;
                                    }

                                    if (&I == &otherI)
                                        continue;

                                    if (isa<LoadInst>(I) && isa<LoadInst>(otherI)) {
                                        const LoadInst *loadI = cast<LoadInst>(&I);
                                        const LoadInst *otherLoadI =
                                            cast<LoadInst>(&otherI);

                                        if (loadI->getPointerOperand() == otherLoadI->getPointerOperand()) {
                                            if (loadI->getPointerOperand() == otherLoadI->getPointerOperand()) {}
                                            ddgNodes[&I].memoryDepEdges.push_back({&otherI, (char *)"R-A-R"}); //! Read-After-Read (RAR)
                                            ddgNodes[&I].allDependentEdges.push_back(&otherI);
                                        }

                                    } else if (isa<StoreInst>(I) && isa<StoreInst>(otherI)) {
                                        const StoreInst *storeI = cast<StoreInst>(&I);
                                        const StoreInst *otherStoreI =
                                            cast<StoreInst>(&otherI);

                                        if (storeI->getPointerOperand() == otherStoreI->getPointerOperand()) {
                                            ddgNodes[&I].memoryDepEdges.push_back({&otherI, (char *)"W-A-W"}); //! Write-After-Write (W-A-W)
                                            ddgNodes[&I].allDependentEdges.push_back(&otherI);
                                        }
                                    }
                                }
                        //     }
                        // }
                    } else if (isa<CallInst>(I)) {
                        // generate the callGraph so that the first holds the called function & the second holds the call instructions
                        const CallInst *CI = dyn_cast<CallInst>(&I);
                        const Function *calledFunc = CI->getCalledFunction();
                        if (calledFunc != nullptr) {
                            callGraph[calledFunc].insert(CI);

                        }
                    }
                }
            }
        }
        return ddgNodes;
    }

    // Executes the Data Dependency Graph (DDG) generation and printing
    void execute(Module *module, bool ddg = false) {

        extractAnnotatedVar(*module);
        DDGNodes = generateDDG(module);

        if(ddg)
            writeDDGToDot(DDGNodes);

        return;
    }
};