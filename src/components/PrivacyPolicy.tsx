import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>
        
        <div className="prose max-w-none">
          <h1 className="mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 20, 2025</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-card p-4 rounded-lg border text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm">Data Protection</h4>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm">Transparency</h4>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <Lock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm">Secure Storage</h4>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <UserCheck className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-sm">Your Rights</h4>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2>1. Introduction</h2>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our car components e-commerce website. We are committed to protecting your privacy and ensuring transparency about our data practices.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Account credentials and preferences</li>
                <li>Purchase history and order information</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2>3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Providing customer service and support</li>
                <li>Sending order confirmations and shipping updates</li>
                <li>Improving our website and services</li>
                <li>Personalizing your shopping experience</li>
                <li>Marketing communications (with your consent)</li>
                <li>Fraud prevention and security</li>
                <li>Legal compliance and dispute resolution</li>
              </ul>
            </section>

            <section>
              <h2>4. Legal Basis for Processing</h2>
              <p>We process your personal data based on:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contract performance:</strong> To fulfill our obligations in your purchase contract</li>
                <li><strong>Legitimate interests:</strong> To improve our services and prevent fraud</li>
                <li><strong>Consent:</strong> For marketing communications and optional features</li>
                <li><strong>Legal obligations:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2>5. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              
              <h3>Service Providers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (for secure payment handling)</li>
                <li>Shipping companies (for order fulfillment)</li>
                <li>Email service providers (for communications)</li>
                <li>Analytics providers (for website improvement)</li>
                <li>Customer service platforms</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>We may disclose information when required by law, to protect our rights, or in response to legal processes.</p>
            </section>

            <section>
              <h2>6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security assessments</li>
                <li>Employee access controls and training</li>
                <li>PCI DSS compliance for payment processing</li>
              </ul>
            </section>

            <section>
              <h2>7. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Personalize content and advertisements</li>
                <li>Improve website functionality</li>
              </ul>
              <p>
                You can control cookies through your browser settings, though this may affect website functionality.
              </p>
            </section>

            <section>
              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Generally:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information: Until account deletion</li>
                <li>Order history: 7 years for tax and legal compliance</li>
                <li>Marketing data: Until you unsubscribe</li>
                <li>Website analytics: 26 months</li>
              </ul>
            </section>

            <section>
              <h2>9. Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              
              <div className="bg-muted p-6 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to certain types of processing</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2>10. International Data Transfers</h2>
              <p>
                Your information may be processed in countries other than your own. We ensure appropriate safeguards are in place, including standard contractual clauses and adequacy decisions where applicable.
              </p>
            </section>

            <section>
              <h2>11. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware of such collection, we will delete the information immediately.
              </p>
            </section>

            <section>
              <h2>12. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2>13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2>14. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-card p-4 rounded-lg border mt-4">
                <ul className="space-y-2 text-sm">
                  <li><strong>Email:</strong> privacy@example.com</li>
                  <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                  <li><strong>Address:</strong> 123 Privacy Street, Data City, DC 12345</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}