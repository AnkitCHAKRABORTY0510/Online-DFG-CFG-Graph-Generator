#!/bin/bash

# Check if the input file is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <input_file>.c/.cpp"
    exit 1
fi

input_file="$1"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: File '$input_file' not found."
    exit 1
fi

# Validate file extension
if [[ "$input_file" != *.c && "$input_file" != *.cpp ]]; then
    echo "Error: Input file must have a .c or .cpp extension."
    exit 1
fi

# Check the actual file type
file_type=$(file --mime-type -b "$input_file")
if [[ "$file_type" != "text/x-c" && "$file_type" != "text/x-c++" ]]; then
    echo "Error: File content does not match a C or C++ source file."
    exit 1
fi

# Create directories for dot files
mkdir -p $HOME/dot_cfg
mkdir -p $HOME/dot_ddg

# Copy the source file to the home directory
base_name=$(basename "$input_file")
temp_source="$HOME/$base_name"
cp "$input_file" "$temp_source"

# Generate LLVM IR file
llfile=$(basename "$temp_source" | sed 's/\.[^.]*$/.ll/')

echo "Generating LLVM IR file..."
clang++ -S -emit-llvm -fno-discard-value-names -c "$temp_source" -o "$llfile" &> /dev/null

# Generate dot files using opt
echo "Generating dot files..."
opt -enable-new-pm=0 -load $HOME/.local/lib/libsecrets.so -generateDot --cfg --ddg "$llfile" &> /dev/null

# Move generated dot files to respective directories
if ls *_cfg_graph.dot 1>/dev/null 2>&1; then
    mv *_cfg_graph.dot $HOME/dot_cfg/ &> /dev/null
fi

if ls *_ddg_graph.dot 1>/dev/null 2>&1; then
    mv *_ddg_graph.dot $HOME/dot_ddg/ &> /dev/null
fi

# Clean up the temporary source file and LLVM IR file
rm -f "$temp_source" "$llfile" &> /dev/null

echo "Dot files saved in '$HOME/dot_cfg' and '$HOME/dot_ddg' directories."
