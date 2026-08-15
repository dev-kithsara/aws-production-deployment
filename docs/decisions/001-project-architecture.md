# Architecture Decision 001: Initial Architecture & Tech Stack

## Context

We need a robust, cost-effective ($0 Free-Tier-first) architecture to demonstrate real-world AWS DevOps & Cloud Engineering capabilities.

## Decision

1. **Application:** React frontend + Express/Node.js API + PostgreSQL.
2. **Compute:** EC2 managed via Auto Scaling and Application Load Balancer.
3. **Database:** AWS RDS PostgreSQL isolated in Private Subnets.
4. **IaC:** Terraform for automated build & teardown (cost control).
5. **CI/CD:** GitHub Actions authenticated via AWS OIDC (no static access keys).
