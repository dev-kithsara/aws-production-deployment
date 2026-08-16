# Architecture Decision 003: VPC Multi-AZ Network Architecture

## Status

Accepted

## Context

A resilient, production-ready, and isolated networking foundation is required on AWS to host the CloudTask full-stack application while maintaining strict $0 cost controls.

## Decision

1. **VPC:** Provisioned custom VPC `cloudtask-vpc` with CIDR `10.0.0.0/16`.
2. **Subnets:** Created 4 subnets across 2 Availability Zones (Multi-AZ):
   - `cloudtask-public-a` (`10.0.1.0/24`) in AZ-a (ALB / Public Compute)
   - `cloudtask-public-b` (`10.0.2.0/24`) in AZ-b (ALB / Public Compute)
   - `cloudtask-private-a` (`10.0.11.0/24`) in AZ-a (RDS Database)
   - `cloudtask-private-b` (`10.0.12.0/24`) in AZ-b (RDS Database)
3. **Internet Gateway:** Attached `cloudtask-igw` for public traffic routing.
4. **Routing:**
   - Public Route Table (`cloudtask-public-rt`): `0.0.0.0/0` routed to `cloudtask-igw`.
   - Private Route Table (`cloudtask-private-rt`): Local-only routing (`10.0.0.0/16`) for database tier isolation.
5. **Cost Optimization:** NAT Gateway was explicitly excluded to eliminate recurring hourly and data processing charges during the learning/portfolio phase.

## Consequences

- Strict network tier isolation achieved.
- Zero AWS infrastructure costs incurred for networking.
- Ready for Phase 4 Security Groups and IAM configuration.
