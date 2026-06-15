// types.ts

export interface Member {
  id: number;
  name: string;
  type: 'mentor' | 'mentee';
  title?: string;
  affiliation?: string;
  location?: string;
  specializations?: string[];
  featured?: boolean;
  university?: string;
  country?: string;
  fields?: string[];
  rating?: number;
  image?: string;
  email?: string;
  bio?: string;
  publications?: string[];
}

// Keep Mentor alias for backward-compatibility with user-added components
export interface Mentor extends Member {
  title: string;
  university: string;
  country: string;
  fields: string[];
  rating: number;
  image: string;
  email: string;
  bio: string;
  publications: string[];
  featured: boolean;
}

export interface BlogPost {
  id?: number;
  title: string;
  date: string;
  url: string;
  thumbnail: string;
  excerpt: string;
}

export interface Conference {
  id: string;
  name: string;
  full_name: string;
  type: 'upcoming' | 'past';
  format: string;
  url: string;
  location: string;
  dates: { start: string; end: string; display: string };
  startDate?: string;
  endDate?: string;
  deadlines: { label: string; date: string }[];
  general_chairs: string[];
  keynote_speakers: string[];
  category: string;
}

export interface Service {
  name: string;
  url: string;
  icon: string;
  description: string;
}

export interface Partner {
  name: string;
  url: string;
}
