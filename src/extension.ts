import * as vscode from 'vscode';
import { SnippetManager } from './snippetManager';
import { SnippetStorage } from './storage';

export function activate(context: vscode.ExtensionContext) {
    const storage = new SnippetStorage(context.globalState);
    const snippetManager = new SnippetManager(storage);

    // Register save snippet command
    let saveDisposable = vscode.commands.registerCommand('savemee.saveSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (text) {
                const name = await vscode.window.showInputBox({
                    prompt: "Enter a name for this snippet",
                    placeHolder: "my-component",
                    validateInput: text => {
                        return text && text.length > 0 ? null : "Name cannot be empty";
                    }
                });
                
                if (name) {
                    await snippetManager.saveSnippet(name, text);
                    vscode.window.showInformationMessage(`Snippet '${name}' saved successfully!`);
                }
            }
        }
    });

     // Insert Snippet Command
     let insertDisposable = vscode.commands.registerCommand('savemee.insertSnippet', async () => {
        const snippets = await snippetManager.getAllSnippets();
        await showSnippetQuickPick(snippets, true);
    });

    // List Snippets Command
    let listDisposable = vscode.commands.registerCommand('savemee.listSnippets', async () => {
        const snippets = await snippetManager.getAllSnippets();
        await showSnippetQuickPick(snippets, false);
    });

     // Delete Snippet Command
     let deleteDisposable = vscode.commands.registerCommand('savemee.deleteSnippet', async () => {
        const snippets = await snippetManager.getAllSnippets();
        const items = Object.keys(snippets).map(name => ({
            label: name,
            detail: snippets[name].slice(0, 100) + "..."
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: "Select a snippet to delete"
        });

        if (selected) {
            await snippetManager.deleteSnippet(selected.label);
            vscode.window.showInformationMessage(`Snippet '${selected.label}' deleted successfully!`);
        }
    });

    // Search Snippets Command
    let searchDisposable = vscode.commands.registerCommand('savemee.searchSnippets', async () => {
        const searchTerm = await vscode.window.showInputBox({
            prompt: "Enter search term",
            placeHolder: "Search snippets..."
        });

        if (searchTerm) {
            const snippets = await snippetManager.searchSnippets(searchTerm);
            await showSnippetQuickPick(snippets, true);
        }
    });

    // Helper function to show snippet quick pick
    async function showSnippetQuickPick(snippets: Record<string, string>, insertOnSelect: boolean) {
        const items = Object.entries(snippets).map(([name, content]) => ({
            label: name,
            detail: content.slice(0, 100) + "...",
            content: content
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: insertOnSelect ? "Select a snippet to insert" : "Available snippets",
            matchOnDetail: true
        });

        if (selected && insertOnSelect) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, selected.content);
                });
            }
        }
    }

     // Register completion provider
     let completionDisposable = vscode.languages.registerCompletionItemProvider(
        { pattern: '**' }, // Enables for all file types
        {
            async provideCompletionItems(
                document: vscode.TextDocument,
                position: vscode.Position
            ) {
                const linePrefix = document.lineAt(position).text.slice(0, position.character);
                
                // Only show suggestions after typing 'sm.' (for SaveMee)
                if (!linePrefix.endsWith('sm.')) {
                    return undefined;
                }

                const snippets = await snippetManager.getAllSnippets();
                const completionItems: vscode.CompletionItem[] = [];

                for (const [name, content] of Object.entries(snippets)) {
                    const completionItem = new vscode.CompletionItem(
                        name,
                        vscode.CompletionItemKind.Snippet
                    );

                    // Add snippet content as the insertion text
                    completionItem.insertText = content;
                    
                    // Add documentation
                    completionItem.documentation = new vscode.MarkdownString(
                        '```\n' + content + '\n```'
                    );

                    // Add detail
                    completionItem.detail = `SaveMee Snippet: ${name}`;

                    // Sort priority
                    completionItem.sortText = '0' + name;

                    completionItems.push(completionItem);
                }

                return completionItems;
            }
        },
        '.' // Trigger completion after typing a dot
    );
    
    context.subscriptions.push(saveDisposable,
        insertDisposable,
        listDisposable,
        deleteDisposable,
        searchDisposable,
        completionDisposable
    );
}

export function deactivate() {}