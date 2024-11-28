cmake_minimum_required(VERSION 3.4.3)
project(secrets)

include(GNUInstallDirs)

# Set LLVM_DIR to the path where LLVM-15 CMake configuration files are located
set(LLVM_DIR "/usr/lib/llvm-15/lib/cmake/llvm")  # Replace with actual path

find_package(LLVM REQUIRED CONFIG)
option(BUILD_SHARED_LIBS "Build shared libraries" ON)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-rtti")
add_definitions(${LLVM_DEFINITIONS})
include_directories(${LLVM_INCLUDE_DIRS})

add_library(secrets MODULE lib/secrets.cpp)
set_target_properties(secrets PROPERTIES LINKER_LANGUAGE CXX)

set_target_properties(secrets PROPERTIES COMPILE_FLAGS "-fPIC")

# Explicitly specify the installation path
install(TARGETS secrets
    LIBRARY DESTINATION /home/clouduser/.local/lib/
)


