#!/bin/bash

# Portfolio Gallery Setup Verification Script
# Run this to check if everything is configured correctly

echo "========================================"
echo "Portfolio Gallery - Setup Verification"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
PASSED=0
FAILED=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}\u2714 $2${NC}"
        ((PASSED++))
    else
        echo -e "${RED}\u2718 $2${NC}"
        ((FAILED++))
    fi
}

echo "1. Checking Backend Environment..."
if [ -f "/app/backend/.env" ]; then
    test_result 0 "Backend .env file exists"
    
    if grep -q "SUPABASE_URL" /app/backend/.env; then
        test_result 0 "SUPABASE_URL is configured"
    else
        test_result 1 "SUPABASE_URL is missing"
    fi
    
    if grep -q "SUPABASE_KEY" /app/backend/.env; then
        test_result 0 "SUPABASE_KEY is configured"
    else
        test_result 1 "SUPABASE_KEY is missing"
    fi
else
    test_result 1 "Backend .env file not found"
fi
echo ""

echo "2. Checking Frontend Environment..."
if [ -f "/app/frontend/.env" ]; then
    test_result 0 "Frontend .env file exists"
    
    if grep -q "REACT_APP_BACKEND_URL" /app/frontend/.env; then
        test_result 0 "REACT_APP_BACKEND_URL is configured"
    else
        test_result 1 "REACT_APP_BACKEND_URL is missing"
    fi
else
    test_result 1 "Frontend .env file not found"
fi
echo ""

echo "3. Checking Backend Status..."
if pgrep -f "uvicorn server:app" > /dev/null; then
    test_result 0 "Backend server is running"
else
    test_result 1 "Backend server is NOT running"
fi
echo ""

echo "4. Testing Backend API..."
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/api/health 2>/dev/null)
if [ "$HEALTH_CHECK" = "200" ]; then
    test_result 0 "Health endpoint responding (200 OK)"
else
    test_result 1 "Health endpoint not responding (Expected 200, got $HEALTH_CHECK)"
fi

CATEGORIES_CHECK=$(curl -s http://localhost:8001/api/categories 2>/dev/null)
if echo "$CATEGORIES_CHECK" | grep -q "slug"; then
    test_result 0 "Categories API working"
else
    if echo "$CATEGORIES_CHECK" | grep -q "Could not find the table"; then
        test_result 1 "Supabase tables not created yet - Run SUPABASE_SCHEMA.sql!"
    else
        test_result 1 "Categories API not working"
    fi
fi

PROJECTS_CHECK=$(curl -s http://localhost:8001/api/projects 2>/dev/null)
if echo "$PROJECTS_CHECK" | grep -q "title"; then
    test_result 0 "Projects API working"
else
    test_result 1 "Projects API not working"
fi
echo ""

echo "5. Checking Frontend Status..."
if pgrep -f "node.*react-scripts" > /dev/null || pgrep -f "node.*craco" > /dev/null; then
    test_result 0 "Frontend server is running"
else
    test_result 1 "Frontend server is NOT running"
fi
echo ""

echo "6. Checking Dependencies..."
if command -v python3 &> /dev/null; then
    test_result 0 "Python3 is installed"
else
    test_result 1 "Python3 is NOT installed"
fi

if command -v node &> /dev/null; then
    test_result 0 "Node.js is installed"
else
    test_result 1 "Node.js is NOT installed"
fi

if command -v yarn &> /dev/null; then
    test_result 0 "Yarn is installed"
else
    test_result 1 "Yarn is NOT installed"
fi
echo ""

# Summary
echo "========================================"
echo "Summary:"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "========================================"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}\u2705 All checks passed! Your portfolio is ready!${NC}"
    echo ""
    echo "Access your portfolio at:"
    echo "Frontend: https://954d301b-581d-4eaf-8f21-7127e0c88535.preview.emergentagent.com"
    echo "Admin: https://954d301b-581d-4eaf-8f21-7127e0c88535.preview.emergentagent.com/admin/login"
    echo ""
    exit 0
else
    echo -e "${YELLOW}\u26a0\ufe0f  Some checks failed. Please review the errors above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. If 'Supabase tables not created': Run SUPABASE_SCHEMA.sql in Supabase SQL Editor"
    echo "2. If servers not running: sudo supervisorctl restart all"
    echo "3. If .env missing: Check /app/backend/.env and /app/frontend/.env exist"
    echo ""
    echo "For detailed help, see /app/QUICK_START.md"
    exit 1
fi
