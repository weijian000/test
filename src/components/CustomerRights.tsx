import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Clock, RefreshCw, Shield } from 'lucide-react';

interface CustomerRightsProps {
  onBack: () => void;
}

export function CustomerRights({ onBack }: CustomerRightsProps) {
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
          <h1 className="mb-8">Customer Information & Right to Cancel</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 20, 2025</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card p-6 rounded-lg border text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="mb-2">14-Day Return</h3>
              <p className="text-sm text-muted-foreground">
                You have 14 days to cancel your order and return items
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                Simple return process with prepaid shipping labels
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="mb-2">Protected Purchase</h3>
              <p className="text-sm text-muted-foreground">
                Your purchase is protected by consumer rights legislation
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2>Your Right to Cancel</h2>
              <p>
                As a consumer, you have the right to cancel your order within 14 days of receiving your goods without giving any reason. This is known as your "cooling-off period" and is protected by consumer protection laws.
              </p>
            </section>

            <section>
              <h2>How to Exercise Your Right to Cancel</h2>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="mb-4">To cancel your order, you can:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact our customer service team via email or phone</li>
                  <li>Use our online returns portal (if available)</li>
                  <li>Send us a clear written statement of your decision to cancel</li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Cancellation Deadlines</h2>
              <p>
                The cancellation period expires 14 days after the day:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You (or a third party indicated by you) receives the goods</li>
                <li>For multiple items ordered separately: when you receive the last item</li>
                <li>For goods delivered in multiple lots: when you receive the last lot</li>
              </ul>
            </section>

            <section>
              <h2>Returning Goods</h2>
              <p>
                If you cancel your order, you must return the goods to us without undue delay and no later than 14 days from the day you communicated your cancellation decision.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg mt-4">
                <h4 className="mb-2">Return Conditions:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Items must be in original condition and packaging</li>
                  <li>Items must not show signs of use beyond what's necessary to establish their nature</li>
                  <li>Custom or personalized items may not be returnable</li>
                  <li>Perishable goods or items that deteriorate quickly are excluded</li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Refund Process</h2>
              <p>
                We will refund all payments received from you, including delivery costs (except for supplementary costs arising from your choice of delivery method other than our standard option).
              </p>
              <p>
                Refunds will be processed within 14 days of receiving your cancellation notice, using the same payment method you used for the original transaction unless otherwise agreed.
              </p>
            </section>

            <section>
              <h2>Return Shipping Costs</h2>
              <p>
                You are responsible for the cost of returning goods unless:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>The item is defective or not as described</li>
                <li>We made an error in your order</li>
                <li>We offer free returns as part of a promotion</li>
              </ul>
            </section>

            <section>
              <h2>Exceptions to the Right to Cancel</h2>
              <p>
                The right to cancel does not apply to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Custom-made or personalized automotive parts</li>
                <li>Goods that deteriorate rapidly or have short expiry dates</li>
                <li>Sealed goods that are not suitable for return for health or hygiene reasons once unsealed</li>
                <li>Goods that have been inseparably mixed with other items after delivery</li>
              </ul>
            </section>

            <section>
              <h2>Digital Content</h2>
              <p>
                For digital content (such as installation guides or software), you acknowledge that your right to cancel is lost once download has begun with your prior express consent.
              </p>
            </section>

            <section>
              <h2>Warranty Rights</h2>
              <p>
                Your right to cancel is separate from your warranty rights. Even after the cancellation period has expired, you may still have rights under the manufacturer's warranty or statutory warranty provisions.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you wish to exercise your right to cancel or have questions about returns, please contact our customer service team. We're here to help make the process as smooth as possible.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}