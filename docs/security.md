# 🛡️ CloudTask Security Architecture

This document details the security design and least-privilege access controls implemented across AWS IAM and VPC Security Groups for the CloudTask 3-Tier deployment.

---

## 1. Identity and Access Management (IAM)

- **Root User Hardening:** The AWS Root account is secured with Multi-Factor Authentication (MFA) and contains zero active long-lived access keys.
- **Instance Profiles / Roles:** Compute nodes utilize `CloudTaskEC2Role` to acquire temporary credentials via AWS STS. No AWS access keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) are stored in instance files or environments.
- **Least Privilege:** Roles and policies are scoped to exact service actions only when required.

---

## 2. Network Tier Isolation (Security Group Chaining)

Network traffic is strictly controlled through multi-tier Security Group referencing without opening internal ports to CIDR blocks:

```text
[ Internet (0.0.0.0/0) ]
          │  TCP 80 (HTTP)
          ▼
┌──────────────────────────┐
│     cloudtask-alb-sg     │
└─────────┬────────────────┘
          │  TCP 5000 (Source: cloudtask-alb-sg)
          ▼
┌──────────────────────────┐
│     cloudtask-ec2-sg     │
└─────────┬────────────────┘
          │  TCP 5432 (Source: cloudtask-ec2-sg)
          ▼
┌──────────────────────────┐
│     cloudtask-rds-sg     │
└──────────────────────────┘
```

Security Group Rule MatrixSecurity GroupDirectionProtocolPort RangeAllowed SourceSecurity Rationalecloudtask-alb-sgInboundTCP800.0.0.0/0Public entry point for HTTP requests.cloudtask-ec2-sgInboundTCP5000cloudtask-alb-sgCompute layer exposed ONLY to the ALB. Direct public access blocked.cloudtask-rds-sgInboundTCP5432
