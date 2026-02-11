import React from "react";
import "./PricingPage.css";
import { Lock, Shield } from "lucide-react";

const PricingPage = () => {
  const handlePayment = () => {
    // Redirect to GoCardless payment link
    window.location.href = "https://sqgee.com/u/orwyy";
  };

  return (
    <div className="pricing-wrapper" id="pricing">
      {/* Header Section */}
      <div className="pricing-header">
        <h1>Professional Bin Cleaning Service</h1>
        <p>
          Keep your bins fresh, clean, and hygienic every month. Simple pricing, no hidden fees.
        </p>
        <div
          style={{
            marginTop: '24px',
            padding: '12px 14px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              lineHeight: '1',
            }}
          >
            🔒
          </span>
          <p
            style={{
              fontSize: '13px',
              color: '#ffffff',
              margin: 0,
              lineHeight: '1.4',
              fontWeight: '500',
            }}
          >
            Just complete your details below before payment, and you're all set! Your privacy matters to us—your information stays secure and is used only for this booking.
          </p>
        </div>


      </div>


      {/* Three Wheelie Bin Pricing Cards */}
      <div className="pricing-cards-grid">
        {/* Card 1: Single Bin */}
        <div className="bin-card">
          <div className="bin-lid"></div>
          <div className="bin-body">
            <div className="bin-content">
              <div className="bin-quantity">1x Wheelie Bin</div>
              <div className="bin-frequency">Washed once every 4 weeks</div>
              <div className="bin-price">
                <span className="price-symbol">£</span>
                <span className="price-amount">8</span>
              </div>
              <button className="bin-cta-btn" onClick={handlePayment}>
                Pay Direct Debit
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Two Bins */}
        <div className="bin-card">
          <div className="bin-lid"></div>
          <div className="bin-body">
            <div className="bin-content">
              <div className="bin-quantity">2x Wheelie Bins</div>
              <div className="bin-frequency">Washed once every 4 weeks</div>
              <div className="bin-price">
                <span className="price-symbol">£</span>
                <span className="price-amount">12</span>
              </div>
              <button className="bin-cta-btn" onClick={handlePayment}>
                Pay Direct Debit
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Three or More Bins - MOST POPULAR */}
        <div className="bin-card featured">
          <div className="popular-badge">Most Popular</div>
          <div className="bin-lid"></div>
          <div className="bin-body">
            <div className="bin-content">
              <div className="bin-quantity">3x or More Wheelie Bins</div>
              <div className="bin-frequency">Washed once every 4 weeks</div>
              <div className="bin-price">
                <span className="price-symbol">£</span>
                <span className="price-amount">15</span>
              </div>
              <button className="bin-cta-btn" onClick={handlePayment}>
                Pay Direct Debit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="trust-section">
        <h3>Your Payment is Safe</h3>
        <div className="trust-grid">
          <div className="trust-item">
            <Lock size={28} />
            <h4>Secure & Encrypted</h4>
            <p>All payments processed securely. Your card details are protected with industry-standard encryption.</p>
          </div>
          <div className="trust-item">
            <Shield size={28} />
            <h4>Your Data Protected</h4>
            <p>GDPR compliant. We never store your card information. Your privacy is our priority.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;