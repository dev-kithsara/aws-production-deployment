# Architecture Decision 004: Least-Privilege Security Group Chaining & IAM Roles

## Status

Accepted

## Context

In a multi-tier cloud environment, compute and database tiers must be isolated from direct internet access, while dynamic scaling nodes require seamless network access authorization without static IP rules.

## Decision

1. Established dedicated Security Groups per architectural tier (`cloudtask-alb-sg`, `cloudtask-ec2-sg`, `cloudtask-rds-sg`).
2. Implemented Security Group ID referencing instead of subnet IP CIDR blocks to support dynamic Auto Scaling compute instances.
3. Created `CloudTaskEC2Role` for IAM role-based temporary credential delivery.
4. Blocked public SSH (Port 22) in favor of AWS Systems Manager Session Manager.

## Consequences

- Zero internal ports exposed to the public internet.
- High resilience against network scanning and unauthorized database queries.
- $0 AWS cost incurred.
