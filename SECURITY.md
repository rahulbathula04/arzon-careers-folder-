# 🔒 Security & Responsible Disclosure Policy

**Arzon Global** takes platform security, data integrity, and candidate privacy seriously.

## 🛡️ Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported |
|:---|:---|
| Main / Master (Production) | :white_check_mark: |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, please do **NOT** create a public GitHub issue.

Instead, please responsibly disclose it by emailing our engineering and security team:

- **Email**: `security@arzonglobal.com` *(or `contact@arzonglobal.com`)*
- **Subject**: `[SECURITY VULNERABILITY]: <Brief Description>`

Please include in your report:
1. Description of the vulnerability and its potential impact.
2. Step-by-step reproduction instructions or proof of concept (PoC).
3. Suggested remediation or patch (if available).

Our team will acknowledge receipt of your report within **24 hours** and provide regular status updates until the patch is deployed.

---

## 🔐 Security Best Practices in this Codebase

- **Row Level Security (RLS)**: Enforced across all Supabase database tables.
- **Hook Authentication**: All cron/webhook endpoints require secure signatures via `verifyHookSecret`.
- **Zero Raw Secrets in Git**: No `.env` files or service keys are permitted in remote repositories.
