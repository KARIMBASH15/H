
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Camera, MoreVertical, X } from 'lucide-react';
import { Room, RoomStatus } from '../../types';

interface Props {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const AdminRooms: React.FC<Props> = ({ rooms, setRooms }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const filteredRooms = rooms.filter(r => 
    r.name.includes(searchQuery) || r.type.includes(searchQuery)
  );

  const toggleRoomStatus = (id: string) => {
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === RoomStatus.AVAILABLE ? RoomStatus.MAINTENANCE : RoomStatus.AVAILABLE;
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const deleteRoom = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الغرفة؟')) {
      setRooms(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">إدارة الغرف</h1>
          <p className="text-slate-500">إضافة وتعديل وحذف وحدات الإقامة في الفندق.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-md transition"
        >
          <Plus size={20} />
          إضافة غرفة جديدة
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن غرفة..." 
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none">
            <option>جميع الأنواع</option>
            <option>جناح</option>
            <option>غرفة مفردة</option>
            <option>غرفة عائلية</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none">
            <option>جميع الحالات</option>
            <option>متاحة</option>
            <option>محجوزة</option>
            <option>صيانة</option>
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group">
            <div className="h-48 relative overflow-hidden">
              <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${
                  room.status === RoomStatus.AVAILABLE ? 'bg-emerald-500 text-white' :
                  room.status === RoomStatus.BOOKED ? 'bg-indigo-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {room.status === RoomStatus.AVAILABLE ? 'متاحة' : room.status === RoomStatus.BOOKED ? 'محجوزة' : 'صيانة'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{room.name}</h3>
                  <p className="text-slate-500 text-sm">{room.type}</p>
                </div>
                <div className="text-left">
                  <span className="text-indigo-600 font-bold text-lg">{room.basePrice}</span>
                  <span className="text-slate-400 text-xs"> ر.س / ليلة</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {room.features.slice(0, 3).map((f, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-md font-medium">{f}</span>
                ))}
                {room.features.length > 3 && <span className="text-[10px] text-slate-400">+{room.features.length - 3} أخرى</span>}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => toggleRoomStatus(room.id)}
                  className={`py-2 rounded-lg text-sm font-bold border transition ${
                    room.status === RoomStatus.AVAILABLE ? 'border-rose-200 text-rose-600 hover:bg-rose-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {room.status === RoomStatus.AVAILABLE ? 'تعيين للصيانة' : 'تفعيل'}
                </button>
                <div className="flex gap-2">
                  <button className="flex-grow py-2 rounded-lg text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                    <Edit2 size={16} />
                    تعديل
                  </button>
                  <button 
                    onClick={() => deleteRoom(room.id)}
                    className="p-2 rounded-lg border border-rose-100 text-rose-400 hover:bg-rose-50 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Form Modal (Simulation) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <h3 className="text-xl font-bold text-slate-800">إضافة وحدة إقامة جديدة</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">اسم الغرفة/الرقم</label>
                  <input type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition" placeholder="مثلاً: جناح 201" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">نوع الغرفة</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition">
                    <option>Standard</option>
                    <option>Deluxe Suite</option>
                    <option>Executive Suite</option>
                    <option>Family Room</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">السعر الأساسي</label>
                    <input type="number" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">سرير إضافي</label>
                    <input type="number" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition" placeholder="تكلفة" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">وصف الغرفة</label>
                  <textarea rows={3} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition" placeholder="أدخل تفاصيل الغرفة هنا..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الصور</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 transition cursor-pointer bg-slate-50 group">
                    <Camera className="mx-auto text-slate-300 mb-2 group-hover:text-indigo-400" size={32} />
                    <p className="text-xs text-slate-400">اسحب الصور أو انقر للرفع</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">المميزات</label>
                <div className="flex flex-wrap gap-3">
                  {['WiFi', 'تكييف', 'تلفاز', 'شرفة', 'ميني بار', 'خزنة'].map(feature => (
                    <label key={feature} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                      <input type="checkbox" className="accent-indigo-600" />
                      <span className="text-xs font-medium text-slate-600">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition">إلغاء</button>
              <button className="px-8 py-2 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition">حفظ الغرفة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
