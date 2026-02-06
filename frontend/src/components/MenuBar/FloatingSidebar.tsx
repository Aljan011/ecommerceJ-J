"use client";

import { useState } from "react";
import { Phone, Mail, ArrowUp, ShoppingCart } from "lucide-react";

import "@/styles/MenuBar/FloatingSideBar.css";

const FloatingSidebar = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            {/* Main Sidebar Container */}
            <div className={`hm-floating-sidebar ${isMinimized ? "hm-minimized" : ""}`}>

                {/* Phone Button */}
                <a
                    href="tel:+977 9843223219"
                    className="hm-sidebar-btn hm-phone-btn"
                    title="Call us: +977 9843223219"
                >
                    <Phone size={22} />
                </a>

                {/* View Cart Button */}
                <a
                    href="/cart"
                    className="hm-sidebar-btn hm-cart-btn"
                    title="View Cart"
                >
                    <ShoppingCart size={22} />
                </a>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="hm-sidebar-btn hm-scroll-top-btn"
                    title="Back to top"
                >
                    <ArrowUp size={22} />
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleMinimize}
                className="hm-sidebar-toggle-btn"
                title={isMinimized ? "Expand menu" : "Minimize menu"}
            >
                {isMinimized ? "▶" : "◀"}
            </button>
        </>
    );

};

export default FloatingSidebar;