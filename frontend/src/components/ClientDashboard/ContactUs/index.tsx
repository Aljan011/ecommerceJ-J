import "@/styles/ClientDashboard/ContactUs/index.css"

function Contact() {
  return (
    <section className="hm-contact">
        <div className="hm-container">
          <div className="hm-contact-content">
            <div className="hm-contact-info">
              <h2 className="hm-section-title">Get In Touch</h2>
              <p className="hm-contact-text">
                Looking for reliable packaging in Nepal? Get in touch with J and J’s Packaging today for custom solutions that fit your business needs..
              </p>
              <div className="hm-contact-details">
                <div className="hm-contact-item">
                  <strong>Address:</strong>   Sankhamul, Kathmandu, Lalitpur, Nepal
                </div>
                <div className="hm-contact-item">
                  <strong>Phone:</strong> +9779843223219
                </div>
                <div className="hm-contact-item">
                  <strong>Email:</strong> jandjsprinting@gmail.com
                </div>
              </div>
            </div>
            <div className="hm-social-media">
              <h3 className="hm-social-title">Follow & Connect</h3>
              <div className="hm-social-icons">
                <a href="https://www.facebook.com/paperbagnepalfactory/" className="hm-social-icon hm-facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
  href="https://www.instagram.com/jandj_paper_bag_nepal/"
  target="_blank"
  rel="noopener noreferrer"
  className="hm-social-icon hm-instagram flex items-center justify-center rounded-full w-10 h-10 border border-gray-400 text-gray-400 hover:text-white transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path
      d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
    />
  </svg>
</a>


                <a
  href="https://maps.app.goo.gl/r1Rq6ZHzzLMwKRQF8"
  target="_blank"
  rel="noopener noreferrer"
  className="hm-social-icon hm-googlemaps flex items-center justify-center rounded-full w-10 h-10 border border-gray-400 text-gray-400 hover:text-white transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M256 0C150 0 64 86 64 192c0 135 192 320 192 320s192-185 192-320C448 86 362 0 256 0zm0 272a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"/>
  </svg>
</a>

                <a href="https://api.whatsapp.com/send/?phone=9779843223219&text&type=phone_number&app_absent=0" className="hm-social-icon hm-whatsapp">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Contact