import React from "react";
import "./PricingPage.css";
import { Check, Lock, Shield } from "lucide-react";

const PricingPage = () => {
  const handlePayment = () => {
    // Redirect to GoCardless payment link
    window.location.href = "https://pay.gocardless.com/BRT00045GN85RSG";
  };

  return (
    <div className="pricing-wrapper" id="pricing">
      {/* Header Section */}
      <div className="pricing-header">
        <h1>Professional Bin Cleaning Service</h1>
        <p>
          Keep your bins fresh, clean, and hygienic every month. Simple pricing, no hidden fees.
        </p>
      </div>

      {/* Single Pricing Card */}
      <div className="pricing-card-container">
        <div className="pricing-card">
          {/* Card Header */}
          <div className="card-header">
            <h2>Monthly Plan</h2>
            <p className="tagline">All bins • Unlimited frequency</p>
          </div>

          {/* Price Section */}
          <div className="plan-price">
            <div className="price-display">
              <span className="currency">£</span>
              <span className="amount">15</span>
              <span className="period">/month</span>
            </div>
          </div>

          {/* Features List */}
          <ul className="features-list">
            <li>
              <Check size={20} className="check-icon" />
              <span>Unlimited bins</span>
            </li>
            <li>
              <Check size={20} className="check-icon" />
              <span>Deep cleaning</span>
            </li>
            <li>
              <Check size={20} className="check-icon" />
              <span>Priority support</span>
            </li>
            <li>
              <Check size={20} className="check-icon" />
              <span>Free deodorizing</span>
            </li>
            <li>
              <Check size={20} className="check-icon" />
              <span>Flexible scheduling</span>
            </li>
            <li>
              <Check size={20} className="check-icon" />
              <span>Eco-friendly products</span>
            </li>
          </ul>

          {/* CTA Button */}
          <button className="cta-btn" onClick={handlePayment}>
            Pay Now
          </button>
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