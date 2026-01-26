import "@/styles/ClientDashboard/AboutUs/index.css";

function AboutUsSection() {
  return (
    <section>
<div className="hm-about-section">
  <div className="hm-container">
    <div className="hm-about-content">
      <div className="hm-about-text">
        <svg className="hm-leaf-icon" viewBox="0 0 24 24">
          <path d="M12 2L12.09 8.26L18 8L12 22L5.91 16.74L6 8L12 2Z" />
        </svg>

        <h3 className="hm-about-title">About Us</h3>

        <p className="hm-about-description">
          At J and J’s Packaging, we are a trusted packaging manufacturer in Nepal offering
           high-quality paper bags, corrugated boxes, custom packaging, and printing services.
            Our mission is to deliver durable, eco-friendly, and professionally designed solutions
             that help businesses showcase their products and strengthen their brand.
        </p>

        <a href="#" className="hm-view-more-btn">
          View More
          <div className="hm-arrow-icon"></div>
        </a>
      </div>

      <div className="hm-about-image-container">
        <div className="hm-floating-circles">
          <div className="hm-floating-circle hm-circle-1"></div>
          <div className="hm-floating-circle hm-circle-2"></div>
          <div className="hm-floating-circle hm-circle-3"></div>
          <div className="hm-floating-circle hm-circle-4"></div>
        </div>
        <div className="hm-main-circle"></div>
      </div>
    </div>

    <div className="hm-stats-section">
      <div className="hm-stat-item">
        <div className="hm-stat-icon hm-icon-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
              stroke="#4CAF50"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10"
              stroke="#4CAF50"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="hm-stat-content">
          <h3>18</h3>
          <p>18 years of experience in packaging in Nepal.</p>
        </div>
      </div>

      <div className="hm-stat-item">
        <div className="hm-stat-icon hm-icon-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3V21H21" stroke="#4CAF50" strokeWidth="2" />
            <path d="M7 12L12 7L16 11L21 6" stroke="#4CAF50" strokeWidth="2" />
          </svg>
        </div>
        <div className="hm-stat-content">
          <h3>1300+</h3>
          <p>1300+ client served till date </p>
        </div>
      </div>

      <div className="hm-stat-item">
        <div className="hm-stat-icon hm-icon-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#4CAF50"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M8 12H16M12 8V16"
              stroke="#4CAF50"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="hm-stat-content">
          <h3>150+ </h3>
          <p>150+ packaging category in Nepal</p>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
  )
}

export default AboutUsSection