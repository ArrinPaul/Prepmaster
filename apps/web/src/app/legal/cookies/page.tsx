import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2024</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. They are widely 
                used to make websites work more efficiently and provide information to website owners.
              </p>

              <Separator className="my-8" />

              <h2>2. How We Use Cookies</h2>
              <p>
                PrepMaster uses cookies and similar technologies to improve your experience, analyze usage, and deliver 
                personalized content. We use both session cookies (which expire when you close your browser) and 
                persistent cookies (which stay on your device until deleted or expired).
              </p>

              <Separator className="my-8" />

              <h2>3. Types of Cookies We Use</h2>
              
              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as:
              </p>
              <ul>
                <li>User authentication and account access</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing and performance</li>
              </ul>

              <h3>Functional Cookies</h3>
              <p>
                These cookies enhance functionality and personalization:
              </p>
              <ul>
                <li>Remember your preferences (theme, language)</li>
                <li>Save your progress in coding challenges</li>
                <li>Store your learning history</li>
              </ul>

              <h3>Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors use our website:
              </p>
              <ul>
                <li>Page views and navigation patterns</li>
                <li>Feature usage and engagement metrics</li>
                <li>Performance and error tracking</li>
                <li>A/B testing and optimization</li>
              </ul>

              <h3>Marketing Cookies</h3>
              <p>
                These cookies track your online activity to deliver relevant advertisements:
              </p>
              <ul>
                <li>Display targeted ads on other websites</li>
                <li>Measure effectiveness of marketing campaigns</li>
                <li>Retargeting and conversion tracking</li>
              </ul>

              <Separator className="my-8" />

              <h2>4. Third-Party Cookies</h2>
              <p>
                We work with third-party service providers who may set cookies on our behalf. These include:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Website analytics and reporting</li>
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Intercom:</strong> Customer support and messaging</li>
                <li><strong>Social Media Platforms:</strong> Social sharing and integration</li>
              </ul>

              <Separator className="my-8" />

              <h2>5. Cookie Details</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border p-2 text-left">Cookie Name</th>
                      <th className="border p-2 text-left">Type</th>
                      <th className="border p-2 text-left">Purpose</th>
                      <th className="border p-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">session_id</td>
                      <td className="border p-2">Essential</td>
                      <td className="border p-2">User authentication</td>
                      <td className="border p-2">Session</td>
                    </tr>
                    <tr>
                      <td className="border p-2">csrf_token</td>
                      <td className="border p-2">Essential</td>
                      <td className="border p-2">Security</td>
                      <td className="border p-2">Session</td>
                    </tr>
                    <tr>
                      <td className="border p-2">theme_preference</td>
                      <td className="border p-2">Functional</td>
                      <td className="border p-2">Remember theme choice</td>
                      <td className="border p-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="border p-2">_ga</td>
                      <td className="border p-2">Analytics</td>
                      <td className="border p-2">Google Analytics</td>
                      <td className="border p-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="border p-2">_fbp</td>
                      <td className="border p-2">Marketing</td>
                      <td className="border p-2">Facebook Pixel</td>
                      <td className="border p-2">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Separator className="my-8" />

              <h2>6. Managing Cookies</h2>
              <p>
                You can control and manage cookies in several ways:
              </p>

              <h3>Browser Settings</h3>
              <p>
                Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences. 
                Please note that disabling cookies may affect functionality.
              </p>

              <h3>Cookie Preference Center</h3>
              <p>
                You can manage your cookie preferences through our Cookie Preference Center, accessible from the website 
                footer. You can opt-out of non-essential cookies while still using the site.
              </p>

              <h3>Third-Party Opt-Out</h3>
              <p>
                You can opt-out of third-party advertising cookies through:
              </p>
              <ul>
                <li>Digital Advertising Alliance: <a href="http://optout.aboutads.info">optout.aboutads.info</a></li>
                <li>Network Advertising Initiative: <a href="http://optout.networkadvertising.org">optout.networkadvertising.org</a></li>
                <li>Your Online Choices (EU): <a href="http://www.youronlinechoices.com">youronlinechoices.com</a></li>
              </ul>

              <Separator className="my-8" />

              <h2>7. Do Not Track</h2>
              <p>
                Some browsers have a "Do Not Track" feature that signals to websites you visit that you do not want to 
                have your online activity tracked. Currently, we do not respond to Do Not Track signals.
              </p>

              <Separator className="my-8" />

              <h2>8. Mobile Devices</h2>
              <p>
                Mobile devices use identifiers similar to cookies. You can manage these through your device settings:
              </p>
              <ul>
                <li><strong>iOS:</strong> Settings → Privacy → Advertising → Limit Ad Tracking</li>
                <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
              </ul>

              <Separator className="my-8" />

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an 
                updated revision date.
              </p>

              <Separator className="my-8" />

              <h2>10. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
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
