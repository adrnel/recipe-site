import React from 'react';
import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Recipeasy Online</title>
        <meta
          name="description"
          content="Learn about the privacy practices of Recipeasy Online. Read our privacy policy to understand how we handle your information."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold my-6 mb-12">Privacy Policy</h1>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Effective Date: 18th May 2024
            </h2>
            <p>
              Welcome to Recipeasy Online! Your privacy is important to us. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website,
              www.recipeasy.online, and sign up for our mailing list. Please
              read this privacy policy carefully. If you do not agree with the
              terms of this privacy policy, please do not access the site.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Information We Collect
            </h2>
            <p>
              We collect minimal personal information to provide you with our
              services and enhance your experience on our website. The types of
              information we may collect include:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Personal Information:</strong> When you sign up for our
                mailing list, we collect your email address.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> We may collect
                non-personal information such as your browser type, operating
                system, and the pages you visit on our site.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Use of Your Information
            </h2>
            <p>We use the information we collect in the following ways:</p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Email Communications:</strong> To send you newsletters,
                updates, and promotional materials related to Recipeasy Online.
              </li>
              <li>
                <strong>Site Improvements:</strong> To understand how our
                website is used and to improve its content and functionality.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Disclosure of Your Information
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties
              your personally identifiable information. We may share information
              with third parties only in the following situations:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Service Providers:</strong> We may share your
                information with third-party service providers who assist us in
                operating our website and conducting our business, so long as
                those parties agree to keep this information confidential.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required to do so by law or in response to valid
                requests by public authorities.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Third-Party Websites
            </h2>
            <p>
              Our website may contain links to third-party websites. This
              Privacy Policy does not apply to third-party websites. We are not
              responsible for the content, privacy policies, or practices of
              third-party websites. We encourage you to review the privacy
              policies of any third-party websites you visit.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Children&apos;s Privacy
            </h2>
            <p>
              Recipeasy Online does not knowingly collect or solicit personal
              information from children under the age of 13. If we learn that we
              have collected personal information from a child under age 13
              without verification of parental consent, we will delete that
              information as quickly as possible.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. You are advised to review this Privacy Policy
              periodically for any changes. Changes to this Privacy Policy are
              effective when they are posted on this page.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p>
              Email:{' '}
              <a href="mailto:privacy@recipeasy.online">
                privacy@recipeasy.online
              </a>
            </p>
          </section>
          <section>
            <p>By using our website, you consent to our Privacy Policy.</p>
          </section>
          <section>
            <p>This Privacy Policy was last updated on 24th May 2024.</p>
          </section>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default PrivacyPolicy;
