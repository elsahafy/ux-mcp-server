---
title: I Built an MCP Server with 28 UX Knowledge Bases and 23 Tools - Here's What I Learned
published: true
description: How I created a comprehensive UX toolkit for AI coding assistants using the Model Context Protocol
tags: mcp, ux, accessibility, ai
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/[YOUR_IMAGE].png
---

# I Built an MCP Server with 28 UX Knowledge Bases and 23 Tools

Ever wished your AI coding assistant knew about WCAG accessibility guidelines, Nielsen's usability heuristics, or the latest e-commerce UX patterns? I did too. So I built an MCP server to solve that problem.

## The Problem

AI coding assistants are great at writing code, but they often lack specialized domain knowledge. When I asked for help with:

- "Make this button accessible" → Generic advice, missing WCAG specifics
- "What UI pattern should I use for filtering?" → No awareness of established patterns
- "Check my color contrast" → Had to explain WCAG contrast ratios every time

I needed a way to give AI assistants deep UX expertise.

## Enter the Model Context Protocol (MCP)

MCP is Anthropic's open protocol for connecting AI assistants to external data sources and tools. Think of it as giving your AI assistant access to specialized knowledge bases and capabilities.

Instead of the AI relying only on its training data, MCP lets you:
- **Provide real-time resources** (knowledge bases, documentation)
- **Add custom tools** (analyzers, generators, validators)
- **Create workflow prompts** (pre-configured review templates)

## What I Built: UX MCP Server

After months of development, I created a comprehensive UX toolkit:

### 📚 28 Knowledge Resources

Covering the complete UX ecosystem:

**Foundation & Core**
- WCAG 2.1 AA accessibility guidelines
- Nielsen's 10 usability heuristics
- UI patterns library
- Design system tokens
- Responsive design principles
- Dark mode implementation
- Error message guidelines

**Critical Features**
- Form design patterns & validation
- UX writing & microcopy
- Typography systems
- Color theory & contrast
- Mobile patterns & touch targets
- Vue, Angular, React patterns
- Data visualization

**Advanced Topics**
- E-commerce UX (checkout, conversion)
- Information architecture
- Usability testing & A/B testing
- PWA patterns
- Ethical design & dark patterns
- SaaS onboarding & pricing
- Analytics & UX metrics

**Emerging Technologies**
- Voice UI design
- AR/VR interfaces
- AI/ML UX patterns
- Haptic feedback
- Healthcare UX (HIPAA)
- Finance UX (PCI-DSS)
- Neurodiversity-inclusive design
- Web Components

### 🛠️ 23 Analysis Tools

Real tools that do real work:

```typescript
// Check color contrast
check_contrast({ foreground: "#333", background: "#fff" })
// → Returns WCAG AA/AAA compliance status

// Generate accessible color palette
generate_color_palette({ base_color: "#3b82f6", harmony: "triadic" })
// → Returns complete palette with contrast ratios

// Analyze accessibility
analyze_accessibility({ code: "<button>Click</button>" })
// → Returns WCAG violations and fixes

// Detect dark patterns
detect_dark_patterns({ page_description: "checkout with pre-checked insurance" })
// → Identifies deceptive UI practices

// Calculate UX metrics
calculate_ux_metrics({ metric_type: "SUS", data: "4,5,3,2,4,3,4,5,3,4" })
// → Returns SUS score with interpretation
```

### 💬 4 Workflow Prompts

Pre-configured review workflows:
1. **accessibility_review** - Full WCAG audit
2. **usability_audit** - Nielsen heuristics evaluation
3. **design_system_setup** - Design system creation guide
4. **complete_ux_audit** - Comprehensive multi-dimensional review

## How It Works

### Installation

```bash
npm install -g @elsahafy/ux-mcp-server
```

### Configuration (Claude Desktop Example)

```json
{
  "mcpServers": {
    "ux-best-practices": {
      "command": "ux-mcp-server"
    }
  }
}
```

### Usage

Once configured, you can ask your AI assistant:

```
"Check if #3b82f6 on #ffffff meets WCAG AA"
→ Uses check_contrast tool

"What form pattern should I use for a multi-step checkout?"
→ Uses recommend_form_pattern tool + reads ux://ecommerce/patterns

"Generate an accessibility report for my login page"
→ Uses generate_accessibility_report tool

"How do I design for users with ADHD?"
→ Reads ux://neurodiversity/design resource
```

## Cross-Platform Compatibility

The server works with any MCP-compatible client:

| Client | Status |
|--------|--------|
| Claude Desktop | ✅ |
| Claude Code (CLI) | ✅ |
| Cursor IDE | ✅ |
| Continue.dev | ✅ |
| Cline (VS Code) | ✅ |
| Zed Editor | ✅ |

## Technical Implementation

The server is built with:
- **TypeScript** for type safety
- **@modelcontextprotocol/sdk** for MCP implementation
- **JSON knowledge files** for easy updates
- **Modular tool architecture** for extensibility

### Resource Structure

```typescript
// Knowledge resources follow a consistent pattern
{
  uri: "ux://accessibility/wcag",
  name: "WCAG 2.1 AA Guidelines",
  description: "Complete accessibility guidelines",
  mimeType: "application/json"
}
```

### Tool Implementation

```typescript
// Tools return structured JSON responses
async function checkContrast(args: {
  foreground: string;
  background: string;
}) {
  const ratio = calculateContrastRatio(args.foreground, args.background);
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        ratio,
        wcag_aa_normal: ratio >= 4.5,
        wcag_aa_large: ratio >= 3,
        wcag_aaa_normal: ratio >= 7
      })
    }]
  };
}
```

## Lessons Learned

### 1. Structure Knowledge for AI Consumption

AI assistants work better with:
- Hierarchical JSON over flat text
- Explicit best practices AND anti-patterns
- Code examples alongside explanations
- Cross-references between related topics

### 2. Tools Should Be Focused

Each tool does one thing well:
- `check_contrast` - only checks contrast
- `generate_color_palette` - only generates palettes
- `analyze_accessibility` - only analyzes accessibility

### 3. Make It Client-Agnostic

MCP is a protocol, not a platform. Design for any client:
- Use stdio transport (universal)
- Return structured JSON (easy to parse)
- Document for multiple environments

### 4. Comprehensive > Perfect

I started with core accessibility, then expanded:
- v1.0: 7 resources, 8 tools
- v2.0: 12 resources, 11 tools
- v4.0: 28 resources, 23 tools

Ship early, iterate based on real usage.

## What's Next

- **More specialized knowledge**: Automotive UX, Gaming UX, Accessibility testing frameworks
- **Interactive tools**: Live accessibility scanners, real-time contrast checkers
- **Integration guides**: Framework-specific implementation examples

## Try It Out

```bash
npm install -g @elsahafy/ux-mcp-server
```

- **GitHub**: [github.com/elsahafy/ux-mcp-server](https://github.com/elsahafy/ux-mcp-server)
- **npm**: [@elsahafy/ux-mcp-server](https://www.npmjs.com/package/@elsahafy/ux-mcp-server)

## Support

If this helps you build better user experiences, consider supporting development:

- [GitHub Sponsors](https://github.com/sponsors/elsahafy)
- [Ko-fi](https://ko-fi.com/elsahafy)

---

*What UX knowledge would you like to see added? Let me know in the comments!*

---

## Tags for Dev.to

When publishing, use these tags:
- `mcp`
- `ux`
- `accessibility`
- `ai`
- `webdev` (alternative)
- `design` (alternative)

## Publishing Checklist

- [ ] Create account at dev.to
- [ ] Upload a cover image (1000x420px recommended)
- [ ] Copy this content (remove the frontmatter instructions)
- [ ] Add your own screenshots/GIFs
- [ ] Publish!
- [ ] Share on Twitter/LinkedIn with link
