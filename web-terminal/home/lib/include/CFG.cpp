#include "DDG.cpp"
#include <llvm/Support/raw_ostream.h>

using namespace llvm;
using namespace std;

namespace CFG {

    // Define a structure to represent the basic block
    struct CFGNode {
        const BasicBlock *block;
        std::vector<const BasicBlock *> successors;
        char* type;
        Value *branchCondition;
        std::vector<std::string> branchNames;
    };

    // map that holds the basic block and its corresponding Control FLow Node
    std::map<const BasicBlock *, CFGNode> CFGNodes;

    // Function to clean the instruction string by escaping some characters and deleting certain lines
    string cleanInstruction(const BasicBlock *BB, int flag = 0) {
        std::string BBStr;
        raw_string_ostream BBStream(BBStr);

        if (flag == 0) {
            BB->print(BBStream);

            std::size_t addressPos = BBStr.find_first_of('%');

            if (addressPos != std::string::npos) {

                // erase all . in the string
                BBStr.erase(std::remove(BBStr.begin(), BBStr.end(), '.'), BBStr.end());

                std::size_t pos = 0;
                while ((pos = BBStr.find("; preds = ", pos)) != std::string::npos) {
                    BBStr.replace(pos, BBStr.find("\n", pos) - pos + 1, "\\l");
                }

                // replace all \n(new lines) with \l
                pos = 0;
                while ((pos = BBStr.find("\n", pos)) != std::string::npos) {
                    BBStr.replace(pos, 1, "\\l");
                    pos += 2;
                }

                // erase the first \l if exist at position 0
                if (BBStr.find("\\l") == 0) {
                    BBStr.erase(0, 2);
                }

                // replace all " in te string with \"
                pos = 0;
                while ((pos = BBStr.find("\"", pos)) != std::string::npos) {
                    BBStr.replace(pos, 1, "\\\"");
                    pos += 2;
                }

                // replace all } in te string with \}
                pos = 0;
                while ((pos = BBStr.find("}", pos)) != std::string::npos) {
                    BBStr.replace(pos, 1, "\\}");
                    pos += 2;
                }

                // replace all { in te string with \{
                pos = 0;
                while ((pos = BBStr.find("{", pos)) != std::string::npos) {
                    BBStr.replace(pos, 1, "\\{");
                    pos += 2;
                }

                pos = 0;
                while ((pos = BBStr.find("; Function Attrs: ", pos)) != std::string::npos) {
                    BBStr.replace(pos, BBStr.find("\n", pos) - pos + 1, "\\l");
                }
            }
        } else {
            BB->printAsOperand(BBStream, false);
            const Function *func = BB->getParent();
            string funcName = func->getName().str();

            std::size_t addressPos = BBStr.find_first_of('%');
            
            if (addressPos != std::string::npos) {

                BBStr = BBStr.substr(addressPos + 1);
                BBStr.erase(std::remove(BBStr.begin(), BBStr.end(), '.'), BBStr.end());
            }
            BBStr = funcName + "_" + BBStr;
        }
        return BBStr;
    }

    // Function to write the control flow graph to a DOT file
    void writeCFGToDot(const std::map<const BasicBlock *, CFGNode> &cfgnodes) {

        std::error_code EC;
        
        string fileName = cfgnodes.at(cfgnodes.begin()->first).block->getModule()->getSourceFileName();
        fileName = fileName.substr(0, fileName.find_last_of('.')) + "_cfg_graph.dot";

        raw_fd_ostream dotFile(fileName, EC, sys::fs::OpenFlags::OF_Text);

        if (!EC) {

            dotFile << "digraph ControlFlowGraph {\n";
            dotFile << "  node [shape=record];\n"; // Use record shapes for basic blocks

            for (const auto &entry : cfgnodes) {
                
                const BasicBlock *BB = entry.first;
                const CFGNode &blockInfo = entry.second;
                const char* type = entry.second.type;
                const std::vector<std::string> branchNames = entry.second.branchNames;

                if (branchNames.size() > 0) {

                    dotFile << "" << cleanInstruction(BB, 1) << " [label=\"{" << cleanInstruction(BB) << "|{<s0>" << branchNames[0];
                    for (int i = 1; i < branchNames.size(); i++) {
                        dotFile << "|<s" << i << ">" << branchNames[i];
                    }
                    dotFile << "}}\"];\n";

                } else {
                    dotFile << "" << cleanInstruction(BB, 1) << " [label=\"" << cleanInstruction(BB) << "\"];\n";
                }



                int branchName = branchNames.size();
                int j = branchName;

                for (const auto *successor : blockInfo.successors) {

                    if (branchName >= 1) {

                        dotFile << "  " << cleanInstruction(BB, 1) << ":s" << branchName - j << " -> ";   // add edge from here to succStr
                        j--;

                    } else {
                        dotFile << "  " << cleanInstruction(BB, 1) << " -> ";   // add edge from here to succStr
                    }

                    dotFile << cleanInstruction(successor, 1) << ";\n";  // till here rhe edge is pulled & the edge naming is done here via label
                }
            }

            dotFile << "}\n";
            dotFile.close();
            errs() << "\nControl Flow Graph (CFG) written to cfg_graph.dot\n";
        } else {
            errs() << "\nError: Unable to open cfg_graph.dot for writing.\n";
        }

    }

    // Function to build the control flow graph
    std::map<const BasicBlock *, CFGNode> generateCFG(Module *module) {

        std::map<const BasicBlock *, CFGNode> cfgnodes;

        for (const Function &func : *module) {

            for (const BasicBlock &BB : func) {
                CFGNode cfgnode;
                cfgnode.block = &BB;

                for (const Instruction &I : BB) {
                    if (const BranchInst *BI = dyn_cast<BranchInst>(&I)) {
                        if (BI->isConditional()) {

                            cfgnode.type = (char*)"conditional";
                            cfgnode.branchNames.push_back("T");
                            cfgnode.branchNames.push_back("F");
                            cfgnode.branchCondition = BI->getCondition();
                            cfgnode.successors.push_back(BI->getSuccessor(0));
                            cfgnode.successors.push_back(BI->getSuccessor(1));

                        } else {
                            if (BI->getNumSuccessors() == 1) {
                                cfgnode.successors.push_back(BI->getSuccessor(0));
                            }
                        }
                    } else if (const SwitchInst *SI = dyn_cast<SwitchInst>(&I)) {
                        
                        // Switch case instruction found.
                        cfgnode.type = (char *)"switch";
                        cfgnode.branchCondition = SI->getCondition();

                        // Add control dependency edges to case blocks.
                        for (auto Case = SI->case_begin(); Case != SI->case_end(); ++Case) {
                            cfgnode.successors.push_back(Case->getCaseSuccessor());
                            cfgnode.branchNames.push_back(std::to_string(Case->getCaseValue()->getSExtValue()));
                        }

                        // Add control dependency edges to default block.
                        cfgnode.successors.push_back(SI->getDefaultDest());
                        cfgnode.branchNames.push_back("def");

                    } if (const CallInst *CI = dyn_cast<CallInst>(&I)) {
                        
                        // Handle function call instruction.
                        cfgnode.type = (char *)"function_call";

                        Function *calledFunc = CI->getCalledFunction();
                        if (calledFunc) {
                            // Add control dependency edge to the called function's entry block.

                            // chech if the called function has any basic block or not
                            if (calledFunc->begin() == calledFunc->end()) {
                                continue;
                            } else {

                                cfgnode.successors.push_back(&calledFunc->getEntryBlock());
                                cfgnode.branchNames.push_back(calledFunc->getName().str() + " ()");
                            }
                        }

                    } else if (const ReturnInst *RI = dyn_cast<ReturnInst>(&I)) {
                        
                        // Handle function return instruction.
                        cfgnode.type = (char *)"return";
                        cfgnode.branchNames.push_back("return");

                    }
                    // Handle other branching instructions as needed.
                }

                cfgnodes[&BB] = cfgnode;
            }
        }
        return cfgnodes;
    }


    // Executes the Control Dependency Graph (CFG) generation and printing
    void execute(Module *module, bool cfg = false, bool ddg = false) {

        DDG::execute(module, ddg = ddg);

        CFGNodes = generateCFG(module);

        if (cfg)
            writeCFGToDot(CFGNodes);

        return;
    }

};
