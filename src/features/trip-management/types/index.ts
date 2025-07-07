
// Trip management types
export interface Trip {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  createdAt: Date;
}
