import React, { useState } from 'react';
import { X, Gift, Mail, Copy, Check, Heart, Landmark } from 'lucide-react';

export default function GiftModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const bankInfo = {
    bank: "Commercial Bank of Ceylon PLC",
    branch: "Colombo Fort Branch (001)",
    accountNumber: "8009123456",
    beneficiary: "Kavindu Wickramasinghe & Tharushi Jayasuriya",
    swiftCode: "CCEYLKX"
  };

  const bankInfo2 = {
    bank: "Hatton National Bank (HNB)",
    branch: "Kollupitiya Branch",
    accountNumber: "023010987654",
    beneficiary: "K. Wickramasinghe & T. Jayasuriya"
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">BLESSINGS &amp; GIFTS • සුබ පැතුම්</div>
          <h3 className="modal-title">Gifts of Love</h3>
        </div>

        <div className="gift-quote-box">
          <Heart size={20} className="gift-heart-icon" />
          <p>
            "Your presence, warm smiles, and heartfelt blessings on our auspicious day are the most precious gifts of all. 
            If you wish to honor us with a gift, your contributions toward our new beginning together are deeply cherished."
          </p>
        </div>

        <div className="gift-methods-grid">
          {/* Traditional Wish Box */}
          <div className="gift-method-card highlight">
            <div className="gift-method-icon">
              <Mail size={24} />
            </div>
            <h4>Traditional Wish &amp; Blessing Box</h4>
            <p>
              A special blessing box for cards and envelopes will be placed at the reception lobby table for your heartfelt wishes.
            </p>
          </div>

          {/* Bank Transfer (LKR) */}
          <div className="gift-method-card">
            <div className="gift-method-icon">
              <Landmark size={24} />
            </div>
            <h4>Bank Transfer (Sri Lanka - LKR)</h4>
            <p className="gift-sub">Details for direct bank transfer / CEFT:</p>

            <div className="bank-details-list">
              <div className="bank-item">
                <span className="label">Bank:</span>
                <span className="val">{bankInfo.bank}</span>
              </div>
              <div className="bank-item">
                <span className="label">Branch:</span>
                <span className="val">{bankInfo.branch}</span>
              </div>
              <div className="bank-item">
                <span className="label">Beneficiary:</span>
                <span className="val">{bankInfo.beneficiary}</span>
              </div>

              <div className="bank-item copyable">
                <div className="text-col">
                  <span className="label">Account Number:</span>
                  <span className="val code">{bankInfo.accountNumber}</span>
                </div>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(bankInfo.accountNumber, 'acc1')}
                  title="Copy Account Number"
                >
                  {copiedKey === 'acc1' ? <Check size={16} color="#7e1227" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="bank-item copyable">
                <div className="text-col">
                  <span className="label">SWIFT Code:</span>
                  <span className="val code">{bankInfo.swiftCode}</span>
                </div>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(bankInfo.swiftCode, 'swift')}
                  title="Copy SWIFT Code"
                >
                  {copiedKey === 'swift' ? <Check size={16} color="#7e1227" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {copiedKey && (
              <div className="copy-toast">
                <Check size={14} /> Copied to clipboard successfully!
              </div>
            )}
          </div>
        </div>

        <div className="gift-footer-note">
          ආයුබෝවන් • Thank you for your warmth, love, and generosity!
        </div>
      </div>
    </div>
  );
}
