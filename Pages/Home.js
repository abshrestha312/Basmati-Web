
import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, MapPin, Shield, Clock, Sparkles, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Premium Rice", value: "rice", icon: "🍚", color: "from-amber-400 to-yellow-500" },
  { name: "Aromatic Spices", value: "spices", icon: "🌶️", color: "from-orange-400 to-red-500" },
  { name: "Fresh Lentils", value: "lentils", icon: "🫘", color: "from-yellow-400 to-amber-500" },
  { name: "Tasty Snacks", value: "snacks", icon: "🥨", color: "from-green-400 to-teal-500" },
  { name: "Beverages", value: "beverages", icon: "🥤", color: "from-blue-400 to-indigo-500" },
  { name: "Frozen Foods", value: "frozen", icon: "🧊", color: "from-cyan-400 to-blue-500" }
];

const features = [
  { icon: MapPin, title: "Visit Our Store", desc: "Come shop in person" },
  { icon: Shield, title: "Quality Assured", desc: "100% authentic products" },
  { icon: Clock, title: "Fresh Stock", desc: "Weekly shipments from India" },
  { icon: Coffee, title: "Indian Cafe", desc: "Fresh chai & snacks daily" }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    const products = await Product.filter({ featured: true }, "-created_date", 6);
    setFeaturedProducts(products);
    setLoading(false);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--primary-gold)] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary-orange)] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--primary-gold)]/30 mb-6">
                <Sparkles className="w-4 h-4 text-[var(--primary-gold)]" />
                <span className="text-sm font-medium text-white">Fresh Arrivals Weekly</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[var(--primary-gold)] via-[var(--primary-orange)] to-[var(--primary-gold)] bg-clip-text text-transparent">
                  Authentic Indian
                </span>
                <br />
                <span className="text-white">Groceries & Cafe</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Premium quality rice, spices, lentils, and specialty items from India. 
                Visit our store and cafe for an authentic experience.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl("Products")}>
                  <Button size="lg" className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] hover:opacity-90 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                    View Products
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Cafe")}>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-[var(--primary-gold)] text-[var(--primary-gold)] bg-white hover:bg-[var(--primary-gold)] hover:text-white transition-all">
                    Visit Our Cafe
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] rounded-3xl opacity-30 blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a0b34b36b1ec?w=600&q=80"
                  alt="Indian Spices"
                  className="relative rounded-3xl shadow-2xl w-full border-2 border-[var(--primary-gold)]/30"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary-gold)] to-[var(--primary-orange)] text-white mb-4 shadow-lg">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-white to-[var(--light-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore our wide selection of authentic Indian products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link to={`${createPageUrl("Products")}?category=${category.value}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--primary-gold)] overflow-hidden">
                    <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[var(--primary-gold)] transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Available in-store now
              </p>
            </div>
            <Link to={createPageUrl("Products")}>
              <Button variant="outline" className="hidden md:flex border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/10">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-[var(--primary-gold)]">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          🛒
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[var(--primary-gold)] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                          <Star className="w-3 h-3 text-green-600 fill-current" />
                          <span className="text-xs font-medium text-green-700">4.8</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {product.description || "Premium quality product"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.unit && (
                            <span className="text-sm text-gray-500 ml-1">/{product.unit}</span>
                          )}
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          In Stock
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {featuredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured products yet</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--dark-bg)] via-[#2a2a2a] to-[var(--dark-bg)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary-gold)] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--primary-orange)] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience Authentic Indian Flavors?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Visit our store today and explore our full selection of groceries and fresh cafe items
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] hover:opacity-90 text-white text-lg px-8 py-6 shadow-xl">
                Get Directions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
