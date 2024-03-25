export interface moment {
  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: [{ text: string; username: string }];
}
// esses são os campos da interface
