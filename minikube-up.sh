#!/bin/bash

#minikube delete

minikube start



minikube image load k8s.gcr.io/ingress-nginx/controller:v1.9.4

minikube addons enable ingress

minikube addons enable dashboard

minikube addons enable metrics-server

minikube dashboard &


cd backend
eval $(minikube docker-env)
docker build . -t backend

cd ..

cd bd
eval $(minikube docker-env)
docker build . -t decideai/bd

cd .. 

cd frontend
eval $(minikube docker-env)
docker build . -t frontend

cd ..

cd bd

kubectl create -f pv.yaml; kubectl create -f pvc.yaml

kubectl apply -f secret.yaml

kubectl apply -f deployment.yaml; kubectl apply -f service.yaml

cd ..
cd backend

kubectl apply -f deployment.yaml; kubectl apply -f service.yaml

cd ..
cd frontend

kubectl apply -f deployment.yaml; kubectl apply -f service.yaml

cd ..
kubectl apply -f ingress.yaml


sleep 10

kubectl port-forward service/frontend 8080:80

# Acessar : http://localhost:8080/
