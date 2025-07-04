# 🐳 k8s-microblog

A fullstack microblog app deployed on a local Kubernetes cluster with Kind.  
Built to gain hands-on experience with Kubernetes, containerization, and infrastructure management.

---

## 🔧 Stack

| Component        | Technology                |
| ---------------- | ------------------------- |
| Frontend         | React + Vite              |
| Backend          | Node.js + Express         |
| Cluster          | Kubernetes via Kind       |
| Containerization | Docker                    |
| Orchestration    | kubectl + Helm (optional) |

---

## 🎯 What this project demonstrates

✅ Setting up a local Kubernetes cluster  
✅ Dockerizing frontend and backend  
✅ Kubernetes Deployments, Services, and port forwarding  
✅ Understanding of container runtimes like `containerd`  
✅ Separation of concerns between infra (Kind), control (kubectl), and packaging (Helm)

---

## 🚀 Installation (locally with Kind)

### 1. Requirements

- [Docker](https://www.docker.com/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [helm (optional)](https://helm.sh/)

### 2. Clone the repo

```bash
git clone https://github.com/yourusername/k8s-microblog.git
cd k8s-microblog
```

### 3. Set up the cluster

```bash
kind create cluster --name microblog
```

### 4. Build Docker images

```bash
docker build -t microblog-frontend ./frontend
docker build -t microblog-backend ./backend

kind load docker-image microblog-frontend --name microblog
kind load docker-image microblog-backend --name microblog
```

### 5. Deploy to Kubernetes

Note: In `k8s/backend.yaml` and `k8s/frontend.yaml`, `imagePullPolicy: Never` is set because we use locally loaded images.

```bash
kubectl apply -f k8s/
```

### 6. Open the app

In two terminals:

```bash
kubectl port-forward svc/backend 3001:3001
```

```bash
kubectl port-forward svc/frontend 8080:80
```

Go to [http://localhost:8080](http://localhost:8080)

The frontend fetches data from the backend via a service call to `/posts`.
