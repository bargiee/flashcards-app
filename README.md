# Remind Flashcards App

A full-stack flashcard learning application allowing users to create, manage, and study custom decks. The project supports both local development with Docker Compose and containerized deployment on Kubernetes using Minikube.

---

## Project Description

Remind is a flashcard-based learning app designed to review and memorize content. The application supports user authentication, deck creation and management, study mode, and learning progress tracking.

The project is implemented as a containerized full-stack web app:

- **Backend**: RESTful API built with Node.js, Express, PostgreSQL, Prisma, and JWT-based authentication.
- **Frontend**: Built using React, Vite, and Tailwind CSS. Features include route protection, responsive design, and a simple study interface.
- **Infrastructure**: Dockerized services orchestrated with Docker Compose for local development and Kubernetes manifests for local cluster deployment with Minikube. Includes PostgreSQL, RabbitMQ for background processing, and a dedicated worker service for asynchronous tasks.

---

## Key Features

- JWT-based authentication using access and refresh tokens
- Secure user registration, login, logout, and session handling
- Full CRUD functionality for flashcard decks and individual cards
- Interactive study mode with real-time progress tracking
- Background CSV import handled by asynchronous job processing
- Separate development and production-like environments
- API documentation available through integrated Swagger UI at `/api/docs`

---

## Preview

#### Start Page

![Study Mode](./assets/screenshots/start.png)

#### Login Page

![Study Mode](./assets/screenshots/login.png)

#### Homepage

![Homepage](./assets/screenshots/homepage.png)

#### Library View

![Library](./assets/screenshots/library.png)

#### Create Set

![Study Mode](./assets/screenshots/create.png)

#### Set View

![Study Mode](./assets/screenshots/set-view.png)

#### Flashcard Study Mode

![Study Mode](./assets/screenshots/study.png)

#### Study Summary

![Study Mode](./assets/screenshots/summary.png)

### Database Schema

![Database Schema](./assets/diagramERD.png)

---

## Setup Instructions

### Prerequisites

#### For Docker Compose

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

#### For Kubernetes

- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Task](https://taskfile.dev/installation/)
- `kubectl`
- Hyper-V enabled on Windows

### 1. Clone the repository

```bash
git clone github.com/bargiee/flashcards-app.git
cd flashcards-app  # Navigate into the project directory
```

### 2. Configure Environment Variables

Create a `.env` file inside the `backend` directory with the following content:

```env
PORT=8080
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydatabase"

JWT_SECRET="your_access_secret"
JWT_EXPIRES_IN=1800 # 30 minutes

JWT_REFRESH_SECRET="your_refresh_secret"
JWT_REFRESH_EXPIRES_IN=604800 # 7 days
```

## Build and run

### Run with Docker Compose

From the root of the project directory:

```bash
docker compose up -d --build
```

Initialize Prisma Client:

```bash
docker compose exec backend npx prisma generate
docker compose exec worker npx prisma generate
```

Apply database migrations:

```bash
docker compose exec backend npx prisma migrate deploy
```

Rebuild the backend container:

```bash
docker compose up -d --build backend
```

Then access:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)

---

### Run with Kubernetes

The following instructions are intended for a Windows setup with Minikube using the Hyper-V driver.

### Option 1: Run with Taskfile

Start the full Kubernetes setup using the Taskfile:

```bash
task k8s:up
```

If needed, run individual tasks separately:

```bash
task k8s:start
task k8s:build
task k8s:deploy
task k8s:migrate
```

### Option 2: Run commands step by step

#### 1. Start Minikube

```bash
minikube config set driver hyperv
minikube start --driver=hyperv
minikube addons enable ingress
```

#### 2. Build application images inside Minikube

```bash
./k8s/scripts/build-images.sh
```

#### 3. Deploy Kubernetes manifests

```bash
./k8s/scripts/deploy-base.sh
```

#### 4. Run Prisma migrations

```bash
./k8s/scripts/run-migrations.sh
```

### Configure local host mapping

To access the application through Kubernetes Ingress, add the ingress IP address to your hosts file.
This step is required whether you use the Taskfile or run the commands manually.

Get the ingress address:

```bash
kubectl get ingress -n flashcards-app
```

Then add the returned IP to your hosts file:

Edit:

```bash
C:\Windows\System32\drivers\etc\hosts
```

Add:

```bash
<INGRESS_IP> flashcards.local
```

#### Access the application

- Frontend: [http://flashcards.local](http://flashcards.local)

## Additional Notes

- **API Documentation**
    - Generated using Swagger.
    - Contains complete reference details for endpoints, parameters, request/response bodies, and auth requirements.
    - Available at:
        - `http://localhost:8080/api/docs` when running with Docker Compose
        - `http://flashcards.local/api/docs` when running with Kubernetes

- **RabbitMQ**
    - Used for handling asynchronous CSV import jobs to prevent API delays.
    - Login: `guest` / `guest`
    - Management UI available at `http://localhost:15672` when running with Docker Compose.
