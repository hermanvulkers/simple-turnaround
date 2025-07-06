# ✈️ Simple Schiphol Turnaround Monitor

A real-time (simulated) aircraft turnaround monitoring system built with modern web technologies and deployed on Kubernetes.  
This project demonstrates real-time event processing with Kafka, GraphQL subscriptions, and WebSocket communication.

> **Note**: This tinkering project was originally named "microblog" but has evolved into a (fake) real-time aircraft turnaround monitoring system. The name "microblog" is still used in some Kubernetes resources and Helm charts due to existing AKS (Azure Kubernetes Service) deployments that are cumbersome to rename. The application itself is now called "Simple Turnaround".

---

## 🔧 Stack

| Component        | Technology                    |
| ---------------- | ----------------------------- |
| Frontend         | React 19 + Vite + TypeScript  |
| Backend          | NestJS + GraphQL + WebSockets |
| Database         | Kafka (event streaming)       |
| Real-time        | GraphQL Subscriptions         |
| Containerization | Docker                        |
| Orchestration    | Kubernetes + Helm Charts      |
| Cluster          | Local development with Kind   |
| Production       | Azure Kubernetes Service (AKS) |

---

## 🎯 What this project demonstrates

✅ Real-time event processing with Apache Kafka  
✅ GraphQL subscriptions for live updates  
✅ WebSocket communication with Socket.io  
✅ Modern React with TypeScript and Vite  
✅ NestJS backend with GraphQL and WebSocket support  
✅ Kubernetes deployment with Helm charts  
✅ Event-driven architecture  
✅ Simulated real-time aircraft turnaround monitoring  
✅ HTTPS/TLS termination with Let's Encrypt  
✅ Ingress routing with NGINX  

---

## 🚀 Features

- **Real-time Updates**: Simulated live aircraft turnaround events via GraphQL subscriptions
- **Event Streaming**: Kafka-based event processing for scalability
- **WebSocket Support**: Real-time bidirectional communication
- **Modern UI**: Clean, responsive interface with real-time event display
- **Kubernetes Ready**: Full containerization and orchestration support
- **Production Ready**: HTTPS with automatic certificate management
- **Scalable Architecture**: Microservices with event-driven communication

---

## 🌐 Live Demo

Visit the live application at: [https://www.hermanvulkers.com](https://www.hermanvulkers.com)

---

## 🚀 Installation & Setup

### 1. Requirements

- [Docker](https://www.docker.com/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) (for local development)
- [helm](https://helm.sh/)
- [Node.js](https://nodejs.org/) (for local development)

### 2. Clone the repo

```bash
git clone https://github.com/yourusername/k8s-microblog.git
cd k8s-microblog
```

### 3. Local Development

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Kafka Setup (for local development)

```bash
# Start Kafka with Docker Compose
docker-compose -f kafka/kafka-stack.yaml up -d
```

### 5. Kubernetes Deployment

#### Local Development with Kind

```bash
# Create cluster
kind create cluster --name microblog

# Build and load Docker images
docker build -t microblog-frontend -f Dockerfile.frontend .
docker build -t microblog-backend -f Dockerfile.backend .

kind load docker-image microblog-frontend --name microblog
kind load docker-image microblog-backend --name microblog

# Deploy with Helm
helm install microblog ./k8s/charts/microblog

# Port forwarding
kubectl port-forward svc/microblog-backend 3000:3000
kubectl port-forward svc/microblog-frontend 8080:80
```

Visit [http://localhost:8080](http://localhost:8080) to see the application.

#### Production Deployment (AKS)

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Deploy ingress with HTTPS
kubectl apply -f k8s/ingress.yaml

# Check deployment status
kubectl get pods -n default
kubectl get ingress -n default
```

---

## 📁 Project Structure

```
k8s-microblog/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── core/           # Core services (Kafka)
│   │   ├── turnarounds/    # Turnaround module
│   │   └── main.ts         # Application entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   └── package.json
├── k8s/                    # Kubernetes configuration
│   ├── charts/            # Helm charts for Kubernetes
│   │   └── microblog/
│   └── ingress.yaml       # Ingress configuration
├── kafka/                  # Kafka configuration
│   └── kafka-stack.yaml   # Kafka development setup
├── Dockerfile.backend      # Backend container
├── Dockerfile.frontend     # Frontend container
└── .github/               # GitHub Actions workflows
```

---

## 🔄 Event Flow

1. **Event Generation**: Backend simulator creates turnaround events
2. **Kafka Processing**: Events are published to Kafka topics
3. **GraphQL Subscription**: Frontend subscribes to real-time updates
4. **UI Updates**: Frontend displays live turnaround events

---

## 🛠 Development

### Adding new turnaround events

Events are automatically generated by the simulator service. You can also manually trigger events via the UI button.

### GraphQL Schema

The backend exposes a GraphQL API with subscriptions for real-time turnaround updates.

### Kafka Topics

- `turnaround-events`: Main topic for turnaround event processing

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/graphql` | GraphQL API endpoint |
| WS     | `/graphql` | WebSocket for subscriptions |
| POST   | `/turnarounds` | REST endpoint for turnaround events |

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   NestJS API    │    │     Kafka       │
│                 │    │                 │    │                 │
│  - GraphQL      │◄──►│  - GraphQL      │◄──►│  - Event        │
│  - WebSockets   │    │  - WebSockets   │    │    Streaming    │
│  - Real-time UI │    │  - REST API     │    │  - Topics       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Kubernetes    │
                    │                 │
                    │  - Ingress      │
                    │  - Services     │
                    │  - Deployments  │
                    │  - HTTPS/TLS    │
                    └─────────────────┘
```

---

## 🚀 Deployment Pipeline

The project uses GitHub Actions for CI/CD:

1. **Build**: Docker images are built for both frontend and backend
2. **Test**: Automated tests run on pull requests
3. **Deploy**: Automatic deployment to AKS on main branch

---

## 🔐 Security

- **HTTPS**: All traffic encrypted with Let's Encrypt certificates
- **HSTS**: HTTP Strict Transport Security enabled
- **SSL Redirect**: Automatic HTTP to HTTPS redirection
- **WebSocket Security**: Secure WebSocket connections (WSS)

---

## 📊 Monitoring

- **Logs**: Application logs via `kubectl logs`
- **Ingress**: Traffic monitoring via NGINX ingress controller
- **Health Checks**: Kubernetes liveness and readiness probes

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
## 🎓 Learning Objectives

This project serves as an example of:
- Modern full-stack development
- Real-time web applications
- Kubernetes orchestration
- Event-driven architecture
- DevOps best practices
- Production-ready deployments