import "@/styles/ClientDashboard/ClientSection/index.css";

function ClientSection({ hmClientsDuplicated }: { hmClientsDuplicated: Array<{ name: string }> }) {
  return (
    <section className="hm-clients">
      <div className="hm-clients__container">
        <div className="hm-clients__header">
          <h1 className="hm-clients__title">
            Trusted by Leading Brands
          </h1>
          <p className="hm-clients__subtitle">
            Trusted by couriers, restaurants, clothing brands, e-commerce, food & beverage, and gift shops for custom, eco-friendly packaging that protects products and boosts brand image.
          </p>
        </div>

        <div className="hm-clients__showcase">
          {/* First row - slides left to right */}
          <div className="hm-clients__row">
            <div className="hm-clients__track hm-clients__track--right">
              {hmClientsDuplicated.map((client, index) => (
                <div
                  key={`hm-clients-row1-${index}`}
                  className="hm-clients__card"
                >
                  <div className="hm-clients__card-content">
                    <div className="hm-clients__logo">
                      <span className="hm-clients__logo-text">
                        {client.name.slice(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <p className="hm-clients__name">
                      {client.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - slides right to left */}
          <div className="hm-clients__row">
            <div className="hm-clients__track hm-clients__track--left">
              {hmClientsDuplicated.map((client, index) => (
                <div
                  key={`hm-clients-row2-${index}`}
                  className="hm-clients__card"
                >
                  <div className="hm-clients__card-content">
                    <div className="hm-clients__logo">
                      <span className="hm-clients__logo-text">
                        {client.name.slice(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <p className="hm-clients__name">
                      {client.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade out edges */}
          <div className="hm-clients__fade hm-clients__fade--left"></div>
          <div className="hm-clients__fade hm-clients__fade--right"></div>
        </div>
      </div>
      </section>
  )
}

export default ClientSection;