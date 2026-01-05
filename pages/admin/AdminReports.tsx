
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { TrendingUp, FileText, Download, Target, Users, MapPin } from 'lucide-react';
import { Reservation, Room, Transaction, RoomStatus } from '../../types';

interface Props {
  reservations: Reservation[];
  transactions: Transaction[];
  rooms: Room[];
}

const AdminReports: React.FC<Props> = ({ reservations, transactions, rooms }) => {
  // KPI Calculations
  const totalRevenue = reservations.reduce((sum, r) => sum + r.totalPrice, 0);
  const totalNights = reservations.reduce((sum, r) => sum + r.totalNights, 0);
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === RoomStatus.BOOKED).length;
  
  // Average Daily Rate (ADR)
  const adr = totalNights > 0 ? totalRevenue / totalNights : 0;
  // Revenue Per Available Room (RevPAR)
  const revPar = totalRooms > 0 ? totalRevenue / (totalRooms * 30) : 0; // Simplified monthly

  const stats = [
    { label: 'RevPAR', value: `${revPar.toFixed(0)} ر.س`, desc: 'الإيراد لكل غرفة متاحة', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'ADR', value: `${adr.toFixed(0)} ر.س`, desc: 'متوسط سعر الليلة المحقق', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'إجمالي الحجوزات', value: reservations.length, desc: 'حجوزات هذا الشهر', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'نسبة الإشغال', value: `${totalRooms > 0 ? (occupiedRooms/totalRooms * 100).toFixed(1) : 0}%`, desc: 'إشغال الغرف الحالي', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const monthlyData = [
    { month: 'يناير', rev: 45000, exp: 28000 },
    { month: 'فبراير', rev: 52000, exp: 30000 },
    { month: 'مارس', rev: 48000, exp: 29000 },
    { month: 'أبريل', rev: 61000, exp: 32000 },
    { month: 'مايو', rev: 55000, exp: 31000 },
    { month: 'يونيو', rev: 67000, exp: 35000 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">التقارير التحليلية</h1>
          <p className="text-slate-500">تحليل الأداء المالي والتشغيلي للفندق.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-indigo-200 transition">
          <Download size={20} />
          تحميل تقرير PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+4.2%</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-400 mb-1">{stat.label}</p>
            <p className="text-[10px] text-slate-400">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue vs Expenses */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">الإيرادات مقابل المصروفات (6 أشهر)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="rev" name="الإيرادات" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                <Area type="monotone" dataKey="exp" name="المصروفات" stroke="#f43f5e" fill="transparent" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Source (Mock) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">مصادر الحجوزات</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'موقع الفندق', value: 45 },
                { name: 'Booking.com', value: 25 },
                { name: 'مباشر (استقبال)', value: 20 },
                { name: 'شركات سياحة', value: 10 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="value" name="النسبة %" fill="#818cf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
