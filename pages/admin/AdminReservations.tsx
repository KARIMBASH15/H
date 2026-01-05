
import React, { useState } from 'react';
import { 
  Plus, Calendar, Check, X, Clock, 
  Search, User, Phone, CreditCard, Hash, Info 
} from 'lucide-react';
import { Reservation, ReservationStatus, Room, RoomStatus } from '../../types';
import { TAX_RATE, SERVICE_CHARGE } from '../../constants';

interface Props {
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const AdminReservations: React.FC<Props> = ({ reservations, setReservations, rooms, setRooms }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRes, setNewRes] = useState<Partial<Reservation>>({
    customerName: '',
    customerPhone: '',
    nationalId: '',
    roomIds: [],
    checkIn: '',
    checkOut: '',
    paidAmount: 0,
    paymentMethod: 'CASH',
    notes: '',
    source: 'WALK_IN'
  });

  const handleAddReservation = () => {
    if (!newRes.customerName || !newRes.roomIds?.length || !newRes.checkIn || !newRes.checkOut) return;

    const start = new Date(newRes.checkIn!);
    const end = new Date(newRes.checkOut!);
    const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
    let subtotal = 0;
    newRes.roomIds.forEach(rid => {
      const room = rooms.find(r => r.id === rid);
      if (room) subtotal += room.basePrice * nights;
    });

    const total = subtotal + (subtotal * TAX_RATE) + (subtotal * SERVICE_CHARGE);

    const reservation: Reservation = {
      id: 'RES-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      customerName: newRes.customerName!,
      customerPhone: newRes.customerPhone!,
      nationalId: newRes.nationalId,
      roomIds: newRes.roomIds!,
      checkIn: newRes.checkIn!,
      checkOut: newRes.checkOut!,
      totalNights: nights,
      totalPrice: total,
      paidAmount: Number(newRes.paidAmount) || 0,
      status: ReservationStatus.CONFIRMED,
      paymentMethod: newRes.paymentMethod as any,
      notes: newRes.notes || '',
      source: 'WALK_IN'
    };

    setReservations(prev => [...prev, reservation]);
    setRooms(prev => prev.map(r => reservation.roomIds.includes(r.id) ? { ...r, status: RoomStatus.BOOKED } : r));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الحجوزات</h1>
          <p className="text-slate-500">سجل بجميع الحجوزات القادمة والمباشرة.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg">
          <Plus size={20} /> حجز يدوي جديد
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b text-slate-500 text-xs font-black uppercase">
            <tr>
              <th className="px-6 py-5">رقم الحجز</th>
              <th className="px-6 py-5">العميل</th>
              <th className="px-6 py-5">الغرف</th>
              <th className="px-6 py-5">الإقامة</th>
              <th className="px-6 py-5">المبلغ الإجمالي</th>
              <th className="px-6 py-5">المسدد</th>
              <th className="px-6 py-5">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reservations.slice().reverse().map(res => (
              <tr key={res.id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4 font-black text-indigo-600">{res.id}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{res.customerName}</p>
                  <p className="text-xs text-slate-400">{res.customerPhone}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {res.roomIds.map(rid => (
                      <span key={rid} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded font-bold">
                        {rooms.find(r => r.id === rid)?.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-600">
                  {res.checkIn} ⬅️ {res.checkOut}
                  <p className="text-indigo-500 mt-1">{res.totalNights} ليلة</p>
                </td>
                <td className="px-6 py-4 font-black text-slate-800">{res.totalPrice.toLocaleString()} ج.م</td>
                <td className="px-6 py-4">
                  <span className={res.paidAmount >= res.totalPrice ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    {res.paidAmount.toLocaleString()} ج.م
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full">مؤكد</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manual Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black">إضافة حجز مباشر (Walk-in)</h2>
                <p className="text-indigo-100 opacity-80 text-sm">أدخل بيانات العميل وتفاصيل الإقامة بدقة</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white/10 p-3 rounded-2xl hover:bg-white/20"><X /></button>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <h3 className="font-black text-slate-800 flex items-center gap-2 border-b pb-2"><User size={18} /> بيانات العميل</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 uppercase">الاسم الكامل</label>
                    <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" value={newRes.customerName} onChange={e => setNewRes({...newRes, customerName: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 mb-2 uppercase">رقم الهاتف</label>
                      <input type="tel" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold text-center" value={newRes.customerPhone} onChange={e => setNewRes({...newRes, customerPhone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 mb-2 uppercase">الرقم القومي</label>
                      <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold text-center" value={newRes.nationalId} onChange={e => setNewRes({...newRes, nationalId: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-black text-slate-800 flex items-center gap-2 border-b pb-2"><Calendar size={18} /> تفاصيل الإقامة</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 mb-2 uppercase">تاريخ الدخول</label>
                      <input type="date" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" value={newRes.checkIn} onChange={e => setNewRes({...newRes, checkIn: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 mb-2 uppercase">تاريخ الخروج</label>
                      <input type="date" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" value={newRes.checkOut} onChange={e => setNewRes({...newRes, checkOut: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 uppercase">اختيار الغرف المتاحة</label>
                    <select multiple className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold min-h-[100px]" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      // Fix: Property 'value' does not exist on type 'unknown'. Use specific type for Array.from map function.
                      const values = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
                      setNewRes({...newRes, roomIds: values});
                    }}>
                      {rooms.filter(r => r.status === RoomStatus.AVAILABLE).map(r => (
                        <option key={r.id} value={r.id}>{r.name} - {r.basePrice} ج.م</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-slate-50 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase">المبلغ المدفوع حالياً</label>
                  <div className="relative">
                    <input type="number" className="w-full p-4 rounded-2xl bg-white border-none outline-none focus:ring-2 ring-indigo-500 font-black text-center pr-12" value={newRes.paidAmount} onChange={e => setNewRes({...newRes, paidAmount: Number(e.target.value)})} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">ج.م</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase">طريقة الدفع</label>
                  <select className="w-full p-4 rounded-2xl bg-white border-none outline-none focus:ring-2 ring-indigo-500 font-bold" value={newRes.paymentMethod} onChange={e => setNewRes({...newRes, paymentMethod: e.target.value as any})}>
                    <option value="CASH">نقداً</option>
                    <option value="CARD">فيزا / ماستر كارد</option>
                    <option value="TRANSFER">تحويل بنكي</option>
                  </select>
                </div>
                <div className="flex items-end">
                   <button onClick={handleAddReservation} className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100">تأكيد الحجز والحفظ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
