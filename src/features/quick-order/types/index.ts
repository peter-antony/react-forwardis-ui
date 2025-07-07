
// Quick order types
export interface QuickOrder {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'draft' | 'submitted' | 'processing';
}
