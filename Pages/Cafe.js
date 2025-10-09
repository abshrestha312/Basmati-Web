
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Croissant, Sandwich, Cookie, Clock, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const menuCategories = [
  {
    title: "Hot Beverages",
    icon: Coffee,
    items: [
      { name: "Masala Chai", price: 3.99, description: "Traditional spiced Indian tea" },
      { name: "Ginger Chai", price: 3.99, description: "Fresh ginger infused tea" },
      { name: "Cardamom Coffee", price: 4.49, description: "Rich coffee with cardamom" },
      { name: "Turmeric Latte", price: 4.99, description: "Golden milk with spices" }
    ]
  },
  {
    title: "Fresh Snacks",
    icon: Croissant,
    items: [
      { name: "Samosa (2pc)", price: 4.99, description: "Crispy vegetable samosas" },
      { name: "Pakora Platter", price: 6.99, description: "Mixed vegetable fritters" },
      { name: "Kachori", price: 3.99, description: "Spiced lentil filled pastry" },
      { name: "Aloo Tikki", price: 5.49, description: "Potato patties with chutney" }
    ]
  },
  {
    title: "Sandwiches",
    icon: Sandwich,
    items: [
      { name: "Bombay Sandwich", price: 7.99, description: "Vegetable sandwich with chutney" },
      { name: "Paneer Tikka Wrap", price: 8.99, description: "Grilled paneer in flatbread" },
      { name: "Vada Pav", price: 5.99, description: "Mumbai street food special" },
      { name: "Chaat Sandwich", price: 7.49, description: "Tangy & spicy sandwich" }
    ]
  },
  {
    title: "Sweet Treats",
    icon: Cookie,
    items: [
      { name: "Gulab Jamun (3pc)", price: 4.99, description: "Sweet milk dumplings" },
      { name: "Jalebi", price: 5.49, description: "Crispy sweet spirals" },
      { name: "Ladoo (2pc)", price: 4.49, description: "Traditional sweet balls" },
      { name: "Barfi", price: 3.99, description: "Milk-based sweet fudge" }
    ]
  }
];

export default function Cafe() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--dark-bg)] via-[#2a2a2a] to-[var(--dark-bg)] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--primary-gold)] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary-orange)] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--primary-gold)]/30 mb-6">
                <Coffee className="w-4 h-4 text-[var(--primary-gold)]" />
                <span className="text-sm font-medium text-white">Freshly Made Daily</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] bg-clip-text text-transparent">
                  Basmati Cafe
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Experience authentic Indian flavors with freshly brewed chai, crispy samosas, 
                and traditional sweets. All made fresh in our store daily.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-[var(--primary-gold)]/30">
                  <Clock className="w-6 h-6 text-[var(--primary-gold)]" />
                  <div>
                    <div className="font-semibold text-white">Cafe Hours</div>
                    <div className="text-sm text-gray-300">9AM - 8PM Daily</div>
                  </div>
                </div>
              </div>

              {/* Order Now Button */}
              <div className="space-y-4">
                <a 
                  href="https://basmati-cafe-denton.square.site/#most-popular" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] hover:opacity-90 text-white text-lg px-8 py-6 shadow-lg">
                    Order Now
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </a>

                {/* Delivery Services */}
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.ubereats.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="bg-black hover:opacity-90 transition-opacity rounded-lg px-6 py-3 shadow-lg">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e15bc10072c9cc4fb1138e/e3c42ad9a_image.png"
                        alt="Order on Uber Eats"
                        className="h-8 w-auto"
                      />
                    </div>
                  </a>
                  <a 
                    href="https://www.doordash.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="bg-white hover:bg-gray-100 transition-colors rounded-lg px-6 py-3 shadow-lg">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e15bc10072c9cc4fb1138e/84d4be2a1_image.png"
                        alt="Order on DoorDash"
                        className="h-8 w-auto"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] rounded-3xl opacity-30 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80"
                alt="Indian Chai"
                className="relative rounded-3xl shadow-2xl w-full border-2 border-[var(--primary-gold)]/30"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Cafe Menu
            </h2>
            <p className="text-xl text-gray-600">
              Fresh, authentic flavors prepared daily
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--primary-gold)] h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary-gold)] to-[var(--primary-orange)] flex items-center justify-center text-white shadow-lg">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="text-lg font-bold text-[var(--primary-gold)]">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--light-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "☕",
                title: "Fresh Brewed Daily",
                description: "Our chai is made fresh throughout the day using traditional recipes and the finest tea leaves"
              },
              {
                icon: "🌿",
                title: "Authentic Recipes",
                description: "All items are prepared using traditional methods and authentic Indian spices and ingredients"
              },
              {
                icon: "🏪",
                title: "Cozy Atmosphere",
                description: "Enjoy your food and beverages in our comfortable seating area while you shop"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--primary-gold)] h-full bg-white">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
