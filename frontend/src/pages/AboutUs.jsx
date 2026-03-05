// src/pages/AboutUs.jsx
function AboutUs() {
  return (
    <div style={{ maxWidth: '900px', width: '90%', margin: '60px auto' }}>
      <div
        style={{
          background: '#fbf1d3',
          borderRadius: '16px',
          padding: '60px',
          textAlign: 'center',
        }}
      >
        <img src="/assets/logo.png" alt="Dandelions" style={{ width: '200px', marginBottom: '24px' }} />
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', color: '#c43a6d' }}>
          About Dandelions
        </h1>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.9', maxWidth: '600px', margin: '0 auto 30px' }}>
          Dandelions is a premium flower shop based in New Delhi, dedicated to enriching
          relationships through luxury floral arrangements. We believe that every emotion
          deserves the perfect flower to express it.
        </p>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.9', maxWidth: '600px', margin: '0 auto' }}>
          From anniversaries to birthdays, proposals to housewarmings — we craft
          arrangements that speak the language of love. Each bouquet is designed with
          care, passion, and the finest seasonal blooms.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '50px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '500+', label: 'Happy Customers' },
            { num: '50+', label: 'Arrangements' },
            { num: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '32px', fontWeight: '800', color: '#c43a6d' }}>{stat.num}</p>
              <p style={{ color: '#888', fontSize: '14px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
