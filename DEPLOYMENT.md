# 🚀 Deployment Guide - Jarvis Frontend

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Vercel Deployment](#vercel-deployment)
4. [Alternative Platforms](#alternative-platforms)
5. [Post-Deployment](#post-deployment)
6. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests passing (`npm test`)
- [ ] E2E tests passing (`npm run e2e`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code formatted (`npm run format:check`)

### Security

- [ ] Security audit passed (`npm audit --audit-level=high`)
- [ ] No critical vulnerabilities
- [ ] Environment variables configured
- [ ] CSP headers defined
- [ ] HTTPS enforced
- [ ] Rate limiting configured (backend)

### Performance

- [ ] Bundle size optimized (< 150 KB main)
- [ ] Lighthouse score >= 90
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Lazy loading enabled

### Content

- [ ] All placeholder content replaced
- [ ] SEO meta tags configured
- [ ] Social media cards configured
- [ ] Robots.txt configured
- [ ] Sitemap generated

---

## Environment Configuration

### Production Environment Variables

Create these in your deployment platform:

```bash
# API Endpoints
VITE_API_URL=https://api.jarvis.com/v1
VITE_CONTACT_API_URL=https://api.jarvis.com/v1/contact

# Blockchain Configuration
VITE_ETH_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
VITE_CHAIN_ID=1

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=your_production_project_id

# Monitoring (Optional)
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Environment
VITE_ENVIRONMENT=production

# Feature Flags
VITE_ENABLE_HARDWARE_WALLET=true
VITE_ENABLE_TESTNET=false

# Security
VITE_ENABLE_CSP=true
VITE_MAX_REQUEST_RETRIES=3
VITE_REQUEST_TIMEOUT_MS=30000
```

**⚠️ Security Notes**:

- Never commit `.env` files to Git
- Use different API keys for staging/production
- Rotate keys regularly
- Use secret management tools for sensitive values

---

## Vercel Deployment

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:

   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```powershell
   vercel login
   ```

3. **Deploy** (first time):

   ```powershell
   vercel
   ```

   - Follow prompts to link project
   - Select project settings
   - Configure environment variables

4. **Deploy to Production**:
   ```powershell
   vercel --prod
   ```

### Method 2: GitHub Integration (Easiest)

1. **Push to GitHub**:

   ```powershell
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings (auto-detected)

3. **Configure Environment Variables**:
   - Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set for Production, Preview, and Development

4. **Deploy**:
   - Automatic on push to `main` (production)
   - Automatic on PR (preview)

### Vercel Configuration

The `vercel.json` file is already configured with:

- Security headers (CSP, X-Frame-Options, etc.)
- SPA routing (rewrites to index.html)
- CORS headers (if needed)

---

## Alternative Platforms

### Netlify

1. **Build Settings**:

   ```yaml
   build:
     command: npm run build
     publish: dist
   ```

2. **netlify.toml**:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/*"
     [headers.values]
       Content-Security-Policy = "default-src 'self'; ..."
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
   ```

### AWS S3 + CloudFront

1. **Build**:

   ```powershell
   npm run build
   ```

2. **Upload to S3**:

   ```powershell
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **CloudFront Configuration**:
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 → /index.html (200)
   - SSL: Use ACM certificate
   - Security headers: Lambda@Edge

### Docker (Self-Hosted)

**Dockerfile**:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'; ..." always;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Deploy**:

```powershell
docker build -t jarvis-frontend .
docker run -p 80:80 jarvis-frontend
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Wallet connection works (MetaMask, WalletConnect)
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Mobile responsive

### 2. Test Security Headers

```powershell
curl -I https://your-domain.com
```

Verify:

- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS)

### 3. Performance Testing

Run Lighthouse:

```powershell
npx lighthouse https://your-domain.com --view
```

Targets:

- Performance: >= 90
- Accessibility: >= 90
- Best Practices: >= 90
- SEO: >= 90

### 4. Configure DNS

Point your domain to Vercel:

```
A record: 76.76.21.21
CNAME: cname.vercel-dns.com
```

### 5. Enable HTTPS

Vercel auto-provisions SSL (Let's Encrypt).

For other platforms:

- AWS: ACM certificate
- Self-hosted: Let's Encrypt + Certbot

---

## Monitoring & Maintenance

### Error Tracking (Sentry)

1. **Create Sentry Project**: https://sentry.io
2. **Get DSN**: Project Settings → Client Keys
3. **Add to Environment**:
   ```bash
   VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```
4. **Configure Alerts**: Set up email/Slack notifications

### Analytics (Google Analytics)

1. **Create GA4 Property**: https://analytics.google.com
2. **Get Tracking ID**: Admin → Data Streams
3. **Add to Environment**:
   ```bash
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

### Uptime Monitoring

Use services like:

- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://pingdom.com
- **StatusCake**: https://statuscake.com

Configure:

- Check interval: 5 minutes
- Alerts: Email, SMS, Slack
- Locations: Multiple regions

### Dependency Updates

**Automated** (Dependabot):

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 10
```

**Manual**:

```powershell
# Check outdated
npm outdated

# Update non-breaking
npm update

# Update major versions (carefully!)
npm install package-name@latest

# Always audit after updates
npm audit
npm test
```

### Security Audits

**Weekly**:

```powershell
npm audit
npm run audit:security
```

**Monthly**:

- Review Dependabot PRs
- Check CVE databases
- Update dependencies

**Quarterly**:

- External penetration test
- Code security review
- Update security documentation

---

## Rollback Procedure

### Vercel

```powershell
# List deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

### Git Revert

```powershell
# Revert last commit
git revert HEAD
git push origin main

# Revert to specific commit
git revert <commit-hash>
git push origin main
```

---

## Troubleshooting

### Build Fails

1. **Check logs**: Vercel dashboard or CI
2. **Verify environment variables**: All required vars set?
3. **Local build**: `npm run build` locally
4. **Clear cache**: `npm ci` (clean install)

### Site Down

1. **Check status**: Vercel status page
2. **Check DNS**: `dig your-domain.com`
3. **Check SSL**: `openssl s_client -connect your-domain.com:443`
4. **Rollback**: Use previous deployment

### Performance Issues

1. **Check bundle size**: `npm run analyze-bundle`
2. **Review Lighthouse report**
3. **Enable compression**: Gzip/Brotli
4. **CDN**: Use Vercel Edge Network or CloudFlare

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **Discord**: [Join our community](https://discord.gg/jarvis)
- **Issues**: [GitHub Issues](https://github.com/your-org/jarvis/issues)

---

**Deployment Status**: Ready for production 🚀

Last Updated: 2024-01-XX
