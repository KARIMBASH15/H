
import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, TrendingUp, DollarSign, 
  Activity, AlertCircle, Sparkles, CheckCircle2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie
} from 'recharts';
import { Room, Reservation, RoomStatus, ReservationStatus } from '../../types';
import { geminiService } from '../../services/geminiService';

interface Props {
  reservations: Reservation[];
  rooms: Room[];
}

const AdminDashboard: React.FC<Props> = ({ reservations, rooms }) => {
  const [aiTip, setAiTip] = useState<string>("جاري تحليل البيانات...");

  useEffect(() => {
    const fetchAiAdvice = async () => {
      const tip = await geminiService.getSmartPricingSuggestions(rooms);
      setAiTip(tip);
    };
    fetchAiAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === RoomStatus.BOOKED).length;
  const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
  
  const revenue = reservations
    .filter(res => res.status === ReservationStatus.CONFIRMED || res.status === ReservationStatus.COMPLETED)
    .reduce((sum, res) => sum + res.totalPrice, 0);

  const kpis = [
    { label: 'إجمالي الإيرادات', value: `${revenue.toLocaleString()} ر.س`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'نسبة الإشغال', value: `${occupancyRate.toFixed(1)}%`, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'الحجوزات النشطة', value: reservations.filter(r => r.status === ReservationStatus.CONFIRMED).length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'عملاء جدد', value: '12', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const chartData = [
    { name: 'السبت', revenue: 4000 },
    { name: 'الأحد', revenue: 3000 },
    { name: 'الاثنين', revenue: 2000 },
    { name: 'الثلاثاء', revenue: 2780 },
    { name: 'الأربعاء', revenue: 1890 },
    { name: 'الخميس', revenue: 2390 },
    { name: 'الجمعة', revenue: 3490 },
  ];

  const occupancyData = [
    { name: 'متاحة', value: rooms.filter(r => r.status === RoomStatus.AVAILABLE).length },
    { name: 'محجوزة', value: rooms.filter(r => r.status === RoomStatus.BOOKED).length },
    { name: 'صيانة', value: rooms.filter(r => r.status === RoomStatus.MAINTENANCE).length },
  ];

  const COLORS = ['#10b981', '#6366f1', '#f43f5e'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">نظرة عامة على النظام</h1>
          <p className="text-slate-500">مرحباً بك مجدداً، إليك ملخص أداء الفندق اليوم.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm text-slate-600 shadow-sm">
            <CheckCircle2 className="text-emerald-500" size={16} />
            النظام يعمل بكفاءة
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${kpi.bg}`}>
              <kpi.icon className={kpi.color} size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* AI Intelligence Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
            <Sparkles className="h-8 w-8 text-amber-300" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold mb-1">اقتراحات الذكاء الاصطناعي (Gemini)</h3>
            <p className="text-indigo-100 leading-relaxed text-sm">
              {aiTip}
            </p>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-50 transition whitespace-nowrap">
            تحليل متقدم
          </button>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-indigo-500" size={20} />
              إيرادات الأسبوع الحالي
            </h3>
            <select className="text-xs border rounded px-2 py-1 bg-slate-50">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} dot={{r: 4, fill: '#6366f1'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">توزيع حالة الغرف</h3>
          <div className="h-64 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {occupancyData.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx]}}></span>
                  <span className="text-xs text-slate-500">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">آخر الحجوزات</h3>
          <button className="text-indigo-600 text-sm font-bold hover:underline">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">الرقم</th>
                <th className="px-6 py-4">العميل</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">الإجمالي</th>
                <th className="px-6 py-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reservations.slice(-5).reverse().map((res) => (
                <tr key={res.id} className="hover:bg-slate-50 transition cursor-pointer">
                  <td className="px-6 py-4 font-mono">#{res.id.slice(-4)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs">U</div>
                      <span>عميل خارجي</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{res.checkIn}</td>
                  <td className="px-6 py-4 font-bold">{res.totalPrice} ر.س</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      res.status === ReservationStatus.CONFIRMED ? 'bg-emerald-100 text-emerald-700' :
                      res.status === ReservationStatus.NEW ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {res.status === ReservationStatus.CONFIRMED ? 'مؤكد' : 'جديد'}
                    </span>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">لا توجد حجوزات مسجلة حتى الآن</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
