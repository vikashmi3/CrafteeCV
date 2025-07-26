import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>Welcome to <strong>CrafteeCV</strong>! This website has been created solely for educational and learning purposes. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.</p>

      <ol className="list-decimal list-inside mt-4 space-y-4">
        <li>
          <strong>Purpose of the Website</strong><br />
          This website is intended for educational use only. It allows users to create sample resumes for learning and practice purposes. The website is non-commercial and does not offer any paid services or products.
        </li>
        <li>
          <strong>No Commercial Use</strong><br />
          This platform is strictly for non-commercial and educational use. Users may not use this website or any resume templates generated for commercial gain or job application submissions.
        </li>
        <li>
          <strong>User Content</strong><br />
          By using this site, you may input personal or fictional data to generate resumes. We do not store or share any personal information you input. However, please avoid submitting sensitive or real personal data.
        </li>
        <li>
          <strong>Intellectual Property</strong><br />
          All templates, design elements, and educational materials on this website are the property of <strong>Vikash Mishra</strong> unless otherwise noted. They are provided under a non-commercial, educational license and may not be reused or redistributed for profit.
        </li>
        <li>
          <strong>No Warranty</strong><br />
          This website is provided "as is" without any warranties, express or implied. While we aim to provide a functional and helpful educational tool, we do not guarantee the accuracy or reliability of any content generated.
        </li>
        <li>
          <strong>Limitation of Liability</strong><br />
          We are not responsible for any loss or damage that may arise from the use of this website, including but not limited to errors in resume content or issues related to third-party use.
        </li>
        <li>
          <strong>External Links</strong><br />
          This site may contain links to third-party websites. We are not responsible for the content or practices of any linked site.
        </li>
        <li>
          <strong>Changes to Terms</strong><br />
          We reserve the right to modify these Terms and Conditions at any time without notice. Your continued use of the site constitutes acceptance of the updated terms.
        </li>
        <li>
          <strong>Contact Us</strong><br />
          If you have any questions or concerns regarding these Terms, please contact us at <a href="mailto:study.vikashmishra@gmail.com" className="text-indigo-600 underline">study.vikashmishra@gmail.com</a>.
        </li>
      </ol>

      <p className="mt-6">By using this site, you agree to these Terms and Conditions.</p>
    </div>
  );
};

export default PrivacyPolicy;
