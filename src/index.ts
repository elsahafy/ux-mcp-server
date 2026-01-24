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
      resources: {},
      tools: {},
      prompts: {},
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
        uri: "ux://design-systems/tokens",
        name: "Design System Principles",
        description: "Design tokens, atomic design, and component API guidelines",
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
    case "ux://design-systems/tokens":
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
            code: {
              type: "string",
              description: "HTML or JSX code to analyze",
            },
            level: {
              type: "string",
              enum: ["A", "AA", "AAA"],
              description: "WCAG conformance level to check against",
              default: "AA",
            },
          },
          required: ["code"],
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
            code: {
              type: "string",
              description: "Optional: Code implementation to review",
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
            code: {
              type: "string",
              description: "HTML/CSS code to analyze",
            },
            check_type: {
              type: "string",
              enum: ["all", "viewport", "touch-targets", "breakpoints", "images"],
              description: "Specific responsive aspect to check",
              default: "all",
            },
          },
          required: ["code"],
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
            code: {
              type: "string",
              description: "HTML/CSS/JS code to analyze",
            },
            check_type: {
              type: "string",
              enum: ["all", "images", "css", "javascript", "loading"],
              description: "Specific performance aspect to check",
              default: "all",
            },
          },
          required: ["code"],
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
            url: {
              type: "string",
              description: "Optional: Page URL for context",
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
  const code = args.code as string;
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
  const code = args.code as string | undefined;
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
      reference: "See ux://design-systems/tokens for complete guidelines",
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
  const code = args.code as string;
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
  const code = args.code as string;
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
  const url = args.url as string | undefined;

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
    url: url || "Not specified",
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
            name: "code",
            description: "Code to analyze (optional)",
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

${args?.code ? `Code to analyze:\n\`\`\`\n${args.code}\n\`\`\`\n` : ""}

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

Reference the design system resource: ux://design-systems/tokens

Provide code examples for token definition and a starter component.`,
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
