import { SnippetStorage } from './storage';

export class SnippetManager {
    constructor(private storage: SnippetStorage) {}

    async saveSnippet(name: string, content: string): Promise<void> {
        await this.storage.saveSnippet(name, content);
    }

    async getSnippet(name: string): Promise<string | undefined> {
        return this.storage.getSnippet(name);
    }

    async getAllSnippets(): Promise<Record<string, string>> {
        return this.storage.getAllSnippets();
    }

    async deleteSnippet(name: string): Promise<void> {
        await this.storage.deleteSnippet(name);
    }

    async searchSnippets(searchTerm: string): Promise<Record<string, string>> {
        const allSnippets = await this.getAllSnippets();
        const results: Record<string, string> = {};
        
        const searchTermLower = searchTerm.toLowerCase();
        for (const [name, content] of Object.entries(allSnippets)) {
            if (name.toLowerCase().includes(searchTermLower) || 
                content.toLowerCase().includes(searchTermLower)) {
                results[name] = content;
            }
        }
        
        return results;
    }
}