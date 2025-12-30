# MOVINAIR Logo Usage Guide

## Available Logo Files

I've created **two logo versions** for you in the `public` folder:

1. **`movinair-logo-original.png`** - The exact original uploaded logo (PNG format)
2. **`movinair-logo.svg`** - SVG vector version for scalability

---

## How to Use in Your React Components

### Option 1: Using the Original PNG
```jsx
import React from 'react';

function Header() {
  return (
    <header>
      <img 
        src="/movinair-logo-original.png" 
        alt="MOVINAIR - Comfortable Every Where" 
        className="h-12"
      />
    </header>
  );
}
```

### Option 2: Using the SVG (Recommended)
```jsx
import React from 'react';

function Header() {
  return (
    <header>
      <img 
        src="/movinair-logo.svg" 
        alt="MOVINAIR - Comfortable Every Where" 
        className="h-12 w-auto"
      />
    </header>
  );
}
```

### Option 3: Inline SVG for Maximum Control
```jsx
// Import as React component using vite-plugin-svgr or manually paste SVG code
function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 320 80" fill="none">
      {/* SVG content */}
    </svg>
  );
}
```

---

## Benefits of Each Format

**PNG (`movinair-logo-original.png`)**
- ✅ Exact match to original design
- ✅ Ready to use immediately
- ❌ Fixed resolution (may blur when scaled up)

**SVG (`movinair-logo.svg`)**
- ✅ Infinitely scalable without quality loss
- ✅ Smaller file size
- ✅ Can be styled with CSS
- ❌ Requires manual recreation (slight variations from original)

---

## Quick Example

Replace your current logo in the project with:

```jsx
<img src="/movinair-logo-original.png" alt="MOVINAIR" className="h-16" />
```

Both files are in your `public` directory and ready to use! 🚀
