export interface Reservation {
  id?: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  note: string; // This holds the text input from the user (吉娃娃許願備註)
  createdAt?: any; // serverTimestamp or ISO Date
  userId?: string;
}

export interface ChihuahuaStar {
  id: string;
  name: string;
  title: string;
  description: string;
  mood: string;
  avatarUrl: string;
  favoriteSnack: string;
}

export type TabType = 'home' | 'reserve' | 'records' | 'stars';

export interface UserProfile {
  uid: string;
  email: string | null;
  isMock?: boolean;
}
