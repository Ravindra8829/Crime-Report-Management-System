#!/bin/bash

echo "====================================================="
echo "   Crime Report Management System (CRMS) Launcher   "
echo "====================================================="

echo "[1/2] Starting Spring Boot Backend with automatic H2 Database (Port 8081)..."
cd "$(dirname "$0")/backend"
mvn spring-boot:run &
BACKEND_PID=$!

echo "Backend started in background (PID: $BACKEND_PID)."
echo "Waiting for backend to initialize on http://localhost:8081 ..."
sleep 6

echo "[2/2] Starting ReactJS Frontend (Port 3000)..."
cd "../frontend"
npm start
