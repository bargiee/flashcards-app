#!/usr/bin/env bash
set -e

echo "Building backend image"
minikube image build -t flashcards-backend:latest -f Dockerfile.prod ./backend

echo "Building frontend image"
minikube image build -t flashcards-frontend:latest -f Dockerfile.prod ./frontend

echo "Images built successfully"