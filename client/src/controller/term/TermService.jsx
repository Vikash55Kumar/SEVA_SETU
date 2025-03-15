import React from 'react';

const TermService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="ml-4 text-3xl font-bold text-gray-900">Terms & Conditions</h1>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">Last Updated: March 10, 2024</p>

              <p className="text-gray-700 mb-6">
                Welcome to ImageAI. By using our platform, you agree to these terms and conditions.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Use of Service</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You must be at least 18 years old to use this service</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>Misuse of the platform may result in account termination</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Subscription & Payments</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Subscription fees are billed in advance</li>
                <li>Payments are processed securely via our payment partners</li>
                <li>Prices may change with notice to users</li>
                <li>Refunds are subject to our refund policy</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Content & Copyright</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You retain rights to your input prompts</li>
                <li>Generated images are subject to our usage terms</li>
                <li>Do not generate illegal or prohibited content</li>
                <li>We may terminate accounts violating these terms</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Service provided "as is" without warranties</li>
                <li>We are not liable for generated content</li>
                <li>User responsible for content compliance</li>
                <li>We may modify or terminate services</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Privacy & Data</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We collect and process data as per our Privacy Policy</li>
                <li>You agree to our data handling practices</li>
                <li>We implement reasonable security measures</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Changes to Terms</h2>
              <p className="text-gray-700">
                We may update these terms with notice to users. Continued use of the service constitutes acceptance of new terms.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
              <p className="text-gray-700">
                For any questions about our terms, please contact us at{' '}
                <a href="mailto:sevasetuteam@gmail.com" className="text-purple-600 hover:text-purple-700">
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



export default React.memo(TermService)


