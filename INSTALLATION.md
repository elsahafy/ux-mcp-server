# UX MCP Server - Installation Guide

## Quick Install

### Option 1: NPM (Recommended)

```bash
npm install -g @elsahafy/ux-mcp-server
```

Then add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "ux-mcp-server"
    }
  }
}
```

### Option 2: NPX (No Installation Required)

Add directly to Claude Desktop config:

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "npx",
      "args": ["-y", "@elsahafy/ux-mcp-server"]
    }
  }
}
```

### Option 3: From Source

```bash
# Clone the repository
git clone https://github.com/elsahafy/ux-mcp-server.git
cd ux-mcp-server

# Install dependencies
npm install

# Build
npm run build

# Add to Claude Desktop config
```

**Claude Desktop Config** (Windows):
```
C:\Users\YourName\AppData\Roaming\Claude\claude_desktop_config.json
```

**Claude Desktop Config** (macOS):
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Claude Desktop Config** (Linux):
```
~/.config/Claude/claude_desktop_config.json
```

Example config for local installation:

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "node",
      "args": [
        "C:\\Users\\YourName\\ux-mcp-server\\dist\\index.js"
      ]
    }
  }
}
```

## Verify Installation

1. Restart Claude Desktop
2. Look for the 🔌 icon in the bottom right
3. Click it to see "ux-best-practices" server connected
4. Try asking: "What WCAG guidelines should I follow for buttons?"

## What's Included

### 7 Knowledge Resources
- **ux://accessibility/wcag** - WCAG 2.1 AA Guidelines
- **ux://usability/nielsen-heuristics** - Nielsen's 10 Heuristics
- **ux://patterns/ui-patterns** - UI Patterns Library
- **ux://design-systems/tokens** - Design System Principles
- **ux://responsive/design** - Responsive Design Best Practices
- **ux://themes/dark-mode** - Dark Mode Implementation Guide
- **ux://content/error-messages** - Error Message Library

### 8 Powerful Tools
1. **analyze_accessibility** - Check WCAG compliance
2. **review_usability** - Evaluate against Nielsen's heuristics
3. **suggest_pattern** - Find appropriate UI patterns
4. **generate_component_example** - Create accessible code examples
5. **audit_design_system** - Review design tokens
6. **check_contrast** - Verify color contrast ratios
7. **check_responsive** - Analyze mobile-first design
8. **suggest_error_message** - Get user-friendly error messages

### 3 Pre-configured Prompts
1. **accessibility_review** - Full WCAG audit
2. **usability_audit** - Complete Nielsen evaluation
3. **design_system_setup** - Design system creation guide

## Example Usage

Once installed, you can ask Claude:

**Accessibility:**
- "Analyze this button code for accessibility issues"
- "Check if #3b82f6 on white meets WCAG AA"
- "Review my form for accessibility"

**Usability:**
- "Review this checkout flow against usability heuristics"
- "What usability issues might this interface have?"

**Patterns:**
- "I need to display filterable data - what UI pattern should I use?"
- "Generate an accessible modal dialog example"
- "Show me a mobile-first navigation pattern"

**Responsive:**
- "Check if my code follows mobile-first principles"
- "Analyze responsive design issues in this HTML"

**Error Messages:**
- "Suggest a user-friendly message for invalid email"
- "What's a good error message for payment failure?"

**Design Systems:**
- "Audit my design tokens for consistency"
- "Help me set up a design system"

## Troubleshooting

### Server not connecting
1. Check Claude Desktop config JSON syntax is valid
2. Verify file paths use correct slashes (\\  for Windows, / for Mac/Linux)
3. Restart Claude Desktop completely
4. Check the Claude Desktop logs for errors

### NPX not working
Make sure you have Node.js 18+ installed:
```bash
node --version
```

### Build errors
If building from source:
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

## Requirements

- Node.js 18.0.0 or higher
- Claude Desktop (latest version)

## Support

- **Issues**: https://github.com/elsahafy/ux-mcp-server/issues
- **Discussions**: https://github.com/elsahafy/ux-mcp-server/discussions

## License

MIT - Use freely in your projects!
