export type LeadStatus = "new" | "contacted" | "qualified" | "negotiating" | "won" | "lost";

export interface LeadRecord {
  leadId: string;
  createdAt: string;
  status: LeadStatus;
  productId: string;
  sku: string;
  category: string;
  source: string;
  medium: string;
  campaign: string;
  whatsappClickAt?: string;
  orderId?: string;
}

export interface OrderItemRecord {
  productId: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
}

export interface OrderRecord {
  orderId: string;
  transactionId: string;
  leadId: string;
  confirmedAt: string;
  value: number;
  currency: "EGP";
  items: OrderItemRecord[];
}
