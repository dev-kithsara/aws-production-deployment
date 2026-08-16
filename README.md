# ☁️ AWS Production-Ready 3-Tier Cloud Deployment (CloudTask)

[![AWS](https://img.shields.io/badge/AWS-Cloud-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD_OIDC-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-REST_API-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 📌 Executive Summary

**CloudTask** is an enterprise-grade, highly available, secure **3-Tier Web Application** designed and deployed on AWS. This repository showcases production-level **Cloud Architecture**, **Infrastructure as Code (IaC)** with Terraform, **Containerization** with Docker, and automated **GitOps CI/CD** using GitHub Actions with keyless **AWS OIDC (OpenID Connect)** authentication.

The architecture is meticulously engineered against the **AWS Well-Architected Framework** (Security, Reliability, Operational Excellence, Performance Efficiency, and Cost Optimization) with a strict **$0 Free-Tier-First Cost Protection Plan**.

---

## 🚦 Project Implementation Roadmap

| Phase | Milestone | Focus Area | Status |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **Project Foundation** | GitHub Repo, Standards, Multi-Tier Directory Layout | `✅ Complete` |
| **Phase 1** | **Local Application** | React SPA + Express API + PostgreSQL + Prisma ORM | `✅ Complete` |
| **Phase 2** | **Containerization** | Multi-Container Docker Stack, Healthchecks, Volumes | `✅ Complete` |
| **Phase 3** | **AWS VPC & Networking** | Custom VPC (10.0.0.0/16), Multi-AZ Subnets, IGW, Route Tables | `✅ Complete` |
| **Phase 4** | **IAM & Security Groups** | Least-Privilege Security Group Chaining & IAM Roles | `⏳ In Progress` |
| **Phase 5** | **Compute (EC2)** | Single-node Dockerized API Deployment & Validation | `⏳ Planned` |
| **Phase 6** | **Database (RDS)** | Managed PostgreSQL in Private Subnets (Isolated) | `⏳ Planned` |
| **Phase 7** | **Load Balancing (ALB)** | Multi-AZ Application Load Balancer with Health Checks | `⏳ Planned` |
| **Phase 8** | **High Availability & ASG** | Auto Scaling Group with Target Tracking Policies | `⏳ Planned` |
| **Phase 9** | **Object Storage (S3)** | Decoupled Static Asset Storage & IAM Policies | `⏳ Planned` |
| **Phase 10** | **Observability** | CloudWatch Metrics, Alarms, Logs & Health Monitoring | `⏳ Planned` |
| **Phase 11** | **Automated CI/CD** | GitHub Actions Pipeline with Keyless AWS OIDC Auth | `⏳ Planned` |
| **Phase 12** | **IaC with Terraform** | Modular Infrastructure as Code (Build / Teardown) | `⏳ Planned` |
| **Phase 13** | **Security Hardening** | SSM Parameter Store Secrets & Encryption at Rest | `⏳ Planned` |
| **Phase 14** | **Well-Architected Review** | Comprehensive 6-Pillars Workload Assessment | `⏳ Planned` |
| **Phase 15** | **Resiliency & Chaos Tests** | Node Kill, Health Failover & Traffic Spike Tests | `⏳ Planned` |

---

## 🏛️ Target Cloud Architecture

```text
                                 INTERNET
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Internet Gateway  │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
         ┌─────────────────────┐         ┌─────────────────────┐
         │ Public Subnet (AZ-A)│         │ Public Subnet (AZ-B)│
         │     10.0.1.0/24     │         │     10.0.2.0/24     │
         └──────────┬──────────┘         └──────────┬──────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Application Load   │
                         │   Balancer (ALB)    │
                         │   [Port 80 / 443]   │
                         └──────────┬──────────┘
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
    ┌─────────────────────┐                   ┌─────────────────────┐
    │  EC2 (Target Group) │                   │  EC2 (Target Group) │
    │  Auto Scaling Group │                   │  Auto Scaling Group │
    │  Node.js API (:5000)│                   │  Node.js API (:5000)│
    └──────────┬──────────┘                   └──────────┬──────────┘
               │                                         │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────┐
                    │   Private Subnets (Isolated)│
                    │ 10.0.11.0/24 | 10.0.12.0/24 │
                    │                             │
                    │      AWS RDS PostgreSQL     │
                    │          [Port 5432]        │
                    └─────────────────────────────┘

┌─────────────────┐     ┌───────────────────────┐     ┌───────────────────────┐
│   Amazon S3     │     │  AWS Systems Manager  │     │   Amazon CloudWatch   │
│ (Static Assets) │     │ (SSM Parameter Store) │     │(Logs, Metrics, Alarms)│
└─────────────────┘     └───────────────────────┘     └───────────────────────┘
```

---

## 🌐 Phase 3 Implemented Network Specifications

The networking foundation is provisioned in AWS with multi-AZ fault tolerance and strict routing isolation:

| Resource Name | Resource Type | CIDR / Target | Availability Zone | Routing Scope / Target |
| :--- | :--- | :--- | :--- | :--- |
| **`cloudtask-vpc`** | Custom VPC | `10.0.0.0/16` | Multi-AZ | Local Virtual Network |
| **`cloudtask-igw`** | Internet Gateway | N/A | VPC-attached | Outbound/Inbound Public Gateway |
| **`cloudtask-public-a`** | Public Subnet | `10.0.1.0/24` | `AZ-a` (us-east-1a) | Routed to `cloudtask-igw` (`0.0.0.0/0`) |
| **`cloudtask-public-b`** | Public Subnet | `10.0.2.0/24` | `AZ-b` (us-east-1b) | Routed to `cloudtask-igw` (`0.0.0.0/0`) |
| **`cloudtask-private-a`** | Private Subnet | `10.0.11.0/24` | `AZ-a` (us-east-1a) | Isolated (Local route only) |
| **`cloudtask-private-b`** | Private Subnet | `10.0.12.0/24` | `AZ-b` (us-east-1b) | Isolated (Local route only) |
| **`cloudtask-public-rt`** | Public Route Table | `0.0.0.0/0 ➔ IGW` | Multi-AZ | Associated with Public Subnets A & B |
| **`cloudtask-private-rt`** | Private Route Table | `10.0.0.0/16 ➔ local` | Multi-AZ | Associated with Private Subnets A & B |

<details>
<summary><b>📸 Click to view AWS Console Proof of Work (Phase 3 Screenshots)</b></summary>

| AWS VPC Setup | Subnets & CIDRs |
| :---: | :---: |
| ![VPC Details](docs/screenshots/cloudtask-vpc%20details.png) | ![Subnets Configuration](docs/screenshots/Four%20Subnets%20with%20AZ%20and%20%20CIDR%20.png) |

| Public Route Table Associations | Private Route Table Associations |
| :---: | :---: |
| ![Public RT](docs/screenshots/cloudtask-public-rt%20%20Routes%20and%20Subnet%20Associations.png) | ![Private RT](docs/screenshots/cloudtask-private-rt%20Routes%20and%20Subnet%20Associations.png) |

</details>

---

## 🛡️ Security Architecture & Least-Privilege Design

- 🔒 **Strict Security Group Chaining (Zero Open Internal Ports):**
  - **ALB Security Group:** Accepts HTTP (80) / HTTPS (443) from `0.0.0.0/0`.
  - **EC2 Security Group:** Port `5000` is strictly restricted to traffic originating **ONLY** from the ALB Security Group ID. Direct internet access to compute nodes is completely blocked.
  - **RDS Security Group:** PostgreSQL Port `5432` is restricted to traffic originating **ONLY** from the EC2 Security Group ID.
- 🧱 **Database Isolation:** Amazon RDS PostgreSQL resides strictly within isolated **Private Subnets** with `Publicly Accessible = false`.
- 🔑 **Keyless AWS OIDC Authentication:** GitHub Actions assumes temporary IAM roles via OpenID Connect (OIDC). No long-lived static AWS access keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) are stored in GitHub Secrets.
- 🗄️ **Zero Hardcoded Secrets:** Application secrets (JWT Secret, Database Credentials) are fetched securely from **AWS SSM Parameter Store** (`SecureString`).
- 🛡️ **Application Layer Hardening:** Password hashing using `bcryptjs` (salt rounds: 10), stateless authentication using `JWT`, input validation using `Zod`, and sanitized database queries using `Prisma ORM` (SQL injection immune).

---

## 💰 Cost Optimization & Free-Tier Engineering

Engineered to showcase enterprise cloud best practices while remaining **100% Free-Tier compliant**:

| Component / Layer | Production Architecture | Portfolio Cost-Optimized Solution | Monthly Est. Cost |
| :--- | :--- | :--- | :--- |
| **Networking** | NAT Gateways ($32+/mo each) | Public Subnet direct routing (No NAT Gateway) | **$0.00** |
| **Database** | Multi-AZ RDS Aurora PostgreSQL | Single-AZ `db.t3.micro` / `db.t4g.micro` (20GB storage) | **$0.00** (Free Tier) |
| **Compute** | Multiple Large EC2s / EKS Cluster | Auto Scaling `t2.micro` / `t3.micro` instances | **$0.00** (Free Tier) |
| **Secrets Management** | AWS Secrets Manager ($0.40/secret) | AWS SSM Parameter Store (Standard Tier) | **$0.00** |
| **Lifecycle Policy** | 24/7 Running Workloads | Automated Provision & Teardown via Terraform | **$0.00** |

---

## 🛠️ Local Multi-Container Development (Docker Compose)

The entire full-stack multi-tier application is containerized and orchestratable locally with healthcheck synchronization.

### Prerequisites
- [Docker Desktop](https://www.docker.com/) installed and running
- [Git](https://git-scm.com/)

### 1. Start the Complete Stack
```bash
# Clone the repository
git clone https://github.com/dev-kithsara/aws-production-deployment.git
cd aws-production-deployment

# Build images and start multi-container stack in detached mode
docker compose up --build -d
```

### 2. Apply Database Migrations inside Container
```bash
docker compose exec backend npx prisma migrate deploy
```

### 3. Access Application Services
- 🌐 **Frontend SPA:** [http://localhost:5173](http://localhost:5173)
- ⚙️ **Backend API:** [http://localhost:5000](http://localhost:5000)
- ❤️ **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Stop Containers
```bash
docker compose down
```

---

## 📂 Repository Structure

```bash
aws-production-deployment/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated testing, linting & schema validation
│       └── deploy.yml             # Keyless OIDC AWS deployment pipeline
├── app/
│   ├── backend/
│   │   ├── prisma/                # Schema definitions & database migrations
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── config/            # DB client & environment configuration
│   │   │   ├── controllers/       # Request handlers & Zod input validation
│   │   │   ├── middleware/        # JWT auth validation & error handlers
│   │   │   ├── routes/            # REST endpoints (/api/health, /api/auth, /api/tasks)
│   │   │   ├── services/          # Business logic layer
│   │   │   └── server.js          # Express app entry point
│   │   ├── Dockerfile             # Alpine Linux Node.js container build
│   │   ├── .dockerignore
│   │   └── package.json
│   └── frontend/
│       ├── src/                   # React SPA (Dashboard, Auth, API client)
│       │   ├── components/        # Reusable UI components (Navbar, TaskList)
│       │   ├── pages/             # AuthPage, Dashboard
│       │   ├── services/          # Axios API interceptor service
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── Dockerfile             # Vite / React container build
│       ├── .dockerignore
│       ├── vite.config.js
│       └── package.json
├── docs/
│   ├── architecture/              # Diagrams and architectural schematics
│   ├── decisions/                 # Architectural Decision Records (ADRs)
│   │   ├── 001-project-architecture.md
│   │   ├── 002-containerization.md
│   │   └── 003-vpc-network-architecture.md
│   └── screenshots/               # Proof of Work & AWS Console validation
├── infrastructure/
│   └── terraform/
│       ├── environments/          # dev / prod environment configurations
│       ├── modules/
│       │   ├── vpc/               # Custom VPC, Multi-AZ Subnets, Route Tables, IGW
│       │   ├── security/          # Chained Security Groups & IAM Roles
│       │   ├── compute/           # ALB, Launch Templates, Auto Scaling Group
│       │   └── database/          # RDS PostgreSQL Subnet Groups & Instance
│       ├── main.tf                # Root infrastructure composition
│       ├── variables.tf           # Configurable infrastructure parameters
│       └── outputs.tf             # ALB DNS, RDS Endpoints, VPC IDs
├── docker-compose.yml             # Local multi-container orchestration
└── README.md
```

---

## 📜 Architectural Decision Records (ADRs)

Key architectural and operational decisions are documented to maintain transparent engineering rationale:

- 📑 **[ADR 001: Initial Multi-Tier Architecture & Tech Stack Selection](file:///c:/Free_lancing/Cloud%20Engineering%20Learning/aws-production-deployment/docs/decisions/001-project-architecture.md)**
- 📑 **[ADR 002: Containerization Strategy with Docker Compose](file:///c:/Free_lancing/Cloud%20Engineering%20Learning/aws-production-deployment/docs/decisions/002-containerization.md)**
- 📑 **[ADR 003: Multi-AZ Custom VPC Network Architecture](file:///c:/Free_lancing/Cloud%20Engineering%20Learning/aws-production-deployment/docs/decisions/003-vpc-network-architecture.md)**

---

## 📈 AWS Well-Architected Framework Alignment

- **Operational Excellence:** Modular Infrastructure as Code (Terraform), centralized logging, automated GitOps CI/CD pipelines via GitHub Actions.
- **Security:** Layer-by-layer security group chaining, private database isolation, short-lived OIDC credentials, and encrypted parameters.
- **Reliability:** Multi-AZ subnet distribution, stateless compute nodes, auto-healing EC2 fleet, and health check traffic rerouting.
- **Performance Efficiency:** Optimized lightweight Alpine container images, connection pooling via Prisma, and scalable load balancing.
- **Cost Optimization:** Rigorous zero-cost design avoiding NAT Gateway traps, right-sized Free-Tier compute (`t2.micro`/`t3.micro`) and single-AZ RDS during lab evaluation.

---

## 👤 Author

**Kithsara**  
*Cloud & DevOps Engineer*

- 🌐 **GitHub:** [@dev-kithsara](https://github.com/dev-kithsara)
- 💼 **LinkedIn:** [linkedin.com/in/kithsara-silva](https://www.linkedin.com/in/kithsara-silva)
