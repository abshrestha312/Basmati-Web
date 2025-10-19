
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail, MapPin, Menu, X, Shield, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { LoadingPage } from "@/components/ui/loading";

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const { user, loading, signOut } = useAuth();
  
  const navItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Products", path: createPageUrl("Products") },
    { name: "Cafe", path: createPageUrl("Cafe") },
    { name: "Recipes", path: createPageUrl("Recipes") },
    { name: "Deals", path: createPageUrl("Deals") },
    { name: "About", path: createPageUrl("About") },
    { name: "Contact", path: createPageUrl("Contact") }
  ];

  // Show loading page while auth is initializing
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary-gold: #D4AF37;
          --primary-orange: #FF6B35;
          --primary-green: #4A7C59;
          --dark-bg: #1a1a1a;
          --light-cream: #FFF8F0;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--dark-bg)] backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e15bc10072c9cc4fb1138e/a4c8c5ec1_IMG_2145.jpg" 
                alt="Basmati Grocers Logo"
                className="h-14 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "text-[var(--primary-gold)] border-b-2 border-[var(--primary-gold)] pb-1"
                      : "text-gray-300 hover:text-[var(--primary-gold)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link
                  to={createPageUrl("Admin")}
                  className={`text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === createPageUrl("Admin")
                      ? "text-[var(--primary-gold)] border-b-2 border-[var(--primary-gold)] pb-1"
                      : "text-gray-300 hover:text-[var(--primary-gold)]"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
              
              {/* Auth Section */}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm">{user.full_name || user.email}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-[var(--primary-gold)] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-[var(--primary-gold)] transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-gray-800 text-[var(--primary-gold)] font-medium"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link
                  to={createPageUrl("Admin")}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all flex items-center gap-2 ${
                    location.pathname === createPageUrl("Admin")
                      ? "bg-gray-800 text-[var(--primary-gold)] font-medium"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-800 pt-4 mt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-4 text-gray-300">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm">{user.full_name || user.email}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all w-full text-left"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--dark-bg)] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <div className="mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e15bc10072c9cc4fb1138e/a4c8c5ec1_IMG_2145.jpg" 
                  alt="Basmati Grocers Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your neighborhood source for authentic Indian groceries, spices, and specialty items. 
                Visit us in-store for the best selection!
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--primary-gold)]">Visit Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-[var(--primary-orange)]" />
                  <a href="tel:+19404350196" className="hover:text-white transition-colors">
                    +1 (940) 435-0196
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-[var(--primary-orange)]" />
                  <a href="mailto:contact@basmatigrocers.com" className="hover:text-white transition-colors">
                    contact@basmatigrocers.com
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-[var(--primary-orange)] mt-1" />
                  <span>2436 S I-35 Suite 330<br />Denton, TX 76205</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--primary-gold)]">Store Hours</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Open 7 Days:</span>
                  <span className="font-medium text-white">10:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 Basmati Grocers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}
