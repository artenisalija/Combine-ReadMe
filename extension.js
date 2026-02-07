const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * Find all README files in the workspace
 * @param {string} workspaceRoot - Root directory of the workspace
 * @returns {Promise<string[]>} Array of README file paths
 */
async function findReadmeFiles(workspaceRoot) {
    const config = vscode.workspace.getConfiguration('readme-combiner');
    const filePattern = config.get('filePattern', '**/README.md');
    
    const files = await vscode.workspace.findFiles(
        filePattern,
        '**/node_modules/**'
    );
    
    return files.map(uri => uri.fsPath).sort();
}

/**
 * Combine all README files into one
 * @param {string[]} readmeFiles - Array of README file paths
 * @param {string} outputPath - Path to the output file
 */
async function combineReadmes(readmeFiles, outputPath) {
    let combinedContent = '';
    
    for (let i = 0; i < readmeFiles.length; i++) {
        const filePath = readmeFiles[i];
        const fileDir = path.dirname(filePath);
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Create separator and header
            const separator = '\n' + '='.repeat(80) + '\n';
            const header = `\nFILE: ${filePath}\nFOLDER: ${fileDir}\n` + '='.repeat(80) + '\n\n';
            
            combinedContent += separator + header + content;
            
        } catch (error) {
            vscode.window.showWarningMessage(`Error reading ${filePath}: ${error.message}`);
        }
    }
    
    // Add final separator
    combinedContent += '\n' + '='.repeat(80) + '\n';
    
    // Write to output file
    fs.writeFileSync(outputPath, combinedContent, 'utf8');
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('README Combiner extension is now active');

    let disposable = vscode.commands.registerCommand('readme-combiner.combine', async function () {
        // Get workspace folder
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }
        
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        
        // Show progress
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Combining README files...",
            cancellable: false
        }, async (progress) => {
            try {
                // Find all README files
                progress.report({ increment: 0, message: "Searching for README files..." });
                const readmeFiles = await findReadmeFiles(workspaceRoot);
                
                if (readmeFiles.length === 0) {
                    vscode.window.showWarningMessage('No README files found in workspace');
                    return;
                }
                
                progress.report({ increment: 30, message: `Found ${readmeFiles.length} files...` });
                
                // Get output file name from settings
                const config = vscode.workspace.getConfiguration('readme-combiner');
                const outputFileName = config.get('outputFileName', 'allreadme.txt');
                const outputPath = path.join(workspaceRoot, outputFileName);
                
                // Combine files
                progress.report({ increment: 30, message: "Combining files..." });
                await combineReadmes(readmeFiles, outputPath);
                
                progress.report({ increment: 40, message: "Done!" });
                
                // Show success message with option to open file
                const openFile = await vscode.window.showInformationMessage(
                    `Successfully combined ${readmeFiles.length} README files into ${outputFileName}`,
                    'Open File'
                );
                
                if (openFile === 'Open File') {
                    const doc = await vscode.workspace.openTextDocument(outputPath);
                    await vscode.window.showTextDocument(doc);
                }
                
            } catch (error) {
                vscode.window.showErrorMessage(`Error combining README files: ${error.message}`);
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
