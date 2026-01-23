# Publishing to NPM

This guide shows how to publish the UX MCP Server to npm, making it installable via `npm install` or `npx`.

## Prerequisites

1. **NPM Account**: Create one at https://www.npmjs.com/signup
2. **Node.js 18+**: Verify with `node --version`
3. **Git Repository**: Already set up at github.com/elsahafy/ux-mcp-server

## Step 1: Build the Project

```bash
cd ux-mcp-server
npm install
npm run build
```

Verify `dist/` folder is created with `index.js`.

## Step 2: Login to NPM

```bash
npm login
```

Enter your npm username, password, and email.

## Step 3: Verify Package Configuration

The `package.json` is already configured with:
- ✅ Scoped package name: `@elsahafy/ux-mcp-server`
- ✅ Executable bin: `ux-mcp-server`
- ✅ Files to include: `dist`, `knowledge`, `README.md`
- ✅ Repository links
- ✅ Keywords for discoverability
- ✅ Node engine requirement (18+)

## Step 4: Test Locally Before Publishing

```bash
# Pack the package (creates a .tgz file)
npm pack

# Install locally to test
npm install -g ./elsahafy-ux-mcp-server-1.0.0.tgz

# Test the command
ux-mcp-server --help
```

## Step 5: Publish to NPM

```bash
# Public scoped package
npm publish --access public
```

If successful, you'll see:
```
+ @elsahafy/ux-mcp-server@1.0.0
```

## Step 6: Verify Publication

Visit: https://www.npmjs.com/package/@elsahafy/ux-mcp-server

Test installation:
```bash
# Via npm
npm install -g @elsahafy/ux-mcp-server

# Via npx (no installation)
npx @elsahafy/ux-mcp-server
```

## Step 7: Add to Smithery (MCP Registry)

Visit https://smithery.ai/ and submit your MCP server:

1. Go to "Submit MCP"
2. Provide:
   - **Package name**: `@elsahafy/ux-mcp-server`
   - **Description**: UX best practices MCP server
   - **GitHub repo**: https://github.com/elsahafy/ux-mcp-server
   - **Category**: Development Tools / Design

Once approved, users can install with:
```bash
npx @smithery/cli install @elsahafy/ux-mcp-server --client claude
```

## Updating the Package

When making changes:

1. Update version in `package.json`:
   ```json
   "version": "1.0.1"
   ```

2. Build and publish:
   ```bash
   npm run build
   npm publish
   ```

### Version Guidelines (Semantic Versioning)

- **1.0.0 → 1.0.1**: Bug fixes (patch)
- **1.0.0 → 1.1.0**: New features, backward compatible (minor)
- **1.0.0 → 2.0.0**: Breaking changes (major)

## Making it Easier for Users

### 1. Add npm badge to README

```markdown
[![npm version](https://badge.fury.io/js/@elsahafy%2Fux-mcp-server.svg)](https://www.npmjs.com/package/@elsahafy/ux-mcp-server)
```

### 2. Create Quick Install Command

Add to top of README:
```bash
npx @elsahafy/ux-mcp-server
```

### 3. Claude Desktop Quick Config

Provide one-liner in README:
```json
{
  "mcpServers": {
    "ux": {
      "command": "npx",
      "args": ["-y", "@elsahafy/ux-mcp-server"]
    }
  }
}
```

## Troubleshooting

### Error: Package name already taken
If `@elsahafy/ux-mcp-server` is taken:
1. Change package name in `package.json`
2. Update README references
3. Publish with new name

### Error: You must verify your email
1. Go to https://www.npmjs.com/
2. Check your email for verification link
3. Click link to verify
4. Try publishing again

### Error: No permission to publish
Make sure you're logged in:
```bash
npm whoami
```

### Build errors
```bash
# Clean everything
rm -rf node_modules dist package-lock.json

# Reinstall
npm install

# Build
npm run build
```

## Post-Publication Checklist

- [ ] Package appears on npmjs.com
- [ ] Installation works: `npm install -g @elsahafy/ux-mcp-server`
- [ ] NPX works: `npx @elsahafy/ux-mcp-server`
- [ ] Command works in Claude Desktop
- [ ] README updated with install instructions
- [ ] GitHub release created (optional)
- [ ] Tweet/share announcement (optional)

## Continuous Updates

Set up automated publishing with GitHub Actions (optional):

Create `.github/workflows/publish.yml`:
```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add NPM_TOKEN to GitHub Secrets:
1. Generate token at https://www.npmjs.com/settings/tokens
2. Add to GitHub repo: Settings → Secrets → Actions → New repository secret
3. Name: `NPM_TOKEN`, Value: (your token)

## Resources

- NPM Documentation: https://docs.npmjs.com/
- Smithery MCP Registry: https://smithery.ai/
- Semantic Versioning: https://semver.org/
- Package.json fields: https://docs.npmjs.com/cli/v9/configuring-npm/package-json

---

**Ready to publish?** Run: `npm publish --access public`
