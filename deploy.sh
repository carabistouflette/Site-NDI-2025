#!/bin/bash

# Deployment script for Site NDI 2025 on Fly.io
# This script helps deploy both backend and frontend

set -e  # Exit on error

echo "🚀 Site NDI 2025 - Fly.io Deployment Script"
echo "============================================"
echo ""

# Check if flyctl is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly.io CLI is not installed."
    echo "Install it with: curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# Check if user is logged in
if ! fly auth whoami &> /dev/null; then
    echo "❌ You are not logged in to Fly.io"
    echo "Please run: fly auth login"
    exit 1
fi

echo "✅ Fly.io CLI is ready"
echo ""

# Function to deploy backend
deploy_backend() {
    echo "📦 Deploying Backend..."
    cd server
    
    # Check if app exists
    if ! fly status -a ndi-2025-backend &> /dev/null; then
        echo "Creating new backend app..."
        fly launch --config fly.toml --no-deploy
        
        echo ""
        echo "⚠️  Please set your secrets:"
        echo "fly secrets set OPENROUTER_API_KEY=your-key-here -a ndi-2025-backend"
        echo "fly secrets set FRONTEND_URL=https://ndi-2025-frontend.fly.dev -a ndi-2025-backend"
        read -p "Press enter when you've set the secrets..."
    fi
    
    echo "Deploying backend..."
    fly deploy
    
    cd ..
    echo "✅ Backend deployed successfully!"
    echo ""
}

# Function to deploy frontend
deploy_frontend() {
    echo "🎨 Deploying Frontend..."
    
    # Check if app exists
    if ! fly status -a ndi-2025-frontend &> /dev/null; then
        echo "Creating new frontend app..."
        fly launch --config fly.toml --no-deploy
    fi
    
    echo "Deploying frontend..."
    fly deploy
    
    echo "✅ Frontend deployed successfully!"
    echo ""
}

# Main menu
echo "What would you like to deploy?"
echo "1) Backend only"
echo "2) Frontend only"
echo "3) Both (Backend first, then Frontend)"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        deploy_backend
        ;;
    2)
        deploy_frontend
        ;;
    3)
        deploy_backend
        deploy_frontend
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📊 Check status:"
echo "  Backend:  fly status -a ndi-2025-backend"
echo "  Frontend: fly status -a ndi-2025-frontend"
echo ""
echo "📝 View logs:"
echo "  Backend:  fly logs -a ndi-2025-backend"
echo "  Frontend: fly logs -a ndi-2025-frontend"
echo ""
echo "🌐 Open app:"
echo "  fly open -a ndi-2025-frontend"
