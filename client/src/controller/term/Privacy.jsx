import React from 'react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="ml-4 text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">Last Updated: March 15, 2024</p>
              
              <p className="text-gray-700 mb-6">At ImageAI, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal Details: Name, Email, Phone Number</li>
                <li>Account Information: Login credentials, usage history</li>
                <li>Generated Content: AI-generated images and prompts</li>
                <li>Usage Data: IP address, browser type, and website interaction logs</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Data</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide and maintain our image generation service</li>
                <li>To improve platform security & provide customer support</li>
                <li>To process payments and manage subscriptions</li>
                <li>We DO NOT sell or share your data with third parties</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Data Protection & Security</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All data is stored securely using industry-standard encryption</li>
                <li>Regular security audits and updates</li>
                <li>Strict access controls and monitoring</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Services</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Payments are processed via secure payment gateways</li>
                <li>Authentication services for account security</li>
                <li>Cloud storage for generated images</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about our privacy policy, please contact us at{' '}
                <a href="mailto:support@imageai.com" className="text-purple-600 hover:text-purple-700">
                  support@imageai.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}