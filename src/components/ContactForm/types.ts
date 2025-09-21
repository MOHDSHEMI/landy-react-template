import { TFunction } from "react-i18next";

export interface ContactProps {
  title: string;
  content: string;
  id: string;
  t: TFunction;
}

export interface ValidationTypeProps {
  type: string;
}

// 🔥 Add this interface for your form values
export interface IValues {
  name?: string;
  telephone?: string;
  email?: string;
  address?: string;
  council?: string;
  bins?: string[];
  collectionDay?: string[];
  service?: string[];
  extraInfo?: string;
}
