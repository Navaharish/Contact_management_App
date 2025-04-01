export type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  profileImage?: string;
  company?: string;
  title?: string;
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}; 