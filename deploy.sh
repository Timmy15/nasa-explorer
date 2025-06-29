#!/bin/bash

echo "Cleaning up previous builds..."
rm -rf frontend/node_modules
rm -rf frontend/build
rm -rf frontend/package-lock.json

echo "Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps

echo "Building frontend..."
npm run build

echo "Build completed successfully!"
echo "You can now deploy the frontend/build directory" 