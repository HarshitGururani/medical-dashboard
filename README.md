# Medical Dashboard

A modern, responsive medical dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides healthcare professionals with an intuitive interface for managing patients, appointments, and medical data.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Real-time Metrics**: Live dashboard with key healthcare metrics
- **Interactive Charts**: Visual data representation using Chart.js
- **Patient Management**: Comprehensive patient data management
- **Appointment Scheduling**: Appointment booking and management system
- **Lab Results**: Laboratory results tracking (coming soon)
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Material-UI (MUI) v7
- **Charts**: Chart.js with react-chartjs-2
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Theme**: next-themes for dark/light mode

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd medical-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
medical-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── appointments/       # Appointments page
│   │   ├── lab-results/        # Lab results page (coming soon)
│   │   ├── patients/           # Patients management page
│   │   ├── providers/          # Context providers
│   │   ├── settings/           # Settings page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Dashboard home page
│   ├── components/             # Reusable components
│   │   ├── charts/             # Chart components
│   │   ├── layout/             # Layout components (Sidebar, Navbar)
│   │   ├── metric-cards/       # Dashboard metric cards
│   │   ├── appointments/       # Appointment-specific components
│   │   ├── patients/           # Patient-specific components
│   │   ├── DashboardAppointmentsTable.tsx
│   │   └── RecentPatients.tsx
│   └── data/                   # Data and utilities
├── public/                     # Static assets
└── package.json
```

## 🧩 Component Architecture

### Core Components

1. **Layout Components** (`src/components/layout/`)
   - `Sidebar.tsx`: Responsive navigation sidebar with collapsible functionality
   - `Navbar.tsx`: Top navigation bar with theme toggle
   - `LayoutContent.tsx`: Main layout wrapper
   - `ThemeToggle.tsx`: Dark/light theme switcher

2. **Dashboard Components** (`src/components/`)
   - `MetricCards.tsx`: Key performance indicators display
   - `Charts.tsx`: Data visualization components
   - `DashboardAppointmentsTable.tsx`: Recent appointments table
   - `RecentPatients.tsx`: Latest patient information

3. **Feature Components**
   - **Patients**: Patient management and filtering
   - **Appointments**: Appointment scheduling and management
   - **Lab Results**: Laboratory results tracking (in development)

### Data Flow

- **TanStack Query**: Handles server state management and caching
- **Context Providers**: Theme and sidebar state management
- **API Integration**: RESTful API calls to external medical data service

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation support
- **Theme System**: Seamless dark/light mode switching
- **Loading States**: Skeleton components for better user experience

## 📱 Screenshots

### For Screenshots, please include:

1. **Dashboard Overview** - Main dashboard showing metric cards, charts, and recent data
2. **Patients Page** - Patient management interface with filtering and search
3. **Appointments Page** - Appointment scheduling and management view
4. **Mobile Responsive** - Dashboard on mobile/tablet devices
5. **Dark/Light Theme** - Both theme variations

**Recommended screenshot specifications:**
- Resolution: 1920x1080 or higher
- Format: PNG or JPG
- Include both desktop and mobile views
- Show different pages and features
- Capture the theme toggle functionality

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://json-server-hpku.onrender.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Tailwind Configuration

The project uses Tailwind CSS v4 with custom configuration for:
- Color schemes (light/dark mode)
- Typography (Geist font family)
- Spacing and layout utilities
- Custom component classes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔮 Roadmap

- [ ] Lab Results Management
- [ ] Advanced Analytics Dashboard
- [ ] User Authentication & Authorization
- [ ] Real-time Notifications
- [ ] Export/Import Functionality
- [ ] Multi-language Support
- [ ] Advanced Search & Filtering
- [ ] API Documentation

---

Built with ❤️ using Next.js and modern web technologies.
