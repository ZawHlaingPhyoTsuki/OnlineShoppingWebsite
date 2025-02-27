import React from "react";
import Breadcrumb from "../Common/Breadcrumb";

const PrivacyPolicy = () => {
  return (
    <>
      <Breadcrumb title="Privacy Policy" pages={["Privacy Policy"]} />
      <div className="container mx-auto p-6 max-w-4xl pb-30">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          <span className="font-semibold">Effective date:</span> February 27, 2025
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">1. Introduction</h2>
          <p className="text-gray-700">
            This Privacy Policy applies to the use of the website and products
            provided by [Your Store Name], located at Flat 4/A, HOUSE-166,
            Bashundhara R/A, Vatara (hereinafter referred to as “we” or “us”).
            This policy governs the collection and use of information on our
            site, which is designed to showcase products like clothes, shoes,
            and more, with features for browsing, sorting by categories,
            searching, and viewing details.
          </p>
          <p className="text-gray-700">
            Our website is accessible to all visitors without requiring login or
            sign-up. However, an admin login is available for managing products.
            If you have questions, contact us at support@yourstore.com.
          </p>
          <p className="text-gray-700">
            We are committed to protecting your privacy and comply with
            applicable data protection laws, including the General Data
            Protection Regulation (GDPR) 2016/679 where applicable. This policy
            explains how we handle any personal information collected.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">
            2. Information We May Collect
          </h2>
          <p className="text-gray-700">
            As our website does not require user accounts or logins for general
            browsing, we do not collect personal data such as names or email
            addresses from visitors. However, if you contact us (e.g., via email
            for inquiries), we may collect your email address and any
            information you provide voluntarily.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            Any information collected (e.g., email for support inquiries) is
            used solely to respond to your requests and improve our services. We
            do not use this data for marketing or share it with third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">
            4. Cookies and Tracking
          </h2>
          <p className="text-gray-700">
            We may use cookies to enhance your browsing experience, track usage
            patterns, and optimize our site (e.g., remembering your sort
            preferences). You can disable cookies in your browser settings,
            though this may limit some functionality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">
            5. Third-Party Services
          </h2>
          <p className="text-gray-700">
            Our site may include links to third-party websites or use
            third-party tools for analytics or support. We do not share personal
            data with these parties, but their privacy policies apply if you
            interact with them.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">6. Admin Access</h2>
          <p className="text-gray-700">
            Our admin page, accessible only to authorized personnel, is used for
            product management (e.g., adding, editing, or removing products).
            Personal data related to admin access is handled separately and
            secured with login credentials.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-8">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Check this page for
            the latest version. Significant changes will be posted here, and
            continued use of the site constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <p className="text-gray-600 mt-4">
          For further inquiries, email us at{" "}
          <a
            href="mailto:support@yourstore.com"
            className="text-blue-600 hover:underline"
          >
            support@yourstore.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
