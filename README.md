# UX MCP Server

[![npm version](https://badge.fury.io/js/@elsahafy%2Fux-mcp-server.svg)](https://www.npmjs.com/package/@elsahafy/ux-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub issues](https://img.shields.io/github/issues/elsahafy/ux-mcp-server)](https://github.com/elsahafy/ux-mcp-server/issues)

Model Context Protocol server that provides comprehensive UX best practices covering the complete UX ecosystem: accessibility guidelines (WCAG), usability heuristics (Nielsen), UI patterns, design systems, performance optimization, SEO, internationalization, animation, framework patterns (React/Vue/Angular), e-commerce, testing, PWA, ethical design, SaaS, analytics, voice UI, AR/VR, AI/ML patterns, healthcare, finance, neurodiversity, and web components.

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

### 📚 Resources (28 Knowledge Bases)

Access comprehensive UX knowledge bases organized by category:

**Foundation & Core (12 resources)**
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

**Critical Features (8 resources)**
- **ux://forms/patterns** - Comprehensive form design, validation & accessibility
- **ux://microcopy/guidelines** - UX writing, button labels, error messages & tone
- **ux://typography/systems** - Type scales, font pairing, readability & responsive typography
- **ux://color/theory** - Color harmony, WCAG contrast, semantic colors & palettes
- **ux://mobile/patterns** - Touch targets, gestures, thumb zones & mobile-first design
- **ux://vue/patterns** - Vue 3 Composition API, composables, Pinia & best practices
- **ux://angular/patterns** - Angular standalone components, signals, RxJS & DI
- **ux://data/visualization** - Chart selection, accessibility, D3.js & dashboard design

**Advanced Features (8 resources)**
- **ux://ecommerce/patterns** - Product pages, checkout, conversion & trust optimization
- **ux://information-architecture/patterns** - IA systems, navigation, card sorting & tree testing
- **ux://testing/validation** - Usability testing, A/B testing, surveys & analytics
- **ux://pwa/patterns** - Service workers, offline-first, app manifest & progressive enhancement
- **ux://ethical-design/patterns** - Dark patterns, privacy, GDPR/CCPA & ethical alternatives
- **ux://design-systems/advanced** - Semantic tokens, theming, versioning & governance
- **ux://saas/patterns** - Onboarding, pricing UX, activation metrics & retention
- **ux://analytics/metrics** - UX metrics (HEART, AARRR), SUS, NPS & statistical analysis

**Emerging Technologies (8 resources)**
- **ux://voice/interface** - Voice UI design, conversation patterns, VUI principles
- **ux://ar-vr/interfaces** - Spatial UI, comfort, presence, 6DOF & AR anchoring
- **ux://ai-ml/patterns** - AI transparency, confidence indicators, recommendations & ethics
- **ux://haptic/feedback** - Haptic types, timing patterns & platform APIs
- **ux://healthcare/ux** - HIPAA compliance, patient safety, medical UI & telemedicine
- **ux://finance/ux** - PCI-DSS, 2FA, transaction flows & fintech patterns
- **ux://neurodiversity/design** - ADHD, autism, dyslexia accommodations & cognitive accessibility
- **ux://web-components/patterns** - Custom elements, Shadow DOM, Lit, Stencil & encapsulation

### 🛠️ Tools (23 Dynamic Operations)

Powerful tools for UX analysis and generation:

**Core Analysis (11 tools)**
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

**Design & Content (5 tools)**
12. **generate_color_palette** - Create accessible color palettes from base colors
13. **generate_typography_scale** - Generate type scales with modular ratios
14. **suggest_microcopy** - Get UX writing recommendations for UI elements
15. **recommend_form_pattern** - Find optimal form layouts and validation patterns
16. **suggest_data_visualization** - Choose appropriate charts for data types

**Testing & Validation (5 tools)**
17. **generate_accessibility_report** - Comprehensive WCAG audit reports
18. **suggest_ab_variant** - Generate A/B test variant suggestions
19. **analyze_information_architecture** - Evaluate navigation and IA structure
20. **detect_dark_patterns** - Identify deceptive UI practices
21. **calculate_ux_metrics** - Calculate SUS, NPS, CSAT, task success rates

**UI Generation (2 tools)**
22. **generate_wireframe** - Create ASCII wireframes for pages/components
23. **suggest_microinteraction** - Recommend microinteractions with timing/easing

### 💬 Prompts (4 Pre-configured Workflows)

Comprehensive review workflows:

1. **accessibility_review** - Full WCAG accessibility audit
2. **usability_audit** - Complete Nielsen heuristics evaluation
3. **design_system_setup** - Guide for creating design systems
4. **complete_ux_audit** - Comprehensive multi-dimensional UX audit (accessibility, usability, performance, responsive design, typography, color, forms, SEO)

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

### Forms & Microcopy
- Form layouts (single-column, multi-step wizards)
- Validation patterns (inline, submit, hybrid)
- Accessible form fields & error handling
- UX writing principles (clarity, tone, voice)
- Button labels & CTAs
- User-friendly error messages

### Typography & Color Systems
- Type scales with modular ratios (1.2, 1.333, 1.618)
- Font pairing strategies
- Readability optimization (line length, spacing)
- Color harmony (complementary, triadic, analogous)
- WCAG contrast compliance (4.5:1, 3:1, 7:1)
- Semantic color tokens

### Mobile & Framework Patterns
- Touch targets (44x44px minimum)
- Gestures & thumb zones
- Bottom navigation patterns
- Vue 3 Composition API & composables
- Angular signals & standalone components
- Framework-agnostic best practices

### E-commerce & Conversion
- Product discovery (mega menus, faceted filters)
- Product detail pages & variant selection
- Shopping cart patterns (drawer vs page)
- Checkout optimization (multi-step with progress)
- Trust signals & abandoned cart recovery

### Testing & Analytics
- Usability testing (moderated/unmoderated/guerrilla)
- A/B testing methodology & statistical significance
- UX metrics (SUS, NPS, CSAT, CES)
- HEART framework & AARRR pirate metrics
- Accessibility testing (automated & manual)

### PWA & Ethical Design
- Service workers & caching strategies
- Offline-first patterns
- Web app manifest & add to home screen
- Dark pattern detection & ethical alternatives
- GDPR/CCPA compliance
- Privacy-first design

### SaaS & Advanced Design Systems
- Onboarding flows & activation metrics
- Pricing UX (freemium, trial, usage-based)
- Semantic design tokens (3-tier architecture)
- Multi-brand theming
- Component versioning & governance

### Emerging Technologies
- Voice UI conversation design & VUI principles
- AR/VR spatial interfaces & comfort optimization
- AI/ML transparency & confidence indicators
- Haptic feedback timing & platform APIs
- Healthcare UX (HIPAA, patient safety)
- Finance UX (PCI-DSS, 2FA, transaction flows)
- Neurodiversity-inclusive design (ADHD, autism, dyslexia)
- Web Components (Custom Elements, Shadow DOM, Lit)

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

## What's New in v4.0.0 🚀

**Complete UX Ecosystem Coverage (100%)**

Major expansion with 24 new knowledge resources and 12 new tools across three implementation tiers:

### Tier 1 - Critical Features (v3.0.0)
- ✨ 8 new resources: Forms, Microcopy, Typography, Color Theory, Mobile Patterns, Vue, Angular, Data Visualization
- 🛠️ 5 new tools: Color palettes, Typography scales, Microcopy suggestions, Form patterns, Data viz recommendations
- 💬 1 new prompt: Complete UX Audit

### Tier 2 - Advanced Features (v3.2.0)
- ✨ 8 new resources: E-commerce, Information Architecture, Testing/Validation, PWA, Ethical Design, Advanced Design Systems, SaaS, Analytics/Metrics
- 🛠️ 5 new tools: Accessibility reports, A/B variants, IA analysis, Dark pattern detection, UX metrics calculation

### Tier 3 - Emerging Technologies (v4.0.0)
- ✨ 8 new resources: Voice UI, AR/VR Interfaces, AI/ML Patterns, Haptic Feedback, Healthcare UX, Finance UX, Neurodiversity, Web Components
- 🛠️ 2 new tools: Wireframe generation, Microinteraction suggestions

### Final Metrics
- 📚 **28 resources** (was 12) - 133% increase
- 🛠️ **23 tools** (was 11) - 109% increase
- 💬 **4 prompts** (was 3) - Comprehensive audit workflow added
- ✅ **100% UX ecosystem coverage** - From foundational patterns to cutting-edge emerging technologies

All implementations include best practices, anti-patterns, accessibility guidelines, code examples, and industry references.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup
- Adding new resources, tools, or prompts
- Coding standards
- Pull request process

**Quick Start:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- WCAG 2.1 Guidelines from W3C
- Nielsen's Usability Heuristics by Jakob Nielsen
- UI Patterns from established design systems and best practices
- Design Token concepts from design system community
- Core Web Vitals from Google Web.dev
- SEO best practices from Google Search Central
- Animation principles from Disney and Material Design
- React, Vue, Angular patterns from framework communities
- i18n standards from Unicode CLDR and W3C
- E-commerce patterns from Baymard Institute research
- Information Architecture from Rosenfeld & Morville
- PWA standards from W3C and Google
- Ethical design principles from darkpatterns.org
- UX metrics from HEART Framework (Google) and industry standards
- Voice UI design from Amazon Alexa, Google Assistant guidelines
- AR/VR best practices from Oculus, Meta, and Apple Vision Pro
- AI/ML ethics from Partnership on AI and industry practices
- HIPAA compliance from HHS.gov
- PCI-DSS standards from PCI Security Standards Council
- Neurodiversity guidelines from ADHD Foundation, National Autistic Society, British Dyslexia Association
- Web Components standards from W3C and web.dev

## Links

- **npm Package**: https://www.npmjs.com/package/@elsahafy/ux-mcp-server
- **GitHub Repository**: https://github.com/elsahafy/ux-mcp-server
- **Issues & Feedback**: https://github.com/elsahafy/ux-mcp-server/issues
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Security Policy**: [SECURITY.md](SECURITY.md)

---

**Built for AI-assisted development with complete UX ecosystem coverage: accessibility, usability, performance, SEO, design systems, e-commerce, testing, ethical design, emerging technologies (Voice/AR/VR/AI), healthcare, finance, neurodiversity, and more—all as first-class citizens.**
