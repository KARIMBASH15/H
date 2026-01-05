
import { Room, RoomStatus, Vault } from './types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'جناح النيل الملكي 101',
    type: 'Royal Suite',
    basePrice: 4500,
    weekendPrice: 5500,
    seasonalPrice: 7000,
    description: 'إطلالة مباشرة على النيل مع شرفة خاصة وتجهيزات فاخرة.',
    features: ['WiFi مجاني', 'تكييف', 'شاشة 65 بوصة', 'ميني بار', 'ماكينة قهوة'],
    capacity: 2,
    extraBedCost: 800,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000'],
    status: RoomStatus.AVAILABLE
  },
  {
    id: 'r2',
    name: 'غرفة عائلية فاخرة 205',
    type: 'Family Room',
    basePrice: 2800,
    weekendPrice: 3200,
    seasonalPrice: 3800,
    description: 'مساحة واسعة مناسبة للعائلات مع سريرين كينج.',
    features: ['WiFi مجاني', 'تكييف', 'منطقة جلوس', 'غلاية'],
    capacity: 4,
    extraBedCost: 500,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000'],
    status: RoomStatus.AVAILABLE
  },
  {
    id: 'r3',
    name: 'غرفة ستاندرد 301',
    type: 'Standard',
    basePrice: 1500,
    weekendPrice: 1800,
    seasonalPrice: 2200,
    description: 'غرفة عملية ومريحة لرجال الأعمال والمسافرين.',
    features: ['WiFi', 'تكييف', 'مكتب عمل'],
    capacity: 2,
    extraBedCost: 400,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000'],
    status: RoomStatus.AVAILABLE
  }
];

export const INITIAL_VAULTS: Vault[] = [
  { id: 'MAIN', name: 'الخزينة الرئيسية', balance: 150000 },
  { id: 'RECEPTION', name: 'خزنة الاستقبال', balance: 15000 },
  { id: 'CAFE', name: 'خزنة الكافيه', balance: 5000 }
];

export const TAX_RATE = 0.14; // 14% VAT (Egypt)
export const SERVICE_CHARGE = 0.12; // 12% Service Charge
