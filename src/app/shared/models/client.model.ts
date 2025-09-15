export interface ClientData {
  Image?: string; // base64 or binary string
  Mobile1?: string;
  Mobile2?: string;
  WhatsApp?: string;
  FaceBook?: string;
  Instagram?: string;
  TikTok?: string;
  Email?: string;
}

export interface Client {
  id: number;
  image: string | null; // public profile photo (nullable)
  mobile1: string;
  mobile2: string;
  whatsApp: string;
  faceBook: string | null;
  instagram: string | null;
  tikTok: string | null;
  email: string;
}
