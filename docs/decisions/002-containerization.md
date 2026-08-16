# Architecture Decision 002: Containerization with Docker Compose

## Status

Accepted

## Context

To achieve environment parity between local development and future AWS deployments (EC2/ECS), the entire multi-tier application needs to be containerized and isolated.

## Decision

1. Containerized the React frontend, Express backend, and PostgreSQL database using Docker.
2. Implemented `docker-compose.yml` for unified local service orchestration.
3. Configured health checks and startup dependencies (`condition: service_healthy`).
4. Utilized named volumes (`postgres_data`) for persistent database storage.

## Consequences

- Eliminates "works on my machine" issues.
- Provides container artifacts ready for automated CI/CD and AWS deployment.
