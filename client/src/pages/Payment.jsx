import React from 'react';
import qrCode from '../assets/QR.jpg';

const Payment = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Support Us</h1>
      <p className="mb-6 text-lg">
        If you find CrafteeCV helpful, please consider supporting us by making a donation.
      </p>
      <div className="inline-block p-4 border rounded-lg shadow-lg">
        {/* QR Code Image */}
        <img src={qrCode} alt="QR Code for Donation" className="w-64 h-64 object-contain mx-auto" />
      </div>
      <p className="mt-6 text-md">
        Scan the QR code above to donate. Thank you for your support!
      </p>
    </div>
  );
};

export default Payment;
