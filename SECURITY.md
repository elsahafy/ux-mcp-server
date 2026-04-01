# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 5.x.x   | :white_check_mark: |
| 4.x.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email the maintainer directly at: [Create a private security advisory](https://github.com/elsahafy/ux-mcp-server/security/advisories/new)
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt within 48 hours
- **Assessment**: We will assess the vulnerability within 7 days
- **Resolution**: Critical vulnerabilities will be addressed within 14 days
- **Disclosure**: We will coordinate disclosure timing with you

### Scope

This security policy covers:
- The UX MCP Server npm package (`@elsahafy/ux-mcp-server`)
- The source code in this repository
- Dependencies used by this project

### Out of Scope

- Third-party services or applications using this package
- Issues in dependencies (please report to the respective maintainers)
- Non-security bugs (use regular GitHub issues)

## Security Best Practices

When using this MCP server:

1. **Keep Updated**: Always use the latest version (`npx -y @elsahafy/ux-mcp-server`)
2. **Review Permissions**: The server only needs read access to provide UX guidance
3. **Validate Output**: Treat all tool outputs as suggestions, not guaranteed secure code
4. **Local Execution**: The server runs locally and doesn't transmit data externally
5. **No Code Execution**: All `content` parameters are analyzed via regex, never evaluated or executed
6. **No Network Requests**: No parameters trigger server-side HTTP requests — URL-like fields are labels only

## Dependencies

We regularly update dependencies to address known vulnerabilities. Run `npm audit` to check for any known issues in your installation.

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve the security of this project.
