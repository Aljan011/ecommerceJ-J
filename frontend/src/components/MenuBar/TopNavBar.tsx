"use client";

import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaLocationArrow } from "react-icons/fa";
import { PiPhone as Phone } from "react-icons/pi";

import "@/styles/MenuBar/TopNavbar.css";

import { useCategoryListQuery } from "@/lib";
import type { ICategory } from "@/types";

function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () =>
    setMenuOpen(!menuOpen);

  const [scrolled, setScrolled] = useState(false);

  const { data: categories } = useCategoryListQuery();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // when user scrolls more than 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* TOP BAR */}
      <div className="layout-topbar">
        <div className="layout-topbar-left">
          <a href="mailto:info@jjprinters.com" className="layout-topbar-item">
            <span style={{ fontSize: '25px' }}>✉</span>
            <span>jandjsprinting@gmail.com</span>
          </a>
          <span className="layout-topbar-separator">|</span>
          <a href="+977 9843223219" className="layout-topbar-item">
            <Phone size={20} className="text-white" />
            <span>+977 9843223219</span>
          </a>
        </div>

        <div className="layout-topbar-right">
          <a
            href="https://www.facebook.com/paperbagnepalfactory/"
            className="social-icon fb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/jandj_paper_bag_nepal/"
            className="social-icon tw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@jandjs_packaging"
            className="social-icon ln"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://maps.app.goo.gl/r1Rq6ZHzzLMwKRQF8"
            className="catalogue-btn"
          >
            <FaLocationArrow />
            <span className="catalogue-btn-name">Find Us</span>
          </a>
        </div>
      </div>

      {/* NAV BAR */}
      <nav className={`layout-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="layout-navbar-logo">
          <a href="/">
            <img
              src="/logo.jpg"
              alt="J&J Printers Logo"
              className="logo-icon cursor-pointer"
            />
          </a>
        </div>

        <button
          className="layout-navbar-hamburger"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`layout-navbar-links ${menuOpen ? 'open' : ''}`}>
          
          <a href="/categories">Products</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>

          
        </div>

      </nav>
    </>
  );

}

export default TopNavBar;