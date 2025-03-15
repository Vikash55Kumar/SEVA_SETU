import React from 'react';

export default function DigitalDelivery() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="ml-4 text-3xl font-bold text-gray-900">Digital Delivery Policy</h1>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">Last Updated: March 10, 2024</p>
              
              <p className="text-gray-700 mb-6">
                At <strong>Seva Setu</strong>, we ensure a seamless and secure process for digital certificate issuance.
                Below are the guidelines regarding digital delivery and access to verified certificates.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Certificate Delivery Method</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Once verified, certificates are <strong>delivered digitally via email</strong> to the registered email ID.</li>
                <li>Users receive a <strong>secure PDF download link</strong> for easy access.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Processing Time</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Certificate verification usually takes <strong>3-5 business days</strong>.</li>
                <li>Upon approval, the certificate is emailed instantly.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Resending Certificates</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>If a certificate is not received, users can track and download certificate from the user portal.</li>
                <li>Ensure that your email ID is correctly registered to avoid delivery failures.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Modifications & Corrections</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>In case of errors in the issued certificate, users must request a correction within <strong>7 days</strong>.</li>
                <li>Corrections require verification of supporting documents.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Security & Data Protection</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All digital certificates are stored securely and encrypted for user protection.</li>
                <li>Access to certificates is restricted and requires proper authentication.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
              <p className="text-gray-700">
                If you have any queries regarding certificate delivery, please contact us at{' '}
                <a href="mailto:sevasetuteam@gmail.com" className="text-blue-600 hover:text-blue-700">
                sevasetuteam@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
