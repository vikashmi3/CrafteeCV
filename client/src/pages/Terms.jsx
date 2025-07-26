import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Resume Builder ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              2. Use License
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>
                Permission is granted to temporarily download one copy of Resume Builder per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              3. User Accounts
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              4. Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy. By using our service, you consent to the collection and use of information in accordance with our Privacy Policy.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              5. Content and Data
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>
                Our service allows you to create, store, and share resume content. You retain full ownership of your content. We do not claim any ownership rights in your content.
              </p>
              <p>
                By using our service, you grant us a limited license to use, store, and backup your content solely for the purpose of providing our services to you.
              </p>
              <p>
                You are responsible for maintaining the confidentiality and accuracy of your content. We are not responsible for any loss or damage to your content.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              6. Prohibited Uses
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-3">You may not use our service:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>for any unlawful purpose or to solicit others to engage in unlawful acts</li>
                <li>to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>to infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>to submit false or misleading information</li>
                <li>to upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              7. Service Availability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to provide continuous service availability, but we do not guarantee that our service will be uninterrupted or error-free. We reserve the right to suspend or terminate the service at any time for maintenance, updates, or other operational reasons.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              8. Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms relating to this website and the use of this website.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              9. Limitations
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Resume Builder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Resume Builder's website, even if Resume Builder or a Resume Builder authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              10. Accuracy of Materials
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The materials appearing on Resume Builder's website could include technical, typographical, or photographic errors. Resume Builder does not warrant that any of the materials on its website are accurate, complete, or current. Resume Builder may make changes to the materials contained on its website at any time without notice. However, Resume Builder does not make any commitment to update the materials.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              11. Modifications
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Resume Builder may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              12. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Resume Builder operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              13. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our contact page or email us at support@resumebuilder.com.
            </p>
          </section>

        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Terms;
