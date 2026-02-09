export type UserRole = 'client' | 'internal';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyName?: string;
  vatNumber?: string;
  sector?: string;
}

export type ProductCategory = 'protective' | 'tapes' | 'boxes' | 'other';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  unit: string;
  ecoFriendly: boolean;
  specs: Record<string, string>;
  available: boolean;
}

export interface PackagingInput {
  length: number;
  width: number;
  height: number;
  weight: number;
  fragility: number; // 1-5
  productType: string;
}

export interface MaterialSuggestion {
  productId: string;
  productName: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  reason: string;
  ecoFriendly: boolean;
  ecoAlternative?: {
    productName: string;
    co2Saved: number;
  };
}

export interface PackagingConfig {
  id: string;
  clientId: string;
  input: PackagingInput;
  suggestions: MaterialSuggestion[];
  totalCost: number;
  co2Saved: number;
  createdAt: string;
  status: 'draft' | 'saved' | 'quoted';
}

export interface ConfiguratorStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
