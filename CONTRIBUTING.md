# Contributing to UX MCP Server

Thank you for your interest in contributing to the UX MCP Server! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Coding Standards](#coding-standards)
- [Adding New Content](#adding-new-content)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node version, Claude Desktop version)
- **Code samples** or screenshots if applicable

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) when creating issues.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the enhancement
- **Use cases** explaining why this would be useful
- **Examples** from other tools or designs if applicable
- **Implementation ideas** if you have them

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Contributing Code

We welcome code contributions! Areas where you can help:

- **New UX Knowledge**: Add new patterns, guidelines, or best practices
- **New Tools**: Implement new MCP tools for UX analysis
- **New Prompts**: Create workflow templates for common UX tasks
- **Bug Fixes**: Fix reported bugs or issues you discover
- **Documentation**: Improve README, guides, or code comments
- **Examples**: Add usage examples or case studies

## Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Git for version control
- TypeScript knowledge
- Familiarity with MCP (Model Context Protocol)

### Setup Instructions

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ux-mcp-server.git
   cd ux-mcp-server
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/elsahafy/ux-mcp-server.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

6. **Test locally**:
   ```bash
   npm run dev
   ```

## Contribution Workflow

1. **Sync with upstream**:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

   Use naming conventions:
   - `feature/` for new features
   - `fix/` for bug fixes
   - `docs/` for documentation
   - `refactor/` for code refactoring

3. **Make your changes** following [coding standards](#coding-standards)

4. **Test your changes**:
   ```bash
   npm run build
   npm run dev
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "type: description

   Detailed explanation of changes.

   Co-Authored-By: Your Name <your.email@example.com>"
   ```

   Commit message types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** on GitHub

## Coding Standards

### TypeScript Style

- Use TypeScript for all source code
- Follow existing code formatting patterns
- Use meaningful variable and function names
- Add type annotations for function parameters and return values
- Avoid `any` types where possible

### File Organization

- **Knowledge files**: `knowledge/*.json` (JSON format)
- **Source code**: `src/index.ts` (TypeScript)
- **Documentation**: Root directory (Markdown)

### Code Quality

- Write clean, readable code
- Add comments for complex logic
- Keep functions focused and modular
- Follow DRY (Don't Repeat Yourself) principle
- Ensure backward compatibility when possible

## Adding New Content

### Adding Knowledge Resources

1. Create a new JSON file in `knowledge/` directory:
   ```json
   {
     "name": "Resource Name",
     "description": "Clear description",
     "content": {
       "section1": {
         "subsection": "value"
       }
     },
     "best_practices": [],
     "anti_patterns": [],
     "resources": []
   }
   ```

2. Register the resource in `src/index.ts`:
   - Add to `ListResourcesRequestSchema` handler
   - Add case in `ReadResourceRequestSchema` handler
   - Use URI pattern: `ux://category/topic`

3. Include:
   - Clear, accurate information
   - Practical examples
   - Best practices and anti-patterns
   - Accessibility considerations
   - Code examples where applicable
   - References to authoritative sources

### Adding New Tools

1. Define tool schema in `src/index.ts`:
   ```typescript
   {
     name: "tool_name",
     description: "Clear description of what the tool does",
     inputSchema: {
       type: "object",
       properties: {
         param: { type: "string", description: "Parameter description" }
       },
       required: ["param"]
     }
   }
   ```

2. Implement tool function:
   ```typescript
   async function toolName(args: any) {
     // Extract and validate arguments
     const param = args.param as string;

     // Implement logic
     const result = {
       // Structure your response
     };

     // Return MCP format
     return {
       content: [{
         type: "text",
         text: JSON.stringify(result, null, 2)
       }]
     };
   }
   ```

3. Add tool handler in `CallToolRequestSchema`

4. Include:
   - Input validation
   - Error handling
   - Helpful error messages
   - Structured JSON output
   - Usage examples in comments

### Adding New Prompts

1. Define prompt in `src/index.ts`:
   ```typescript
   {
     name: "prompt_name",
     description: "Clear description of workflow",
     arguments: [
       {
         name: "arg_name",
         description: "Argument description",
         required: true
       }
     ]
   }
   ```

2. Document the prompt's purpose and usage

## Testing

### CI Pipeline

All PRs must pass the CI pipeline before merging. The pipeline runs automatically and includes:

- **Build matrix**: Node.js 18, 20, and 22
- **TypeScript strict checking**: `tsc --noEmit --strict`
- **Security audit**: `npm audit --audit-level=high`
- **Build verification**: Confirms `dist/index.js` is produced
- **Publish dry-run**: Validates package contents

### Manual Testing

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the server:
   ```bash
   npm run dev
   ```

3. Test with Claude Desktop or Claude Code:
   - Configure in your MCP client settings
   - Restart the client
   - Test your new features/tools/resources

### Testing Checklist

- [ ] CI pipeline passes (all 5 checks green)
- [ ] Code compiles without errors (`npm run build`)
- [ ] All resources load correctly
- [ ] Tools execute and return valid JSON
- [ ] Prompts work as expected
- [ ] No breaking changes to existing functionality
- [ ] Documentation updated
- [ ] CHANGELOG.md updated under "Unreleased"

## Pull Request Process

### Before Submitting

1. **Update documentation** if you've made changes to:
   - Resources, tools, or prompts
   - API or usage patterns
   - Installation or configuration

2. **Update CHANGELOG.md** with your changes under "Unreleased"

3. **Ensure builds pass**:
   ```bash
   npm run build
   ```

4. **Write a clear PR description** including:
   - What changes were made
   - Why these changes were needed
   - How to test the changes
   - Related issue numbers (if applicable)

### PR Review Process

1. All 5 CI checks must pass (build x3, lint, security audit)
2. At least 1 approving review is required
3. Address any requested changes
4. Once approved, maintainer will merge
5. Your contribution will be included in next release

### PR Guidelines

- Keep PRs focused on a single feature/fix
- Link to related issues
- Include screenshots for UI changes
- Add examples for new features
- Update version number if appropriate (maintainers may adjust)

## Questions?

- Check existing [Issues](https://github.com/elsahafy/ux-mcp-server/issues)
- Review [Discussions](https://github.com/elsahafy/ux-mcp-server/discussions) (if enabled)
- Create a new issue with the question label

## Recognition

All contributors will be recognized in:
- Release notes
- CHANGELOG.md
- GitHub contributors page

Thank you for contributing to making UX knowledge more accessible! 🎨✨
