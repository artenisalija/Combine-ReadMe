#!/usr/bin/env python3
"""
README Combiner - Combines all README files in subdirectories into one file
Works on Windows, macOS, and Linux
"""

import os
import sys
from pathlib import Path


def find_readme_files(root_dir="."):
    """
    Find all README files (case-insensitive) in subdirectories.
    
    Args:
        root_dir: Root directory to search from (default: current directory)
    
    Returns:
        List of Path objects for README files
    """
    readme_files = []
    root_path = Path(root_dir).resolve()
    
    # Search for README files (case-insensitive)
    for file_path in root_path.rglob("*"):
        if file_path.is_file() and file_path.name.lower().startswith("readme"):
            readme_files.append(file_path)
    
    # Sort by path for consistent ordering
    readme_files.sort()
    
    return readme_files


def combine_readmes(output_file="allreadme.txt", root_dir="."):
    """
    Combine all README files into a single output file.
    
    Args:
        output_file: Name of the output file
        root_dir: Root directory to search from
    """
    root_path = Path(root_dir).resolve()
    output_path = root_path / output_file
    
    # Remove existing output file if it exists
    if output_path.exists():
        output_path.unlink()
        print(f"✓ Removed existing {output_file}")
    
    # Find all README files
    print("\nSearching for README files...")
    readme_files = find_readme_files(root_dir)
    
    if not readme_files:
        print("✗ No README files found!")
        return
    
    print(f"✓ Found {len(readme_files)} README file(s)\n")
    print("Combining files...\n")
    
    # Combine all README files
    with open(output_path, "w", encoding="utf-8") as outfile:
        for idx, readme_path in enumerate(readme_files, 1):
            try:
                # Create separator and header
                separator = "\n" + ("=" * 80) + "\n"
                header = f"\nFILE: {readme_path}\n"
                header += f"FOLDER: {readme_path.parent}\n"
                header += ("=" * 80) + "\n\n"
                
                # Write separator and header
                outfile.write(separator)
                outfile.write(header)
                
                # Read and write README content
                with open(readme_path, "r", encoding="utf-8") as infile:
                    content = infile.read()
                    outfile.write(content)
                
                # Print progress
                folder_name = readme_path.parent.name
                print(f"[{idx}/{len(readme_files)}] ✓ {folder_name}/{readme_path.name}")
                
            except Exception as e:
                print(f"[{idx}/{len(readme_files)}] ✗ Error reading {readme_path}: {e}")
        
        # Add final separator
        outfile.write("\n" + ("=" * 80) + "\n")
    
    print("\n" + "=" * 50)
    print("SUCCESS!")
    print("=" * 50)
    print(f"Output file: {output_path}")
    print(f"Total files combined: {len(readme_files)}")
    print()


def main():
    """Main entry point for the script."""
    print("\n" + "=" * 50)
    print("README COMBINER")
    print("=" * 50)
    
    # Get root directory from command line argument or use current directory
    root_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    
    # Get output file from command line argument or use default
    output_file = sys.argv[2] if len(sys.argv) > 2 else "allreadme.txt"
    
    try:
        combine_readmes(output_file, root_dir)
    except KeyboardInterrupt:
        print("\n\n✗ Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ An error occurred: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
