import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark flex flex-col font-sans antialiased selection:bg-brand-blue/15 selection:text-brand-blue">
      {/* Premium Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <Home />
      </main>

      {/* Premium Footer */}
      <Footer />
    </div>
  );
}