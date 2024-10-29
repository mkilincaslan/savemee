# SaveMee - Code Snippet Manager

SaveMee is a powerful VS Code extension that helps you save, manage, and reuse code snippets efficiently. Save any piece of code and insert it anywhere with just a few clicks or commands.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.85+-blue.svg)

## Features

### 🚀 Quick Access
- Save code snippets directly from your editor
- Insert snippets through command palette
- Search through your snippet library
- Manage snippets with an intuitive interface

### ⌨️ Smart Completion
- Type `sm.` to access your snippets through IntelliSense
- Preview snippets before insertion
- Quick snippet insertion with intelligent suggestions

## Installation

1. Open VS Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS)
3. Type `ext install savemee`
4. Press Enter

Or install through the VS Code Marketplace: [SaveMee Extension](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.savemee)

## Usage

### Saving Snippets

1. Select the code you want to save
2. Either:
   - Right-click and select "SaveMee: Save Current Selection as Snippet"
   - Open Command Palette (`Ctrl+Shift+P`) and type "SaveMee: Save"
3. Enter a name for your snippet

### Inserting Snippets

#### Using Command Palette
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "SaveMee: Insert"
3. Select your snippet from the list

#### Using IntelliSense
1. Type `sm.` in your editor
2. Select from the snippet suggestions

### Managing Snippets

Access these commands through the Command Palette (`Ctrl+Shift+P`):

- `SaveMee: List All Snippets` - View all saved snippets
- `SaveMee: Delete a Snippet` - Remove unwanted snippets
- `SaveMee: Search Snippets` - Search through your snippet library

## Available Commands

| Command | Description |
|---------|-------------|
| `SaveMee: Save Current Selection as Snippet` | Save selected code as a new snippet |
| `SaveMee: Insert Saved Snippet` | Insert an existing snippet |
| `SaveMee: List All Snippets` | View all saved snippets |
| `SaveMee: Delete a Snippet` | Delete an existing snippet |
| `SaveMee: Search Snippets` | Search through saved snippets |

## Extension Settings

This extension contributes the following settings:

* `savemee.enableIntelliSense`: Enable/disable snippet suggestions in IntelliSense (default: `true`)

## Storage

Snippets are stored locally using VS Code's built-in storage mechanism. They persist across sessions and updates.

## Known Issues

- IntelliSense suggestions may take a moment to appear in large files
- Snippet preview might not show syntax highlighting for all languages

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Building From Source

```bash
# Clone the repository
git clone https://github.com/mkilincaslan/savemee.git

# Install dependencies
npm install

# Compile
npm run compile

# Package
npm run package
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any problems, please file an issue at: https://github.com/mkilincaslan/savemee/issues

## Credits

Created with ❤️ by Mesut KILINCASLAN

---

**Enjoy coding with SaveMee! 🚀**