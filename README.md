# Lendsqr Admin Console - Frontend Assessment

[![Netlify Status](https://api.netlify.com/api/v1/badges/beacd251-0316-4bcb-9d60-28c32950e495/deploy-status)](https://app.netlify.com/projects/chinonso-udonne-lendsqr-fe-test/deploys)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A pixel-perfect, responsive implementation of the Lendsqr Admin Console built with React, TypeScript, and SCSS.

**Live Demo**: [https://chinonso-udonne-lendsqr-fe-test.netlify.app/](https://chinonso-udonne-lendsqr-fe-test.netlify.app/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Implementation Details](#key-implementation-details)
- [Testing](#testing)
- [Deployment](#deployment)
- [Design Decisions](#design-decisions)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## 🎯 Overview

This project is a frontend implementation of the Lendsqr Admin Console, developed as part of a technical assessment. It demonstrates proficiency in modern React development, TypeScript, state management, and responsive design principles.

### Assessment Requirements Met ✅

- ✅ **4 Pages Built**: Login, Dashboard, Users List, User Details
- ✅ **Mock API Integration**: 500 user records from mock API
- ✅ **Local Storage**: User data persistence using Redux-Persist
- ✅ **Mobile Responsive**: Fully responsive design with mobile-first approach
- ✅ **TypeScript**: 100% TypeScript implementation
- ✅ **SCSS**: Modular SCSS architecture
- ✅ **Visual Fidelity**: Pixel-perfect implementation of Figma design
- ✅ **Best Practices**: Clean code, component architecture, and Git practices

---

## ✨ Features

### Authentication
- 🔐 Form validation with email and password requirements
- 💾 Login state persistence
- 🎨 Responsive login page with brand imagery

### Dashboard
- 📊 User statistics overview cards (Active Users, Users with Loans, etc.)
- 📱 Fully responsive grid layout
- 🎨 Visual data representation

### Users Management
- 📋 Comprehensive user table with 500 records
- 🔍 Multi-field search (username, email, phone, organization)
- 🎛️ Advanced filtering by status, organization, and date
- 📄 Pagination with customizable page sizes (10, 20, 50, 100)
- ⚡ Skeleton loading states for better UX
- 📱 Mobile-responsive table with horizontal scroll

### User Details
- 👤 Comprehensive user profile view
- 💼 Organization and personal information sections
- 📊 Financial information display
- 🎯 Status management (Activate, Blacklist)
- 📱 Responsive layout adapting to screen size

### Additional Features
- 🎨 Consistent design system with SCSS variables
- ⚡ Performance optimized with React hooks (useMemo, useCallback)
- 💾 State persistence across page reloads
- 🌐 Responsive navigation with collapsible sidebar
- 🎭 Loading skeletons for improved perceived performance

---

## 🛠 Tech Stack

### Core
- **React 19.1.1** - Latest React with improved performance
- **TypeScript 5.6** - Type-safe development
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **SASS 1.93.2** - Advanced CSS preprocessing

### State Management
- **Redux Toolkit** - Predictable state container
- **React-Redux 9.2.0** - Official React bindings for Redux
- **Redux-Persist 6.0.0** - Persist and rehydrate Redux store

### Routing
- **React Router 7.9.4** - Declarative routing for React

### UI & Utilities
- **React-Loading-Skeleton 3.5.0** - Loading state placeholders
- **Yup 1.7.1** - Schema validation for forms

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast Refresh for React

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nonsoTS/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Login Credentials

For testing purposes, you can use any email and password combination:
- **Email**: Any valid email format (e.g., `user@example.com`)
- **Password**: Any password with minimum 6 characters

---

## 📁 Project Structure

```
lendsqr-fe-test/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable components
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Sidebar.module.scss
│   │   ├── Navbar/
│   │   ├── UserCard/
│   │   ├── StatusBadge/
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── Users/
│   │   └── UserDetails/
│   ├── store/           # Redux store configuration
│   │   ├── store.ts
│   │   └── slices/
│   │       └── usersSlice.ts
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles and variables
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── global.scss
│   ├── App.tsx          # Root component
│   └── main.tsx         # Application entry point
├── .eslintrc.cjs        # ESLint configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

---

## 🔑 Key Implementation Details

### State Management Architecture

**Redux with Redux-Persist** handles:
- Fetching and storing 500 user records
- Persisting data to localStorage
- Managing authentication state
- Providing data to User Details page

```typescript
// Store structure
{
  users: {
    data: User[],      // 500 user records
    loading: boolean,
    error: string | null
  },
  auth: {
    isAuthenticated: boolean,
    user: UserInfo | null
  }
}
```

### SCSS Module System

Modular SCSS approach with:
- Component-scoped styles preventing conflicts
- Global variables for consistency
- Responsive mixins for breakpoints
- Mobile-first design methodology

```scss
// Breakpoints
$breakpoints: (
    'mobile': 576px,
    'tablet': 768px,
    'laptop': 992px,
    'desktop': 1200px,
    'large-desktop': 1400px
);
```

### Performance Optimizations

1. **React Hooks**
   - `useMemo` for expensive computations (filtering, sorting)
   - `useCallback` for event handler memoization
   - `useRef` for DOM references and mutable values

2. **Skeleton Loading**
   - Non-blocking UI rendering during data fetch
   - Prevents layout shift
   - Improves perceived performance

3. **Pagination**
   - Limits rendered items per page
   - Configurable page sizes (10, 20, 50, 100)
   - Optimized data slicing with useMemo

### Responsive Design Strategy

**Mobile-First Approach** with five breakpoints:
- **Mobile** (< 576px): Single column, hamburger menu
- **Tablet** (576-768px): Adapted layouts
- **Laptop** (768-992px): Full sidebar visible
- **Desktop** (992-1200px): Optimal spacing
- **Large Desktop** (> 1200px): Enhanced layouts

---

## 🧪 Testing

### Running Tests

```bash
npm run test
```

### Test Coverage Areas

- ✅ Component rendering
- ✅ Form validation
- ✅ Redux store operations
- ✅ User interactions (clicks, navigation)
- ✅ Responsive behavior
- ✅ Edge cases and error handling

---

## 🚢 Deployment

The application is deployed on **Netlify** with continuous deployment from the main branch.

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Preview production build locally**
   ```bash
   npm run preview
   ```

3. **Deploy to Netlify** (or your preferred hosting)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

---

## 💡 Design Decisions

### Why Redux-Persist over IndexedDB?

**Rationale**:
- Simpler implementation with Redux integration
- Meets localStorage requirement elegantly
- Sufficient for 500 user records (~2-3MB)
- Better developer experience with Redux DevTools

**Trade-off**: For significantly larger datasets (>10MB), IndexedDB would be more appropriate.

### Why Vite over Create React App?

**Advantages**:
- Faster development server startup
- Instant HMR (Hot Module Replacement)
- Optimized production builds
- Better TypeScript support out of the box
- Modern tooling ecosystem

### Client-Side Pagination Approach

**Current Implementation**: All 500 records loaded and paginated client-side

**Reasoning**:
- Mock API constraint (no backend pagination)
- Demonstrates filtering/sorting capabilities
- Mitigated performance impact with memoization

**Production Recommendation**: Implement server-side pagination with API endpoints

---

## 🎨 Visual Fidelity

This implementation is **pixel-perfect** to the Figma design:
- Exact color values and typography
- Precise spacing and alignment
- All interactive states (hover, active, focus)
- Shadows, borders, and visual effects replicated
- Icon positioning and sizing matched

### Font Handling

Where Figma fonts were unavailable, visually similar Google Fonts alternatives were selected while maintaining the design's visual hierarchy and readability.

---

## 🔮 Future Enhancements

### Short-term
- [ ] Complete advanced filter combinations
- [ ] Add user export functionality (CSV/PDF)
- [ ] Implement bulk user actions
- [ ] Add comprehensive E2E tests

### Long-term
- [ ] Virtual scrolling for better performance (react-window)
- [ ] Dark mode support
- [ ] Advanced search with fuzzy matching
- [ ] Service worker for offline functionality
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Analytics dashboard with charts
- [ ] Real-time updates with WebSocket

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

---

## 🤝 Contributing

This is an assessment project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Chinonso Udonne**

- GitHub: [@nonsoTS](https://github.com/nonsoTS)
- Portfolio: [Your Portfolio Link]
- LinkedIn: [Your LinkedIn]

---

## 🙏 Acknowledgments

- Design provided by [Lendsqr](https://www.lendsqr.com/)
- Assessment specifications from Lendsqr Frontend Engineering Test
- Mock data generated using [json-generator.com](https://json-generator.com/)

---

## 📞 Support

For questions or issues regarding this project, please open an issue in the GitHub repository.

---

<div align="center">
  
**Built with ❤️ using React, TypeScript, and SCSS**

[Live Demo](https://chinonso-udonne-lendsqr-fe-test.netlify.app/) • [Report Bug](https://github.com/nonsoTS/lendsqr-fe-test/issues) • [Request Feature](https://github.com/nonsoTS/lendsqr-fe-test/issues)

</div>