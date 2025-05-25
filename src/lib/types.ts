
export interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  address?: string;
  paymentTerms: string;
  gstDetails?: string;
  paymentHistory?: Payment[];
  pendingAmount?: number;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  method: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  unit: string;
}

export interface BOMItem {
  materialId: string;
  materialName: string;
  quantity: number;
}

export interface BOM {
  id: string;
  productName: string;
  productId: string;
  items: BOMItem[];
  description?: string;
}

export interface FinishedProduct {
  id: string;
  name: string;
  sku: string;
  description?: string;
  bomId?: string;
}

export type InventoryItemType = 'raw_material' | 'finished_good' | 'fuel' | 'equipment_part';

export interface InventoryItem {
  id: string;
  itemId: string; // Corresponds to RawMaterial ID, FinishedProduct ID, etc.
  name: string;
  type: InventoryItemType;
  quantity: number;
  unit: string;
  minStockLevel: number;
  lastUpdated: string;
  updatedBy?: string;
}

export interface Client {
  id: string;
  name: string;
  gstin?: string;
  billingAddress: string;
  shippingAddress?: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  creditDays?: number;
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  gstRate?: number; // Percentage
  totalPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  date: string;
  dueDate?: string;
  items: InvoiceItem[];
  subTotal: number;
  gstAmount?: number;
  totalAmount: number;
  isGstInvoice: boolean;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
}

export interface QuotationItem extends InvoiceItem {}

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientId: string;
  clientName: string;
  date: string;
  validTill?: string;
  items: QuotationItem[];
  subTotal: number;
  gstAmount?: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'follow-up';
  notes?: string;
}

export interface DeliveryChallanItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
}

export interface DeliveryChallan {
  id: string;
  challanNumber: string;
  date: string;
  type: 'raw_material_dispatch' | 'finished_good_delivery' | 'other';
  recipientName: string; // Could be vendor or client
  items: DeliveryChallanItem[];
  vehicleNumber?: string;
  driverName?: string;
  notes?: string;
  isBilled?: boolean;
  invoiceId?: string; // Link to invoice if applicable
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
  external?: boolean;
}
