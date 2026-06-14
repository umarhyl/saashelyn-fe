# SAASHELYN - Premium Modest Fashion E-Commerce

SAASHELYN is an academic Human Computer Interaction (HCI) final project representing a modest fashion / muslimah clothing brand. It features a premium, elegant, and minimalist aesthetic, carefully crafted to simulate a real luxury fashion brand website.

## Features

- **Modern Tech Stack**: Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4.
- **Premium UI Components**: Utilizes shadcn/ui for accessible and highly customizable components.
- **Fluid Animations**: Subtle, elegant interactions and page transitions powered by Framer Motion.
- **Global State Management**: React Context-based cart state that persists across the application.
- **Responsive Design**: Mobile-first architecture ensuring the site looks flawless on any device.
- **Dummy Data Integration**: Comprehensive product catalog with varied categories and sizes.

## Project Structure

- `app/` - Next.js App Router pages (Home, Collection, Product Detail, Cart, About, Contact)
- `components/ui/` - shadcn/ui components
- `components/layout/` - Global layout components (Navbar, Footer)
- `components/product/` - Reusable product display components
- `components/cart/` - Cart drawer and state management context
- `data/` - Dummy product data and types

## Setup Instructions

1. **Install Dependencies**
   Ensure you are using Node.js v18 or later.
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## Vercel Deployment Instructions

The easiest way to deploy your Next.js app is to use the Vercel Platform.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Create an account on [Vercel](https://vercel.com/).
3. Click "Add New..." and select "Project".
4. Import your Git repository.
5. Vercel will automatically detect that you are using Next.js and configure the build settings.
6. Click "Deploy". Your premium fashion brand is now live!

## HCI Principles Applied

- **Consistency**: Unified typography (Playfair Display & Inter) and color palette across all views.
- **Visibility of System Status**: Real-time cart updates and visual feedback on hover/click states.
- **Accessibility**: High contrast text, semantic HTML, and ARIA labels on interactive elements.
- **Aesthetic and Minimalist Design**: Avoiding visual clutter to draw focus directly to the products.
