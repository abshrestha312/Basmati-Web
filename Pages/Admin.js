import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { SalesFlyer } from "@/entities/SalesFlyer";
import { UploadFile } from "@/integrations/Core";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await User.me();
      if (currentUser.role !== "admin") {
        navigate(createPageUrl("Home"));
        return;
      }
      setUser(currentUser);
    } catch (error) {
      await User.loginWithRedirect(window.location.href);
    }
    setLoading(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setMessage(null);
    } else {
      setMessage({ type: "error", text: "Please select a PDF file" });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setMessage(null);

    try {
      // Upload the new flyer
      const { file_url } = await UploadFile({ file: selectedFile });

      // Delete old flyers
      const oldFlyers = await SalesFlyer.list();
      for (const flyer of oldFlyers) {
        await SalesFlyer.delete(flyer.id);
      }

      // Create new flyer record
      await SalesFlyer.create({
        file_url,
        upload_date: new Date().toISOString().split('T')[0]
      });

      setMessage({ type: "success", text: "Sales flyer uploaded successfully!" });
      setSelectedFile(null);
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading flyer. Please try again." });
      console.error("Upload error:", error);
    }

    setUploading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--light-cream)] to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--light-cream)] to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-gray-600">Welcome, {user?.full_name}</p>
          </div>

          <Card className="border-2 border-[var(--primary-gold)]/30 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] text-white">
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Upload Sales Flyer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--primary-gold)] transition-colors">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="flyer-upload"
                  />
                  <label
                    htmlFor="flyer-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-gold)] to-[var(--primary-orange)] rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedFile ? selectedFile.name : "Click to upload PDF"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedFile ? "Click again to change file" : "Upload your weekly sales flyer (PDF only)"}
                    </p>
                  </label>
                </div>

                {message && (
                  <Alert variant={message.type === "error" ? "destructive" : "default"}>
                    {message.type === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{message.text}</AlertDescription>
                  </Alert>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Uploading a new flyer will automatically delete the previous one. 
                    Only one flyer is displayed at a time on the Deals page.
                  </p>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className="w-full bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] hover:opacity-90 text-white h-12"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Flyer
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}