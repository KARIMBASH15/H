
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Wifi, Tv, Wind, Car, Users, Calendar } from 'lucide-react';
import { Room, RoomStatus } from '../../types';

interface Props {
  rooms: Room[];
}

const PublicHome: React.FC<Props> = ({ rooms }) => {
  const [filterType, setFilterType] = useState('الكل');
  
  const availableRooms = rooms.filter(r => r.status === RoomStatus.AVAILABLE);
  const filteredRooms = filterType === 'الكل' 
    ? availableRooms 
    : availableRooms.filter(r => r.type.includes(filterType) || r.name.includes(filterType));

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Hotel" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-8 animate-in slide-in-from-top duration-1000">
            <Star className="text-amber-400 h-4 w-4" fill="currentColor" />
            <span className="text-[10px] font-black tracking-widest uppercase">Luxury Experience in Cairo</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">رؤية جديدة <br /><span className="text-indigo-400">للفخامة</span></h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium opacity-90">
            اكتشف سحر القاهرة من قلب فندق السفير. غرف وأجنحة فاخرة مجهزة بأعلى المعايير العالمية.
          </p>
          
          <div className="bg-white/10 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-3 border border-white/20">
            <div className="flex-grow flex items-center px-6 py-4 gap-4 bg-white/95 rounded-[2rem] text-right">
              <Calendar className="text-indigo-600" size={24} />
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase">موعد الوصول</p>
                <p className="text-slate-800 font-black text-sm">اختر التاريخ</p>
              </div>
            </div>
            <div className="flex-grow flex items-center px-6 py-4 gap-4 bg-white/95 rounded-[2rem] text-right">
              <Users className="text-indigo-600" size={24} />
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase">الضيوف</p>
                <p className="text-slate-800 font-black text-sm">2 بالغين</p>
              </div>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-500/20 transition-all">
              بحث
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-right">
            <h2 className="text-4xl font-black text-slate-800 mb-4">وحدات إقامة متميزة</h2>
            <p className="text-slate-500 max-w-lg font-bold">احجز الآن بالجنيه المصري واستمتع بعروض حصرية.</p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border">
            {['الكل', 'Standard', 'Suite', 'Family'].map(type => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-8 py-3 rounded-xl text-sm font-black transition ${
                  filterType === type ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-indigo-500'
                }`}
              >
                {type === 'الكل' ? 'الكل' : type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredRooms.map(room => (
            <Link key={room.id} to={`/site/room/${room.id}`} className="group block">
              <div className="bg-white rounded-[3rem] shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-transparent hover:border-slate-100">
                <div className="h-80 relative overflow-hidden">
                  <img 
                    src={room.images[0]} 
                    alt={room.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" 
                  />
                  <div className="absolute top-6 right-6">
                    <div className="bg-white px-5 py-3 rounded-[1.5rem] shadow-xl border border-slate-50">
                      <span className="text-indigo-600 font-black text-2xl">{room.basePrice.toLocaleString()}</span>
                      <span className="text-slate-400 text-[10px] font-black mr-1 uppercase">ج.م / ليلة</span>
                    </div>
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col text-right">
                  <h3 className="text-2xl font-black text-slate-800 mb-4">{room.name}</h3>
                  <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-8 leading-loose">
                    {room.description}
                  </p>
                  <div className="flex items-center gap-6 border-t pt-8 mt-auto">
                    <div className="flex gap-4">
                      <Wifi size={20} className="text-slate-300" />
                      <Tv size={20} className="text-slate-300" />
                      <Wind size={20} className="text-slate-300" />
                    </div>
                    <div className="mr-auto">
                      <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs group-hover:bg-indigo-600 transition-colors shadow-lg">احجز الآن</button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
