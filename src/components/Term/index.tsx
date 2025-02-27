import React from "react";
import Breadcrumb from "../Common/Breadcrumb";

const Terms = () => {
  return (
    <>
      <Breadcrumb
        title="Terms and Conditions"
        pages={["Terms and Conditions"]}
      />
      <div className="container mx-auto p-6 max-w-4xl pb-20">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-gray-600 mb-10">Effective date: February 27, 2025</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-700">
            Welcome to [Your Store Name], a platform showcasing clothes, shoes,
            and other products. By using our website, you agree to the following
            terms and conditions. This site is for browsing, sorting by
            categories, searching, and viewing product details, with an admin
            page for product management accessible only to authorized personnel.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
          <p className="text-gray-700">
            We do not collect personal information from visitors unless you
            contact us voluntarily (e.g., via email). Your data is secure, and
            we do not share it with third parties. For detailed information, see
            our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Product Access</h2>
          <p className="text-gray-700">
            Our site is freely accessible for viewing products. No login or
            sign-up is required for visitors. Product details, categories, and
            search functionality are available to all. Admin access for product
            management requires separate credentials.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Payment and Ordering</h2>
          <p className="text-gray-700">
            We currently support Cash on Delivery (COD) only. No online payments
            or credit card information is processed or stored on our servers.
            Orders are handled offline, and our site serves as a product
            catalog.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Support</h2>
          <p className="text-gray-700">
            If you encounter issues or have questions about our products or
            site, contact us via our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact page
            </a>
            . We aim to respond promptly with detailed assistance.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these terms periodically. Check this page for the
            latest version. Significant changes will be posted here, and
            continued use of the site constitutes acceptance of the updated
            terms.
          </p>
        </section>
      </div>
    </>
  );
};

export default Terms;
