#!/usr/bin/env bash
set -e

echo "Deleting previous prisma migration job if it exists"
kubectl delete job prisma-migrate -n flashcards-app --ignore-not-found=true

echo "Running Prisma migration job"
kubectl apply -f k8s/jobs/prisma-migrate-job.yaml

echo "Waiting for migration job pod to start"
kubectl wait --for=condition=complete job/prisma-migrate -n flashcards-app --timeout=120s

echo "Migration job status:"
kubectl get jobs -n flashcards-app

echo "Migration job logs:"
kubectl logs job/prisma-migrate -n flashcards-app