import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
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
          <h1 className="mb-8">Terms and Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 20, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2>1. Introduction</h2>
              <p>
                Welcome to our car components e-commerce website. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2>2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>"Company"</strong> refers to our car components business</li>
                <li><strong>"Services"</strong> refers to our website and e-commerce platform</li>
                <li><strong>"User"</strong> refers to anyone who accesses our website</li>
                <li><strong>"Products"</strong> refers to car components and automotive parts sold on our platform</li>
              </ul>
            </section>

            <section>
              <h2>3. Account Registration</h2>
              <p>
                To make purchases, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2>4. Product Information</h2>
              <p>
                We strive to provide accurate product descriptions, specifications, and compatibility information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
              </p>
            </section>

            <section>
              <h2>5. Pricing and Payment</h2>
              <p>
                All prices are displayed in the currency specified on our website and are subject to change without notice. We accept various payment methods as indicated during checkout. Payment is due at the time of purchase.
              </p>
            </section>

            <section>
              <h2>6. Shipping and Delivery</h2>
              <p>
                We will ship products to the address you specify during checkout. Delivery times are estimates and may vary based on location and product availability. Risk of loss passes to you upon delivery.
              </p>
            </section>

            <section>
              <h2>7. Returns and Refunds</h2>
              <p>
                Our return policy allows returns within 30 days of purchase for unused products in original packaging. Custom or special-order items may not be returnable. Please refer to our detailed return policy for more information.
              </p>
            </section>

            <section>
              <h2>8. Warranty</h2>
              <p>
                Products may come with manufacturer warranties. We are not responsible for warranty claims, which should be directed to the manufacturer. We make no additional warranties beyond those provided by manufacturers.
              </p>
            </section>

            <section>
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other economic advantage.
              </p>
            </section>

            <section>
              <h2>10. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, and images, is our property or used with permission and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2>11. Prohibited Uses</h2>
              <p>
                You may not use our services for any unlawful purpose or to violate any laws. You may not attempt to interfere with the proper functioning of our website or services.
              </p>
            </section>

            <section>
              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2>13. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us through our contact form or customer service channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}