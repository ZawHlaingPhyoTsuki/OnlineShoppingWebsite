import React from "react";
import Breadcrumb from "../Common/Breadcrumb";

const RefundPolicy = () => {
  return (
    <>
      <Breadcrumb title="Refund Policy" pages={["Refund Policy"]} />
      <div className="container mx-auto p-6 max-w-4xl pb-30">
        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
        <p className="text-gray-600 mb-10">Effective date: February 27, 2025</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-700">
            At [Your Store Name], we aim to provide high-quality product
            showcases for clothes, shoes, and more. We currently offer Cash on
            Delivery (COD) as our only payment method and do not process online
            payments. Please note that due to the nature of our service, no
            refunds are available after placing an order.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Refund Policy</h2>
          <p className="text-gray-700">
            We strive to ensure customer satisfaction through accurate product
            details and descriptions. However, since we do not facilitate online
            transactions or deliver physical products directly, refunds are not
            applicable after an order is placed via COD.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">No Refund Scenarios</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              No refunds are provided after an order is placed, as our service
              is for product showcase and information only.
            </li>
            <li>
              Refunds are not available if you change your mind or decide not to
              proceed with the purchase.
            </li>
            <li>
              Since we rely on COD, no financial transactions are processed
              through our site, eliminating refund eligibility.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-700">
            If you have questions or need assistance regarding your order or our
            policies, feel free to contact us via our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact page
            </a>{" "}
            to send a direct email. We’re here to help with any inquiries!
          </p>
        </section>
      </div>
    </>
  );
};

export default RefundPolicy;
