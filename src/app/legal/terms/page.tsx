import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2024</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using PrepMaster, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
              </p>

              <Separator className="my-8" />

              <h2>2. Use License</h2>
              <p>
                We grant you a personal, non-exclusive, non-transferable, limited license to access and use PrepMaster 
                for your personal interview preparation purposes. This license does not include:
              </p>
              <ul>
                <li>Modifying or copying our materials</li>
                <li>Using the materials for any commercial purpose</li>
                <li>Attempting to reverse engineer any software</li>
                <li>Removing any copyright or proprietary notations</li>
                <li>Transferring the materials to another person</li>
              </ul>

              <Separator className="my-8" />

              <h2>3. Account Registration</h2>
              <p>To use certain features, you must register for an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <Separator className="my-8" />

              <h2>4. Subscription and Payment</h2>
              <p>
                Some features require a paid subscription. By purchasing a subscription, you agree to:
              </p>
              <ul>
                <li>Pay all fees according to the pricing and payment terms</li>
                <li>Provide current and accurate billing information</li>
                <li>Automatic renewal unless canceled before the renewal date</li>
                <li>No refunds for partial subscription periods</li>
              </ul>

              <Separator className="my-8" />

              <h2>5. Acceptable Use Policy</h2>
              <p>You agree not to use PrepMaster to:</p>
              <ul>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful code or malware</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share your account with others</li>
                <li>Scrape or data mine our content</li>
                <li>Use automated systems to access the service</li>
                <li>Impersonate others or misrepresent your affiliation</li>
              </ul>

              <Separator className="my-8" />

              <h2>6. Intellectual Property</h2>
              <p>
                All content on PrepMaster, including text, graphics, logos, code, and software, is our property or 
                that of our licensors and is protected by copyright and other intellectual property laws. You retain 
                ownership of content you create (interview responses, code solutions), but grant us a license to use 
                it to provide and improve our services.
              </p>

              <Separator className="my-8" />

              <h2>7. User Content</h2>
              <p>
                You are responsible for content you submit to PrepMaster. By submitting content, you represent and 
                warrant that:
              </p>
              <ul>
                <li>You own or have rights to use the content</li>
                <li>The content does not violate any laws or third-party rights</li>
                <li>The content is accurate and not misleading</li>
              </ul>

              <Separator className="my-8" />

              <h2>8. AI-Generated Content</h2>
              <p>
                Our platform uses artificial intelligence to provide interview feedback and recommendations. While we 
                strive for accuracy, AI-generated content may contain errors or inconsistencies. You should use your 
                judgment when relying on AI feedback.
              </p>

              <Separator className="my-8" />

              <h2>9. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice, for any reason, including:
              </p>
              <ul>
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Extended period of inactivity</li>
                <li>Request by law enforcement</li>
              </ul>

              <Separator className="my-8" />

              <h2>10. Disclaimers</h2>
              <p>
                PrepMaster is provided "as is" without warranties of any kind. We do not guarantee that:
              </p>
              <ul>
                <li>The service will be uninterrupted or error-free</li>
                <li>All content will be accurate or reliable</li>
                <li>Your use will result in job offers or success</li>
                <li>Any defects will be corrected</li>
              </ul>

              <Separator className="my-8" />

              <h2>11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, PrepMaster shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>

              <Separator className="my-8" />

              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify and hold PrepMaster harmless from any claims, damages, losses, and expenses 
                arising from your use of the service or violation of these Terms.
              </p>

              <Separator className="my-8" />

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes via 
                email or through the platform. Continued use after changes constitutes acceptance of the new Terms.
              </p>

              <Separator className="my-8" />

              <h2>14. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California, United States, without regard to its 
                conflict of law provisions.
              </p>

              <Separator className="my-8" />

              <h2>15. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <ul>
                <li>Email: legal@prepmaster.com</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94102</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
