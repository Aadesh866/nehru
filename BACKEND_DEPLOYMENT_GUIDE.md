# Frontend Factory: Backend Deployment Guide (Hetzner)

This guide is designed for deploying the multi-store backend architecture (Medusa + Payload CMS) on a fresh server (e.g., Hetzner).

## Architecture Overview

The backend is fully containerized and consists of:
1. **Medusa Backend** (Port 9000): The core commerce engine managing Sales Channels, Price Lists, Carts, and Checkout.
2. **Payload CMS** (Port 3000): The presentation layer storing `Websites` configs and `ProductWebsites` overrides (dynamic titles, slugs, SEO).
3. **PostgreSQL 16**: Powers both Medusa and Payload via isolated databases (`medusa` and `payload`).
4. **Redis**: Handles caching and background jobs for Medusa.

## 1. Server Prerequisites

On your Hetzner server (Ubuntu/Debian), install Git, Docker, and Docker Compose:

```bash
sudo apt update
sudo apt install -y git docker.io docker-compose
sudo systemctl enable --now docker
```

## 2. Clone the Repository

Clone the project to your server:

```bash
git clone <YOUR_REPO_URL> medusa-factory
cd medusa-factory
```

*Note: Ensure the `init-postgres.sh` file has execute permissions:*
```bash
chmod +x init-postgres.sh
```

## 3. Environment Variables (.env)

The `docker-compose.yml` is pre-configured with default credentials for testing. 

> [!WARNING]
> **For Production/Public Deployment:**
> You must change the `JWT_SECRET`, `COOKIE_SECRET`, `PAYLOAD_SECRET`, and Postgres passwords in the `docker-compose.yml` file or abstract them into a `.env` file before exposing this to the public web.

## 4. Spin up the Database Infrastructure

First, bring up the database and cache to ensure they initialize properly (the `init-postgres.sh` script will automatically create the `payload` database alongside the `medusa` database).

```bash
docker-compose up -d database redis
```

Wait 5-10 seconds for Postgres to initialize. 

## 5. Seed the Database

Before starting the applications, you need to run the migrations and seed the database. We have customized the `seed.ts` script to automatically create your multi-store architecture (Sales Channels for Store A, Store B, and Store C).

Run the Medusa seed command inside a temporary container:

```bash
docker-compose run --rm backend npm run predeploy
docker-compose run --rm backend npm run seed
```

## 6. Start the Backend Applications

Now, start Medusa and Payload CMS:

```bash
docker-compose up -d backend payload
```

## 7. Verify Deployment

- **Medusa API**: `http://<HETZNER_IP>:9000/health`
- **Payload Admin UI**: `http://<HETZNER_IP>:3000/admin`

> [!TIP]
> **Next Steps for Store Configuration:**
> 1. Log in to the Payload Admin UI (create your first user on the initial screen).
> 2. Go to the **Websites** collection and create a record for your domain (e.g., `store-a.com`).
> 3. Go to Medusa (or query via API) and retrieve the `sales_channel_id` for "Store A". Paste this into your Website record in Payload.
> 4. Use the **Product Websites** collection in Payload to override titles, descriptions, and slugs for products specific to that website.
> 5. Use Medusa's Admin/API to set Prices Lists explicitly for the "Store A" Sales Channel.
