"use client"
import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sticky Sidebar */}
      <div className="sticky top-0 left-0 h-screen z-30">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-20 bg-background">
          <Navbar 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 p-6 pt-5 glow-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
} 