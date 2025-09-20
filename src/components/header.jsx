"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Code,
  BookOpen,
  Users,
  DollarSign,
  User,
  Database,
  Download,
  PencilLine,
  CircleHelp,
  MessageCircleQuestion,
  MessageCircle,
  LogIn,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "./logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-blue text-white px-4 py-2 rounded-md font-medium"
      >
        Skip to main content
      </Link>
      
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border border-transparent ${
          isScrolled
            ? "backdrop-blur-xl border-light/50 shadow-2xl shadow-blue/5"
            : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between transition-all duration-300 h-16`}
          >
            {/* Logo */}
            <Link href="/" className="group" aria-label="CSC Database - Home">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              <Link
                href="/about"
                className="flex items-center space-x-1 px-4 py-2 text-darkgray hover:text-blue transition-all duration-200 font-medium rounded-lg hover:bg-blue/5"
              >
                <User className="w-4 h-4" />
                <span>About</span>
              </Link>

              <div 
                className="relative group"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <button 
                  className="cursor-pointer flex items-center space-x-1 px-4 py-2 text-darkgray hover:text-blue transition-all duration-200 font-medium rounded-lg hover:bg-blue/5"
                  aria-expanded={isProductsDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Products menu"
                  onFocus={() => setIsProductsDropdownOpen(true)}
                  onBlur={() => setIsProductsDropdownOpen(false)}
                >
                  <Code className="w-4 h-4" />
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div 
                  className={`absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-xl border border-light/50 rounded-xl shadow-2xl transition-all duration-300 transform ${
                    isProductsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}
                  role="menu"
                  aria-labelledby="products-button"
                >
                  <div className="p-2">
                    <Link
                      href="/product/database"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue/10 transition-colors duration-200 group"
                    >
                      <div className="w-8 h-8 bg-blue/10 group-hover:bg-blue/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                        <Database className="w-4 h-4 text-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-dark">Database</div>
                        <div className="text-sm text-lightgray">
                          Complete open-source data
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/product/api"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue/10 transition-colors duration-200 group"
                    >
                      <div className="w-8 h-8 bg-green/10 group-hover:bg-green/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                        <Code className="w-4 h-4 text-green" />
                      </div>
                      <div>
                        <div className="font-medium text-dark">API Service</div>
                        <div className="text-sm text-lightgray">
                          Enterprise-grade API
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/product/export-tool"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue/10 transition-colors duration-200 group"
                    >
                      <div className="w-8 h-8 bg-blue/10 group-hover:bg-blue/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                        <Download className="w-4 h-4 text-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-dark">Export Tool</div>
                        <div className="text-sm text-lightgray">
                          Custom data exports
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/product/update-tool"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green/10 transition-colors duration-200 group"
                    >
                      <div className="w-8 h-8 bg-green/10 group-hover:bg-green/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                        <PencilLine className="w-4 h-4 text-green" />
                      </div>
                      <div>
                        <div className="font-medium text-dark">Update Tool</div>
                        <div className="text-sm text-lightgray">
                          Community contributions
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="flex items-center space-x-1 px-4 py-2 text-darkgray hover:text-blue transition-all duration-200 font-medium rounded-lg hover:bg-blue/5"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </Link>

              {/* Temporarily hidden - will launch later
              <Link
                href="/faqs"
                className="flex items-center space-x-1 px-4 py-2 text-darkgray hover:text-blue transition-all duration-200 font-medium rounded-lg hover:bg-blue/5"
              >
                <MessageCircleQuestion className="w-4 h-4" />
                <span>FAQs</span>
              </Link>
              */}

              <Link
                href="/contact"
                className="flex items-center space-x-1 px-4 py-2 text-darkgray hover:text-blue transition-all duration-200 font-medium rounded-lg hover:bg-blue/5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support</span>
              </Link>
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Login Dropdown */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  className="text-darkgray hover:text-blue hover:bg-blue/5 font-medium flex items-center space-x-1"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </Button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-light/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    <Link
                      href="https://forms.gle/ckZ8Gub6jS9sUihJA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue/10 transition-colors duration-200"
                    >
                      <Code className="w-4 h-4 text-blue" />
                      <span className="font-medium text-dark">Get API Key</span>
                    </Link>
                    <Link
                      href="https://export.countrystatecity.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue/10 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4 text-blue" />
                      <span className="font-medium text-dark">Export Tool</span>
                    </Link>
                    <Link
                      href="https://manager.countrystatecity.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue/10 transition-colors duration-200"
                    >
                      <PencilLine className="w-4 h-4 text-blue" />
                      <span className="font-medium text-dark">Update Tool</span>
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="bg-gradient-to-r from-blue to-blue/90 hover:from-blue/90 hover:to-blue text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-6"
              >
                <Link href="https://docs.countrystatecity.in/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Docs</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`cursor-pointer lg:hidden p-2 text-darkgray transition-colors duration-200 rounded-lg ${
                isMenuOpen
                  ? "hover:bg-danger/5 hover:text-danger"
                  : "hover:bg-blue/5 hover:text-blue"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              id="mobile-menu" 
              className="lg:hidden border-t border-light/50 bg-white/95 backdrop-blur-xl rounded-b-xl"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <nav className="py-6 space-y-2" role="navigation" aria-label="Mobile navigation">
                <div className="px-4 py-2">
                  <div className="text-sm font-semibold text-lightgray uppercase mb-3">
                    Products
                  </div>
                  <Link
                    href="/product/database"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Database className="w-5 h-5" />
                    <span>Database</span>
                  </Link>
                  <Link
                    href="/product/api"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Code className="w-5 h-5" />
                    <span>API Service</span>
                  </Link>
                  <Link
                    href="/product/export-tool"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Download className="w-5 h-5" />
                    <span>Export Tool</span>
                  </Link>
                  <Link
                    href="/product/update-tool"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PencilLine className="w-5 h-5" />
                    <span>Update Tool</span>
                  </Link>
                </div>

                <div className="border-t border-light/50 pt-4">
                  <Link
                    href="/pricing"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Pricing</span>
                  </Link>
                  <Link
                    href="https://docs.countrystatecity.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Documentation</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-3 px-4 py-3 text-darkgray hover:text-blue hover:bg-blue/5 transition-all duration-200 font-medium rounded-lg mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    <span>Contact</span>
                  </Link>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="px-4 pt-6 space-y-3 border-t border-light/50">
                  <Button
                    variant="ghost"
                    className="w-full text-darkgray hover:text-blue hover:bg-blue/5 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-blue to-blue/90 hover:from-blue/90 hover:to-blue text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
