# Shop List

A modern e-commerce store listing application built with Next.js, featuring store discovery, product browsing, and multilingual support.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation & Running

1. Clone the repository:

```bash
git clone <repository-url>
cd shop-list
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Technology Stack & Framework Selection

### Why These Tools?

**Tailwind CSS + MUI Combination**

- **Tailwind CSS**: Chosen for rapid styling with utility-first approach. It only includes the styles your project actually uses, eliminating unnecessary CSS overhead and keeping bundle sizes minimal.
- **MUI (Material-UI)**: Selected for its rich component library and high customizability. Provides production-ready components with consistent design patterns and extensive theming capabilities.

**Next.js**

- Selected for its built-in SEO optimizations, including automatic meta tag generation, server-side rendering, and static site generation capabilities that are crucial for e-commerce applications.

**next-intl**

- Chosen for internationalization because it works seamlessly with Next.js server components, enabling efficient server-side translation rendering without additional client-side hydration overhead.

## 🔧 Important Implementation Details

### Image Optimization

- **Next.js Image Component**: Used throughout the application for automatic image optimization, lazy loading, and responsive image delivery. This ensures optimal performance and Core Web Vitals scores.

### Tailwind CSS Version

- **Tailwind CSS v3**: Selected over v4 because v4 doesn't yet support IntelliSense for project custom components and utilities, which is essential for developer experience and maintainability.

## 🌐 Online Demo 

[View Live Demo](https://shop-list-hazel.vercel.app/)

## 🏗️ Important Architectural & Design Decisions

### Component Architecture

- **Atomic Design Pattern**: Components are broken down into reusable atomic components for better maintainability and reusability.
- **Custom Hooks**: Complex logic is extracted into custom hooks to keep components clean and focused on presentation.
- **Styled Components**: MUI's `styled` API is used for component styling instead of inline styles for better maintainability. I also implemented `classed` function which has the same functionality but with tailwind classes.

### Performance Optimizations

- **Server Components**: Leveraged Next.js App Router's server components for better performance and SEO.
- **Image Optimization**: All images use Next.js Image component for automatic optimization and lazy loading.
- **Bundle Optimization**: Tailwind CSS purges unused styles, and MUI components are tree-shaken to minimize bundle size.

### Code Organization

- **Modular Structure**: Services, hooks, and components are organized in separate directories for clear separation of concerns.
- **TypeScript**: Full TypeScript implementation for type safety and better developer experience.
- **No Default Exports**: Consistent use of named exports for better tree-shaking and import clarity.

### Styling Strategy

- **Template Literal Syntax**: All styled components use template literal syntax instead of object notation for better readability and maintainability.
- **Typography**: MUI Typography component with variant and color props instead of custom styled typography components.
- **Minimal Styling**: MUI Button components use built-in props (colors, variants) rather than excessive custom styling.

## 🚀 Deployment

The easiest way to deploy this Next.js application is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
