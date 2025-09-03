'use client';

import React, { useState } from 'react';
import { ContactInfo } from './contact/ContactInfo';
import { ContactFormFields } from './contact/ContactFormFields';
import { toast } from 'sonner@2.0.3';

interface ContactFormProps {
  onNavigateToSupport?: (page: string) => void;
}

export function ContactForm({ onNavigateToSupport }: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need help choosing the right parts? 
            Our expert team is here to help you find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ContactInfo onNavigateToSupport={onNavigateToSupport} />
          <ContactFormFields 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}