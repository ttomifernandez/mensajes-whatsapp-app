export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  createdAt: number;
  updatedAt: number;
}

export interface MessageRule {
  category: string;
  subcategory: string;
  template: string;
}

export interface GeneratedMessage {
  content: string;
  name?: string;
  categories: {
    children: string;
    maritalStatus: string;
    healthPlan: string;
  };
}
