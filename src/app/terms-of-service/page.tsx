import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Yonovo",
  description:
    "Yonovo Terms of Service. Review the terms and conditions for using our accounts receivable automation platform.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col pt-[var(--navbar-height)] bg-background">
        <section className="mx-auto flex w-full px-6 prose prose-zinc prose-p:my-2 max-w-4xl flex-col pt-32 pb-20">
          <h1>
            <strong>Terms of Service</strong>
          </h1>

          <p>
            <strong>Last Updated: April 8, 2026</strong>
          </p>

          <p>
            <strong>Acceptance of Terms</strong>
          </p>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the products and services provided by Yonovo Inc.
            (&quot;Yonovo,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), including our website, platform, and accounts
            receivable automation tools (collectively, the
            &quot;Services&quot;). By accessing or using our Services, you agree
            to be bound by these Terms. If you do not agree to these Terms,
            please do not use our Services.
          </p>

          <p>
            <strong>Description of Services</strong>
          </p>
          <p>
            Yonovo provides a SaaS-based accounts receivable automation platform
            that helps businesses collect outstanding invoices through
            personalized, automated follow-ups across email, SMS, and voice.
            Our platform integrates with accounting software such as QuickBooks
            and Xero to sync invoice and customer data. The Services are
            designed for business use and are not intended for personal, family,
            or household purposes.
          </p>

          <p>
            <strong>Account Registration and Responsibilities</strong>
          </p>
          <p>
            To access certain features of our Services, you must register for an
            account. You agree to provide accurate, current, and complete
            information during registration and to keep your account information
            updated. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under
            your account. You agree to notify us immediately of any unauthorized
            use of your account.
          </p>

          <p>
            <strong>Permitted Use</strong>
          </p>
          <p>You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>
              Use the Services in any way that violates any applicable federal,
              state, local, or international law or regulation.
            </li>
            <li>
              Use the Services to send unsolicited communications or to contact
              individuals who have not consented to be contacted, in violation
              of applicable laws (including but not limited to the TCPA, CAN-SPAM,
              and GDPR).
            </li>
            <li>
              Attempt to gain unauthorized access to, interfere with, damage, or
              disrupt any parts of the Services, the server on which the
              Services are stored, or any server, computer, or database
              connected to the Services.
            </li>
            <li>
              Use the Services to transmit any material that is defamatory,
              obscene, threatening, abusive, or otherwise objectionable.
            </li>
            <li>
              Reverse engineer, decompile, disassemble, or otherwise attempt to
              derive the source code of the Services.
            </li>
            <li>
              Resell, sublicense, or make the Services available to any third
              party without our prior written consent.
            </li>
          </ul>

          <p>
            <strong>Customer Data</strong>
          </p>
          <p>
            You retain all rights to the data you upload, sync, or otherwise
            provide to the Services (&quot;Customer Data&quot;). You grant
            Yonovo a limited, non-exclusive license to use, process, and store
            your Customer Data solely for the purpose of providing the Services
            to you. We will not access, use, or share your Customer Data for any
            other purpose unless required by law or with your explicit consent.
          </p>
          <p>
            You are solely responsible for ensuring that your use of the
            Services, including any automated communications sent through the
            platform, complies with all applicable laws and regulations. You
            represent and warrant that you have obtained all necessary consents
            and authorizations from your customers before using the Services to
            contact them.
          </p>

          <p>
            <strong>Integrations</strong>
          </p>
          <p>
            Our Services may integrate with third-party platforms such as
            QuickBooks, Xero, and other accounting or business software. Your
            use of these integrations is subject to the respective third
            party&apos;s terms of service and privacy policy. Yonovo is not
            responsible for the availability, accuracy, or practices of any
            third-party services.
          </p>

          <p>
            <strong>Fees and Payment</strong>
          </p>
          <p>
            Certain features of the Services may require payment of fees. All
            fees are as described on our pricing page or as otherwise agreed
            upon in a separate written agreement. Fees are non-refundable unless
            otherwise stated. We reserve the right to change our fees at any
            time with reasonable notice. If you do not agree to the new fees,
            you may cancel your account before the changes take effect.
          </p>

          <p>
            <strong>Intellectual Property</strong>
          </p>
          <p>
            The Services and all related content, features, and functionality
            (including but not limited to software, text, graphics, logos, and
            design) are owned by Yonovo and are protected by copyright,
            trademark, and other intellectual property laws. You may not copy,
            modify, distribute, sell, or lease any part of our Services without
            our prior written consent.
          </p>

          <p>
            <strong>Disclaimer of Warranties</strong>
          </p>
          <p>
            The Services are provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied. To the fullest extent permitted by law, Yonovo disclaims
            all warranties, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Services will be
            uninterrupted, error-free, or completely secure.
          </p>

          <p>
            <strong>Limitation of Liability</strong>
          </p>
          <p>
            To the fullest extent permitted by law, in no event shall Yonovo, its
            officers, directors, employees, or agents be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            including but not limited to loss of profits, data, use, or
            goodwill, arising out of or in connection with your use of the
            Services. Our total liability for any claims arising under these
            Terms shall not exceed the amount you paid to Yonovo during the
            twelve (12) months preceding the event giving rise to the claim.
          </p>

          <p>
            <strong>Indemnification</strong>
          </p>
          <p>
            You agree to indemnify, defend, and hold harmless Yonovo and its
            officers, directors, employees, and agents from and against any
            claims, liabilities, damages, losses, and expenses (including
            reasonable legal fees) arising out of or in any way connected with
            your access to or use of the Services, your violation of these
            Terms, or your violation of any rights of a third party.
          </p>

          <p>
            <strong>Termination</strong>
          </p>
          <p>
            We may suspend or terminate your access to the Services at any time,
            with or without cause, and with or without notice. Upon
            termination, your right to use the Services will immediately cease.
            You may also cancel your account at any time by contacting us. Any
            provisions of these Terms that by their nature should survive
            termination shall survive, including but not limited to ownership
            provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>

          <p>
            <strong>Governing Law</strong>
          </p>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the Cayman Islands, without regard to its conflict of
            law principles. Any disputes arising from or relating to these Terms
            or the Services shall be resolved in the courts of the Cayman
            Islands.
          </p>

          <p>
            <strong>Changes to These Terms</strong>
          </p>
          <p>
            We reserve the right to modify these Terms at any time. If we make
            material changes, we will notify you by updating the date at the top
            of these Terms and posting the revised version on our website. Your
            continued use of the Services after any changes constitutes your
            acceptance of the revised Terms.
          </p>

          <p>
            <strong>Contact Us</strong>
          </p>
          <p>
            If you have any questions about these Terms, please contact us at:
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
