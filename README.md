# UX MCP Server

[![npm version](https://badge.fury.io/js/@elsahafy%2Fux-mcp-server.svg)](https://www.npmjs.com/package/@elsahafy/ux-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Model Context Protocol server that provides comprehensive UX best practices, accessibility guidelines (WCAG), usability heuristics (Nielsen), UI patterns, performance optimization, SEO, internationalization, animation, and React patterns to AI assistants.

## Installation

### npm (Recommended)

```bash
npm install -g @elsahafy/ux-mcp-server
```

### npx (No Installation)

```bash
npx @elsahafy/ux-mcp-server
```

### From Source

```bash
git clone https://github.com/elsahafy/ux-mcp-server.git
cd ux-mcp-server
npm install
npm run build
```

## Features

### 📚 Resources (12 Knowledge Bases)

Access comprehensive UX knowledge bases:

- **ux://accessibility/wcag** - WCAG 2.1 AA Guidelines with code checks
- **ux://usability/nielsen-heuristics** - Nielsen's 10 Usability Heuristics
- **ux://patterns/ui-patterns** - Common UI patterns library
- **ux://design-systems/tokens** - Design system principles & tokens
- **ux://responsive/design** - Responsive design & mobile-first principles
- **ux://themes/dark-mode** - Dark mode implementation guide
- **ux://content/error-messages** - User-friendly error message library
- **ux://performance/optimization** - Core Web Vitals & performance best practices
- **ux://seo/guidelines** - SEO best practices, meta tags, structured data
- **ux://i18n/patterns** - Internationalization & localization patterns
- **ux://animation/motion** - Motion design principles & accessibility
- **ux://react/patterns** - Advanced React patterns & state management

### 🛠️ Tools (11 Dynamic Operations)

Powerful tools for UX analysis and generation:

1. **analyze_accessibility** - Check code for WCAG violations
2. **review_usability** - Evaluate against Nielsen's heuristics
3. **suggest_pattern** - Find appropriate UI patterns for use cases
4. **generate_component_example** - Create accessible HTML/CSS examples
5. **audit_design_system** - Review design token structure
6. **check_contrast** - Verify WCAG color contrast ratios
7. **check_responsive** - Analyze mobile-first and responsive design
8. **suggest_error_message** - Get user-friendly error messages
9. **analyze_performance** - Check code for performance issues & Core Web Vitals
10. **check_seo** - Analyze HTML for SEO best practices
11. **suggest_animation** - Recommend animations for UI interactions

### 💬 Prompts (Pre-configured Reviews)

Three comprehensive review workflows:

1. **accessibility_review** - Full WCAG accessibility audit
2. **usability_audit** - Complete Nielsen heuristics evaluation
3. **design_system_setup** - Guide for creating design systems

## Usage with Claude Desktop

After installing via npm, add to your Claude Desktop config file.

### Configuration

**Location of config file:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**If installed globally via npm:**

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "ux-mcp-server"
    }
  }
}
```

**If installed from source:**

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "node",
      "args": [
        "/absolute/path/to/ux-mcp-server/dist/index.js"
      ]
    }
  }
}
```

On Windows (source install), the path might look like:
```json
"C:\\Users\\YourName\\ux-mcp-server\\dist\\index.js"
```

After updating the config, restart Claude Desktop.

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

### Analyze Performance

```typescript
"Analyze this React component for performance issues"

// Claude will use analyze_performance tool to check:
// - Image optimization
// - CSS performance
// - JavaScript bundle size
// - Loading patterns
```

### Check SEO

```typescript
"Review this HTML page for SEO best practices"

// Claude will use check_seo tool to validate:
// - Meta tags (title, description)
// - Open Graph tags
// - Structured data (JSON-LD)
// - Canonical URLs
```

### Suggest Animation

```typescript
"What animation should I use for a button click?"

// Claude will use suggest_animation tool to recommend:
// - Animation type
// - Duration and easing
// - CSS/JS implementation
// - Accessibility considerations
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

### Performance Optimization
- Core Web Vitals (LCP, INP, CLS)
- Image optimization strategies
- CSS performance
- JavaScript bundle optimization
- Lazy loading & code splitting
- Caching strategies
- Performance budgets

### SEO Best Practices
- Meta tags (title, description, keywords)
- Open Graph protocol
- Twitter Cards
- Structured data (JSON-LD, Schema.org)
- Technical SEO (robots.txt, sitemap, canonical)
- Local SEO & rich snippets

### Internationalization (i18n)
- Text direction (LTR/RTL support)
- Locale-aware formatting (dates, numbers, currencies)
- Translation patterns
- Cultural considerations
- Font and character set handling
- URL structures for multilingual sites

### Animation & Motion Design
- Disney's 12 principles of animation
- Timing and easing functions
- Motion design principles
- Performance (GPU acceleration)
- Accessibility (prefers-reduced-motion)
- Common UI animation patterns

### React Patterns
- Compound components
- Custom hooks
- State management strategies
- Performance optimization (memoization, code splitting)
- Error boundaries
- Accessibility patterns in React
- Testing best practices

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

## What's New in v2.0.0

- ✨ 5 new knowledge resources: Performance, SEO, i18n, Animation, React Patterns
- 🛠️ 3 new tools: analyze_performance, check_seo, suggest_animation
- 📦 Total: 12 resources, 11 tools, 3 prompts
- 🚀 Published to npm for easy installation

## Contributing

To add new patterns or guidelines:

1. Add content to appropriate file in `knowledge/` directory
2. Update tool implementations in `src/index.ts` if needed
3. Rebuild: `npm run build`
4. Test locally: `npm run dev`
5. Submit a pull request

## License

MIT

## Credits

- WCAG 2.1 Guidelines from W3C
- Nielsen's Usability Heuristics by Jakob Nielsen
- UI Patterns from established design systems and best practices
- Design Token concepts from design system community
- Core Web Vitals from Google Web.dev
- SEO best practices from Google Search Central
- Animation principles from Disney and Material Design
- React patterns from React community and best practices
- i18n standards from Unicode CLDR and W3C

## Links

- **npm Package**: https://www.npmjs.com/package/@elsahafy/ux-mcp-server
- **GitHub Repository**: https://github.com/elsahafy/ux-mcp-server
- **Issues & Feedback**: https://github.com/elsahafy/ux-mcp-server/issues

---

**Built for AI-assisted development with accessibility, usability, performance, and SEO as first-class citizens.**
