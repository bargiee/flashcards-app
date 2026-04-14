#!/usr/bin/env bash
set -e

echo "Building backend image"
docker build -t flashcards-backend:latest -f backend/Dockerfile.prod ./backend

echo "Building frontend image"
docker build -t flashcards-frontend:latest -f frontend/Dockerfile.prod ./frontend

echo "Images built successfully"