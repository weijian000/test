import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Send } from "lucide-react";
import { subjectOptions } from "../../constants/contact-data";

interface ContactFormFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactFormFields({
  formData,
  onChange,
  onSubmit,
}: ContactFormFieldsProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validatePhoneNumber = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    // Validate subject
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Validate phone number if provided
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    onChange("name", e.target.value)
                  }
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    onChange("email", e.target.value)
                  }
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    onChange("phone", e.target.value);
                    // Clear phone error when user types
                    if (errors.phone) {
                      setErrors(prev => ({ ...prev, phone: '' }));
                    }
                  }}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => {
                    onChange("subject", value);
                    // Clear subject error when user selects
                    if (errors.subject) {
                      setErrors(prev => ({ ...prev, subject: '' }));
                    }
                  }}
                >
                  <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  onChange("message", e.target.value)
                }
                required
                placeholder="Tell us how we can help you..."
                rows={6}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}