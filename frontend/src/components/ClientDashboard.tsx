"use client";

import CategoryList from "./category/CategoryList";
import AboutUsSection from "./ClientDashboard/AboutUsSection";
import ClientSection from "./ClientDashboard/ClientSection";
import Contact from "./ClientDashboard/ContactUs";
import HeroSection from "./ClientDashboard/HeroSection/index";

const hmClientsData = [
  { name: "CaRaRu", logo: "/api/placeholder/120/60" },
  { name: "Biography", logo: "/api/placeholder/120/60" },
  { name: "Merobhnu", logo: "/api/placeholder/120/60" },
  { name: "Sunrise Apartments", logo: "/api/placeholder/120/60" },
  { name: "YoTi School", logo: "/api/placeholder/120/60" },
  { name: "Postbase", logo: "/api/placeholder/120/60" },
  { name: "Dreams & Ideas", logo: "/api/placeholder/120/60" },
  { name: "Probio", logo: "/api/placeholder/120/60" },
  { name: "Yeti Nails & Spa", logo: "/api/placeholder/120/60" },
  { name: "KUDH", logo: "/api/placeholder/120/60" },
  { name: "Eco Farm", logo: "/api/placeholder/120/60" },
  { name: "Green Leaf", logo: "/api/placeholder/120/60" },
];

// Duplicate clients for seamless infinite scroll
const hmClientsDuplicated = [...hmClientsData, ...hmClientsData];

export const ClientDashboard = () => {
  return (
    <main className="client-dashboard">
      <HeroSection />
      <ClientSection hmClientsDuplicated={hmClientsDuplicated} />

      <div className="p-6">
        <h1 className="mb-4 text-xl font-semibold"></h1>
        <CategoryList />
        <AboutUsSection />
        <Contact />
      </div>
    </main>
  );
};
