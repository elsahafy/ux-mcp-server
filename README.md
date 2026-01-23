# UX MCP Server

Model Context Protocol server that provides UX best practices, accessibility guidelines, usability heuristics, UI patterns, and design system principles to AI assistants.

## Features

### 📚 Resources (Static Knowledge)

Access comprehensive UX knowledge bases:

- **ux://accessibility/wcag** - WCAG 2.1 AA Guidelines with code checks
- **ux://usability/nielsen-heuristics** - Nielsen's 10 Usability Heuristics
- **ux://patterns/ui-patterns** - Common UI patterns library
- **ux://design-systems/tokens** - Design system principles & tokens
- **ux://responsive/design** - Responsive design & mobile-first principles
- **ux://themes/dark-mode** - Dark mode implementation guide
- **ux://content/error-messages** - User-friendly error message library

### 🛠️ Tools (Dynamic Operations)

Eight powerful tools for UX analysis and generation:

1. **analyze_accessibility** - Check code for WCAG violations
2. **review_usability** - Evaluate against Nielsen's heuristics
3. **suggest_pattern** - Find appropriate UI patterns for use cases
4. **generate_component_example** - Create accessible HTML/CSS examples
5. **audit_design_system** - Review design token structure
6. **check_contrast** - Verify WCAG color contrast ratios
7. **check_responsive** - Analyze mobile-first and responsive design
8. **suggest_error_message** - Get user-friendly error messages

### 💬 Prompts (Pre-configured Reviews)

Three comprehensive review workflows:

1. **accessibility_review** - Full WCAG accessibility audit
2. **usability_audit** - Complete Nielsen heuristics evaluation
3. **design_system_setup** - Guide for creating design systems

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test locally
npm run dev
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "node",
      "args": [
        "/path/to/ux-mcp-server/dist/index.js"
      ]
    }
  }
}
```

On Windows, the path might look like:
```json
"C:\\Users\\YourName\\ux-mcp-server\\dist\\index.js"
```

## Example Usage

### Analyze Accessibility

```typescript
// In Claude Desktop, you can now ask:
"Analyze this button for accessibility issues"

// Claude will use the analyze_accessibility tool
```

### Get UI Pattern Suggestions

```typescript
"I need to display a list of items with filtering - what UI pattern should I use?"

// Claude will use suggest_pattern tool
```

### Generate Component Examples

```typescript
"Generate an accessible modal dialog example"

// Claude will use generate_component_example tool
```

### Check Color Contrast

```typescript
"Check if #3b82f6 on #ffffff meets WCAG AA"

// Claude will use check_contrast tool
```

## Knowledge Base Contents

### WCAG Guidelines
- Perceivable (alt text, contrast, semantic HTML)
- Operable (keyboard access, focus management)
- Understandable (error handling, clear labels)
- Robust (ARIA, assistive technology support)

### Nielsen's Heuristics
1. Visibility of System Status
2. Match Between System and Real World
3. User Control and Freedom
4. Consistency and Standards
5. Error Prevention
6. Recognition Rather than Recall
7. Flexibility and Efficiency of Use
8. Aesthetic and Minimalist Design
9. Help Users Recognize, Diagnose, and Recover from Errors
10. Help and Documentation

### UI Patterns
- **Navigation**: Headers, breadcrumbs, tabs
- **Forms**: Single column, multi-step wizards, validation
- **Feedback**: Toasts, modals, loading states
- **Data Display**: Tables, cards, empty states
- **Input Components**: Search, date pickers, file upload

### Design System Principles
- Atomic Design methodology
- Design token structure (primitive → semantic → component)
- Typography scales
- Spacing systems
- Color theory
- Component API design

## Development

```bash
# Watch mode during development
npm run watch

# Build for production
npm run build

# Test the server
npm run dev
```

## Framework Agnostic

All examples and guidelines are framework-agnostic, focusing on:
- Semantic HTML
- CSS best practices
- ARIA attributes
- Accessibility standards
- Universal UX principles

Works with React, Vue, Svelte, Angular, or vanilla JavaScript.

## Contributing

To add new patterns or guidelines:

1. Add content to appropriate file in `knowledge/` directory
2. Update tool implementations in `src/index.ts` if needed
3. Rebuild: `npm run build`

## License

MIT

## Credits

- WCAG 2.1 Guidelines from W3C
- Nielsen's Usability Heuristics by Jakob Nielsen
- UI Patterns from established design systems and best practices
- Design Token concepts from design system community

---

**Built for AI-assisted development with accessibility and usability as first-class citizens.**
