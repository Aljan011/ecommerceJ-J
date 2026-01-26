import "@/styles/MenuBar/Footer.css";

function FooterSection() {
  return (
    <footer className="hm-footer">
      <div className="hm-footer-container">
        {/* Column 1: Logo & About */}
        <div className="hm-footer-col">
          <h3 className="hm-footer-logo">Company Logo</h3>
          <p className="hm-footer-text">
            J and J’s Packaging is a leading packaging company in Nepal, 
            specializing in paper bags, corrugated boxes, custom packaging, and printing supplies.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="hm-footer-col">
          <h4 className="hm-footer-title">Quick Links</h4>
          <ul className="hm-footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="#">Paper Bag</a></li>
            <li><a href="#">Corogated Box</a></li>
            <li><a href="/packaging-services">Printing Supplies</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="hm-footer-col">
          <h2 className="hm-footer-title">Contact Us</h2>
          <p>Email: jandjsprinting@gmail.com</p>
          <p>Phone: +977 9843223219</p>
          <p>Address: Kathmandu, Nepal</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="hm-footer-bottom">
        <p>© {new Date().getFullYear()} JandJ Packaging. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default FooterSection