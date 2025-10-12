# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security vulnerabilities to:

- **Email**: security@jarvis.crypto
- **PGP Key**: [Available here](https://jarvis.crypto/.well-known/pgp-key.asc)

Please include:

1. **Description** of the vulnerability
2. **Steps to reproduce** (PoC if possible)
3. **Potential impact** assessment
4. **Suggested fix** (if you have one)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 7 days
- **Fix timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Best effort

## Security Measures

### Frontend Security

1. **Content Security Policy (CSP)**
   - Strict CSP headers to prevent XSS
   - No `unsafe-inline` in production
   - Nonce-based script/style loading

2. **Input Validation**
   - All user input sanitized with DOMPurify
   - Zod schema validation on forms
   - Server-side validation (backend)

3. **Authentication**
   - Short-lived JWTs (15 min)
   - Secure refresh token flow
   - HttpOnly, Secure, SameSite cookies

4. **Data Protection**
   - NO private keys stored client-side
   - Sensitive data encrypted at rest
   - HTTPS enforced

5. **Dependency Management**
   - Automated npm audit in CI
   - Lockfile integrity checks
   - Regular dependency updates

### Wallet Security

1. **Hardware Wallet Integration**
   - Ledger/Trezor support
   - Transaction signing off-device
   - No private key exposure

2. **Transaction Safety**
   - Preview before signing
   - Gas estimation
   - Simulation (when available)
   - User confirmation prompts

3. **Provider Security**
   - WalletConnect v2 (secure relay)
   - MetaMask security best practices
   - Provider request validation

## Known Limitations

1. **Client-side limitations**: Cannot guarantee security if user's browser is compromised
2. **Supply chain**: Dependencies may have vulnerabilities (mitigated by audit)
3. **Backend dependency**: Security assumes trusted backend APIs

## Security Checklist (Pre-Deployment)

- [ ] All dependencies audited (`npm audit`)
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] Error handling does not leak sensitive info
- [ ] Rate limiting enabled
- [ ] Input sanitization tested
- [ ] Authentication flows reviewed
- [ ] Third-party integrations audited
- [ ] Security headers configured (X-Frame-Options, etc.)
- [ ] Sentry configured with data scrubbing

## Bug Bounty

We currently do not have a formal bug bounty program but welcome responsible disclosure.

## Hall of Fame

Security researchers who responsibly disclosed vulnerabilities:

<!-- To be populated -->

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Web3 Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
