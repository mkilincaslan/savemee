import * as vscode from 'vscode';

export class SnippetStorage {
    private readonly STORAGE_KEY = 'savedSnippets';

    constructor(private storage: vscode.Memento) {}

    async saveSnippet(name: string, content: string): Promise<void> {
        const snippets = await this.getAllSnippets();
        snippets[name] = content;
        await this.storage.update(this.STORAGE_KEY, snippets);
    }

    async getSnippet(name: string): Promise<string | undefined> {
        const snippets = await this.getAllSnippets();
        return snippets[name];
    }

    async getAllSnippets(): Promise<Record<string, string>> {
        return this.storage.get<Record<string, string>>(this.STORAGE_KEY) || {};
    }

    async deleteSnippet(name: string): Promise<void> {
        const snippets = await this.getAllSnippets();
        delete snippets[name];
        await this.storage.update(this.STORAGE_KEY, snippets);
    }
}