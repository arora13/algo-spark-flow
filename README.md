# Algo Spark Flow

A modern, interactive platform for learning algorithms through visual animations and hands-on practice. Designed specifically for High School and Early College students.

## ✨ Features

- **Visual Learning**: Step-by-step algorithm animations
- **Interactive Practice**: Hands-on coding challenges
- **AP CS Focused**: Curriculum-aligned content
- **Beautiful UI**: Modern, responsive design with dark theme
- **Contact System**: Easy way for users to reach out
- **Analytics Dashboard**: Track user engagement and website performance
- **Real-time Tracking**: Monitor page views and user interactions

## 🚀 Quick Start

### Frontend (React + Vite)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173
   ```

### Backend (Analytics Server)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Run setup script**
   ```bash
   ./setup.sh
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```

4. **Verify it's running**
   ```
   http://localhost:3001/api/health
   ```

## 📊 Analytics Features

The platform includes a comprehensive analytics system:

- **User Tracking**: Unique visitor identification
- **Page View Analytics**: Monitor popular pages
- **Contact Form Tracking**: Track user inquiries
- **Real-time Dashboard**: Live analytics at `/analytics`
- **Activity Feed**: Recent user interactions

## 🎨 Design System

- **Dark Theme**: Beautiful emerald/teal color scheme
- **Glass Morphism**: Modern glass panel effects
- **Smooth Animations**: Enhanced user experience
- **Responsive Design**: Works on all devices
- **Accessibility**: WCAG compliant components

## 📁 Project Structure

```
algo-spark-flow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and services
│   ├── contexts/      # React contexts
│   └── hooks/         # Custom React hooks
├── server/            # Backend analytics server
│   ├── server.js      # Express server
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
└── public/            # Static assets
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with auto-restart
- `npm start` - Start production server

## 🌐 Pages

- **Home** (`/`) - Landing page with algorithm overview
- **Learn** (`/learn`) - Interactive algorithm tutorials
- **Practice** (`/practice`) - Coding challenges
- **Contact** (`/contact`) - Contact form and information
- **Analytics** (`/analytics`) - Analytics dashboard
- **About** (`/about`) - About the platform
- **Login** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - User dashboard

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **React Router** - Navigation
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **Helmet** - Security headers
- **Morgan** - HTTP logging

## 📈 Analytics API

The backend provides RESTful endpoints for tracking:

- `POST /api/track/pageview` - Track page views
- `POST /api/contact` - Track contact submissions
- `GET /api/analytics` - Get dashboard data
- `GET /api/analytics/users` - Get user data
- `GET /api/health` - Health check

## �� Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd algo-spark-flow
   ```

2. **Start both servers**
   ```bash
   # Terminal 1 - Frontend
   npm install
   npm run dev
   
   # Terminal 2 - Backend
   cd server
   npm install
   npm run dev
   ```

3. **Visit the application**
   - Frontend: http://localhost:5173
   - Analytics: http://localhost:3001/api/analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact us through the contact form at `/contact` or email hello@algo-spark.com.

---

**Built with ❤️ for the next generation of algorithm learners**
