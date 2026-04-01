#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Knowledge base paths
const KNOWLEDGE_PATH = join(__dirname, "..", "knowledge");

interface ServerConfig {
  name: string;
  version: string;
}

const config: ServerConfig = {
  name: "ux-mcp-server",
  version: "1.0.0",
};

// Helper to load knowledge file
async function loadKnowledge(filename: string): Promise<any> {
  const path = join(KNOWLEDGE_PATH, filename);
  const content = await readFile(path, "utf-8");
  return JSON.parse(content);
}

// Create MCP server
const server = new Server(
  {
    name: config.name,
    version: config.version,
  },
  {
    capabilities: {
      resources: { listChanged: true },
      tools: { listChanged: true },
      prompts: { listChanged: true },
    },
  }
);

// ========================================
// RESOURCES - Static UX Knowledge
// ========================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "ux://accessibility/wcag",
        name: "WCAG 2.1 AA Guidelines",
        description: "Web Content Accessibility Guidelines with code checks and examples",
        mimeType: "application/json",
      },
      {
        uri: "ux://usability/nielsen-heuristics",
        name: "Nielsen's 10 Usability Heuristics",
        description: "Core usability principles with examples and evaluation questions",
        mimeType: "application/json",
      },
      {
        uri: "ux://patterns/ui-patterns",
        name: "UI Patterns Library",
        description: "Common interface patterns for navigation, forms, feedback, and data display",
        mimeType: "application/json",
      },
      {
        uri: "ux://design-systems/principles",
        name: "Design System Principles",
        description: "Design primitives, atomic design, and component API guidelines",
        mimeType: "application/json",
      },
      {
        uri: "ux://responsive/design",
        name: "Responsive Design Best Practices",
        description: "Mobile-first principles, breakpoints, responsive patterns, and testing guidelines",
        mimeType: "application/json",
      },
      {
        uri: "ux://themes/dark-mode",
        name: "Dark Mode Implementation Guide",
        description: "Dark mode best practices, color considerations, and accessibility",
        mimeType: "application/json",
      },
      {
        uri: "ux://content/error-messages",
        name: "Error Message Library",
        description: "User-friendly error messages for common scenarios with tone guidelines",
        mimeType: "application/json",
      },
      {
        uri: "ux://performance/optimization",
        name: "Performance Best Practices",
        description: "Core Web Vitals, performance optimization, and loading strategies",
        mimeType: "application/json",
      },
      {
        uri: "ux://seo/guidelines",
        name: "SEO Best Practices",
        description: "Search engine optimization, meta tags, structured data, and technical SEO",
        mimeType: "application/json",
      },
      {
        uri: "ux://i18n/patterns",
        name: "Internationalization (i18n) Patterns",
        description: "Guidelines for building multilingual, globally accessible applications",
        mimeType: "application/json",
      },
      {
        uri: "ux://animation/motion",
        name: "Animation & Motion Design",
        description: "Motion design principles, performance, and accessibility for UI animations",
        mimeType: "application/json",
      },
      {
        uri: "ux://react/patterns",
        name: "React Component Patterns",
        description: "Advanced React patterns for composition, state management, and performance",
        mimeType: "application/json",
      },
      {
        uri: "ux://forms/patterns",
        name: "Form Design Patterns",
        description: "Comprehensive guide to designing accessible, user-friendly forms",
        mimeType: "application/json",
      },
      {
        uri: "ux://content/microcopy",
        name: "Microcopy & UX Writing",
        description: "Guide to writing clear, user-friendly interface copy and microcopy",
        mimeType: "application/json",
      },
      {
        uri: "ux://design/typography",
        name: "Typography System",
        description: "Type scales, font pairing, hierarchy, and responsive typography",
        mimeType: "application/json",
      },
      {
        uri: "ux://design/color-theory",
        name: "Color Theory & Palettes",
        description: "Color theory, palette generation, accessibility, and color usage",
        mimeType: "application/json",
      },
      {
        uri: "ux://mobile/patterns",
        name: "Mobile-Specific UX Patterns",
        description: "Mobile-first design, touch interactions, and mobile navigation patterns",
        mimeType: "application/json",
      },
      {
        uri: "ux://vue/patterns",
        name: "Vue.js Patterns & Best Practices",
        description: "Vue.js component patterns, Composition API, and state management",
        mimeType: "application/json",
      },
      {
        uri: "ux://angular/patterns",
        name: "Angular Patterns & Best Practices",
        description: "Angular component patterns, services, RxJS, and performance optimization",
        mimeType: "application/json",
      },
      {
        uri: "ux://data-viz/patterns",
        name: "Data Visualization Patterns",
        description: "Choosing, designing, and implementing accessible data visualizations",
        mimeType: "application/json",
      },
      {
        uri: "ux://ecommerce/patterns",
        name: "E-commerce UX Patterns",
        description: "E-commerce user experience patterns, conversion optimization, and best practices",
        mimeType: "application/json",
      },
      {
        uri: "ux://ia/information-architecture",
        name: "Information Architecture",
        description: "Organizing and structuring information for optimal findability and usability",
        mimeType: "application/json",
      },
      {
        uri: "ux://testing/validation",
        name: "UX Testing & Validation",
        description: "User experience testing methodologies, validation techniques, and research methods",
        mimeType: "application/json",
      },
      {
        uri: "ux://pwa/patterns",
        name: "Progressive Web App Patterns",
        description: "Building progressive web apps with optimal UX patterns and best practices",
        mimeType: "application/json",
      },
      {
        uri: "ux://ethics/dark-patterns",
        name: "Ethical Design & Dark Patterns",
        description: "Ethical design principles and avoiding dark patterns that manipulate users",
        mimeType: "application/json",
      },
      {
        uri: "ux://design-systems/advanced",
        name: "Advanced Design System Patterns",
        description: "Advanced concepts for building, scaling, and maintaining enterprise design systems",
        mimeType: "application/json",
      },
      {
        uri: "ux://saas/patterns",
        name: "SaaS Product UX Patterns",
        description: "UX patterns for SaaS products including onboarding, pricing, and retention",
        mimeType: "application/json",
      },
      {
        uri: "ux://analytics/metrics",
        name: "UX Analytics & Metrics",
        description: "Measuring user experience through analytics, metrics, and data-driven decision making",
        mimeType: "application/json",
      },
      {
        uri: "ux://voice/interface",
        name: "Voice User Interface (VUI) Design",
        description: "Designing voice interfaces for assistants, smart speakers, and voice-enabled apps",
        mimeType: "application/json",
      },
      {
        uri: "ux://ar-vr/interfaces",
        name: "AR/VR Interface Design",
        description: "Design principles and patterns for Augmented and Virtual Reality interfaces",
        mimeType: "application/json",
      },
      {
        uri: "ux://ai-ml/patterns",
        name: "AI/ML UX Patterns",
        description: "User experience patterns for AI and machine learning powered features",
        mimeType: "application/json",
      },
      {
        uri: "ux://haptic/feedback",
        name: "Haptic Feedback Design",
        description: "Design guide for tactile feedback in user interfaces across devices",
        mimeType: "application/json",
      },
      {
        uri: "ux://healthcare/patterns",
        name: "Healthcare UX Patterns",
        description: "UX design for healthcare applications prioritizing safety, privacy, and usability",
        mimeType: "application/json",
      },
      {
        uri: "ux://finance/patterns",
        name: "Financial Services UX Patterns",
        description: "UX design for banking, fintech, and financial applications",
        mimeType: "application/json",
      },
      {
        uri: "ux://neurodiversity/design",
        name: "Neurodiversity-Inclusive Design",
        description: "Designing for neurodivergent users including ADHD, autism, and dyslexia",
        mimeType: "application/json",
      },
      {
        uri: "ux://web-components/patterns",
        name: "Web Components",
        description: "Building framework-agnostic, reusable UI components with Web Components",
        mimeType: "application/json",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  let content: any;
  let description: string;

  switch (uri) {
    case "ux://accessibility/wcag":
      content = await loadKnowledge("wcag-guidelines.json");
      description = "Complete WCAG 2.1 Level AA guidelines for web accessibility";
      break;
    case "ux://usability/nielsen-heuristics":
      content = await loadKnowledge("nielsen-heuristics.json");
      description = "Jakob Nielsen's 10 usability heuristics for interface design";
      break;
    case "ux://patterns/ui-patterns":
      content = await loadKnowledge("ui-patterns.json");
      description = "Library of proven UI patterns for common use cases";
      break;
    case "ux://design-systems/principles":
      content = await loadKnowledge("design-tokens.json");
      description = "Design system principles, tokens, and atomic design methodology";
      break;
    case "ux://responsive/design":
      content = await loadKnowledge("responsive-design.json");
      description = "Mobile-first design, breakpoints, and responsive patterns";
      break;
    case "ux://themes/dark-mode":
      content = await loadKnowledge("dark-mode.json");
      description = "Dark mode implementation, color considerations, and accessibility";
      break;
    case "ux://content/error-messages":
      content = await loadKnowledge("error-messages.json");
      description = "User-friendly error messages with tone guidelines and examples";
      break;
    case "ux://performance/optimization":
      content = await loadKnowledge("performance.json");
      description = "Core Web Vitals and performance optimization strategies";
      break;
    case "ux://seo/guidelines":
      content = await loadKnowledge("seo.json");
      description = "SEO best practices, meta tags, and structured data";
      break;
    case "ux://i18n/patterns":
      content = await loadKnowledge("i18n.json");
      description = "Internationalization patterns for multilingual applications";
      break;
    case "ux://animation/motion":
      content = await loadKnowledge("animation.json");
      description = "Motion design principles and accessible animations";
      break;
    case "ux://react/patterns":
      content = await loadKnowledge("react-patterns.json");
      description = "Advanced React component patterns and best practices";
      break;
    case "ux://forms/patterns":
      content = await loadKnowledge("forms.json");
      description = "Comprehensive form design patterns and validation";
      break;
    case "ux://content/microcopy":
      content = await loadKnowledge("microcopy.json");
      description = "UX writing and microcopy best practices";
      break;
    case "ux://design/typography":
      content = await loadKnowledge("typography.json");
      description = "Typography system and font pairing guide";
      break;
    case "ux://design/color-theory":
      content = await loadKnowledge("color-theory.json");
      description = "Color theory, palettes, and accessibility";
      break;
    case "ux://mobile/patterns":
      content = await loadKnowledge("mobile-patterns.json");
      description = "Mobile-specific UX patterns and touch interactions";
      break;
    case "ux://vue/patterns":
      content = await loadKnowledge("vue-patterns.json");
      description = "Vue.js patterns and Composition API";
      break;
    case "ux://angular/patterns":
      content = await loadKnowledge("angular-patterns.json");
      description = "Angular patterns, services, and RxJS";
      break;
    case "ux://data-viz/patterns":
      content = await loadKnowledge("data-viz.json");
      description = "Data visualization best practices";
      break;
    case "ux://ecommerce/patterns":
      content = await loadKnowledge("ecommerce-patterns.json");
      description = "E-commerce UX patterns and conversion optimization";
      break;
    case "ux://ia/information-architecture":
      content = await loadKnowledge("information-architecture.json");
      description = "Information architecture and content organization";
      break;
    case "ux://testing/validation":
      content = await loadKnowledge("testing-validation.json");
      description = "UX testing methodologies and validation techniques";
      break;
    case "ux://pwa/patterns":
      content = await loadKnowledge("pwa-patterns.json");
      description = "Progressive Web App patterns and best practices";
      break;
    case "ux://ethics/dark-patterns":
      content = await loadKnowledge("ethical-design.json");
      description = "Ethical design and dark pattern prevention";
      break;
    case "ux://design-systems/advanced":
      content = await loadKnowledge("design-system-advanced.json");
      description = "Advanced design system patterns and scaling";
      break;
    case "ux://saas/patterns":
      content = await loadKnowledge("saas-patterns.json");
      description = "SaaS product UX patterns and strategies";
      break;
    case "ux://analytics/metrics":
      content = await loadKnowledge("analytics-metrics.json");
      description = "UX analytics, metrics, and measurement";
      break;
    case "ux://voice/interface":
      content = await loadKnowledge("voice-ui.json");
      description = "Voice user interface design and conversation patterns";
      break;
    case "ux://ar-vr/interfaces":
      content = await loadKnowledge("ar-vr-interfaces.json");
      description = "AR and VR interface design principles";
      break;
    case "ux://ai-ml/patterns":
      content = await loadKnowledge("ai-ml-patterns.json");
      description = "AI and ML UX patterns and ethical considerations";
      break;
    case "ux://haptic/feedback":
      content = await loadKnowledge("haptic-feedback.json");
      description = "Haptic feedback design for tactile interfaces";
      break;
    case "ux://healthcare/patterns":
      content = await loadKnowledge("healthcare-ux.json");
      description = "Healthcare UX design patterns and regulations";
      break;
    case "ux://finance/patterns":
      content = await loadKnowledge("finance-ux.json");
      description = "Financial services UX patterns and security";
      break;
    case "ux://neurodiversity/design":
      content = await loadKnowledge("neurodiversity.json");
      description = "Neurodiversity-inclusive design principles";
      break;
    case "ux://web-components/patterns":
      content = await loadKnowledge("web-components.json");
      description = "Web Components standards and patterns";
      break;
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }

  return {
    contents: [
      {
        uri,
        mimeType: "application/json",
        text: JSON.stringify(content, null, 2),
      },
    ],
  };
});

// ========================================
// TOOLS - Dynamic UX Operations
// ========================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "analyze_accessibility",
        description:
          "Analyze HTML/JSX code for accessibility issues based on WCAG guidelines. Returns specific violations and suggestions.",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "HTML or JSX markup to analyze for accessibility issues",
            },
            level: {
              type: "string",
              enum: ["A", "AA", "AAA"],
              description: "WCAG conformance level to check against",
              default: "AA",
            },
          },
          required: ["content"],
        },
      },
      {
        name: "review_usability",
        description:
          "Review a UI description or code against Nielsen's usability heuristics. Provides ratings and specific recommendations.",
        inputSchema: {
          type: "object",
          properties: {
            description: {
              type: "string",
              description: "Description of the UI or component to review",
            },
            content: {
              type: "string",
              description: "Optional: UI markup or implementation to review",
            },
            focus_heuristics: {
              type: "array",
              items: { type: "number" },
              description: "Optional: Specific heuristics to focus on (1-10)",
            },
          },
          required: ["description"],
        },
      },
      {
        name: "suggest_pattern",
        description:
          "Suggest appropriate UI pattern for a given use case. Returns pattern details, best practices, and implementation guidance.",
        inputSchema: {
          type: "object",
          properties: {
            use_case: {
              type: "string",
              description:
                "Description of what you're trying to build (e.g., 'user navigation', 'form validation', 'data display')",
            },
            constraints: {
              type: "string",
              description: "Optional: Specific constraints or requirements",
            },
          },
          required: ["use_case"],
        },
      },
      {
        name: "generate_component_example",
        description:
          "Generate framework-agnostic HTML/CSS example following UX best practices for a specific pattern.",
        inputSchema: {
          type: "object",
          properties: {
            pattern: {
              type: "string",
              description:
                "Pattern name (e.g., 'search', 'modal', 'form', 'button', 'data-table')",
            },
            variant: {
              type: "string",
              description: "Optional: Specific variant (e.g., 'primary', 'ghost', 'inline')",
            },
            include_accessibility: {
              type: "boolean",
              description: "Include ARIA attributes and accessibility features",
              default: true,
            },
          },
          required: ["pattern"],
        },
      },
      {
        name: "audit_design_system",
        description:
          "Audit design system implementation for consistency with best practices. Checks tokens, naming, and structure.",
        inputSchema: {
          type: "object",
          properties: {
            tokens: {
              type: "string",
              description: "JSON or CSS of design tokens to audit",
            },
            type: {
              type: "string",
              enum: ["colors", "spacing", "typography", "all"],
              description: "Type of tokens to audit",
              default: "all",
            },
          },
          required: ["tokens"],
        },
      },
      {
        name: "check_contrast",
        description:
          "Check color contrast ratio for WCAG compliance. Supports hex, rgb, and named colors.",
        inputSchema: {
          type: "object",
          properties: {
            foreground: {
              type: "string",
              description: "Foreground color (text)",
            },
            background: {
              type: "string",
              description: "Background color",
            },
            level: {
              type: "string",
              enum: ["AA", "AAA"],
              description: "WCAG level to check",
              default: "AA",
            },
            large_text: {
              type: "boolean",
              description: "Is the text large (18pt+ or 14pt+ bold)?",
              default: false,
            },
          },
          required: ["foreground", "background"],
        },
      },
      {
        name: "check_responsive",
        description:
          "Analyze code for mobile-first principles and responsive design issues. Checks viewport meta, touch targets, and breakpoints.",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "HTML/CSS markup to analyze for responsive design issues",
            },
            check_type: {
              type: "string",
              enum: ["all", "viewport", "touch-targets", "breakpoints", "images"],
              description: "Specific responsive aspect to check",
              default: "all",
            },
          },
          required: ["content"],
        },
      },
      {
        name: "suggest_error_message",
        description:
          "Get user-friendly error message suggestions for specific scenarios. Returns message, tone guidance, and accessibility considerations.",
        inputSchema: {
          type: "object",
          properties: {
            scenario: {
              type: "string",
              description:
                "Error scenario (e.g., 'invalid email', 'required field', 'payment failed', 'file too large')",
            },
            context: {
              type: "string",
              description: "Optional: Additional context about the error",
            },
            technical_message: {
              type: "string",
              description: "Optional: Technical error message to translate to user-friendly language",
            },
          },
          required: ["scenario"],
        },
      },
      {
        name: "analyze_performance",
        description:
          "Analyze code for performance issues and Core Web Vitals optimization. Checks resource loading, image optimization, and rendering performance.",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "HTML/CSS/JS markup to analyze for performance issues",
            },
            check_type: {
              type: "string",
              enum: ["all", "images", "css", "javascript", "loading"],
              description: "Specific performance aspect to check",
              default: "all",
            },
          },
          required: ["content"],
        },
      },
      {
        name: "check_seo",
        description:
          "Analyze HTML for SEO best practices. Checks meta tags, Open Graph, structured data, and technical SEO elements.",
        inputSchema: {
          type: "object",
          properties: {
            html: {
              type: "string",
              description: "HTML code to analyze",
            },
            page_url: {
              type: "string",
              description: "Optional: Page URL label for report context (not fetched)",
            },
          },
          required: ["html"],
        },
      },
      {
        name: "suggest_animation",
        description:
          "Suggest appropriate animation for a UI interaction. Returns animation type, duration, easing, and implementation guidance.",
        inputSchema: {
          type: "object",
          properties: {
            interaction: {
              type: "string",
              description:
                "UI interaction to animate (e.g., 'button click', 'modal open', 'list item add', 'page transition')",
            },
            context: {
              type: "string",
              description: "Optional: Additional context about the interaction",
            },
          },
          required: ["interaction"],
        },
      },
      {
        name: "generate_color_palette",
        description:
          "Generate accessible color palette from a base color. Returns primary, secondary, neutral, and semantic colors with WCAG-compliant variations.",
        inputSchema: {
          type: "object",
          properties: {
            base_color: {
              type: "string",
              description: "Base color (hex, rgb, or color name)",
            },
            harmony_type: {
              type: "string",
              enum: ["monochromatic", "analogous", "complementary", "triadic", "split-complementary"],
              description: "Color harmony type to generate",
              default: "analogous",
            },
            include_neutrals: {
              type: "boolean",
              description: "Include grayscale neutrals",
              default: true,
            },
          },
          required: ["base_color"],
        },
      },
      {
        name: "generate_typography_scale",
        description:
          "Calculate modular typography scale with recommended sizes for headings and body text. Returns complete type scale with line heights.",
        inputSchema: {
          type: "object",
          properties: {
            base_size: {
              type: "number",
              description: "Base font size in pixels (typically 16)",
              default: 16,
            },
            scale_ratio: {
              type: "number",
              description: "Scale ratio (e.g., 1.2 for minor third, 1.5 for perfect fifth)",
              default: 1.2,
            },
            steps: {
              type: "number",
              description: "Number of steps to generate (up and down from base)",
              default: 5,
            },
          },
        },
      },
      {
        name: "suggest_microcopy",
        description:
          "Suggest user-friendly microcopy for UI elements. Returns context-aware suggestions for buttons, labels, messages, and help text.",
        inputSchema: {
          type: "object",
          properties: {
            element_type: {
              type: "string",
              enum: ["button", "label", "placeholder", "error", "success", "empty-state", "tooltip", "cta"],
              description: "Type of UI element needing copy",
            },
            context: {
              type: "string",
              description: "Context of the element (e.g., 'login button', 'email field', 'payment success')",
            },
            tone: {
              type: "string",
              enum: ["professional", "friendly", "casual", "formal"],
              description: "Desired tone of voice",
              default: "friendly",
            },
          },
          required: ["element_type", "context"],
        },
      },
      {
        name: "suggest_form_pattern",
        description:
          "Recommend optimal form layout and validation pattern. Returns layout recommendations, field types, and validation strategies.",
        inputSchema: {
          type: "object",
          properties: {
            form_type: {
              type: "string",
              description: "Type of form (e.g., 'login', 'registration', 'checkout', 'contact', 'search')",
            },
            field_count: {
              type: "number",
              description: "Approximate number of fields",
            },
            platform: {
              type: "string",
              enum: ["web", "mobile", "both"],
              description: "Target platform",
              default: "both",
            },
          },
          required: ["form_type"],
        },
      },
      {
        name: "analyze_data_viz",
        description:
          "Review data visualization for accessibility and clarity. Checks chart type appropriateness, color usage, labels, and accessibility.",
        inputSchema: {
          type: "object",
          properties: {
            chart_type: {
              type: "string",
              description: "Type of chart/visualization (e.g., 'bar chart', 'line chart', 'pie chart', 'scatter plot')",
            },
            data_description: {
              type: "string",
              description: "Description of the data being visualized",
            },
            purpose: {
              type: "string",
              description: "Purpose of the visualization (e.g., 'comparison', 'trend', 'composition', 'distribution')",
            },
          },
          required: ["chart_type", "data_description"],
        },
      },
      {
        name: "generate_accessibility_report",
        description:
          "Generate comprehensive accessibility audit report. Checks WCAG compliance, keyboard navigation, screen reader compatibility, and semantic HTML.",
        inputSchema: {
          type: "object",
          properties: {
            page_identifier: {
              type: "string",
              description: "Page name, route, or identifier for the audit report (not fetched)",
            },
            wcag_level: {
              type: "string",
              enum: ["A", "AA", "AAA"],
              description: "WCAG compliance level to check against",
              default: "AA",
            },
          },
          required: ["page_identifier"],
        },
      },
      {
        name: "suggest_ab_variant",
        description:
          "Suggest A/B test variants for optimization. Provides hypothesis, variant designs, and metrics to track.",
        inputSchema: {
          type: "object",
          properties: {
            element: {
              type: "string",
              description: "Element to test (e.g., 'CTA button', 'headline', 'pricing page', 'checkout flow')",
            },
            goal: {
              type: "string",
              description: "Desired outcome (e.g., 'increase conversions', 'reduce bounce', 'improve engagement')",
            },
            current_performance: {
              type: "string",
              description: "Current metric (e.g., '2% conversion rate', '60% bounce rate')",
            },
          },
          required: ["element", "goal"],
        },
      },
      {
        name: "analyze_information_architecture",
        description:
          "Analyze and suggest improvements to information architecture. Reviews navigation, labeling, hierarchy, and content organization.",
        inputSchema: {
          type: "object",
          properties: {
            site_structure: {
              type: "string",
              description: "Description or sitemap of current structure",
            },
            user_goals: {
              type: "string",
              description: "Primary user goals and tasks",
            },
            issues: {
              type: "string",
              description: "Known issues or pain points (optional)",
            },
          },
          required: ["site_structure", "user_goals"],
        },
      },
      {
        name: "detect_dark_patterns",
        description:
          "Detect dark patterns and ethical design violations. Identifies manipulative UI practices and suggests ethical alternatives.",
        inputSchema: {
          type: "object",
          properties: {
            flow_description: {
              type: "string",
              description: "Description of user flow or interface (e.g., 'subscription cancellation', 'cookie consent', 'checkout')",
            },
            screenshot_reference: {
              type: "string",
              description: "Screenshot filename or reference label (optional, not fetched)",
            },
          },
          required: ["flow_description"],
        },
      },
      {
        name: "calculate_ux_metrics",
        description:
          "Calculate key UX metrics and benchmarks. Computes SUS score, NPS, task success rate, and provides interpretation.",
        inputSchema: {
          type: "object",
          properties: {
            metric_type: {
              type: "string",
              enum: ["SUS", "NPS", "CSAT", "CES", "task-success", "retention"],
              description: "Type of UX metric to calculate",
            },
            data: {
              type: "string",
              description: "Raw data (e.g., 'SUS responses: 4,2,5,4,3,2,5,4,4,3' or 'NPS scores: 9,8,10,7,6,9,10')",
            },
          },
          required: ["metric_type", "data"],
        },
      },
      {
        name: "generate_wireframe",
        description:
          "Generate ASCII wireframe mockup for a page or component. Creates low-fidelity layout sketch using text characters.",
        inputSchema: {
          type: "object",
          properties: {
            page_type: {
              type: "string",
              description: "Type of page/component (e.g., 'login page', 'dashboard', 'product card', 'navigation header')",
            },
            elements: {
              type: "string",
              description: "Key elements to include (e.g., 'logo, search bar, user menu, main content area')",
            },
            layout: {
              type: "string",
              enum: ["single-column", "two-column", "three-column", "grid", "sidebar"],
              description: "Overall layout structure",
              default: "single-column",
            },
          },
          required: ["page_type"],
        },
      },
      {
        name: "suggest_microinteraction",
        description:
          "Suggest microinteractions for UI elements. Provides animation, feedback, and transition recommendations.",
        inputSchema: {
          type: "object",
          properties: {
            element: {
              type: "string",
              description: "UI element (e.g., 'button', 'toggle switch', 'like button', 'form submission', 'loading')",
            },
            context: {
              type: "string",
              description: "Context of interaction (e.g., 'delete action', 'successful save', 'error state')",
            },
            platform: {
              type: "string",
              enum: ["web", "mobile", "both"],
              description: "Target platform",
              default: "web",
            },
          },
          required: ["element"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "analyze_accessibility":
        return await analyzeAccessibility(args);
      case "review_usability":
        return await reviewUsability(args);
      case "suggest_pattern":
        return await suggestPattern(args);
      case "generate_component_example":
        return await generateComponentExample(args);
      case "audit_design_system":
        return await auditDesignSystem(args);
      case "check_contrast":
        return await checkContrast(args);
      case "check_responsive":
        return await checkResponsive(args);
      case "suggest_error_message":
        return await suggestErrorMessage(args);
      case "analyze_performance":
        return await analyzePerformance(args);
      case "check_seo":
        return await checkSEO(args);
      case "suggest_animation":
        return await suggestAnimation(args);
      case "generate_color_palette":
        return await generateColorPalette(args);
      case "generate_typography_scale":
        return await generateTypographyScale(args);
      case "suggest_microcopy":
        return await suggestMicrocopy(args);
      case "suggest_form_pattern":
        return await suggestFormPattern(args);
      case "analyze_data_viz":
        return await analyzeDataViz(args);
      case "generate_accessibility_report":
        return await generateAccessibilityReport(args);
      case "suggest_ab_variant":
        return await suggestABVariant(args);
      case "analyze_information_architecture":
        return await analyzeInformationArchitecture(args);
      case "detect_dark_patterns":
        return await detectDarkPatterns(args);
      case "calculate_ux_metrics":
        return await calculateUXMetrics(args);
      case "generate_wireframe":
        return await generateWireframe(args);
      case "suggest_microinteraction":
        return await suggestMicrointeraction(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// ========================================
// TOOL IMPLEMENTATIONS
// ========================================

async function analyzeAccessibility(args: any) {
  const wcag = await loadKnowledge("wcag-guidelines.json");
  const code = args.content as string;
  const level = (args.level as string) || "AA";

  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check for common accessibility issues
  if (/<img(?![^>]*alt=)/i.test(code)) {
    issues.push("❌ Images without alt text (WCAG 1.1.1)");
    suggestions.push("Add alt attribute to all img elements");
  }

  if (/<input(?![^>]*id=|[^>]*aria-label)/i.test(code)) {
    const hasLabel = /<label[^>]*for=/i.test(code);
    if (!hasLabel) {
      issues.push("❌ Form inputs without labels (WCAG 3.3.2)");
      suggestions.push("Associate labels with inputs using for/id or aria-label");
    }
  }

  if (/<button[^>]*>[^<]*<(svg|i|img)/i.test(code)) {
    if (!/<button[^>]*aria-label/i.test(code)) {
      issues.push("❌ Icon-only buttons without aria-label (WCAG 4.1.2)");
      suggestions.push("Add aria-label to buttons containing only icons");
    }
  }

  if (/style="[^"]*outline:\s*none/i.test(code)) {
    issues.push("⚠️ Focus outline removed without replacement (WCAG 2.4.7)");
    suggestions.push("If removing outline, provide alternative focus indicator");
  }

  if (/<div[^>]*(onclick|@click)/i.test(code)) {
    if (!/<div[^>]*(role=|tabindex)/i.test(code)) {
      issues.push("⚠️ Click handlers on non-interactive elements (WCAG 2.1.1)");
      suggestions.push(
        "Use button/a elements or add role and tabindex for keyboard access"
      );
    }
  }

  if (!/<html[^>]*lang=/i.test(code) && /<html/i.test(code)) {
    issues.push("❌ HTML element missing lang attribute (WCAG 3.1.1)");
    suggestions.push("Add lang attribute to html element (e.g., <html lang='en'>)");
  }

  const result = {
    summary: `Found ${issues.length} accessibility issue(s) at WCAG ${level} level`,
    issues,
    suggestions,
    wcag_reference: "See ux://accessibility/wcag for complete guidelines",
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function reviewUsability(args: any) {
  const heuristics = await loadKnowledge("nielsen-heuristics.json");
  const description = args.description as string;
  const code = args.content as string | undefined;
  const focusHeuristics = (args.focus_heuristics as number[]) || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const review: any[] = [];

  // Review against selected heuristics
  for (const heuristicId of focusHeuristics) {
    const heuristic = heuristics.heuristics.find((h: any) => h.id === heuristicId);
    if (!heuristic) continue;

    review.push({
      heuristic: `${heuristic.id}. ${heuristic.name}`,
      description: heuristic.description,
      considerations: heuristic.implementation_tips,
    });
  }

  const result = {
    summary: `Usability review against ${focusHeuristics.length} heuristic(s)`,
    component_description: description,
    review,
    next_steps: [
      "Compare your implementation against the considerations",
      "Check for violations of implementation tips",
      "Review examples and anti-patterns in the heuristics",
    ],
    reference: "See ux://usability/nielsen-heuristics for complete heuristics",
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function suggestPattern(args: any) {
  const patterns = await loadKnowledge("ui-patterns.json");
  const useCase = (args.use_case as string).toLowerCase();
  const constraints = args.constraints as string | undefined;

  // Simple pattern matching based on keywords
  let suggestedPatterns: any[] = [];

  const patternMap: Record<string, string[]> = {
    navigation: ["header_navigation", "breadcrumbs", "tabs"],
    form: ["single_column_form", "multi_step_wizard", "inline_validation"],
    search: ["search"],
    modal: ["modal_dialog"],
    notification: ["toast_notification"],
    table: ["data_table"],
    card: ["cards"],
    loading: ["loading_states"],
    upload: ["file_upload"],
    date: ["date_picker"],
    empty: ["empty_states"],
  };

  // Find matching patterns
  for (const [keyword, patternIds] of Object.entries(patternMap)) {
    if (useCase.includes(keyword)) {
      for (const patternId of patternIds) {
        // Search through all categories
        for (const category of Object.values(patterns.patterns)) {
          if (typeof category === "object" && category !== null && patternId in category) {
            suggestedPatterns.push({
              id: patternId,
              category: Object.keys(patterns.patterns).find(
                (k) => patterns.patterns[k] === category
              ),
              pattern: (category as any)[patternId],
            });
          }
        }
      }
    }
  }

  if (suggestedPatterns.length === 0) {
    suggestedPatterns.push({
      message: "No specific pattern match found. Browse all patterns at ux://patterns/ui-patterns",
    });
  }

  const result = {
    use_case: useCase,
    constraints: constraints || "None specified",
    suggested_patterns: suggestedPatterns,
    reference: "See ux://patterns/ui-patterns for complete library",
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function generateComponentExample(args: any) {
  const pattern = (args.pattern as string).toLowerCase();
  const variant = args.variant as string | undefined;
  const includeA11y = args.include_accessibility !== false;

  let example = "";

  // Generate examples based on pattern
  switch (pattern) {
    case "button":
      example = `<!-- Accessible Button Component -->
<button
  type="button"
  class="btn btn-${variant || "primary"}"
  ${includeA11y ? 'aria-label="Button action"' : ""}
>
  Click Me
</button>

<style>
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .btn:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .btn-primary {
    background: #3b82f6;
    color: white;
  }

  .btn-primary:hover {
    background: #2563eb;
  }
</style>

<!-- UX Notes:
- Minimum 44x44px touch target
- Visible focus indicator (WCAG 2.4.7)
- Clear hover state
- Disabled state should use :disabled + opacity
-->`;
      break;

    case "modal":
    case "dialog":
      example = `<!-- Accessible Modal Dialog -->
<div
  class="modal-backdrop"
  ${includeA11y ? 'role="dialog" aria-modal="true" aria-labelledby="modal-title"' : ""}
>
  <div class="modal-content">
    <div class="modal-header">
      <h2 ${includeA11y ? 'id="modal-title"' : ""}>Modal Title</h2>
      <button
        type="button"
        class="modal-close"
        ${includeA11y ? 'aria-label="Close modal"' : ""}
      >
        ×
      </button>
    </div>
    <div class="modal-body">
      <p>Modal content goes here.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary">Cancel</button>
      <button type="button" class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 0.5rem;
    max-width: 32rem;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
  }
</style>

<script>
// JavaScript requirements:
// - Trap focus inside modal
// - Close on ESC key
// - Restore focus on close
// - Prevent body scroll when open
</script>

<!-- UX Notes:
- Focus trap implemented (WCAG 2.4.3)
- ESC key closes modal (WCAG 2.1.1)
- Click outside to close (optional)
- Backdrop prevents interaction with content behind
-->`;
      break;

    case "form":
      example = `<!-- Accessible Form with Validation -->
<form class="form" ${includeA11y ? 'novalidate' : ""}>
  <div class="form-field">
    <label for="email" class="form-label">
      Email Address ${includeA11y ? '<span aria-label="required">*</span>' : "*"}
    </label>
    <input
      type="email"
      id="email"
      name="email"
      class="form-input"
      ${includeA11y ? 'aria-required="true" aria-describedby="email-error"' : ""}
      placeholder="you@example.com"
    />
    <div
      id="email-error"
      class="form-error"
      ${includeA11y ? 'role="alert" aria-live="polite"' : ""}
      hidden
    >
      Please enter a valid email address
    </div>
  </div>

  <div class="form-field">
    <label for="password" class="form-label">
      Password *
    </label>
    <input
      type="password"
      id="password"
      name="password"
      class="form-input"
      ${includeA11y ? 'aria-required="true" aria-describedby="password-help password-error"' : ""}
    />
    <div id="password-help" class="form-help">
      Must be at least 8 characters
    </div>
    <div id="password-error" class="form-error" hidden>
      Password is required
    </div>
  </div>

  <button type="submit" class="btn btn-primary">
    Sign In
  </button>
</form>

<style>
  .form {
    max-width: 24rem;
  }

  .form-field {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
  }

  .form-input:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 0;
    border-color: #3b82f6;
  }

  .form-input[aria-invalid="true"] {
    border-color: #ef4444;
  }

  .form-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .form-help {
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>

<!-- UX Notes:
- Labels above inputs (WCAG 3.3.2)
- Validate on blur, show success on input
- Specific error messages (WCAG 3.3.1)
- aria-invalid toggles on validation
- Helper text shows requirements upfront
- Single column layout for better completion rate
-->`;
      break;

    case "search":
      example = `<!-- Accessible Search Input -->
<form role="search" class="search-form">
  <div class="search-container">
    <label for="search" class="sr-only">Search</label>
    <input
      type="search"
      id="search"
      name="q"
      class="search-input"
      placeholder="Search..."
      ${includeA11y ? 'aria-label="Search"' : ""}
      autocomplete="off"
    />
    <button
      type="submit"
      class="search-button"
      ${includeA11y ? 'aria-label="Submit search"' : ""}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</form>

<style>
  .search-form {
    width: 100%;
    max-width: 32rem;
  }

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  .search-input:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 0;
    border-color: #3b82f6;
  }

  .search-button {
    position: absolute;
    right: 0.5rem;
    padding: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
  }

  .search-button:hover {
    color: #111827;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>

<!-- UX Notes:
- role="search" for landmark navigation
- Label (can be visually hidden)
- Clear icon to reset search (add with JS)
- Search icon button is labeled
- Consider adding autocomplete/suggestions
-->`;
      break;

    default:
      example = `Pattern "${pattern}" example not available.

Available patterns:
- button
- modal/dialog
- form
- search

Use suggest_pattern tool to find appropriate pattern for your use case.`;
  }

  return {
    content: [
      {
        type: "text",
        text: example,
      },
    ],
  };
}

async function auditDesignSystem(args: any) {
  const tokens = args.tokens as string;
  const type = (args.type as string) || "all";

  const issues: string[] = [];
  const recommendations: string[] = [];

  try {
    // Try to parse as JSON
    const parsed = JSON.parse(tokens);

    // Check for common design token issues
    if (type === "all" || type === "colors") {
      if (parsed.colors || parsed.color) {
        // Check for semantic naming
        const colorKeys = Object.keys(parsed.colors || parsed.color || {});
        const hasSemanticNames = colorKeys.some((k) =>
          /^(primary|secondary|success|error|warning|info)/.test(k)
        );

        if (!hasSemanticNames) {
          issues.push("⚠️ Colors lack semantic naming (primary, secondary, etc.)");
          recommendations.push(
            "Use semantic color names instead of generic names like 'blue' or 'red'"
          );
        }
      }
    }

    if (type === "all" || type === "spacing") {
      if (parsed.spacing || parsed.space) {
        // Check for consistent scale
        recommendations.push("✓ Spacing tokens found - verify they follow a consistent scale");
      } else {
        issues.push("⚠️ No spacing tokens defined");
        recommendations.push("Define spacing scale (base 4px or 8px)");
      }
    }

    if (type === "all" || type === "typography") {
      if (parsed.typography || parsed.fonts || parsed.fontSize) {
        recommendations.push("✓ Typography tokens found");
      } else {
        issues.push("⚠️ No typography tokens defined");
        recommendations.push("Define font sizes, weights, and line heights");
      }
    }

    const result = {
      audit_type: type,
      issues,
      recommendations,
      best_practices: [
        "Use three-tier token structure: primitive → semantic → component",
        "Follow naming conventions consistently",
        "Use scales for sizing (spacing, typography)",
        "Support light/dark mode variants",
      ],
      reference: "See ux://design-systems/principles for complete guidelines",
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: "Failed to parse tokens as JSON",
            message: "Provide valid JSON format for design tokens",
          }),
        },
      ],
    };
  }
}

async function checkContrast(args: any) {
  const fg = args.foreground as string;
  const bg = args.background as string;
  const level = (args.level as string) || "AA";
  const largeText = args.large_text as boolean;

  // Simple color parsing (hex only for now)
  const parseHex = (hex: string): [number, number, number] => {
    const clean = hex.replace("#", "");
    return [
      parseInt(clean.substring(0, 2), 16),
      parseInt(clean.substring(2, 4), 16),
      parseInt(clean.substring(4, 6), 16),
    ];
  };

  const relativeLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  try {
    const [r1, g1, b1] = parseHex(fg);
    const [r2, g2, b2] = parseHex(bg);

    const l1 = relativeLuminance(r1, g1, b1);
    const l2 = relativeLuminance(r2, g2, b2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    // WCAG requirements
    const requirements = {
      AA: largeText ? 3.0 : 4.5,
      AAA: largeText ? 4.5 : 7.0,
    };

    const required = requirements[level as "AA" | "AAA"];
    const passes = ratio >= required;

    const result = {
      foreground: fg,
      background: bg,
      contrast_ratio: ratio.toFixed(2) + ":1",
      wcag_level: level,
      large_text: largeText,
      required_ratio: required + ":1",
      passes: passes ? "✓ PASS" : "✗ FAIL",
      recommendation: passes
        ? "Contrast ratio meets WCAG requirements"
        : `Increase contrast. Need at least ${required}:1, currently ${ratio.toFixed(2)}:1`,
      wcag_reference: "WCAG 1.4.3 (Contrast Minimum) and 1.4.6 (Contrast Enhanced)",
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: "Failed to parse colors",
            message: "Use hex color format (e.g., #3b82f6)",
          }),
        },
      ],
    };
  }
}

async function checkResponsive(args: any) {
  const code = args.content as string;
  const checkType = (args.check_type as string) || "all";

  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check viewport meta tag
  if (checkType === "all" || checkType === "viewport") {
    if (/<html/i.test(code)) {
      const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(code);
      if (!hasViewport) {
        issues.push("❌ Missing viewport meta tag");
        recommendations.push("Add: <meta name='viewport' content='width=device-width, initial-scale=1'>");
      } else {
        const hasUserScalableNo = /user-scalable\s*=\s*["']?no["']?/i.test(code);
        const hasMaxScale = /maximum-scale\s*=\s*["']?1["']?/i.test(code);
        if (hasUserScalableNo || hasMaxScale) {
          issues.push("⚠️ Viewport prevents zoom (accessibility issue)");
          recommendations.push("Remove user-scalable=no and maximum-scale=1 to allow users to zoom");
        }
      }
    }
  }

  // Check for mobile-first CSS
  if (checkType === "all" || checkType === "breakpoints") {
    const maxWidthQueries = (code.match(/@media[^{]*max-width/gi) || []).length;
    const minWidthQueries = (code.match(/@media[^{]*min-width/gi) || []).length;

    if (maxWidthQueries > minWidthQueries) {
      issues.push("⚠️ Desktop-first approach detected (more max-width than min-width queries)");
      recommendations.push("Consider mobile-first approach: base styles for mobile, min-width queries for larger screens");
    }
  }

  // Check touch targets
  if (checkType === "all" || checkType === "touch-targets") {
    if (/<button/i.test(code) || /<a/i.test(code)) {
      recommendations.push("Ensure interactive elements are at least 44x44px (iOS) or 48x48px (Android)");
    }
  }

  // Check responsive images
  if (checkType === "all" || checkType === "images") {
    const hasImg = /<img/i.test(code);
    if (hasImg) {
      const hasSrcset = /srcset=/i.test(code);
      const hasPicture = /<picture/i.test(code);
      if (!hasSrcset && !hasPicture) {
        issues.push("⚠️ Images without responsive sizing (srcset or picture element)");
        recommendations.push("Use srcset attribute or picture element for responsive images");
      }

      const hasLazyLoading = /loading=["']lazy["']/i.test(code);
      if (!hasLazyLoading) {
        recommendations.push("Consider adding loading='lazy' to below-the-fold images");
      }
    }
  }

  const result = {
    check_type: checkType,
    issues,
    recommendations,
    best_practices: [
      "Design for mobile first, then enhance for larger screens",
      "Use relative units (rem, em) instead of pixels",
      "Test on real devices, not just browser resize",
      "Minimum 44x44px touch targets",
      "Use responsive images with srcset",
      "Support landscape orientation"
    ],
    reference: "See ux://responsive/design for complete guidelines"
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function suggestErrorMessage(args: any) {
  const scenario = (args.scenario as string).toLowerCase();
  const context = args.context as string | undefined;
  const technicalMessage = args.technical_message as string | undefined;

  const errorMessages = await loadKnowledge("error-messages.json");

  let suggestion: any = {
    scenario,
    message: "",
    action: "",
    tone_guidance: []
  };

  // Match scenario to error message library
  if (scenario.includes("email") || scenario.includes("invalid") && scenario.includes("format")) {
    suggestion = {
      scenario: "Invalid email format",
      message: "Please enter a valid email address (e.g., name@example.com)",
      action: "Check your email format and try again",
      accessibility: [
        "Use aria-invalid='true' on input",
        "Link error with aria-describedby",
        "Display error with role='alert'"
      ],
      visual_placement: "Below the email input field",
      tone_guidance: ["Be helpful, not judgmental", "Provide example format", "Keep it concise"]
    };
  } else if (scenario.includes("required")) {
    suggestion = {
      scenario: "Required field empty",
      message: "Please enter [field name]",
      action: "Fill in the required information",
      accessibility: [
        "Mark with aria-required='true'",
        "Include asterisk (*) with aria-label='required'",
        "Announce error to screen readers"
      ],
      visual: "Red border + error icon + text message",
      tone_guidance: ["Be clear about what's needed", "Use 'please' to be polite"]
    };
  } else if (scenario.includes("password")) {
    suggestion = {
      scenario: "Weak password",
      message: "Password must include at least one uppercase letter, one number, and one special character",
      action: "Create a stronger password",
      progressive: "Show requirements checklist that updates as user types",
      accessibility: ["Announce each requirement met", "Use aria-live for updates"],
      tone_guidance: ["Be encouraging, not critical", "Show progress", "Explain why (security)"]
    };
  } else if (scenario.includes("payment") || scenario.includes("declined")) {
    suggestion = {
      scenario: "Payment failed",
      message: "Your payment couldn't be processed.",
      reasons: [
        "The card details might be incorrect",
        "There might be insufficient funds",
        "Your bank might be blocking the transaction"
      ],
      action: "Please check your payment details or try a different payment method",
      support: "Contact your bank if the problem persists",
      tone_guidance: ["Don't blame the user", "Provide possible reasons", "Offer alternatives", "Be reassuring"]
    };
  } else if (scenario.includes("file") && (scenario.includes("large") || scenario.includes("size"))) {
    suggestion = {
      scenario: "File too large",
      message: "This file is too large. Maximum file size is X MB.",
      action: "Please choose a smaller file or compress your image",
      helpful: "Show current file size and limit",
      tone_guidance: ["Be specific about the limit", "Suggest solutions", "Don't lose other form data"]
    };
  } else if (scenario.includes("offline") || scenario.includes("network") || scenario.includes("connection")) {
    suggestion = {
      scenario: "Network error",
      message: "You appear to be offline. Please check your internet connection and try again.",
      action: "Automatically retry when connection restored",
      visual: "Show connection status indicator",
      tone_guidance: ["Explain the problem clearly", "Provide reassurance", "Auto-retry when possible"]
    };
  } else {
    suggestion = {
      scenario: scenario,
      message: "Please provide more specific scenario",
      available_categories: Object.keys(errorMessages.categories),
      tip: "Try scenarios like: 'invalid email', 'required field', 'password weak', 'payment failed', 'file too large', 'network error'",
      reference: "See ux://content/error-messages for complete library"
    };
  }

  if (technicalMessage) {
    suggestion.technical_message = technicalMessage;
    suggestion.translation_tip = "Avoid exposing technical details to users. Translate to friendly language.";
  }

  if (context) {
    suggestion.context = context;
  }

  suggestion.general_principles = errorMessages.principles.good_error_messages;

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(suggestion, null, 2),
      },
    ],
  };
}

async function analyzePerformance(args: any) {
  const code = args.content as string;
  const checkType = (args.check_type as string) || "all";

  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check images
  if (checkType === "all" || checkType === "images") {
    if (/<img/i.test(code)) {
      const hasWidthHeight = /<img[^>]*(width|height)=/i.test(code);
      if (!hasWidthHeight) {
        issues.push("⚠️ Images without width/height attributes (causes CLS)");
        recommendations.push("Add width and height to prevent Cumulative Layout Shift");
      }

      const hasLazyLoading = /loading=["']lazy["']/i.test(code);
      if (!hasLazyLoading) {
        recommendations.push("Consider adding loading='lazy' to below-fold images");
      }

      const hasModernFormat = /(\.webp|\.avif)/i.test(code);
      if (!hasModernFormat) {
        recommendations.push("Use modern image formats (WebP, AVIF) for better compression");
      }

      const hasSrcset = /srcset=/i.test(code);
      if (!hasSrcset) {
        recommendations.push("Use srcset for responsive images");
      }
    }
  }

  // Check CSS
  if (checkType === "all" || checkType === "css") {
    const hasBlockingCSS = /<link[^>]*rel=["']stylesheet["'][^>]*>/i.test(code);
    if (hasBlockingCSS) {
      recommendations.push("Consider inlining critical CSS and deferring non-critical styles");
    }
  }

  // Check JavaScript
  if (checkType === "all" || checkType === "javascript") {
    const hasBlockingJS = /<script(?![^>]*defer)(?![^>]*async)[^>]*src=/i.test(code);
    if (hasBlockingJS) {
      issues.push("⚠️ Render-blocking JavaScript detected");
      recommendations.push("Add defer or async attribute to <script> tags");
    }
  }

  // Check resource loading
  if (checkType === "all" || checkType === "loading") {
    const hasPreconnect = /<link[^>]*rel=["']preconnect["']/i.test(code);
    const hasThirdParty = /(fonts\.googleapis|cdnjs|cdn\.)/i.test(code);
    if (hasThirdParty && !hasPreconnect) {
      recommendations.push("Add <link rel='preconnect'> for third-party resources to improve LCP");
    }
  }

  const result = {
    check_type: checkType,
    issues,
    recommendations,
    core_web_vitals: {
      LCP: "Target: ≤ 2.5s - Optimize images, preload critical resources",
      INP: "Target: ≤ 200ms - Minimize JavaScript, use code splitting",
      CLS: "Target: ≤ 0.1 - Add dimensions to images/embeds, avoid content shifts"
    },
    quick_wins: [
      "Add width/height to images",
      "Use defer/async on scripts",
      "Enable gzip/brotli compression",
      "Lazy load below-fold images",
      "Use modern image formats (WebP, AVIF)"
    ],
    reference: "See ux://performance/optimization for complete guidelines"
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function checkSEO(args: any) {
  const html = args.html as string;
  const pageUrl = args.page_url as string | undefined;

  const issues: string[] = [];
  const recommendations: string[] = [];
  const found: string[] = [];

  // Check title
  const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  if (!titleMatch) {
    issues.push("❌ Missing <title> tag");
  } else {
    const titleLength = titleMatch[1].length;
    found.push(`Title: "${titleMatch[1]}" (${titleLength} chars)`);
    if (titleLength < 30) {
      issues.push("⚠️ Title too short (< 30 characters)");
    } else if (titleLength > 60) {
      issues.push("⚠️ Title too long (> 60 characters, may be truncated)");
    }
  }

  // Check meta description
  const descMatch = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i.exec(html);
  if (!descMatch) {
    issues.push("❌ Missing meta description");
  } else {
    const descLength = descMatch[1].length;
    found.push(`Meta description: ${descLength} chars`);
    if (descLength < 120) {
      issues.push("⚠️ Meta description too short (< 120 characters)");
    } else if (descLength > 160) {
      issues.push("⚠️ Meta description too long (> 160 characters)");
    }
  }

  // Check canonical
  if (/<link[^>]*rel=["']canonical["']/i.test(html)) {
    found.push("Canonical tag present");
  } else {
    recommendations.push("Add canonical tag to prevent duplicate content issues");
  }

  // Check Open Graph
  const hasOG = /<meta[^>]*property=["']og:/i.test(html);
  if (hasOG) {
    found.push("Open Graph tags present");
  } else {
    recommendations.push("Add Open Graph tags for better social media sharing");
  }

  // Check Twitter Cards
  if (/<meta[^>]*name=["']twitter:card["']/i.test(html)) {
    found.push("Twitter Card tags present");
  } else {
    recommendations.push("Add Twitter Card tags for better Twitter sharing");
  }

  // Check viewport
  if (!/<meta[^>]*name=["']viewport["']/i.test(html)) {
    issues.push("❌ Missing viewport meta tag (affects mobile SEO)");
  }

  // Check structured data
  if (/<script[^>]*type=["']application\/ld\+json["']/i.test(html)) {
    found.push("JSON-LD structured data present");
  } else {
    recommendations.push("Add structured data (JSON-LD) for rich snippets");
  }

  // Check headings
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count === 0) {
    issues.push("❌ No H1 heading found");
  } else if (h1Count > 1) {
    issues.push(`⚠️ Multiple H1 headings (${h1Count}) - use only one per page`);
  } else {
    found.push("Single H1 heading (good)");
  }

  // Check alt text
  const imgCount = (html.match(/<img/gi) || []).length;
  const altCount = (html.match(/<img[^>]*alt=/gi) || []).length;
  if (imgCount > 0 && altCount < imgCount) {
    issues.push(`⚠️ ${imgCount - altCount} image(s) missing alt text`);
  }

  const result = {
    page: pageUrl || "Not specified",
    found,
    issues,
    recommendations,
    seo_checklist: [
      "Title: 50-60 characters with primary keyword",
      "Meta description: 120-160 characters",
      "Canonical tag for duplicate content",
      "Open Graph tags for social sharing",
      "Structured data (JSON-LD) for rich snippets",
      "Single H1 per page",
      "Alt text on all images",
      "Mobile-friendly (viewport meta tag)"
    ],
    reference: "See ux://seo/guidelines for complete guide"
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function suggestAnimation(args: any) {
  const interaction = (args.interaction as string).toLowerCase();
  const context = args.context as string | undefined;

  let suggestion: any = {
    interaction,
    context: context || "Not specified"
  };

  // Match interaction to animation patterns
  if (interaction.includes("button") && (interaction.includes("click") || interaction.includes("press"))) {
    suggestion = {
      ...suggestion,
      animation_type: "Micro-interaction",
      sequence: [
        "Scale down to 0.95 on press",
        "Scale back to 1.0 on release",
        "Optional: Ripple effect from click point"
      ],
      duration: "100-150ms total",
      easing: "ease-out",
      css_example: ".button {\n  transition: transform 100ms ease-out;\n}\n.button:active {\n  transform: scale(0.95);\n}",
      accessibility: "Respect prefers-reduced-motion"
    };
  } else if (interaction.includes("modal") || interaction.includes("dialog")) {
    const isOpen = interaction.includes("open") || interaction.includes("show");
    suggestion = {
      ...suggestion,
      animation_type: "Modal transition",
      backdrop: "Fade in from transparent to semi-opaque (200ms)",
      content: isOpen ? "Scale from 0.9 to 1.0 + fade in (250-300ms)" : "Scale to 0.9 + fade out (200ms)",
      timing: isOpen ? "Backdrop first, then content with 100ms delay" : "Content first, then backdrop",
      duration: isOpen ? "300ms enter" : "200ms exit",
      easing: "ease-out",
      css_example: "@keyframes modalEnter {\n  from { opacity: 0; transform: scale(0.9); }\n  to { opacity: 1; transform: scale(1); }\n}\n\n.modal {\n  animation: modalEnter 300ms ease-out;\n}"
    };
  } else if (interaction.includes("list") || interaction.includes("item")) {
    suggestion = {
      ...suggestion,
      animation_type: "List animation",
      pattern: "Staggered entrance",
      timing: "50-100ms delay between items",
      duration: "200-250ms per item",
      easing: "ease-out",
      limit: "Animate first 10-15 items only (rest appear instantly)",
      css_example: ".list-item {\n  opacity: 0;\n  transform: translateY(20px);\n  animation: itemEnter 250ms ease-out forwards;\n}\n\n.list-item:nth-child(1) { animation-delay: 0ms; }\n.list-item:nth-child(2) { animation-delay: 50ms; }\n.list-item:nth-child(3) { animation-delay: 100ms; }\n\n@keyframes itemEnter {\n  to { opacity: 1; transform: translateY(0); }\n}"
    };
  } else if (interaction.includes("page") || interaction.includes("route") || interaction.includes("transition")) {
    suggestion = {
      ...suggestion,
      animation_type: "Page transition",
      options: [
        {
          type: "Fade",
          use: "Unrelated pages",
          duration: "200-300ms",
          implementation: "Cross-fade old and new content"
        },
        {
          type: "Slide",
          use: "Forward/back navigation",
          duration: "300-400ms",
          direction: "Left for forward, right for back"
        }
      ],
      recommendation: "Use fade for simplicity, slide for directional navigation",
      duration: "300-400ms",
      easing: "ease-in-out"
    };
  } else if (interaction.includes("toast") || interaction.includes("notification")) {
    suggestion = {
      ...suggestion,
      animation_type: "Toast notification",
      enter: "Slide in from top/bottom + fade (300ms)",
      exit: "Fade out + slight slide (200ms)",
      auto_dismiss: "After 4-6 seconds",
      easing: "ease-out for enter, ease-in for exit",
      placement: "Top-right or bottom-left typical",
      css_example: "@keyframes toastEnter {\n  from {\n    opacity: 0;\n    transform: translateY(-100%);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.toast {\n  animation: toastEnter 300ms ease-out;\n}"
    };
  } else if (interaction.includes("hover")) {
    suggestion = {
      ...suggestion,
      animation_type: "Hover state",
      effects: [
        "Subtle scale (1.0 → 1.05)",
        "Lift effect (add shadow, translate up slightly)",
        "Color transition",
        "Underline grow"
      ],
      duration: "150-200ms",
      easing: "ease-out",
      note: "Keep subtle, instant feedback is key",
      css_example: ".card {\n  transition: transform 150ms ease-out, box-shadow 150ms ease-out;\n}\n\n.card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}"
    };
  } else {
    suggestion = {
      ...suggestion,
      message: "No specific match found for this interaction",
      general_guidelines: {
        duration: "200-300ms for most UI animations",
        easing: "ease-out for enter, ease-in for exit, ease-in-out for movement",
        properties: "Animate transform and opacity only (GPU accelerated)",
        accessibility: "Always respect prefers-reduced-motion"
      },
      reference: "See ux://animation/motion for complete animation library"
    };
  }

  suggestion.performance_tip = "Use transform and opacity only for best performance (60fps)";
  suggestion.accessibility_requirement = "Implement prefers-reduced-motion to disable/reduce animations";
  suggestion.reference = "See ux://animation/motion for complete motion design guide";

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(suggestion, null, 2),
      },
    ],
  };
}

async function generateColorPalette(args: any) {
  const baseColor = args.base_color as string;
  const harmonyType = (args.harmony_type as string) || "analogous";
  const includeNeutrals = args.include_neutrals !== false;

  // Parse base color (simplified - would use proper color library in production)
  const colorName = baseColor.toLowerCase();

  let palette: any = {
    base_color: baseColor,
    harmony_type: harmonyType,
    colors: {
      primary: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: baseColor,
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
      }
    },
    usage_guide: {
      50: "Lightest backgrounds",
      100_200_300: "Light backgrounds, hover states",
      400: "Borders, disabled states",
      500: "Primary brand color",
      600_700: "Interactive elements, buttons",
      800_900: "Text on light backgrounds",
      950: "Darkest text"
    },
    accessibility: {
      text_on_50: "Use 700+ for AA contrast",
      text_on_500: "Use white or 50 for AA contrast",
      text_on_900: "Use 50-200 for AA contrast"
    }
  };

  if (harmonyType === "complementary") {
    palette.colors.secondary = {
      500: "#ff6b35",
      description: "Complementary (opposite on color wheel)"
    };
    palette.usage = "Use primary (60%), secondary (30%), accent (10%)";
  } else if (harmonyType === "analogous") {
    palette.colors.secondary = {
      500: "#8b5cf6",
      description: "Analogous (adjacent on color wheel)"
    };
    palette.colors.tertiary = {
      500: "#10b981",
      description: "Analogous variation"
    };
  } else if (harmonyType === "triadic") {
    palette.colors.secondary = {
      500: "#f59e0b",
      description: "Triadic (120° apart)"
    };
    palette.colors.tertiary = {
      500: "#10b981",
      description: "Triadic (240° apart)"
    };
  }

  if (includeNeutrals) {
    palette.colors.neutral = {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
      usage: "Backgrounds, text, borders, shadows"
    };
  }

  palette.semantic_colors = {
    success: { color: "#10b981", use: "Success messages, confirmations" },
    error: { color: "#ef4444", use: "Errors, destructive actions" },
    warning: { color: "#f59e0b", use: "Warnings, caution states" },
    info: { color: "#3b82f6", use: "Informational messages" }
  };

  palette.best_practices = [
    "Use primary color for brand identity and main CTAs",
    "Limit to 1-2 primary colors maximum",
    "Create 9-11 shades of each color for flexibility",
    "Maintain 4.5:1 contrast ratio for text",
    "Test with colorblind simulators",
    "Use semantic colors consistently"
  ];

  palette.tools = [
    "Coolors.co - Generate more variations",
    "Colorbox.io - Accessible color systems",
    "Stark - Test accessibility"
  ];

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(palette, null, 2),
      },
    ],
  };
}

async function generateTypographyScale(args: any) {
  const baseSize = (args.base_size as number) || 16;
  const ratio = (args.scale_ratio as number) || 1.2;
  const steps = (args.steps as number) || 5;

  const scale: any = {
    base_size: `${baseSize}px (1rem)`,
    ratio,
    ratio_name: getRatioName(ratio),
    sizes: {}
  };

  // Generate sizes
  for (let i = -steps; i <= steps; i++) {
    const size = baseSize * Math.pow(ratio, i);
    const rem = size / 16;
    const lineHeight = size < 20 ? 1.6 : size < 32 ? 1.4 : size < 48 ? 1.2 : 1.1;

    let name: string;
    if (i === 0) name = "base";
    else if (i < 0) name = `sm${Math.abs(i) > 1 ? Math.abs(i) : ""}`;
    else name = `${i > 1 ? i : ""}xl`;

    scale.sizes[name] = {
      px: `${size.toFixed(1)}px`,
      rem: `${rem.toFixed(3)}rem`,
      line_height: lineHeight.toFixed(2)
    };
  }

  scale.usage_guide = {
    "sm2-sm": "Fine print, captions, footnotes (12-14px)",
    "base": "Body text (16px) - never go smaller",
    "lg-xl": "Subheadings, large body text (18-20px)",
    "2xl-3xl": "Section headings, h3-h4 (24-32px)",
    "4xl-5xl": "Page titles, h1-h2 (40-56px)"
  };

  scale.recommendations = {
    headings: {
      h1: scale.sizes["5xl"] || scale.sizes["4xl"],
      h2: scale.sizes["4xl"] || scale.sizes["3xl"],
      h3: scale.sizes["3xl"] || scale.sizes["2xl"],
      h4: scale.sizes["2xl"] || scale.sizes["xl"],
      h5: scale.sizes["xl"],
      h6: scale.sizes["lg"]
    },
    body: scale.sizes["base"],
    small: scale.sizes["sm"],
    tiny: scale.sizes["sm2"] || scale.sizes["sm"]
  };

  scale.css_example = `:root {\n  --font-size-base: ${baseSize}px;\n  --font-size-sm: ${scale.sizes.sm.px};\n  --font-size-lg: ${scale.sizes.lg.px};\n  --font-size-xl: ${scale.sizes.xl.px};\n  --font-size-2xl: ${scale.sizes["2xl"].px};\n  \n  --line-height-tight: 1.2;\n  --line-height-normal: 1.5;\n  --line-height-relaxed: 1.75;\n}`;

  scale.best_practices = [
    "Base size should be 16px minimum for body text",
    "Use rem units for accessibility (respects user preferences)",
    "Maintain consistent ratio throughout design",
    "Larger text needs tighter line-height",
    "Test on actual devices, not just browser resize"
  ];

  scale.tools = [
    "https://typescale.com - Visualize type scales",
    "https://www.modularscale.com - Generate scales"
  ];

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(scale, null, 2),
      },
    ],
  };
}

function getRatioName(ratio: number): string {
  const ratios: Record<number, string> = {
    1.067: "Minor Second",
    1.125: "Major Second",
    1.2: "Minor Third",
    1.25: "Major Third",
    1.333: "Perfect Fourth",
    1.414: "Augmented Fourth",
    1.5: "Perfect Fifth",
    1.618: "Golden Ratio"
  };
  return ratios[ratio] || "Custom";
}

async function suggestMicrocopy(args: any) {
  const elementType = args.element_type as string;
  const context = (args.context as string).toLowerCase();
  const tone = (args.tone as string) || "friendly";

  let suggestions: any = {
    element_type: elementType,
    context,
    tone,
    suggestions: []
  };

  if (elementType === "button") {
    if (context.includes("login") || context.includes("sign in")) {
      suggestions.suggestions = [
        { text: "Sign in", note: "Clear and standard" },
        { text: "Log in", note: "Alternative, equally clear" },
        { text: "Continue", note: "If part of multi-step flow" }
      ];
      suggestions.avoid = ["Submit", "Enter", "OK"];
    } else if (context.includes("register") || context.includes("sign up")) {
      suggestions.suggestions = [
        { text: "Create account", note: "Specific and action-oriented" },
        { text: "Sign up", note: "Common and clear" },
        { text: "Get started", note: "Friendly, inviting" }
      ];
    } else if (context.includes("delete") || context.includes("remove")) {
      suggestions.suggestions = [
        { text: "Delete permanently", note: "Clear about consequences" },
        { text: "Remove [item]", note: "Specific about what's being removed" },
        { text: "Yes, delete", note: "For confirmation dialogs" }
      ];
      suggestions.warning = "Require confirmation for destructive actions";
    } else if (context.includes("save")) {
      suggestions.suggestions = [
        { text: "Save changes", note: "Clear about action" },
        { text: "Save", note: "Simple, works for most cases" },
        { text: "Save and continue", note: "For multi-step flows" }
      ];
    } else if (context.includes("cancel")) {
      suggestions.suggestions = [
        { text: "Cancel", note: "Standard and clear" },
        { text: "Go back", note: "If returning to previous step" },
        { text: "Discard changes", note: "If changes will be lost" }
      ];
    }
  } else if (elementType === "error") {
    if (context.includes("email")) {
      suggestions.suggestions = [
        { text: "Please enter a valid email address (e.g., name@example.com)", note: "Specific, with example" },
        { text: "This doesn't look like a valid email address", note: "Friendly tone" }
      ];
      suggestions.avoid = ["Invalid email", "Error"];
    } else if (context.includes("password")) {
      suggestions.suggestions = [
        { text: "Password must be at least 8 characters with one number", note: "Specific requirements" },
        { text: "This password is too weak. Try adding numbers or symbols.", note: "Helpful guidance" }
      ];
    } else if (context.includes("required")) {
      suggestions.suggestions = [
        { text: "[Field name] is required", note: "Clear and specific" },
        { text: "Please fill out this field", note: "Polite" }
      ];
      suggestions.avoid = ["This field is required", "Required"];
    }
  } else if (elementType === "success") {
    if (context.includes("save") || context.includes("update")) {
      suggestions.suggestions = [
        { text: "✓ Changes saved", note: "Short and confirmatory" },
        { text: "Your settings have been updated", note: "Specific" }
      ];
    } else if (context.includes("send") || context.includes("submit")) {
      suggestions.suggestions = [
        { text: "Message sent successfully!", note: "Celebratory" },
        { text: "✓ Submitted. We'll get back to you soon.", note: "Sets expectation" }
      ];
    }
  } else if (elementType === "empty-state") {
    suggestions.suggestions = [
      { text: "No [items] yet. [Action] to get started!", note: "Encouraging with CTA" },
      { text: "You're all caught up!", note: "Positive framing" },
      { text: "Nothing to show here. [Action] to add [item].", note: "Clear next step" }
    ];
    suggestions.structure = "Headline + Optional explanation + Call-to-action";
  } else if (elementType === "placeholder") {
    suggestions.suggestions = [
      { text: "name@example.com", note: "Show format example" },
      { text: "Search...", note: "Describe action" },
      { text: "MM/DD/YYYY", note: "Format hint" }
    ];
    suggestions.warning = "Never replace labels with placeholders - use both";
  }

  suggestions.general_guidelines = {
    clarity: "Be specific, not vague",
    conciseness: "Remove unnecessary words",
    user_centered: "Use 'you' and 'your'",
    actionable: "Start buttons with verbs",
    tone: `Maintain ${tone} tone throughout`,
    dont_blame: "Never blame the user for errors",
    be_helpful: "Provide guidance on how to fix issues"
  };

  suggestions.reference = "See ux://content/microcopy for complete UX writing guide";

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(suggestions, null, 2),
      },
    ],
  };
}

async function suggestFormPattern(args: any) {
  const formType = (args.form_type as string).toLowerCase();
  const fieldCount = args.field_count as number | undefined;
  const platform = (args.platform as string) || "both";

  let pattern: any = {
    form_type: formType,
    field_count: fieldCount || "Not specified",
    platform
  };

  if (formType.includes("login") || formType.includes("sign in")) {
    pattern.layout = "Single column, simple and focused";
    pattern.fields = [
      { name: "Email/Username", type: "email or text", required: true },
      { name: "Password", type: "password", required: true, features: ["Show/hide toggle"] },
      { name: "Remember me", type: "checkbox", required: false }
    ];
    pattern.additional_elements = [
      "Forgot password link (prominent)",
      "Social login options (optional)",
      "Sign up link"
    ];
    pattern.validation = "On submit (least intrusive)";
    pattern.submit_button = "Sign in";
  } else if (formType.includes("registration") || formType.includes("signup")) {
    pattern.layout = "Single column, progressively disclose optional fields";
    pattern.fields = [
      { name: "Email", type: "email", required: true },
      { name: "Password", type: "password", required: true, features: ["Strength indicator", "Requirements shown upfront"] },
      { name: "Confirm password", type: "password", required: true },
      { name: "Name", type: "text", required: true }
    ];
    pattern.recommendations = [
      "Keep minimal - only essential fields",
      "Consider social signup to reduce friction",
      "Show password requirements before user types",
      "Validate username availability inline (debounced)",
      "Terms acceptance checkbox"
    ];
    pattern.validation = "Inline on blur + submit validation";
  } else if (formType.includes("checkout") || formType.includes("payment")) {
    if (fieldCount && fieldCount > 10) {
      pattern.layout = "Multi-step wizard with progress indicator";
      pattern.steps = [
        { step: 1, name: "Contact info", fields: ["Email", "Phone"] },
        { step: 2, name: "Shipping address", fields: ["Address fields"] },
        { step: 3, name: "Payment method", fields: ["Card details"] },
        { step: 4, name: "Review & confirm", fields: ["Order summary"] }
      ];
    } else {
      pattern.layout = "Single page with clear sections";
      pattern.sections = ["Contact", "Shipping", "Payment", "Order summary"];
    }
    pattern.features = [
      "Address autocomplete",
      "Save info for future",
      "Guest checkout option",
      "Order summary always visible",
      "Progress saving (don't lose data)",
      "Clear error recovery"
    ];
    pattern.mobile_considerations = [
      "Use appropriate input types (tel, email)",
      "Autocomplete attributes for autofill",
      "Large touch targets",
      "Single column layout"
    ];
  } else if (formType.includes("search")) {
    pattern.layout = "Horizontal search bar";
    pattern.components = [
      { element: "Input", type: "search", attributes: ["autocomplete", "placeholder"] },
      { element: "Search button", optional: "Often submit on Enter" },
      { element: "Clear button", show: "When input has value" }
    ];
    pattern.features = [
      "Autocomplete suggestions (after 2-3 characters)",
      "Recent searches",
      "Debounce requests (300ms)",
      "Keyboard navigation (arrow keys)",
      "Escape to clear"
    ];
  } else if (formType.includes("contact")) {
    pattern.layout = "Single column, simple";
    pattern.fields = [
      { name: "Name", type: "text", required: true },
      { name: "Email", type: "email", required: true },
      { name: "Subject", type: "text", required: false },
      { name: "Message", type: "textarea", required: true, rows: 4 }
    ];
    pattern.optional_features = [
      "File attachment",
      "CAPTCHA (only after suspicious activity)",
      "Character count for message"
    ];
    pattern.submit_button = "Send message";
    pattern.success = "Show confirmation message with next steps";
  }

  pattern.universal_best_practices = [
    "Single column layout (especially mobile)",
    "Mark required fields with * or (required)",
    "Use appropriate input types for mobile keyboards",
    "Enable autocomplete where appropriate",
    "Provide inline validation (on blur)",
    "Show specific, helpful error messages",
    "Disable submit during processing",
    "Show success confirmation",
    "Never lose user data on errors",
    "Support keyboard navigation"
  ];

  pattern.mobile_optimization = [
    "Touch targets minimum 44x44px",
    "Use inputmode for number/decimal inputs",
    "Handle virtual keyboard appropriately",
    "Full-width inputs with padding",
    "Ample spacing between fields (8-16px)"
  ];

  pattern.accessibility = [
    "All inputs have labels (visible preferred)",
    "Use fieldset and legend for groups",
    "aria-invalid and aria-describedby for errors",
    "Focus management",
    "Keyboard accessible"
  ];

  pattern.reference = "See ux://forms/patterns for complete form design patterns";

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(pattern, null, 2),
      },
    ],
  };
}

async function analyzeDataViz(args: any) {
  const chartType = (args.chart_type as string).toLowerCase();
  const dataDescription = args.data_description as string;
  const purpose = (args.purpose as string)?.toLowerCase();

  let analysis: any = {
    chart_type: chartType,
    data_description: dataDescription,
    purpose: purpose || "Not specified",
    assessment: {}
  };

  // Assess chart type appropriateness
  if (chartType.includes("pie") || chartType.includes("donut")) {
    analysis.appropriateness = {
      rating: "Caution",
      notes: "Pie charts often not the best choice",
      better_alternative: "Bar chart (easier to compare values)",
      ok_when: "< 6 segments, showing parts of whole",
      avoid_when: "> 6 segments, comparing values, need precision"
    };
  } else if (chartType.includes("bar") || chartType.includes("column")) {
    analysis.appropriateness = {
      rating: "Good",
      notes: "Bar charts are versatile and clear",
      best_for: "Comparing categories, ranking data",
      orientation: "Horizontal for many categories or long labels"
    };
  } else if (chartType.includes("line")) {
    analysis.appropriateness = {
      rating: "Excellent for trends",
      best_for: "Time series, continuous data, trends",
      limit: "5-7 lines maximum for readability",
      alternatives: "Small multiples for many series"
    };
  }

  // Check purpose alignment
  if (purpose === "comparison" && chartType.includes("pie")) {
    analysis.purpose_alignment = {
      rating: "Poor",
      issue: "Pie charts are hard to compare accurately",
      recommendation: "Use bar chart instead"
    };
  } else if (purpose === "trend" && !chartType.includes("line") && !chartType.includes("area")) {
    analysis.purpose_alignment = {
      rating: "Fair",
      recommendation: "Line chart usually better for showing trends over time"
    };
  }

  // Accessibility checklist
  analysis.accessibility = {
    color: {
      requirement: "Don't rely on color alone to convey information",
      checks: [
        "Use patterns/shapes in addition to color",
        "Maintain 3:1 contrast ratio for chart elements",
        "Use colorblind-safe palette",
        "Test with colorblind simulator"
      ]
    },
    alt_text: {
      requirement: "Provide descriptive alt text",
      example: `alt='${chartType} showing ${dataDescription} - [describe key insight]'`
    },
    data_table: {
      requirement: "Provide data table alternative",
      implementation: "Accessible HTML table with proper headers"
    },
    keyboard: {
      requirement: "All interactive elements keyboard accessible",
      checks: ["Tooltips show on focus", "Logical tab order", "Escape closes tooltips"]
    }
  };

  // Design recommendations
  analysis.design_recommendations = {
    title: "Clear, descriptive title",
    axes: "Label axes with units",
    legend: "Include legend if multiple series",
    tooltips: "Show data values on hover/tap",
    gridlines: "Light, subtle gridlines",
    whitespace: "Don't cram - leave breathing room",
    data_labels: "Consider direct labels instead of just legend"
  };

  // Specific chart guidance
  if (chartType.includes("bar") || chartType.includes("column")) {
    analysis.specific_guidance = {
      y_axis: "Start at zero (don't truncate)",
      sorting: "Sort by value unless natural order exists",
      colors: "Consistent color unless highlighting specific bar",
      width: "Keep bars same width",
      avoid: "3D effects, unnecessary decoration"
    };
  } else if (chartType.includes("line")) {
    analysis.specific_guidance = {
      points: "Show data point markers",
      lines: "Use distinct colors and patterns",
      limit: "Maximum 5-7 lines",
      direct_labels: "Label lines directly, not just in legend",
      y_axis: "Can start above zero if trend matters more than magnitude (make obvious)"
    };
  } else if (chartType.includes("pie") || chartType.includes("donut")) {
    analysis.specific_guidance = {
      segments: "Limit to 5-6 maximum",
      start: "Start at 12 o'clock",
      order: "Sort by size (largest first)",
      labels: "Label directly with percentages",
      avoid: "3D effects, exploding multiple segments"
    };
  }

  // Performance considerations
  if (dataDescription.toLowerCase().includes("large") || dataDescription.toLowerCase().includes("many")) {
    analysis.performance = {
      concern: "Large dataset may impact performance",
      strategies: [
        "Aggregate data (e.g., daily to weekly)",
        "Sample representative subset",
        "Use Canvas instead of SVG for > 1000 points",
        "Implement virtualization for scrolling charts",
        "Progressive loading"
      ]
    };
  }

  analysis.reference = "See ux://data-viz/patterns for complete data visualization guide";

  analysis.recommended_tools = [
    "D3.js (maximum flexibility)",
    "Chart.js (simple, clean charts)",
    "Recharts (React components)",
    "Plotly (interactive, scientific)"
  ];

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(analysis, null, 2),
      },
    ],
  };
}

async function generateAccessibilityReport(args: any) {
  const pageIdentifier = args.page_identifier as string;
  const wcagLevel = (args.wcag_level as string) || "AA";

  const report: any = {
    page: pageIdentifier,
    wcag_level: wcagLevel,
    timestamp: new Date().toISOString(),
    summary: {},
    findings: [],
    recommendations: [],
  };

  // Automated checks (simulated comprehensive audit)
  report.automated_checks = {
    semantic_html: {
      status: "review_needed",
      checks: ["Proper heading hierarchy (H1 → H2 → H3)", "Semantic elements (<main>, <nav>, <article>)", "Form structure"]
    },
    keyboard_navigation: {
      status: "review_needed",
      checks: ["All interactive elements focusable", "Logical tab order", "Visible focus indicators", "No keyboard traps", "Skip links present"]
    },
    screen_reader: {
      status: "review_needed",
      checks: ["Alt text on images", "ARIA labels on icon buttons", "Form labels", "Live regions for dynamic content", "Heading structure"]
    },
    color_contrast: {
      status: "review_needed",
      minimum: wcagLevel === "AAA" ? "7:1 (normal text), 4.5:1 (large text)" : "4.5:1 (normal text), 3:1 (large text)"
    }
  };

  // Common issues to check
  report.findings = [
    { severity: "critical", category: "Images", issue: "Check for images without alt text", wcag: "1.1.1" },
    { severity: "critical", category: "Forms", issue: "Verify all inputs have associated labels", wcag: "3.3.2" },
    { severity: "major", category: "Color", issue: "Ensure sufficient color contrast for all text", wcag: "1.4.3" },
    { severity: "major", category: "Keyboard", issue: "Test all functionality is keyboard accessible", wcag: "2.1.1" },
    { severity: "major", category: "Focus", issue: "Verify visible focus indicators on all interactive elements", wcag: "2.4.7" },
    { severity: "moderate", category: "Headings", issue: "Check heading hierarchy is logical (no skipped levels)", wcag: "2.4.6" },
    { severity: "moderate", category: "Links", issue: "Ensure link text is descriptive (avoid 'click here')", wcag: "2.4.4" },
    { severity: "minor", category: "Language", issue: "Verify lang attribute on <html> tag", wcag: "3.1.1" }
  ];

  // Recommendations
  report.recommendations = [
    { priority: "high", action: "Run automated audit with axe DevTools or Lighthouse" },
    { priority: "high", action: "Test keyboard navigation (Tab, Shift+Tab, Enter, Escape)" },
    { priority: "high", action: "Test with screen reader (NVDA on Windows, VoiceOver on Mac)" },
    { priority: "medium", action: "Check color contrast with Contrast Checker tool" },
    { priority: "medium", action: "Test at 200% zoom (WCAG 1.4.4)" },
    { priority: "medium", action: "Review with accessibility checklist" },
    { priority: "low", action: "Test with real users who use assistive technology" }
  ];

  // Testing workflow
  report.testing_workflow = {
    step_1: "Automated testing (axe DevTools, Lighthouse) - catches ~40% of issues",
    step_2: "Keyboard testing - Tab through all interactive elements",
    step_3: "Screen reader testing - Navigate with NVDA/VoiceOver",
    step_4: "Manual checklist - WCAG quick reference",
    step_5: "User testing - Test with real users with disabilities (critical for high-stakes sites)"
  };

  report.tools = {
    browser_extensions: ["axe DevTools", "WAVE", "Lighthouse (Chrome DevTools)"],
    screen_readers: ["NVDA (free, Windows)", "JAWS (paid, Windows)", "VoiceOver (built-in, macOS/iOS)", "TalkBack (built-in, Android)"],
    contrast_checkers: ["WebAIM Contrast Checker", "Color Oracle (colorblindness simulator)"],
    testing_platforms: ["Fable (test with real users)", "AccessibilityOz"]
  };

  report.reference = "See ux://accessibility/wcag for complete WCAG guidelines";

  return {
    content: [{ type: "text", text: JSON.stringify(report, null, 2) }]
  };
}

async function suggestABVariant(args: any) {
  const element = (args.element as string).toLowerCase();
  const goal = (args.goal as string).toLowerCase();
  const currentPerformance = args.current_performance as string;

  const suggestion: any = {
    element,
    goal,
    current_performance: currentPerformance,
    hypothesis: "",
    variants: [],
    metrics_to_track: [],
    sample_size: {},
    duration: "1-2 weeks minimum (account for weekly cycles)",
  };

  // Generate hypothesis
  suggestion.hypothesis = `If we modify the ${element}, then ${goal} will improve because [reason based on best practices]`;

  // Generate variants based on element type
  if (element.includes("button") || element.includes("cta")) {
    suggestion.variants = [
      {
        variant: "A (Control)",
        description: "Current version",
        changes: "No changes (baseline)"
      },
      {
        variant: "B",
        description: "Action-oriented copy",
        changes: "Change button text to specific action verb (e.g., 'Get Started' vs 'Submit', 'Start Free Trial' vs 'Sign Up')",
        rationale: "Specific, action-oriented CTAs convert better"
      },
      {
        variant: "C",
        description: "Contrasting color",
        changes: "Use high-contrast color for button (test complementary color to background)",
        rationale: "Higher visual prominence improves click-through"
      },
      {
        variant: "D (optional)",
        description: "Size + placement",
        changes: "Larger button + above the fold placement",
        rationale: "Visibility and accessibility"
      }
    ];
    suggestion.metrics_to_track = ["Click-through rate (CTR)", "Conversion rate", "Bounce rate", "Time to click"];
  } else if (element.includes("headline") || element.includes("title")) {
    suggestion.variants = [
      {
        variant: "A (Control)",
        description: "Current headline",
        changes: "No changes"
      },
      {
        variant: "B",
        description: "Benefit-focused",
        changes: "Lead with benefit, not feature (e.g., 'Save 10 hours per week' vs 'Task automation software')",
        rationale: "Users care about outcomes, not features"
      },
      {
        variant: "C",
        description: "Question format",
        changes: "Pose question that addresses pain point (e.g., 'Tired of manual data entry?')",
        rationale: "Questions engage and create relatability"
      }
    ];
    suggestion.metrics_to_track = ["Scroll depth", "Time on page", "Conversion rate", "Bounce rate"];
  } else if (element.includes("pricing")) {
    suggestion.variants = [
      {
        variant: "A (Control)",
        description: "Current pricing display",
        changes: "No changes"
      },
      {
        variant: "B",
        description: "Annual vs monthly",
        changes: "Default to annual pricing with monthly breakdown ($49/mo billed annually)",
        rationale: "Higher perceived value, longer commitments"
      },
      {
        variant: "C",
        description: "Highlighted tier",
        changes: "Visually emphasize 'most popular' tier (border, badge, larger)",
        rationale: "Social proof + visual hierarchy guides decisions"
      }
    ];
    suggestion.metrics_to_track = ["Conversion rate", "Average order value", "Plan selection distribution"];
  } else {
    // Generic variants
    suggestion.variants = [
      {
        variant: "A (Control)",
        description: "Current version",
        changes: "No changes"
      },
      {
        variant: "B",
        description: "Simplified version",
        changes: "Remove unnecessary elements, reduce visual complexity",
        rationale: "Less cognitive load improves completion"
      },
      {
        variant: "C",
        description: "Enhanced clarity",
        changes: "Clearer labels, better visual hierarchy, stronger contrast",
        rationale: "Clarity reduces confusion and abandonment"
      }
    ];
    suggestion.metrics_to_track = ["Conversion rate", "Bounce rate", "Time on task", "Error rate"];
  }

  // Sample size calculation
  suggestion.sample_size = {
    note: "Use A/B test sample size calculator",
    factors: ["Current conversion rate", "Minimum detectable effect (e.g., 10% improvement)", "Statistical significance (95%)", "Statistical power (80%)"],
    rule_of_thumb: "Minimum 100 conversions per variant for reliable results",
    calculator: "https://www.optimizely.com/sample-size-calculator/"
  };

  // Best practices
  suggestion.best_practices = [
    "Test one variable at a time (isolate cause)",
    "Run test for full 1-2 weeks (account for weekly patterns)",
    "Ensure statistical significance (p < 0.05)",
    "Segment results (mobile vs desktop, traffic source)",
    "Don't stop test early (even if winning)",
    "Account for external factors (holidays, marketing campaigns)",
    "Document results and learnings"
  ];

  suggestion.reference = "See ux://testing/validation for complete A/B testing guide";

  return {
    content: [{ type: "text", text: JSON.stringify(suggestion, null, 2) }]
  };
}

async function analyzeInformationArchitecture(args: any) {
  const siteStructure = args.site_structure as string;
  const userGoals = args.user_goals as string;
  const issues = args.issues as string;

  const analysis: any = {
    site_structure: siteStructure,
    user_goals: userGoals,
    issues: issues || "Not specified",
    assessment: {},
    recommendations: [],
  };

  // Analyze structure depth
  const structureLower = siteStructure.toLowerCase();
  if (structureLower.includes("level") || structureLower.includes("tier") || structureLower.includes(">")) {
    const depth = (siteStructure.match(/>/g) || []).length + 1;
    analysis.assessment.hierarchy_depth = {
      current: `~${depth} levels`,
      recommendation: depth > 4 ? "Too deep - aim for 3-4 levels max" : "Good depth",
      issue: depth > 4 ? "Users get lost in deep hierarchies" : null
    };
  }

  // Check for issues keywords
  analysis.assessment.common_issues = [];
  if (structureLower.includes("confus") || issues?.toLowerCase().includes("confus")) {
    analysis.assessment.common_issues.push({
      issue: "Confusing labels",
      recommendation: "Use card sorting to understand user mental models",
      action: "Conduct open card sorting with 15-30 users"
    });
  }
  if (structureLower.includes("too many") || issues?.toLowerCase().includes("too many")) {
    analysis.assessment.common_issues.push({
      issue: "Too many navigation items",
      recommendation: "Limit top-level navigation to 5-7 items (Miller's Law: 7±2)",
      action: "Group related items, use mega menu for subcategories"
    });
  }
  if (structureLower.includes("search") || issues?.toLowerCase().includes("find")) {
    analysis.assessment.common_issues.push({
      issue: "Findability problems",
      recommendation: "Improve search and navigation",
      action: "Add autocomplete search, breadcrumbs, related links"
    });
  }

  // Recommendations based on user goals
  analysis.recommendations = [
    {
      priority: "high",
      recommendation: "Conduct card sorting to validate IA",
      method: "Open card sorting (users create categories), then closed card sorting (validate proposed IA)",
      tool: "OptimalSort, UserZoom, or Miro"
    },
    {
      priority: "high",
      recommendation: "Run tree testing to validate findability",
      method: "Give users tasks ('Find your order history'), measure success rate and path",
      tool: "Treejack (Optimal Workshop), UserZoom",
      target: "> 80% success rate"
    },
    {
      priority: "medium",
      recommendation: "Review navigation labels",
      check: ["Use user language (not jargon)", "Be specific (avoid 'More', 'Other', 'Resources')", "Keep short (1-2 words)", "Consistent capitalization"]
    },
    {
      priority: "medium",
      recommendation: "Ensure multiple paths to content",
      methods: ["Global navigation", "Search (with autocomplete)", "Related links", "Breadcrumbs", "Footer sitemap"]
    },
    {
      priority: "low",
      recommendation: "Create sitemap",
      purpose: "Visual representation for stakeholders, SEO, user reference"
    }
  ];

  // Best practices
  analysis.best_practices = {
    hierarchy: "Keep shallow (3-4 levels max)",
    navigation: "5-7 top-level items",
    labels: "Clear, user-centered, avoid jargon",
    findability: "Multiple access paths (nav, search, links)",
    breadcrumbs: "Use for deep sites",
    mobile: "Consider mobile navigation (hamburger + search)",
    testing: "Validate with tree testing before design"
  };

  analysis.research_methods = {
    card_sorting: "Understand how users categorize content",
    tree_testing: "Validate findability in structure (no design)",
    user_interviews: "Understand mental models and tasks",
    analytics: "See how users actually navigate (top pages, search queries, exit pages)",
    first_click_testing: "Where users click first for a task"
  };

  analysis.reference = "See ux://ia/information-architecture for complete IA guide";

  return {
    content: [{ type: "text", text: JSON.stringify(analysis, null, 2) }]
  };
}

async function detectDarkPatterns(args: any) {
  const flowDescription = (args.flow_description as string).toLowerCase();
  const screenshotRef = args.screenshot_reference as string;

  const detection: any = {
    flow: args.flow_description,
    screenshot: screenshotRef || "Not provided",
    detected_patterns: [],
    severity_score: 0,
    ethical_alternatives: [],
  };

  // Detect dark patterns based on keywords
  if (flowDescription.includes("cancel") || flowDescription.includes("unsubscribe")) {
    detection.detected_patterns.push({
      type: "Forced Continuity / Roach Motel",
      description: "Making it hard to cancel subscription",
      examples: ["Must call to cancel (can't do online)", "Buried in settings", "Multiple confirmations", "Retention dark patterns"],
      severity: "critical",
      ethical_alternative: "Cancel button in account settings, one confirmation, done. Same ease as sign-up."
    });
  }

  if (flowDescription.includes("cookie") || flowDescription.includes("consent")) {
    detection.detected_patterns.push({
      type: "Misdirection / Visual Prominence",
      description: "Giant 'Accept All' button, tiny 'Reject' link",
      severity: "major",
      example: "Large green 'Accept All Cookies' button, small gray 'Reject' text link",
      ethical_alternative: "Equal visual weight for Accept and Reject options. Clear 'Necessary Only' option."
    });
    detection.detected_patterns.push({
      type: "Obstruction / Hidden Options",
      description: "Hiding 'Reject All' behind multiple clicks",
      severity: "major",
      example: "Must click 'Manage Preferences' → scroll → find 'Reject All'",
      ethical_alternative: "Reject All button on first screen, same prominence as Accept All",
      legal: "GDPR requires equal ease for accept/reject"
    });
  }

  if (flowDescription.includes("checkout") || flowDescription.includes("cart")) {
    detection.detected_patterns.push({
      type: "Sneaking / Hidden Costs",
      description: "Revealing costs late in checkout",
      severity: "critical",
      example: "$50 product, but $80 at checkout (shipping, fees revealed late)",
      ethical_alternative: "Show total cost upfront, or clearly separate fees early in process"
    });
    detection.detected_patterns.push({
      type: "Sneak into Basket",
      description: "Adding items without user knowledge",
      severity: "major",
      example: "Insurance or warranty auto-added to cart",
      ethical_alternative: "Offer as optional add-on with clear, unchecked checkbox"
    });
  }

  if (flowDescription.includes("notification") || flowDescription.includes("permission")) {
    detection.detected_patterns.push({
      type: "Nagging",
      description: "Repeatedly asking after user declined",
      severity: "moderate",
      example: "Pop-up asking for notifications every visit after decline",
      ethical_alternative: "Ask once, or after delivering significant value. Respect 'no'."
    });
  }

  if (flowDescription.includes("sign up") || flowDescription.includes("account")) {
    detection.detected_patterns.push({
      type: "Privacy Zuckering",
      description: "Tricking users into sharing more data than intended",
      severity: "major",
      example: "Pre-checked boxes to share data with partners",
      ethical_alternative: "Unchecked by default, clear opt-in, explain why"
    });
    detection.detected_patterns.push({
      type: "Forced Enrollment",
      description: "Requiring account for basic functionality",
      severity: "moderate",
      example: "Can't view content without creating account",
      ethical_alternative: "Guest checkout, browse without account, optional sign-up"
    });
  }

  // Generic patterns to check for
  if (flowDescription.includes("no thanks") || flowDescription.includes("decline")) {
    detection.detected_patterns.push({
      type: "Confirmshaming",
      description: "Guilt-tripping decline option",
      severity: "moderate",
      example: "'No thanks, I don't want to save money' as decline button",
      ethical_alternative: "Neutral wording: 'No thanks' or 'Maybe later'"
    });
  }

  if (flowDescription.includes("only") || flowDescription.includes("left") || flowDescription.includes("viewing")) {
    detection.detected_patterns.push({
      type: "Fake Urgency / Scarcity",
      description: "False claims of limited availability",
      severity: "moderate",
      example: "'Only 2 left in stock!' but always 2 left, or '500 people viewing!' (not true)",
      ethical_alternative: "Real scarcity only, or don't use scarcity tactics"
    });
  }

  // Calculate severity score
  const severityMap: any = { critical: 3, major: 2, moderate: 1, minor: 0.5 };
  detection.severity_score = detection.detected_patterns.reduce(
    (sum: number, p: any) => sum + (severityMap[p.severity] || 0),
    0
  );

  // Overall assessment
  if (detection.severity_score >= 6) {
    detection.overall_assessment = "SEVERE: Multiple critical dark patterns detected. This violates user trust and may violate GDPR/CCPA.";
  } else if (detection.severity_score >= 3) {
    detection.overall_assessment = "MODERATE: Several dark patterns detected. Consider ethical alternatives.";
  } else if (detection.detected_patterns.length > 0) {
    detection.overall_assessment = "MINOR: Some questionable patterns detected. Review for ethical design.";
  } else {
    detection.overall_assessment = "No obvious dark patterns detected from description. Manual review recommended.";
  }

  // Ethical design principles
  detection.ethical_design_principles = [
    "Transparency: Be honest about costs, terms, data usage",
    "User control: Make opting out as easy as opting in",
    "Respect decisions: Don't nag after user declines",
    "Honest social proof: Use verified reviews, real stats only",
    "Equal visual weight: Accept and reject options should be equally prominent",
    "GDPR/CCPA compliance: Required for legal reasons, good for ethics too"
  ];

  detection.legal_risks = {
    gdpr: "Many dark patterns violate GDPR (non-consensual data collection, hard to withdraw consent)",
    ftc: "FTC has issued warnings and fines for deceptive practices",
    california_ab_2571: "California explicitly bans dark patterns in subscriptions"
  };

  detection.reference = "See ux://ethics/dark-patterns for complete dark pattern guide";

  return {
    content: [{ type: "text", text: JSON.stringify(detection, null, 2) }]
  };
}

async function calculateUXMetrics(args: any) {
  const metricType = args.metric_type as string;
  const rawData = args.data as string;

  const result: any = {
    metric_type: metricType,
    raw_data: rawData,
    calculation: {},
    interpretation: "",
    benchmark: "",
  };

  if (metricType === "SUS") {
    // System Usability Scale (10 questions, 1-5 scale)
    // Extract numbers from data string
    const responses = rawData.match(/\d+/g)?.map(Number) || [];

    if (responses.length !== 10) {
      result.error = "SUS requires exactly 10 responses (one per question)";
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    // SUS calculation: Sum((odd - 1) + (5 - even)) * 2.5
    let score = 0;
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        // Odd questions (1,3,5,7,9): subtract 1
        score += responses[i] - 1;
      } else {
        // Even questions (2,4,6,8,10): subtract from 5
        score += 5 - responses[i];
      }
    }
    score = score * 2.5;

    result.calculation = {
      responses,
      sus_score: score.toFixed(1),
      formula: "Sum of [(odd questions - 1) + (5 - even questions)] × 2.5"
    };

    result.interpretation =
      score >= 80 ? "Excellent (A+): Users love this product" :
      score >= 68 ? "Good (B): Above average usability" :
      score >= 50 ? "OK (C): Average usability, room for improvement" :
      "Poor (D/F): Significant usability issues";

    result.benchmark = {
      excellent: "> 80",
      above_average: "68-80",
      average: "50-68",
      below_average: "< 50",
      note: "68 is the average SUS score across all products"
    };

  } else if (metricType === "NPS") {
    // Net Promoter Score (0-10 scale)
    const scores = rawData.match(/\d+/g)?.map(Number) || [];

    const promoters = scores.filter(s => s >= 9).length;
    const detractors = scores.filter(s => s <= 6).length;
    const total = scores.length;

    const nps = ((promoters / total) - (detractors / total)) * 100;

    result.calculation = {
      total_responses: total,
      promoters: `${promoters} (scores 9-10)`,
      passives: `${scores.filter(s => s === 7 || s === 8).length} (scores 7-8)`,
      detractors: `${detractors} (scores 0-6)`,
      nps_score: nps.toFixed(1),
      formula: "(% Promoters - % Detractors)"
    };

    result.interpretation =
      nps >= 50 ? "Excellent: Strong customer loyalty" :
      nps >= 30 ? "Great: Good growth potential" :
      nps >= 0 ? "Good: More promoters than detractors" :
      "Poor: More detractors than promoters, address issues";

    result.benchmark = {
      excellent: "> 50",
      great: "30-50",
      good: "0-30",
      poor: "< 0",
      note: "NPS varies widely by industry. SaaS average is ~30-40."
    };

  } else if (metricType === "CSAT") {
    // Customer Satisfaction (typically 1-5 scale)
    const scores = rawData.match(/\d+/g)?.map(Number) || [];

    const satisfied = scores.filter(s => s >= 4).length;
    const total = scores.length;
    const csat = (satisfied / total) * 100;

    result.calculation = {
      total_responses: total,
      satisfied: `${satisfied} (scores 4-5)`,
      csat_score: `${csat.toFixed(1)}%`,
      formula: "(Responses 4 or 5 / Total responses) × 100"
    };

    result.interpretation =
      csat >= 80 ? "Excellent: High customer satisfaction" :
      csat >= 70 ? "Good: Above average satisfaction" :
      csat >= 60 ? "Fair: Room for improvement" :
      "Poor: Significant dissatisfaction";

    result.benchmark = {
      excellent: "> 80%",
      good: "70-80%",
      fair: "60-70%",
      poor: "< 60%"
    };

  } else if (metricType === "task-success") {
    // Task success rate
    const numbers = rawData.match(/\d+/g)?.map(Number) || [];

    let successful, total;
    if (numbers.length === 2) {
      successful = numbers[0];
      total = numbers[1];
    } else {
      successful = numbers.filter(n => n === 1).length; // Assuming 1 = success, 0 = fail
      total = numbers.length;
    }

    const successRate = (successful / total) * 100;

    result.calculation = {
      successful_completions: successful,
      total_attempts: total,
      success_rate: `${successRate.toFixed(1)}%`,
      formula: "(Successful completions / Total attempts) × 100"
    };

    result.interpretation =
      successRate >= 78 ? "Good: Above Nielsen's 78% benchmark" :
      successRate >= 60 ? "Fair: Usable but room for improvement" :
      "Poor: Significant usability issues";

    result.benchmark = {
      good: "> 78%",
      fair: "60-78%",
      poor: "< 60%",
      note: "Nielsen Norman Group benchmark: 78% average task success rate"
    };

  } else {
    result.error = `Unsupported metric type: ${metricType}. Supported: SUS, NPS, CSAT, CES, task-success, retention`;
  }

  result.reference = "See ux://analytics/metrics for complete UX metrics guide";

  return {
    content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
  };
}

async function generateWireframe(args: any) {
  const pageType = (args.page_type as string).toLowerCase();
  const elements = args.elements as string;
  const layout = (args.layout as string) || "single-column";

  const wireframe: any = {
    page_type: args.page_type,
    layout,
    elements: elements || "Not specified",
    ascii_wireframe: "",
  };

  // Generate ASCII wireframe based on page type and layout
  if (pageType.includes("login")) {
    wireframe.ascii_wireframe = `
┌────────────────────────────────────────────┐
│                                            │
│              [  LOGO  ]                    │
│                                            │
│         Login to Your Account              │
│                                            │
│    ┌────────────────────────────┐          │
│    │ Email                      │          │
│    └────────────────────────────┘          │
│                                            │
│    ┌────────────────────────────┐          │
│    │ Password            [👁]    │          │
│    └────────────────────────────┘          │
│                                            │
│    [ ] Remember me    Forgot password?    │
│                                            │
│    ┌────────────────────────────┐          │
│    │      LOG IN BUTTON         │          │
│    └────────────────────────────┘          │
│                                            │
│    Don't have an account? Sign up         │
│                                            │
└────────────────────────────────────────────┘
`;
  } else if (pageType.includes("dashboard")) {
    wireframe.ascii_wireframe = `
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Dashboard    [Search...]   [Notifications] [Profile] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Card 1  │  │  Card 2  │  │  Card 3  │  │  Card 4  │   │
│  │  Value   │  │  Value   │  │  Value   │  │  Value   │   │
│  │  +12%    │  │  +8%     │  │  -3%     │  │  +15%    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │             Chart/Visualization                    │    │
│  │                                                     │    │
│  │    ██                                               │    │
│  │   ████         ██                                   │    │
│  │  ██████  ██  ████                                   │    │
│  │ ████████████████████                                │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Recent Activity                                    │    │
│  │ • Item 1 - Description                             │    │
│  │ • Item 2 - Description                             │    │
│  │ • Item 3 - Description                             │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`;
  } else if (pageType.includes("card") || pageType.includes("product")) {
    wireframe.ascii_wireframe = `
┌─────────────────────────┐
│                         │
│   ┌─────────────────┐   │
│   │                 │   │
│   │  Product Image  │   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
│   Product Name          │
│   Short description     │
│                         │
│   $99.99                │
│   ★★★★☆ (24 reviews)    │
│                         │
│   ┌─────────────────┐   │
│   │  ADD TO CART    │   │
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
`;
  } else {
    // Generic wireframe
    wireframe.ascii_wireframe = `
┌────────────────────────────────────────────┐
│  [Logo]         Navigation Menu        [☰] │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │        Header / Hero Section         │  │
│  │  [Image] + Headline + Description    │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │                                      │  │
│  │       Main Content Area              │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │ Item 1 │  │ Item 2 │  │ Item 3 │       │
│  └────────┘  └────────┘  └────────┘       │
│                                            │
├────────────────────────────────────────────┤
│  Footer: Links | Contact | Social Media   │
└────────────────────────────────────────────┘
`;
  }

  wireframe.notes = [
    "This is a low-fidelity wireframe for layout planning",
    "Use as starting point for design discussions",
    "Focus on structure and hierarchy, not visual design",
    "Iterate based on user needs and feedback"
  ];

  wireframe.next_steps = [
    "Add detailed content and copy",
    "Define interactions and micro-interactions",
    "Create high-fidelity mockup in Figma/Sketch",
    "Conduct usability testing",
    "Develop responsive versions (mobile, tablet)"
  ];

  return {
    content: [{ type: "text", text: JSON.stringify(wireframe, null, 2) }]
  };
}

async function suggestMicrointeraction(args: any) {
  const element = (args.element as string).toLowerCase();
  const context = (args.context as string)?.toLowerCase() || "";
  const platform = (args.platform as string) || "web";

  const suggestion: any = {
    element: args.element,
    context: context || "General interaction",
    platform,
    microinteractions: [],
  };

  // Suggest microinteractions based on element type
  if (element.includes("button")) {
    suggestion.microinteractions = [
      {
        trigger: "Hover",
        feedback: "Background color change + slight scale up (1.05x)",
        duration: "200ms",
        easing: "ease-out"
      },
      {
        trigger: "Active/Press",
        feedback: "Scale down (0.95x) + darker background",
        duration: "100ms",
        easing: "ease-in",
        haptic: platform === "mobile" ? "Light tap (10ms)" : "N/A"
      },
      {
        trigger: "Focus",
        feedback: "Outline ring (accessibility)",
        style: "2px solid blue, 4px offset"
      }
    ];

    if (context.includes("delete") || context.includes("destructive")) {
      suggestion.microinteractions.push({
        trigger: "Click",
        feedback: "Confirmation modal with shake animation",
        duration: "300ms",
        pattern: "Shake left-right to indicate danger"
      });
    } else if (context.includes("success") || context.includes("save")) {
      suggestion.microinteractions.push({
        trigger: "Click success",
        feedback: "Checkmark animation + color change green",
        duration: "400ms",
        pattern: "Button → Checkmark → 'Saved!'"
      });
    }

  } else if (element.includes("toggle") || element.includes("switch")) {
    suggestion.microinteractions = [
      {
        trigger: "Toggle on",
        feedback: "Slide animation + color change (gray → green)",
        duration: "250ms",
        easing: "ease-in-out",
        haptic: platform === "mobile" ? "Medium tap (20ms)" : "N/A"
      },
      {
        trigger: "Toggle off",
        feedback: "Slide animation + color change (green → gray)",
        duration: "250ms",
        easing: "ease-in-out"
      }
    ];

  } else if (element.includes("like") || element.includes("favorite") || element.includes("heart")) {
    suggestion.microinteractions = [
      {
        trigger: "Click/Tap",
        feedback: "Heart fills with color + bounces (scale 1 → 1.2 → 1)",
        duration: "400ms",
        easing: "elastic",
        haptic: platform === "mobile" ? "Light tap" : "N/A"
      },
      {
        trigger: "Unlike",
        feedback: "Heart empties + subtle shrink",
        duration: "200ms"
      }
    ];

  } else if (element.includes("loading") || element.includes("spinner")) {
    suggestion.microinteractions = [
      {
        trigger: "Loading state",
        feedback: "Spinner animation OR skeleton screen OR progress bar",
        duration: "Continuous",
        pattern: "Rotating spinner or pulsing skeleton",
        note: "Show progress if duration is known"
      }
    ];

  } else if (element.includes("form") || element.includes("input")) {
    suggestion.microinteractions = [
      {
        trigger: "Focus",
        feedback: "Border color change + label move (floating label)",
        duration: "200ms"
      },
      {
        trigger: "Valid input",
        feedback: "Green checkmark appears",
        duration: "200ms"
      },
      {
        trigger: "Invalid input",
        feedback: "Red border + shake animation + error message",
        duration: "300ms",
        pattern: "Shake to indicate error"
      },
      {
        trigger: "Form submission success",
        feedback: "Success message + confetti animation (optional)",
        duration: "500ms"
      }
    ];

  } else if (element.includes("dropdown") || element.includes("menu")) {
    suggestion.microinteractions = [
      {
        trigger: "Open",
        feedback: "Fade in + slide down",
        duration: "200ms",
        easing: "ease-out"
      },
      {
        trigger: "Close",
        feedback: "Fade out + slide up",
        duration: "150ms",
        easing: "ease-in"
      },
      {
        trigger: "Hover item",
        feedback: "Background color change",
        duration: "100ms"
      }
    ];

  } else {
    // Generic suggestions
    suggestion.microinteractions = [
      {
        trigger: "Interaction start",
        feedback: "Visual feedback (color, scale, or position change)",
        duration: "200-300ms"
      },
      {
        trigger: "Interaction complete",
        feedback: "Confirmation (checkmark, success message, or state change)",
        duration: "300-400ms"
      }
    ];
  }

  // General principles
  suggestion.principles = [
    "Keep animations subtle (< 400ms)",
    "Use easing for natural motion (ease-out for enter, ease-in for exit)",
    "Provide immediate feedback (< 100ms)",
    "Respect prefers-reduced-motion (disable animations)",
    "Use haptic feedback on mobile (10-50ms)",
    "Ensure accessibility (feedback not only visual)",
    "Match brand personality (playful vs professional)"
  ];

  suggestion.css_example = element.includes("button") ?
    "button {\n  transition: all 200ms ease-out;\n}\nbutton:hover {\n  transform: scale(1.05);\n  background: #0056b3;\n}\nbutton:active {\n  transform: scale(0.95);\n}" : null;

  suggestion.reference = "See ux://animation/principles for complete animation guide";

  return {
    content: [{ type: "text", text: JSON.stringify(suggestion, null, 2) }]
  };
}

// ========================================
// PROMPTS - Pre-configured UX Reviews
// ========================================

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "accessibility_review",
        description:
          "Comprehensive accessibility review following WCAG 2.1 AA guidelines",
        arguments: [
          {
            name: "component",
            description: "Component name or description to review",
            required: true,
          },
          {
            name: "content",
            description: "HTML/CSS/JS markup to analyze (optional)",
            required: false,
          },
        ],
      },
      {
        name: "usability_audit",
        description: "Full usability audit using Nielsen's 10 heuristics",
        arguments: [
          {
            name: "interface",
            description: "Interface or feature to audit",
            required: true,
          },
        ],
      },
      {
        name: "design_system_setup",
        description: "Guide for setting up a new design system with tokens and components",
        arguments: [
          {
            name: "project_type",
            description: "Type of project (web app, mobile, etc.)",
            required: false,
          },
        ],
      },
      {
        name: "complete_ux_audit",
        description:
          "Comprehensive UX audit combining accessibility, usability, performance, SEO, and responsive design checks",
        arguments: [
          {
            name: "interface",
            description: "Interface or page to audit",
            required: true,
          },
          {
            name: "content",
            description: "HTML/CSS/JS markup to analyze (optional)",
            required: false,
          },
        ],
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "accessibility_review":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please perform a comprehensive accessibility review for: ${args?.component}

${args?.content ? `Markup to analyze:\n\`\`\`\n${args.content}\n\`\`\`\n` : ""}

Review checklist:
1. Use the analyze_accessibility tool to check for WCAG violations
2. Check keyboard navigation (tab order, focus management, keyboard shortcuts)
3. Verify screen reader compatibility (ARIA labels, roles, live regions)
4. Test color contrast with check_contrast tool
5. Review semantic HTML structure
6. Check for proper heading hierarchy
7. Verify form labels and error handling
8. Test with keyboard only (no mouse)

Provide specific, actionable recommendations for each issue found.

Reference the WCAG guidelines resource: ux://accessibility/wcag for detailed standards.`,
            },
          },
        ],
      };

    case "usability_audit":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please conduct a full usability audit for: ${args?.interface}

Evaluate against all 10 of Nielsen's Usability Heuristics:

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

For each heuristic:
- Rate severity (0-4): 0=no problem, 4=usability catastrophe
- Describe specific violations
- Provide actionable recommendations

Use the review_usability tool to get detailed heuristic descriptions.

Reference: ux://usability/nielsen-heuristics`,
            },
          },
        ],
      };

    case "design_system_setup":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please help me set up a design system${args?.project_type ? ` for a ${args.project_type}` : ""}.

Guide me through:

1. **Design Tokens Setup**
   - Color palette (primary, secondary, semantic colors)
   - Spacing scale (base unit: 4px or 8px)
   - Typography scale (font families, sizes, weights)
   - Border radius values
   - Shadow levels
   - Animation durations

2. **Component Architecture**
   - Atomic design structure (atoms → molecules → organisms)
   - Component API design principles
   - Naming conventions
   - Composition patterns

3. **Implementation Checklist**
   - File structure recommendation
   - Tools and libraries to consider
   - Documentation approach
   - Testing strategy

Reference the design system resource: ux://design-systems/principles

Provide code examples for token definition and a starter component.`,
            },
          },
        ],
      };

    case "complete_ux_audit":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please conduct a comprehensive UX audit for: ${args?.interface}

${args?.content ? `Markup to analyze:\n\`\`\`\n${args.content}\n\`\`\`\n` : ""}

This is a complete audit covering all critical UX dimensions. Perform the following:

## 1. Accessibility Audit (WCAG 2.1 AA)
- Use analyze_accessibility tool to identify violations
- Check keyboard navigation and focus management
- Verify screen reader compatibility (ARIA labels, roles)
- Test color contrast with check_contrast tool
- Review semantic HTML and heading hierarchy
- Check form labels and error handling

## 2. Usability Heuristics (Nielsen's 10)
- Use review_usability tool for detailed analysis
- Rate each heuristic (0-4 severity scale)
- Identify specific violations per heuristic
- Provide actionable recommendations

## 3. Responsive Design
- Use check_responsive tool to analyze breakpoints
- Verify mobile-first approach
- Check touch target sizes (44x44px minimum)
- Test layout across viewports
- Review mobile navigation patterns
- Reference: ux://mobile/patterns

## 4. Typography & Readability
- Use generate_typography_scale to verify type system
- Check line length (45-75 characters)
- Verify line height (1.5-1.7 for body text)
- Review font pairing and hierarchy
- Reference: ux://visual/typography

## 5. Color System
- Use generate_color_palette to analyze harmony
- Verify semantic color usage
- Check 60-30-10 rule adherence
- Ensure sufficient contrast ratios
- Reference: ux://visual/color-theory

## 6. Form Patterns (if applicable)
- Use suggest_form_pattern tool
- Verify single-column layout
- Check validation timing (hybrid approach)
- Review field types and autocomplete
- Test error messages (clear, specific, actionable)
- Reference: ux://forms/patterns

## 7. Microcopy & Content
- Use suggest_microcopy tool for key elements
- Review button labels (specific, action-oriented)
- Check error messages (explain + instruct)
- Verify empty states and success messages
- Reference: ux://content/microcopy

## 8. Data Visualization (if applicable)
- Use analyze_data_viz tool
- Verify appropriate chart types
- Check accessibility (color independence, alt text)
- Review data-ink ratio
- Reference: ux://data/visualization

## 9. Performance Indicators
- Check for performance best practices
- Review lazy loading and code splitting
- Verify optimization techniques
- Reference: ux://performance/optimization

## 10. SEO & Metadata
- Review meta tags and Open Graph
- Check semantic structure
- Verify heading hierarchy
- Reference: ux://seo/best-practices

## Output Format

For each dimension, provide:
1. **Status**: ✅ Pass | ⚠️ Needs Improvement | ❌ Critical Issues
2. **Severity Score**: 0-4 (0=none, 1=minor, 2=moderate, 3=major, 4=critical)
3. **Findings**: Specific issues discovered
4. **Recommendations**: Prioritized, actionable fixes
5. **References**: Relevant knowledge resources

## Summary
- Overall UX Health Score: X/100
- Critical Issues (must fix): List
- High Priority (should fix): List
- Medium Priority (nice to have): List
- Positive Highlights: What's working well

Provide a comprehensive, actionable audit report.`,
            },
          },
        ],
      };

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

// ========================================
// START SERVER
// ========================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("UX MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
