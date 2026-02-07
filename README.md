# README Combiner - VS Code Extension

Combine all README files in your project into a single file with one command.

## Features

- 🔍 Automatically finds all README files in your workspace
- 📝 Combines them into a single file with clear separators
- ⚙️ Configurable output file name
- 🎯 Works from Command Palette or right-click context menu
- 🚀 Cross-platform (Windows, macOS, Linux)

## Usage

### Method 1: Command Palette
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Combine All README Files"
3. Press Enter

### Method 2: Context Menu
1. Right-click in the Explorer sidebar
2. Select "Combine All README Files"

The extension will create a file called `allreadme.txt` in your workspace root containing all README files.

## Extension Settings

This extension contributes the following settings:

* `readme-combiner.outputFileName`: Name of the output file (default: `allreadme.txt`)
* `readme-combiner.filePattern`: Glob pattern to match README files (default: `**/README.md`)

## Configuration Example

```json
{
  "readme-combiner.outputFileName": "combined-docs.txt",
  "readme-combiner.filePattern": "**/readme.*"
}
```

## Output Format

Each README file is separated with:
- A clear separator line (80 equal signs)
- File path information
- Folder path information
- The complete file content

Example:
```
================================================================================

FILE: /path/to/project/day-1/README.md
FOLDER: /path/to/project/day-1
================================================================================

[README content here]
```

## Requirements

- VS Code version 1.80.0 or higher
- No external dependencies required

## How to Install

### From VS Code Marketplace (when published)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "README Combiner"
4. Click Install

### Manual Installation (for development)
1. Clone this repository
2. Run `npm install` in the extension directory
3. Press F5 to open a new VS Code window with the extension loaded

## Publishing to VS Code Marketplace

Follow these steps to publish:

1. **Create a Publisher Account**
   - Go to https://marketplace.visualstudio.com/manage
   - Create a publisher account

2. **Install vsce**
   ```bash
   npm install -g @vscode/vsce
   ```

3. **Package the Extension**
   ```bash
   vsce package
   ```

4. **Publish the Extension**
   ```bash
   vsce publish
   ```

## Known Issues

- Large projects with many README files may take a few seconds to process

## Release Notes

### 1.0.0

Initial release of README Combiner
- Combine all README files into one
- Configurable output file name
- Configurable file pattern matching

## Contributing

Found a bug or have a feature request? Please open an issue on GitHub!

## License

MIT

---

**Enjoy combining your README files!** 📚
