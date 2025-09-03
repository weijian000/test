import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+44(0)7833 348030"],
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      "info@carpartspro.com",
      "support@carpartspro.com",
    ],
  },
  {
    icon: MapPin,
    title: "Address",
    details: [
      "123 Auto Parts Ave",
      "Detroit, MI 48201",
      "United States",
    ],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Mon - Fri: 8:00 AM - 8:00 PM",
      "Sat: 9:00 AM - 6:00 PM",
      "Sun: 10:00 AM - 4:00 PM",
    ],
  },
];

export const quickSupportItems = [
  "Track Your Order",
  "Return Policy",
  "Installation Guide",
  "Warranty Info",
];

export const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "product", label: "Product Question" },
  { value: "order", label: "Order Support" },
  { value: "technical", label: "Technical Support" },
  { value: "warranty", label: "Warranty Claim" },
  { value: "partnership", label: "Partnership" },
];