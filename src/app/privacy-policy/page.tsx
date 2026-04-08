import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Yonovo",
  description:
    "Yonovo Privacy Policy. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col pt-[var(--navbar-height)] bg-background">
        <section className="mx-auto flex w-full px-6 prose prose-zinc prose-p:my-2 max-w-4xl flex-col pt-32 pb-20">
          <h1>
            <strong>Privacy Policy</strong>
          </h1>

          <p>
            <strong>Last Updated: April 8, 2026</strong>
          </p>

          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            Yonovo Inc. (&quot;Yonovo,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) provides a SaaS-based accounts receivable
            automation platform that helps businesses collect outstanding
            invoices through personalized follow-ups across email, SMS, and
            voice (collectively with this website and any other products and
            services that link to this Privacy Policy, our
            &quot;Services&quot;).
          </p>
          <p>
            We understand that you are aware of and care about your own personal
            privacy interests, and we take that seriously. This Privacy Policy
            describes our policies and practices regarding the collection and
            use of your personal data, and sets forth your privacy rights. We
            recognize that information privacy is an ongoing responsibility, and
            so we will from time to time update this Privacy Policy as we
            undertake new personal data practices or adopt new privacy policies.
          </p>

          <p>
            <strong>Contacting Us About Data Protection</strong>
          </p>
          <p>
            For any inquiries or concerns regarding our personal data policies,
            practices, or if you wish to exercise your privacy rights, please
            feel free to reach out to us directly.
          </p>
          <p>
            <strong>Contact Information:</strong>
          </p>
          <p>Yonovo Inc.</p>
          <p>
            <a href="mailto:salman@yonovo.com">salman@yonovo.com</a>
          </p>

          <p>
            <strong>
              How We Collect and Use (Process) Your Personal Information
            </strong>
          </p>
          <p>
            Yonovo collects personal information about its website visitors and
            customers. With a few exceptions, this information is generally
            limited to:
          </p>
          <ul>
            <li>Name</li>
            <li>Job title</li>
            <li>Company name</li>
            <li>Work email address</li>
            <li>Work phone number</li>
            <li>Billing address</li>
          </ul>
          <p>
            We use this information to provide prospects and customers with our
            Services. We do not sell personal information to anyone and only
            share it with third parties who are facilitating the delivery of our
            Services.
          </p>

          <p>
            <strong>Information Processed on Behalf of Our Customers</strong>
          </p>
          <p>
            In the course of providing our accounts receivable automation
            Services, our customers may upload or sync invoice data, contact
            details of their own customers (such as names, email addresses,
            phone numbers, and payment information), and related financial
            records through integrations with accounting platforms such as
            QuickBooks and Xero. Yonovo processes this data solely on behalf of
            and under the instructions of our customers. Our customers are the
            data controllers for this information, and Yonovo acts as a data
            processor. We do not use this data for any purpose other than
            providing the Services to our customers.
          </p>

          <p>
            <strong>Use of the Yonovo Website</strong>
          </p>
          <p>
            As is true of most other websites, our website collects certain
            information automatically and stores it in log files. The
            information may include internet protocol (IP) addresses, the region
            or general location where your computer or device is accessing the
            internet, browser type, operating system, and other usage
            information about the use of our website, including a history of the
            pages you view.
          </p>
          <p>
            We use this information to help us design our site to better suit
            our users&apos; needs. We may also use your IP address to help
            diagnose problems with our server and to administer our website,
            analyze trends, track visitor movements, and gather broad
            demographic information that assists us in identifying visitor
            preferences.
          </p>

          <p>
            <strong>Cookies and Tracking Technologies</strong>
          </p>
          <p>
            Our website may use cookies and similar tracking technologies (such
            as web beacons and pixels) to distinguish you from other users,
            remember your preferences, understand how you interact with our
            Services, and improve your experience. You can control cookie
            settings through your browser. Please note that disabling cookies
            may affect the functionality of certain parts of our website.
          </p>

          <p>
            <strong>Sharing Information with Third Parties</strong>
          </p>
          <p>
            The personal information we collect from you is stored in databases
            hosted by third-party cloud service providers. These third parties
            do not use or have access to your personal information for any
            purpose other than cloud storage and retrieval.
          </p>
          <p>
            We do not otherwise reveal your personal data to non-Yonovo persons
            or businesses for their independent use unless: (1) you request or
            authorize it; (2) the information is provided to comply with the law
            (for example, to comply with a search warrant, subpoena, or court
            order), enforce an agreement we have with you, or to protect our
            rights, property, or safety, or the rights, property, or safety of
            our employees or others; (3) the information is provided to our
            agents, vendors, or service providers who perform functions on our
            behalf; (4) to address emergencies or acts of God; or (5) to
            address disputes, claims, or to persons demonstrating legal
            authority to act on your behalf.
          </p>

          <p>
            <strong>Communications via Email, SMS, and Voice</strong>
          </p>
          <p>
            Our Services enable automated follow-ups with your customers&apos;
            debtors via email, SMS, and voice calls. These communications are
            sent on behalf of our customers and under their direction. Yonovo
            does not independently initiate contact with end debtors. All
            communication content, frequency, and recipients are determined by
            our customers through the configuration of their Yonovo account.
          </p>

          <p>
            <strong>Data Subject Rights</strong>
          </p>
          <p>
            The European Union&apos;s General Data Protection Regulation (GDPR)
            and other countries&apos; privacy laws provide certain rights for
            data subjects. These rights include:
          </p>
          <ul>
            <li>Right to be informed</li>
            <li>Right of access</li>
            <li>Right to rectification</li>
            <li>Right to erasure</li>
            <li>Right to restrict processing</li>
            <li>Right of data portability</li>
            <li>Right to object</li>
            <li>Rights related to automated decision-making including profiling</li>
          </ul>
          <p>
            If you wish to confirm that Yonovo is processing your personal data,
            or to have access to the personal data we may have about you, please
            contact us. Reasonable access to your personal data will be provided
            at no cost.
          </p>

          <p>
            <strong>Data Protection Mechanisms</strong>
          </p>
          <p>
            At Yonovo, we implement robust data protection mechanisms to
            safeguard your information:
          </p>
          <ul>
            <li>
              <strong>Encryption:</strong> All customer data is encrypted using
              industry-standard encryption algorithms both at rest and in
              transit.
            </li>
            <li>
              <strong>Access Control:</strong> We employ role-based access
              controls to ensure that only authorized personnel can access
              sensitive data.
            </li>
            <li>
              <strong>Infrastructure Security:</strong> Our application and
              databases are hosted on secure cloud infrastructure managed by
              reputable providers.
            </li>
            <li>
              <strong>Integration Security:</strong> Connections with third-party
              accounting platforms (such as QuickBooks and Xero) use
              OAuth-based authentication and encrypted data transfer.
            </li>
          </ul>

          <p>
            <strong>Data Storage and Retention</strong>
          </p>
          <p>
            Your personal data is stored on secure cloud servers. Yonovo retains
            service data for the duration of the customer&apos;s business
            relationship with Yonovo and for a reasonable period thereafter, to
            comply with our legal obligations, resolve disputes, and enforce our
            agreements. All personal data that Yonovo controls may be deleted
            upon verified request from data subjects or their authorized agents.
            For more information on where and how long your personal data is
            stored, please contact us at{" "}
            <a href="mailto:salman@yonovo.com">salman@yonovo.com</a>.
          </p>

          <p>
            <strong>Children&apos;s Data</strong>
          </p>
          <p>
            Our Services are designed for businesses and are not intended for
            use by children under 18 years of age. We do not knowingly collect
            personal information from children.
          </p>

          <p>
            <strong>Changes to This Privacy Policy</strong>
          </p>
          <p>
            We reserve the right to modify this Privacy Policy at any time. If
            we make material changes, we will notify you by updating the date at
            the top of this policy and posting it on our website.
          </p>

          <p>
            <strong>Questions, Concerns, or Complaints</strong>
          </p>
          <p>
            If you have questions, concerns, complaints, or would like to
            exercise your rights, please contact us at:
          </p>
          <p>Yonovo Inc.</p>
          <p>
            <a href="mailto:salman@yonovo.com">salman@yonovo.com</a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
