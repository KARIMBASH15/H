
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Calendar, User, Phone, 
  CreditCard, ChevronLeft, Send, Sparkles, Loader2 
} from 'lucide-react';
import { Room, Reservation, ReservationStatus, RoomStatus } from '../../types';
import { TAX_RATE } from '../../constants';

interface Props {
  rooms: Room[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const BookingFlow: React.FC<Props> = ({ rooms, setReservations, setRooms }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === id);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    extraBeds: 0,
    paymentMethod: 'ARRIVAL' as 'ARRIVAL' | 'DEPOSIT'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!room) return null;

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 1;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const subtotal = (room.basePrice * nights) + (formData.extraBeds * room.extraBedCost);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call and WhatsApp notification
    await new Promise(r => setTimeout(r, 2000));

    // Fix: Object literal may only specify known properties, and 'customerId' does not exist in type 'Reservation'.
    // Also align other properties with the Reservation interface.
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.fullName,
      customerPhone: formData.phone,
      roomIds: [room.id],
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      totalNights: nights,
      totalPrice: total,
      paidAmount: 0,
      status: ReservationStatus.NEW,
      paymentMethod: formData.paymentMethod === 'DEPOSIT' ? 'CARD' : 'CASH',
      notes: '',
      source: 'ONLINE'
    };

    setReservations(prev => [...prev, newReservation]);
    // Note: Admin confirms status which then updates room status, 
    // but we can optimisticly block it if needed.
    
    setStep(3);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 border-4 ${
            step >= s ? 'bg-indigo-600 text-white border-indigo-100 scale-110' : 'bg-white text-slate-400 border-slate-50'
          }`}>
            {step > s ? <CheckCircle2 size={20} /> : s}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-slate-800">معلومات الحجز</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">تاريخ الدخول</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pr-12 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-4 ring-indigo-500/10 outline-none transition"
                      value={formData.checkIn}
                      onChange={e => setFormData({...formData, checkIn: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">تاريخ الخروج</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pr-12 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-4 ring-indigo-500/10 outline-none transition"
                      value={formData.checkOut}
                      onChange={e => setFormData({...formData, checkOut: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-4">طلبات إضافية</label>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">سرير إضافي ({room.extraBedCost} ر.س)</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setFormData({...formData, extraBeds: Math.max(0, formData.extraBeds - 1)})} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-slate-400 hover:text-indigo-600 transition">-</button>
                    <span className="font-bold">{formData.extraBeds}</span>
                    <button onClick={() => setFormData({...formData, extraBeds: formData.extraBeds + 1})} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-slate-400 hover:text-indigo-600 transition">+</button>
                  </div>
                </div>
              </div>
              <button 
                disabled={!formData.checkIn || !formData.checkOut}
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                المتابعة لبيانات التواصل
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-slate-800">بيانات التواصل</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="أدخل اسمك كما في الهوية"
                      className="w-full pr-12 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-4 ring-indigo-500/10 outline-none transition"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">رقم الجوال</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel" 
                      placeholder="+966 5XXXXXXXX"
                      className="w-full pr-12 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-4 ring-indigo-500/10 outline-none transition"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-4">طريقة الدفع</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData({...formData, paymentMethod: 'ARRIVAL'})}
                      className={`p-4 rounded-2xl border-2 text-right transition ${formData.paymentMethod === 'ARRIVAL' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <p className="font-bold text-slate-800">الدفع عند الوصول</p>
                      <p className="text-xs text-slate-500 mt-1">بدون رسوم مسبقة</p>
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, paymentMethod: 'DEPOSIT'})}
                      className={`p-4 rounded-2xl border-2 text-right transition ${formData.paymentMethod === 'DEPOSIT' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <p className="font-bold text-slate-800">دفع عربون (تأكيد فوري)</p>
                      <p className="text-xs text-slate-500 mt-1">بطاقة مدى / ائتمان</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex items-center justify-center p-4 rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition">
                  <ChevronLeft className="rotate-180" size={24} />
                </button>
                <button 
                  disabled={isSubmitting || !formData.fullName || !formData.phone}
                  onClick={handleSubmit}
                  className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  تأكيد الحجز النهائي
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 text-center space-y-8 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">تم استلام حجزك بنجاح!</h2>
                <p className="text-slate-500 max-w-sm mx-auto font-medium">سيصلك تأكيد الحجز وتفاصيل الوصول عبر الواتساب والبريد الإلكتروني قريباً.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl inline-block text-right min-w-[300px]">
                <p className="text-xs text-slate-400 font-bold mb-4 border-b pb-2 uppercase tracking-widest">ملخص العملية</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">رقم المرجع:</span>
                    <span className="font-mono font-bold text-indigo-600 uppercase">SAF-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">حالة الحجز:</span>
                    <span className="text-emerald-600 font-bold">بانتظار التأكيد</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="block w-full max-w-xs mx-auto py-4 rounded-2xl border-2 border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-50 transition"
              >
                العودة للرئيسية
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        {step < 3 && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Sparkles className="text-indigo-400" size={18} />
                ملخص السعر
              </h3>
              <div className="space-y-4 text-sm relative z-10">
                <div className="flex justify-between opacity-70">
                  <span>سعر الليلة الأساسي</span>
                  <span>{room.basePrice} ر.س</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>عدد الليالي</span>
                  <span>{nights} ليلة</span>
                </div>
                {formData.extraBeds > 0 && (
                  <div className="flex justify-between opacity-70">
                    <span>أسرة إضافية</span>
                    <span>+{formData.extraBeds * room.extraBedCost} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between opacity-70">
                  <span>الضريبة (15%)</span>
                  <span>{tax.toFixed(0)} ر.س</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="font-bold">الإجمالي</span>
                  <div className="text-right">
                    <p className="text-3xl font-black">{total.toLocaleString()} ر.س</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={room.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">{room.type}</p>
                <h4 className="font-bold text-slate-800 text-sm leading-tight">{room.name}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
