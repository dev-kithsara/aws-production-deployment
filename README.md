# ☁️ AWS Production-Ready 3-Tier Cloud Deployment (CloudTask)

[![AWS](https://img.shields.io/badge/AWS-Cloud-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD_OIDC-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-REST_API-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 📌 Executive Summary

**CloudTask** is an enterprise-grade, highly available, secure **3-Tier Web Application** designed and deployed on AWS. This repository demonstrates production-level **Cloud Architecture**, **Infrastructure as Code (IaC)** with Terraform, **Containerization** with Docker, and automated **GitOps CI/CD** using GitHub Actions with keyless **AWS OIDC (OpenID Connect)** authentication.

The architecture is meticulously engineered against the **AWS Well-Architected Framework** (Security, Reliability, Operational Excellence, Performance Efficiency, Cost Optimization) with a **$0 Free-Tier-First** approach.

---

## 🏛️ Target Cloud Architecture

```text
                                 INTERNET
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Internet Gateway   │
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
                         │ Application Load    │
                         │ Balancer (ALB)      │
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
                    │  Private Subnets (Isolated) │
                    │ 10.0.11.0/24 | 10.0.12.0/24 │
                    │                             │
                    │     AWS RDS PostgreSQL      │
                    │         [Port 5432]         │
                    └─────────────────────────────┘

┌─────────────────┐     ┌───────────────────────┐     ┌───────────────────────┐
│   Amazon S3     │     │ AWS Systems Manager   │     │  Amazon CloudWatch    │
│ (Static Assets) │     │ (SSM Parameter Store) │     │(Logs, Metrics, Alarms)│
└─────────────────┘     └───────────────────────┘     └───────────────────────┘
```

---

## 🛡️ Security Architecture & Least-Privilege Design

- 🔒 **Security Group Chaining (Zero Open Internal Ports):**
  - **ALB Security Group:** Accepts HTTP (80) / HTTPS (443) from `0.0.0.0/0`.
  - **EC2 Security Group:** Port `5000` is strictly restricted to traffic originating **ONLY** from the ALB Security Group ID. Direct internet access to compute nodes is completely blocked.
  - **RDS Security Group:** PostgreSQL Port `5432` is restricted to traffic originating **ONLY** from the EC2 Security Group ID.
- 🧱 **Database Isolation:** Amazon RDS PostgreSQL resides strictly within isolated **Private Subnets** with `Publicly Accessible = false`.
- 🔑 **Keyless AWS OIDC Authentication:** GitHub Actions assumes temporary IAM roles via OpenID Connect (OIDC). No long-lived static AWS access keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) are stored in GitHub Secrets.
- 🗄️ **Zero Hardcoded Secrets:** Application secrets (JWT Secret, Database Credentials) are fetched securely from **AWS SSM Parameter Store** (`SecureString`).
- 🛡️ **Application Layer Hardening:** Password hashing using `bcryptjs` (salt rounds: 10), stateless authentication using `JWT`, input validation using `Zod`, and sanitized database queries using `Prisma ORM` (SQL injection immune).

---

## ⚡ High Availability, Self-Healing & Scalability

- **Multi-AZ Redundancy:** Workloads and database subnets span across multiple AWS Availability Zones (`AZ-a` and `AZ-b`) for fault tolerance.
- **Auto Scaling & Self-Healing:** The EC2 fleet is orchestrated via an **Auto Scaling Group (ASG)** with Target Tracking Policies based on CPU utilization and request count metrics.
- **Active Health Probing:** The Application Load Balancer continuously probes the `/api/health` endpoint. If an instance fails, traffic is rerouted within seconds while ASG terminates and replaces the unhealthy node.

---

## 🚀 CI/CD Pipeline Flow (GitHub Actions + AWS OIDC)

```text
 Developer       Push to main        GitHub Actions Workflow
   [💻] ──────────────► [🐙] ───────────────────► [⚙️ Pipeline]
                                                        │
                             ┌──────────────────────────┴──────────────────────────┐
                             ▼                                                     ▼
                     [ CI Stage ]                                          [ CD Stage ]
             * Linting & Code Quality                               * AWS OIDC Authentication
             * Unit & Integration Tests                             * Build Docker Container Images
             * Prisma Schema Validation                             * Deploy to EC2 / ASG Target
                                                                    * Run Prisma DB Migrations
```

---

## 💰 Cost Optimization & Free-Tier Engineering

Engineered to showcase enterprise cloud best practices while remaining **100% Free-Tier compliant**:

| Component / Layer            | Production-Scale Architecture      | Portfolio Cost-Optimized Choice              | Monthly Est. Cost     |
| :--------------------------- | :--------------------------------- | :------------------------------------------- | :-------------------- |
| **Compute**                  | Multiple Large EC2s / EKS Cluster  | Auto Scaling `t2.micro` / `t3.micro`         | **$0.00** (Free Tier) |
| **Database**                 | Multi-AZ RDS Aurora PostgreSQL     | Single-AZ `db.t3.micro` / `db.t4g.micro`     | **$0.00** (Free Tier) |
| **Networking**               | NAT Gateways ($32+/mo each)        | Public Subnet Direct Routing (No NAT GW)     | **$0.00**             |
| **Secrets Management**       | AWS Secrets Manager ($0.40/secret) | AWS SSM Parameter Store (Standard)           | **$0.00**             |
| **Infrastructure Lifecycle** | 24/7 Running Stack                 | Automated Provision & Teardown via Terraform | **$0.00**             |

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
│   │   │   └── server.js          # Express app entry point
│   │   ├── Dockerfile             # Multi-stage production container build
│   │   └── package.json
│   └── frontend/
│       ├── src/                   # React SPA (Dashboard, Auth, API client)
│       │   ├── components/        # Reusable UI components (Navbar, TaskCard)
│       │   ├── pages/             # AuthPage, Dashboard
│       │   ├── services/          # Axios API interceptor service
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── Dockerfile             # Production NGINX/Vite build
│       ├── vite.config.js
│       └── package.json
├── docs/
│   ├── architecture/              # Diagrams and architectural schematics
│   ├── decisions/                 # Architectural Decision Records (ADRs)
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

## 🛠️ Local Development & Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/)
- [Node.js (v20+)](https://nodejs.org/) & `npm`
- [PostgreSQL](https://www.postgresql.org/) (or use Docker container)

### 1. Clone the Repository

```bash
git clone https://github.com/<YOUR_USERNAME>/aws-production-deployment.git
cd aws-production-deployment
```

### 2. Run Backend Locally

```bash
cd app/backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

_Backend runs on: `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`)_

### 3. Run Frontend Locally

```bash
cd ../frontend
npm install
npm run dev
```

_Frontend UI runs on: `http://localhost:5173`_

---

## 🏗️ Infrastructure Deployment (Terraform)

Deploy the entire AWS infrastructure with zero manual console configuration:

```bash
cd infrastructure/terraform

# 1. Initialize Terraform plugins
terraform init

# 2. Preview infrastructure plan
terraform plan

# 3. Provision AWS Infrastructure
terraform apply -auto-approve

# 4. Teardown Infrastructure (Zero-Cost Protection)
terraform destroy -auto-approve
```

---

## 🧪 Resiliency & Chaos Testing Scenarios

| Test Case              | Simulated Failure                    | Expected System Behavior                                                | Observed Outcome                                            | Evidence                                    |
| :--------------------- | :----------------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------ |
| **Node Failure**       | Manually terminated 1 EC2 in ASG     | ALB detects failure, ASG automatically provisions new node              | Zero client downtime; new node joined ALB target within 90s | `docs/screenshots/asg-healing.png`          |
| **App Health Failure** | Terminated Express process on Node A | ALB health check fails (`/api/health`), reroutes 100% traffic to Node B | Continuous 200 OK responses on client sessions              | `docs/screenshots/healthcheck-failover.png` |
| **Traffic Spike**      | Generated synthetic HTTP load on ALB | CPU spike triggers CloudWatch Alarm & ASG Scale-out policy              | Auto-scaled from 2 to 4 nodes dynamically                   | `docs/screenshots/cloudwatch-scaleout.png`  |

---

## 📈 AWS Well-Architected Framework Mapping

- **Operational Excellence:** Complete Infrastructure as Code with Terraform and automated CI/CD deployment pipelines via GitHub Actions.
- **Security:** Strict security group chaining, isolated private subnets, keyless OIDC IAM roles, and secret encryption at rest.
- **Reliability:** Multi-AZ deployment, Auto Scaling self-healing instances, automated ALB health check routing.
- **Performance Efficiency:** Lightweight containerized microservices, stateless compute, and connection-pooled database queries via Prisma ORM.
- **Cost Optimization:** Tailored for 100% AWS Free-Tier eligibility with automated lifecycle destroy scripts.

---

## 👤 Author

**Kithsara**  
_Cloud & DevOps Engineer_

- 🌐 **GitHub:** [@dev-kithsara](https://github.com/dev-kithsara)
- 💼 **LinkedIn:** https://www.linkedin/kithsara-silva
