import React from 'react';

const RefundPolicy =()=> {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h1 className="ml-4 text-3xl font-bold text-gray-900">Refund Policy</h1>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">Last Updated: March 15, 2024</p>

              <p className="text-gray-700 mb-6">
                At ImageAI, we strive to provide the best possible service. Here's our refund policy for our subscription plans and services.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Refund Eligibility</h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <p className="text-green-700 font-medium">Refunds are possible in the following cases:</p>
                <ul className="list-disc pl-6 text-green-700 mt-2">
                  <li>Duplicate payment due to technical error</li>
                  <li>Service unavailability exceeding 24 hours</li>
                  <li>Subscription cancellation within 48 hours of purchase</li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Non-Refundable Cases</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-red-700 font-medium">Refunds will NOT be provided if:</p>
                <ul className="list-disc pl-6 text-red-700 mt-2">
                  <li>You've used the service for image generation</li>
                  <li>Subscription period has exceeded 48 hours</li>
                  <li>Account terminated due to policy violations</li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How to Request a Refund</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Email us at support@imageai.com with your order details</li>
                <li>Include your account email and payment confirmation</li>
                <li>Explain the reason for your refund request</li>
                <li>We'll process eligible refunds within 5-7 business days</li>
              </ol>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Processing Time</h2>
              <p className="text-gray-700">
                Approved refunds will be processed within 5-7 business days. The time to receive the refund may vary depending on your payment method and financial institution.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                For any questions about our refund policy, please contact us at{' '}
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

export default React.memo(RefundPolicy)
