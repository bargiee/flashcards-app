#!/usr/bin/env bash
set -e

echo "Deploying base Kubernetes manifests"
kubectl apply -k k8s/base

echo "Base manifests applied successfully"