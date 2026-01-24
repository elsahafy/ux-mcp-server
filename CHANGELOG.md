# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Nothing yet

### Changed
- Nothing yet

### Fixed
- Nothing yet

---

## [4.0.0] - 2025-01-24

### Added

#### Tier 3 - Emerging Technologies
- **8 new knowledge resources**:
  - `ux://voice/interface` - Voice UI design, conversation patterns, VUI principles
  - `ux://ar-vr/interfaces` - Spatial UI, comfort, presence, 6DOF & AR anchoring
  - `ux://ai-ml/patterns` - AI transparency, confidence indicators, recommendations & ethics
  - `ux://haptic/feedback` - Haptic types, timing patterns & platform APIs
  - `ux://healthcare/ux` - HIPAA compliance, patient safety, medical UI & telemedicine
  - `ux://finance/ux` - PCI-DSS, 2FA, transaction flows & fintech patterns
  - `ux://neurodiversity/design` - ADHD, autism, dyslexia accommodations & cognitive accessibility
  - `ux://web-components/patterns` - Custom elements, Shadow DOM, Lit, Stencil & encapsulation

- **2 new tools**:
  - `generate_wireframe` - Create ASCII wireframes for pages/components
  - `suggest_microinteraction` - Recommend microinteractions with timing/easing

### Summary
- **Total resources**: 28 (was 20)
- **Total tools**: 23 (was 21)
- **Total prompts**: 4
- **Coverage**: 100% UX ecosystem

---

## [3.2.0] - 2025-01-24

### Added

#### Tier 2 - Advanced Features
- **8 new knowledge resources**:
  - `ux://ecommerce/patterns` - Product pages, checkout, conversion & trust optimization
  - `ux://information-architecture/patterns` - IA systems, navigation, card sorting & tree testing
  - `ux://testing/validation` - Usability testing, A/B testing, surveys & analytics
  - `ux://pwa/patterns` - Service workers, offline-first, app manifest & progressive enhancement
  - `ux://ethical-design/patterns` - Dark patterns, privacy, GDPR/CCPA & ethical alternatives
  - `ux://design-systems/advanced` - Semantic tokens, theming, versioning & governance
  - `ux://saas/patterns` - Onboarding, pricing UX, activation metrics & retention
  - `ux://analytics/metrics` - UX metrics (HEART, AARRR), SUS, NPS & statistical analysis

- **5 new tools**:
  - `generate_accessibility_report` - Comprehensive WCAG audit reports
  - `suggest_ab_variant` - Generate A/B test variant suggestions
  - `analyze_information_architecture` - Evaluate navigation and IA structure
  - `detect_dark_patterns` - Identify deceptive UI practices
  - `calculate_ux_metrics` - Calculate SUS, NPS, CSAT, task success rates

---

## [3.0.0] - 2025-01-24

### Added

#### Tier 1 - Critical Features
- **8 new knowledge resources**:
  - `ux://forms/patterns` - Comprehensive form design, validation & accessibility
  - `ux://microcopy/guidelines` - UX writing, button labels, error messages & tone
  - `ux://typography/systems` - Type scales, font pairing, readability & responsive typography
  - `ux://color/theory` - Color harmony, WCAG contrast, semantic colors & palettes
  - `ux://mobile/patterns` - Touch targets, gestures, thumb zones & mobile-first design
  - `ux://vue/patterns` - Vue 3 Composition API, composables, Pinia & best practices
  - `ux://angular/patterns` - Angular standalone components, signals, RxJS & DI
  - `ux://data/visualization` - Chart selection, accessibility, D3.js & dashboard design

- **5 new tools**:
  - `generate_color_palette` - Create accessible color palettes from base colors
  - `generate_typography_scale` - Generate type scales with modular ratios
  - `suggest_microcopy` - Get UX writing recommendations for UI elements
  - `recommend_form_pattern` - Find optimal form layouts and validation patterns
  - `suggest_data_visualization` - Choose appropriate charts for data types

- **1 new prompt**:
  - `complete_ux_audit` - Comprehensive multi-dimensional UX audit

---

## [2.0.1] - 2025-01-23

### Fixed
- TypeScript null check error in pattern search functionality
- Updated README with npm publication details

---

## [2.0.0] - 2025-01-23

### Added
- **5 new knowledge resources**:
  - `ux://performance/optimization` - Core Web Vitals & performance best practices
  - `ux://seo/guidelines` - SEO best practices, meta tags, structured data
  - `ux://i18n/patterns` - Internationalization & localization patterns
  - `ux://animation/motion` - Motion design principles & accessibility
  - `ux://react/patterns` - Advanced React patterns & state management

- **3 new tools**:
  - `analyze_performance` - Check code for performance issues & Core Web Vitals
  - `check_seo` - Analyze HTML for SEO best practices
  - `suggest_animation` - Recommend animations for UI interactions

- Published to npm as `@elsahafy/ux-mcp-server`

### Summary
- **Total resources**: 12
- **Total tools**: 11
- **Total prompts**: 3

---

## [1.0.0] - 2025-01-22

### Added
- Initial release with core UX knowledge bases
- **7 knowledge resources**:
  - `ux://accessibility/wcag` - WCAG 2.1 AA Guidelines
  - `ux://usability/nielsen-heuristics` - Nielsen's 10 Usability Heuristics
  - `ux://patterns/ui-patterns` - Common UI patterns library
  - `ux://design-systems/tokens` - Design system principles & tokens
  - `ux://responsive/design` - Responsive design & mobile-first principles
  - `ux://themes/dark-mode` - Dark mode implementation guide
  - `ux://content/error-messages` - User-friendly error message library

- **8 tools**:
  - `analyze_accessibility` - Check code for WCAG violations
  - `review_usability` - Evaluate against Nielsen's heuristics
  - `suggest_pattern` - Find appropriate UI patterns
  - `generate_component_example` - Create accessible HTML/CSS examples
  - `audit_design_system` - Review design token structure
  - `check_contrast` - Verify WCAG color contrast ratios
  - `check_responsive` - Analyze mobile-first and responsive design
  - `suggest_error_message` - Get user-friendly error messages

- **3 prompts**:
  - `accessibility_review` - Full WCAG accessibility audit
  - `usability_audit` - Complete Nielsen heuristics evaluation
  - `design_system_setup` - Guide for creating design systems

---

[Unreleased]: https://github.com/elsahafy/ux-mcp-server/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/elsahafy/ux-mcp-server/compare/v3.2.0...v4.0.0
[3.2.0]: https://github.com/elsahafy/ux-mcp-server/compare/v3.0.0...v3.2.0
[3.0.0]: https://github.com/elsahafy/ux-mcp-server/compare/v2.0.1...v3.0.0
[2.0.1]: https://github.com/elsahafy/ux-mcp-server/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/elsahafy/ux-mcp-server/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/elsahafy/ux-mcp-server/releases/tag/v1.0.0
