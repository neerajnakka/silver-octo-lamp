#!/bin/bash

echo "======================================"
echo "DevOps Mastery Hub - Build Test Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASS=0
FAIL=0

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAIL++))
    fi
}

echo "Step 1: Checking project structure..."
echo "--------------------------------------"

# Check if key directories exist
[ -d "app" ] && print_result 0 "app directory exists" || print_result 1 "app directory missing"
[ -d "components" ] && print_result 0 "components directory exists" || print_result 1 "components directory missing"
[ -d "lib" ] && print_result 0 "lib directory exists" || print_result 1 "lib directory missing"
[ -d "data" ] && print_result 0 "data directory exists" || print_result 1 "data directory missing"

echo ""
echo "Step 2: Checking new feature pages..."
echo "--------------------------------------"

# Check new pages exist
[ -f "app/roadmap/page.js" ] && print_result 0 "Roadmap page exists" || print_result 1 "Roadmap page missing"
[ -f "app/flashcards/page.js" ] && print_result 0 "Flashcards page exists" || print_result 1 "Flashcards page missing"
[ -f "app/notes/page.js" ] && print_result 0 "Notes page exists" || print_result 1 "Notes page missing"
[ -f "app/stats/page.js" ] && print_result 0 "Stats page exists" || print_result 1 "Stats page missing"
[ -f "app/interview/page.js" ] && print_result 0 "Interview page exists" || print_result 1 "Interview page missing"

echo ""
echo "Step 3: Checking new components..."
echo "--------------------------------------"

# Check new components exist
[ -f "components/features/global-search.jsx" ] && print_result 0 "Global search component exists" || print_result 1 "Global search missing"
[ -f "components/features/code-block.jsx" ] && print_result 0 "Code block component exists" || print_result 1 "Code block missing"
[ -f "components/features/mermaid-diagram.jsx" ] && print_result 0 "Mermaid diagram component exists" || print_result 1 "Mermaid diagram missing"
[ -f "components/features/typed-command.jsx" ] && print_result 0 "Typed command component exists" || print_result 1 "Typed command missing"
[ -f "components/features/bionic-text.jsx" ] && print_result 0 "Bionic text component exists" || print_result 1 "Bionic text missing"

echo ""
echo "Step 4: Checking configuration files..."
echo "--------------------------------------"

[ -f "package.json" ] && print_result 0 "package.json exists" || print_result 1 "package.json missing"
[ -f "next.config.js" ] && print_result 0 "next.config.js exists" || print_result 1 "next.config.js missing"
[ -f "tailwind.config.js" ] && print_result 0 "tailwind.config.js exists" || print_result 1 "tailwind.config.js missing"
[ -f "postcss.config.js" ] && print_result 0 "postcss.config.js exists" || print_result 1 "postcss.config.js missing"

echo ""
echo "Step 5: Building for production..."
echo "--------------------------------------"

# Clean previous builds
rm -rf .next
echo "Cleaned .next directory"

# Run build
npm run build > build.log 2>&1
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    print_result 0 "Production build successful"
    
    # Check if build output exists
    [ -d ".next" ] && print_result 0 ".next directory created" || print_result 1 ".next directory not created"
    [ -f ".next/BUILD_ID" ] && print_result 0 "BUILD_ID file exists" || print_result 1 "BUILD_ID file missing"
    
else
    print_result 1 "Production build failed"
    echo ""
    echo "Build errors:"
    cat build.log | grep -i "error" | head -20
fi

echo ""
echo "Step 6: Checking build output..."
echo "--------------------------------------"

if [ -d ".next" ]; then
    # Count pages
    PAGE_COUNT=$(find .next -name "*.html" 2>/dev/null | wc -l)
    echo "Generated HTML pages: $PAGE_COUNT"
    
    # List some generated pages
    echo "Sample pages:"
    find .next -name "*.html" 2>/dev/null | head -10 | sed 's/^/  - /'
fi

echo ""
echo "Step 7: Analyzing bundle size..."
echo "--------------------------------------"

if [ -d ".next/static" ]; then
    TOTAL_SIZE=$(du -sh .next/static 2>/dev/null | cut -f1)
    echo "Total static assets size: $TOTAL_SIZE"
    
    JS_SIZE=$(du -sh .next/static/chunks 2>/dev/null | cut -f1)
    echo "JavaScript chunks size: $JS_SIZE"
fi

echo ""
echo "Step 8: Checking dependencies..."
echo "--------------------------------------"

# Check if node_modules exists
[ -d "node_modules" ] && print_result 0 "node_modules directory exists" || print_result 1 "node_modules missing"

# Count packages
if [ -f "package.json" ]; then
    DEP_COUNT=$(cat package.json | grep -c "\"@\|\"[a-z]")
    echo "Total dependencies: $DEP_COUNT"
fi

echo ""
echo "Step 9: Code quality checks..."
echo "--------------------------------------"

# Check for common issues
ERROR_COUNT=$(grep -r "console.error" app components 2>/dev/null | wc -l)
echo "console.error occurrences: $ERROR_COUNT"

WARN_COUNT=$(grep -r "console.warn" app components 2>/dev/null | wc -l)
echo "console.warn occurrences: $WARN_COUNT"

TODO_COUNT=$(grep -r "TODO\|FIXME" app components 2>/dev/null | wc -l)
echo "TODO/FIXME comments: $TODO_COUNT"

echo ""
echo "Step 10: File size analysis..."
echo "--------------------------------------"

# Find largest files
echo "Top 5 largest component files:"
find components -name "*.jsx" -o -name "*.js" 2>/dev/null | xargs du -h 2>/dev/null | sort -rh | head -5 | sed 's/^/  /'

echo ""
echo "Top 5 largest page files:"
find app -name "*.js" -o -name "*.jsx" 2>/dev/null | xargs du -h 2>/dev/null | sort -rh | head -5 | sed 's/^/  /'

echo ""
echo "======================================"
echo "TEST SUMMARY"
echo "======================================"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED - PRODUCTION READY!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ Some tests failed. Check details above.${NC}"
    exit 1
fi
