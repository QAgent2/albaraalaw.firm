export interface LocText {
  ar: string;
  en: string;
}

export interface Lawyer {
  id: number;
  name: LocText;
  role: LocText;
  spec: LocText;
  years: LocText;
  bio: LocText;
  edu: string[];
  certs: LocText;
  expertise: LocText;
  cases: LocText;
  contact: string;
  badge: string;
  image?: string;
}

export interface LandmarkCase {
  id: number;
  tag: LocText;
  title: LocText;
  desc: LocText;
  value: string;
  jurisdiction: string;
  year: string;
}

export interface PracticeArea {
  id: string;
  num: string;
  icon: string;
  tag: LocText;
  title: LocText;
  desc: LocText;
  capabilities: LocText[];
}

export interface Testimonial {
  text: LocText;
  name: LocText;
  initials: LocText;
}

export interface FAQ {
  q: LocText;
  a: LocText;
}

export interface Briefing {
  date: string;
  title: LocText;
  category: LocText;
}
