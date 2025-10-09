import React, { useState, useEffect } from "react";
import { SalesFlyer } from "@/entities/SalesFlyer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Calendar, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function Deals() {
  const [currentFlyer, setCurrentFlyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentFlyer();
  }, []);

  const loadCurrentFlyer = async () => {
    const flyers = await SalesFlyer.list("-upload_date", 1);
    if (flyers.length > 0) {
      setCurrentFlyer(flyers[0]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--light-cream)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] bg-clip-text text-transparent">
              Weekly Deals
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Check out our latest sales and special offers
          </p>
        </motion.div>

        {loading ? (
          <Card className="p-12 text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </Card>
        ) : currentFlyer ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden border-2 border-[var(--primary-gold)]/30 shadow-xl">
              <div className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] p-6 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Current Sales Flyer</h2>
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          Updated {format(new Date(currentFlyer.upload_date || currentFlyer.created_date), "MMMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={currentFlyer.file_url} download target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                    </a>
                    <a href={currentFlyer.file_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Open Full Screen
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white">
                <div className="w-full border-2 border-gray-200 rounded-lg overflow-hidden" style={{ height: '1000px' }}>
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(currentFlyer.file_url)}&embedded=true`}
                    className="w-full h-full"
                    title="Sales Flyer"
                    frameBorder="0"
                  />
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Having trouble viewing the flyer?
                  </p>
                  <div className="flex justify-center gap-4">
                    <a href={currentFlyer.file_url} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] hover:opacity-90 text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View in New Tab
                      </Button>
                    </a>
                    <a href={currentFlyer.file_url} download>
                      <Button variant="outline" className="border-[var(--primary-gold)] text-[var(--primary-gold)]">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 mb-4">
                Visit our store to take advantage of these amazing deals!
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/10">
                  Get Directions
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-12 text-center">
              <div className="text-6xl mb-6">📄</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No Sales Flyer Available
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon for our latest deals and special offers!
              </p>
              <Link to={createPageUrl("Products")}>
                <Button className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] hover:opacity-90 text-white">
                  Browse Products
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}