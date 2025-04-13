import { Fingerprint } from "lucide-react";
import { AudioWaveform } from "lucide-react";
import { Brain } from "lucide-react";

// constants.js
export const navItems = [
  {
    id: "hero",
    label: "Home",
    href: "#hero" 
  },
  {
    id: "features",
    label: "Features",
    href: "#features"
  },
  {
    id: "about",
    label: "About",
    href: "#about"
  }
  // Add more navigation items as needed
];


export const features = [
  {
    icon: <Brain />,
    text: "AI Stroke Risk Prediction",
    description:
      "Get ahead of potential strokes with accurate, real-time predictions powered by advanced machine learning models trained on clinical health data.",
  },
  {
    icon: <Fingerprint />,
    text: "Personalized Lifestyle Guidance",
    description:
      "Receive tailored food and activity recommendations based on your health profile — supporting sustainable habits that reduce long-term risk.",
  },
  {
    icon: <AudioWaveform />,
    text: "Daily Nudges & Habit Tracking",
    description:
      "Stay on track with smart reminders and habit-building tools designed to help you turn insights into consistent, meaningful actions.",
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
