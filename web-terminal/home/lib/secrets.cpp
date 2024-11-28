// #include "include/secret.cpp"
#include "include/CFG.cpp"

using namespace llvm;

namespace  {
    struct secrets : public llvm::ModulePass {
        static char ID;

        secrets() : ModulePass(ID) {}

        static llvm::cl::opt<bool> cfg;
        static llvm::cl::opt<bool> ddg;

        bool doInitialization(llvm::Module &module) override {
            return false;
        }

        // This function is called for every module and is a part of the ModulePass class, we are just overriding it.
        bool runOnModule(llvm::Module &module) override{
            CFG::execute(&module, cfg, ddg);
            return false;
        }

        // This function is called at the end of the pass.
        bool doFinalization(llvm::Module &module) override {
            return false;
        }
    };
};

char secrets::ID = 0;

llvm::cl::opt<bool> secrets::cfg("cfg", llvm::cl::desc("Generate Control FLow Graph of the program"), llvm::cl::init(false));
llvm::cl::opt<bool> secrets::ddg("ddg", llvm::cl::desc("Generate Data Dependency Graph of the program"), llvm::cl::init(false));

static llvm::RegisterPass<secrets> X("generateDot", "Output The Secret Dependent Basic Blocks", false, false);
