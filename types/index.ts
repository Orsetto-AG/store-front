// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  sellerId: string;
  createdAt: string;
  type: "auction" | "buy";
}

export interface ListingData {
  title: string;
  description: string;
  price: number;
  images: string[];
  type: "auction" | "buy";
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  amount: number;
  createdAt: string;
}

export interface UserProfile extends User {
  listings: Product[];
  bids: Bid[];
}

//priceproposol
export interface PriceProposal {
  amount: number;
  shippingMethod: "pickup" | "delivery";
  shippingCost: number;
}
