#!/bin/bash

echo "Starting the application..."

echo "Applying migrations..."
npx prisma migrate dev

echo "Installing dependencies and running the project..."
npm install && npm run dev