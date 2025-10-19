# Basmati Web - Indian Grocery Store Website

A modern, responsive website for Basmati Grocers built with React, Vite, Tailwind CSS, and Supabase.

## Features

- 🏪 Product catalog with categories and search
- ☕ Cafe menu and information
- 📱 Responsive design for all devices
- 🔐 User authentication with Supabase
- 🛡️ Admin panel for product management
- 📄 Sales flyer management
- 🎨 Modern UI with smooth animations

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Custom components with shadcn/ui styling
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (optional for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd basmati-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. (Optional) Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL commands in `lib/database-schema.sql` in your Supabase SQL editor
   - This will create the necessary tables, policies, and sample data

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
basmati-web/
├── components/ui/          # Reusable UI components
├── contexts/              # React contexts (Auth, etc.)
├── entities/              # Data models (Product, User, SalesFlyer)
├── lib/                   # Utilities and configurations
├── Pages/                 # Page components
├── dist/                  # Build output
├── Layout.js              # Main layout component
├── main.js                # Application entry point
├── utils.js               # Utility functions
└── index.css              # Global styles
```

## Supabase Integration

The application includes full Supabase integration with:

- **Authentication**: User signup, login, and session management
- **Database**: Products, users, and sales flyers tables
- **Storage**: Image uploads for products and flyers
- **Row Level Security**: Proper access control policies

### Database Schema

The application expects the following Supabase tables:

- `users` - User profiles (extends auth.users)
- `products` - Product catalog
- `sales_flyers` - Weekly sales flyers

See `lib/database-schema.sql` for the complete schema.

## Development Mode

The application includes fallback mock data for development without Supabase:

- Mock products with sample data
- Mock user authentication
- Mock sales flyers

This allows you to develop and test the UI without setting up Supabase.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | No (falls back to mock data) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | No (falls back to mock data) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.