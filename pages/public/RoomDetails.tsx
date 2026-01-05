
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, Users, Wifi, Tv, Wind, 
  Car, ShieldCheck, CheckCircle, Calendar,
  CreditCard, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Room } from '../../types';

interface Props {
  rooms: Room[];
}

const RoomDetails: React.FC<Props> = ({ rooms }) => {
  const { id } = useParams<{ id: string }>();
  const room = rooms.find(r => r.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!room) return <div className="p-20 text-center">غرفة غير موجودة.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition">
        <ArrowRight size={20} />
        العودة للرئيسية
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery Slider */}
        <div className="space-y-4">
          <div className="h-[450px] bg-slate-200 rounded-[2.5rem] overflow-hidden relative shadow-lg">
            <img 
              src={room.images[activeImg]} 
              alt={room.name} 
              className="w-full h-full object-cover transition duration-700" 
            />
            {room.images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImg(prev => (prev > 0 ? prev - 1 : room.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setActiveImg(prev => (prev < room.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {room.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(idx)}
                className={`w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-4 transition-all ${
                  activeImg === idx ? 'border-indigo-600 scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Room Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">{room.type}</span>
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-full">
                <CheckCircle size={14} /> متاحة للحجز
              </div>
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-4">{room.name}</h1>
            <p className="text-slate-500 font-medium leading-loose">
              {room.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <Users className="mx-auto text-indigo-500 mb-2" />
              <p className="text-[10px] text-slate-400 font-bold">السعة</p>
              <p className="text-sm font-bold text-slate-800">{room.capacity} أشخاص</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <Calendar className="mx-auto text-indigo-500 mb-2" />
              <p className="text-[10px] text-slate-400 font-bold">أقل مدة</p>
              <p className="text-sm font-bold text-slate-800">ليلة واحدة</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <ShieldCheck className="mx-auto text-indigo-500 mb-2" />
              <p className="text-[10px] text-slate-400 font-bold">التأمين</p>
              <p className="text-sm font-bold text-slate-800">شامل</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <CreditCard className="mx-auto text-indigo-500 mb-2" />
              <p className="text-[10px] text-slate-400 font-bold">الإلغاء</p>
              <p className="text-sm font-bold text-slate-800">مجاني مرن</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">المميزات والخدمات</h3>
            <div className="grid grid-cols-2 gap-y-3">
              {room.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div>
              <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">السعر يبدأ من</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">{room.basePrice}</span>
                <span className="text-indigo-300 text-sm mb-1">ر.س / ليلة</span>
              </div>
            </div>
            <Link to={`/book/${room.id}`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 w-full md:w-auto text-center">
              احجز هذه الغرفة الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
