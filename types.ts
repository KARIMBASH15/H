
export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  MAINTENANCE = 'MAINTENANCE'
}

export enum ReservationStatus {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Room {
  id: string;
  name: string;
  type: string;
  basePrice: number;
  weekendPrice: number;
  seasonalPrice: number;
  description: string;
  features: string[];
  capacity: number;
  extraBedCost: number;
  images: string[];
  status: RoomStatus;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  nationalId?: string;
  roomIds: string[];
  checkIn: string;
  checkOut: string;
  totalNights: number;
  totalPrice: number;
  paidAmount: number;
  status: ReservationStatus;
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER';
  notes: string;
  source: 'WALK_IN' | 'ONLINE';
}

export interface Transaction {
  id: string;
  vaultId: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: 'BOOKING' | 'SALARY' | 'BILLS' | 'MAINTENANCE' | 'OTHER';
  description: string;
  date: string;
}

export interface Vault {
  id: string;
  name: string;
  balance: number;
}
