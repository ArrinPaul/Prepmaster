import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2024</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to PrepMaster. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data and tell you about 
                your privacy rights and how the law protects you.
              </p>

              <Separator className="my-8" />

              <h2>2. Information We Collect</h2>
              <p>We collect and process the following types of information:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password, and profile details</li>
                <li><strong>Usage Data:</strong> Interview sessions, coding problem attempts, and learning progress</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
                <li><strong>Communication Data:</strong> Messages sent through our platform and support interactions</li>
              </ul>

              <Separator className="my-8" />

              <h2>3. How We Use Your Information</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul>
                <li>To provide and maintain our service</li>
                <li>To personalize your learning experience with AI recommendations</li>
                <li>To process your subscription and handle payments</li>
                <li>To send you updates, newsletters, and marketing communications (with your consent)</li>
                <li>To improve our platform and develop new features</li>
                <li>To detect and prevent fraud or abuse</li>
              </ul>

              <Separator className="my-8" />

              <h2>4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal data. We may share your information with:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform (hosting, analytics, payment processing)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
              </ul>

              <Separator className="my-8" />

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection</li>
              </ul>

              <Separator className="my-8" />

              <h2>6. Your Rights</h2>
              <p>Under data protection laws, you have the following rights:</p>
              <ul>
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>

              <Separator className="my-8" />

              <h2>7. Data Retention</h2>
              <p>
                We retain your personal data for as long as necessary to provide our services and comply with legal 
                obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, 
                except where we are required to retain it for legal purposes.
              </p>

              <Separator className="my-8" />

              <h2>8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to improve your experience. You can control cookies 
                through your browser settings. For more information, see our Cookie Policy.
              </p>

              <Separator className="my-8" />

              <h2>9. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
                data from children under 13.
              </p>

              <Separator className="my-8" />

              <h2>10. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries other than your own. We ensure appropriate 
                safeguards are in place to protect your data in accordance with this privacy policy.
              </p>

              <Separator className="my-8" />

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the 
                new policy on this page and updating the "Last updated" date.
              </p>

              <Separator className="my-8" />

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@prepmaster.com</li>
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
