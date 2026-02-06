import "@/styles/ClientDashboard/HeroSection/index.css";

function HeroSection() {
  return (
    <section className="hm-hero">
        <div className="hm-hero-bg">
          <img src="/public/hero-bg-paper-bags.jpg" alt="Paper bags background" className="hm-hero-image" />
          <div className="hm-hero-overlay"></div>
        </div>
        <div className="hm-hero-content">
          <div className="hm-container">
            <h1 className="hm-hero-title">Premium Packaging Solutions in Nepal
              <span className="hm-hero-subtitle">Paper Bags, Boxes & Printing Supplies</span>
            </h1>
            <p className="hm-hero-tagline">
              High-quality paper bags, boxes, and printing supplies in Kathmandu,
               Lalitpur, Nepal. Custom, eco-friendly packaging solutions for every business.
            </p>
           <button
  className="hm-hero-cta" 
  onClick= {() => window.location.href = '/categories'}
>
  Shop Now
</button>
          </div>
        </div>
      </section>
  )
}

export default HeroSection;