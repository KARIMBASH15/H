
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Hotel, CalendarCheck, Users, 
  Wallet, PieChart, ShieldCheck, Menu, X, 
  LogIn, Activity, Bell, Lock, Key, 
  ArrowLeft, Globe, Briefcase, Settings, ShoppingBag
} from 'lucide-react';

import { INITIAL_ROOMS, INITIAL_VAULTS } from './constants';
import { Room, Reservation, Transaction, Vault, ReservationStatus, RoomStatus } from './types';

// Admin & Site Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';
import AdminReservations from './pages/admin/AdminReservations';
import AdminFinance from './pages/admin/AdminFinance';
import AdminReports from './pages/admin/AdminReports';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';

// Public Pages
import PublicHome from './pages/public/PublicHome';
import RoomDetails from './pages/public/RoomDetails';
import BookingFlow from './pages/public/BookingFlow';

// --- Auth Gate Component ---
const LoginGate: React.FC<{ onAuthenticated: () => void, title: string, subtitle: string, icon: React.ReactNode }> = ({ onAuthenticated, title, subtitle, icon }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ad') {
      onAuthenticated();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4">
      <div className={`bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl transition-all duration-300 ${error ? 'shake-animation border-2 border-rose-500' : 'border border-slate-100'}`}>
        <div className="text-center space-y-4 mb-8">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
            {icon}
          </div>
          <h2 className="text-2xl font-black text-slate-800">{title}</h2>
          <p className="text-slate-500 font-medium text-sm">{subtitle}</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="password" 
              autoFocus
              className="w-full pr-12 pl-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none transition-all font-bold text-center tracking-widest text-lg"
              placeholder="الرمز الإفتراضي ad"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all">
            تأكيد الدخول
          </button>
        </form>
        <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 transition text-sm font-bold">
          <ArrowLeft size={16} /> العودة للبوابة
        </Link>
      </div>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .shake-animation { animation: shake 0.3s ease-in-out 2; }
      `}</style>
    </div>
  );
};

// --- Triple Launchpad ---
const TripleLaunchpad: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-200/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-indigo-600 text-white px-6 py-2 rounded-full inline-block font-black text-xs mb-4 shadow-lg shadow-indigo-200">
            EL-SAFIR HOTEL MANAGEMENT
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-2">منصة السفير <span className="text-indigo-600 underline decoration-indigo-200">الذكية</span></h1>
          <p className="text-slate-500 font-bold">نظام متكامل لإدارة الفندق والموقع العام والجمهور</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Admin HMS */}
          <Link to="/admin" className="group">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-lg">
                <Briefcase size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">برنامج الإدارة HMS</h3>
              <p className="text-slate-500 text-sm font-medium mb-6 flex-grow">
                إدارة الغرف، الحجوزات اليدوية، حسابات الموظفين والخزن والتقارير المالية المفصلة.
              </p>
              <div className="py-3 px-6 bg-slate-50 rounded-xl text-slate-800 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition text-center">دخول النظام</div>
            </div>
          </Link>

          {/* Card 2: Site Management */}
          <Link to="/manage-site" className="group">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2">
              <div className="w-16 h-16 bg-violet-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-lg">
                <Settings size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">إدارة موقع الحجز</h3>
              <p className="text-slate-500 text-sm font-medium mb-6 flex-grow">
                التحكم في العروض، الصور، النصوص، وسياسات الحجز التي تظهر للعملاء في الموقع العام.
              </p>
              <div className="py-3 px-6 bg-violet-50 rounded-xl text-violet-700 font-bold group-hover:bg-indigo-600 group-hover:text-white transition text-center">إدارة المحتوى</div>
            </div>
          </Link>

          {/* Card 3: Public Site */}
          <Link to="/site" className="group">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-colors shadow-lg">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">موقع الحجز العام</h3>
              <p className="text-slate-500 text-sm font-medium mb-6 flex-grow">
                واجهة العملاء الخارجية لاستعراض الغرف المتاحة بالجنيه المصري وإتمام عمليات الحجز.
              </p>
              <div className="py-3 px-6 bg-indigo-600 rounded-xl text-white font-bold group-hover:bg-slate-900 transition text-center">فتح الموقع</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vaults, setVaults] = useState<Vault[]>(INITIAL_VAULTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isSiteManageAuth, setIsSiteManageAuth] = useState(false);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TripleLaunchpad />} />

        {/* Public Site */}
        <Route path="/site" element={<Layout />}>
          <Route index element={<PublicHome rooms={rooms} />} />
          <Route path="room/:id" element={<RoomDetails rooms={rooms} />} />
          <Route path="book/:id" element={<BookingFlow rooms={rooms} setReservations={setReservations} setRooms={setRooms} />} />
        </Route>
        
        {/* Site Management CMS */}
        <Route path="/manage-site" element={
          isSiteManageAuth ? <AdminLayout title="إدارة المحتوى" /> : 
          <LoginGate title="إدارة موقع الحجز" subtitle="تحكم في ما يراه العميل" icon={<Settings size={32} />} onAuthenticated={() => setIsSiteManageAuth(true)} />
        }>
          <Route index element={<AdminSiteSettings />} />
        </Route>

        {/* Core Admin HMS */}
        <Route path="/admin" element={
          isAdminAuth ? <AdminLayout title="برنامج الإدارة" /> : 
          <LoginGate title="برنامج إدارة الفندق HMS" subtitle="منطقة الموظفين المصرح لهم فقط" icon={<ShieldCheck size={32} />} onAuthenticated={() => setIsAdminAuth(true)} />
        }>
          <Route index element={<AdminDashboard reservations={reservations} rooms={rooms} />} />
          <Route path="rooms" element={<AdminRooms rooms={rooms} setRooms={setRooms} />} />
          <Route path="reservations" element={<AdminReservations reservations={reservations} setReservations={setReservations} rooms={rooms} setRooms={setRooms} />} />
          <Route path="finance" element={<AdminFinance transactions={transactions} vaults={vaults} setTransactions={setTransactions} setVaults={setVaults} />} />
          <Route path="reports" element={<AdminReports reservations={reservations} transactions={transactions} rooms={rooms} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl"><Hotel className="text-white h-6 w-6" /></div>
          <span className="text-2xl font-black text-slate-800">السفير HMS</span>
        </div>
        <Link to="/" className="text-slate-500 font-bold hover:text-indigo-600 transition">العودة للبوابة</Link>
      </div>
    </header>
    <main className="flex-grow"><Outlet /></main>
  </div>
);

const AdminLayout: React.FC<{ title: string }> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isCms = window.location.hash.includes('manage-site');
  
  const navItems = isCms ? [
    { label: 'إعدادات الموقع', path: '/manage-site', icon: Settings },
    { label: 'العروض الترويجية', path: '/manage-site/offers', icon: ShoppingBag },
  ] : [
    { label: 'نظرة عامة', path: '/admin', icon: LayoutDashboard },
    { label: 'الغرف', path: '/admin/rooms', icon: Hotel },
    { label: 'الحجوزات', path: '/admin/reservations', icon: CalendarCheck },
    { label: 'الحسابات والخزن', path: '/admin/finance', icon: Wallet },
    { label: 'التقارير', path: '/admin/reports', icon: PieChart },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all flex flex-col`}>
        <div className="p-6 font-black border-b border-white/5 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shrink-0"><Hotel size={16} /></div>
          {isOpen && <span>{title}</span>}
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition text-slate-400 hover:text-white">
              <item.icon size={20} /> {isOpen && <span className="font-bold">{item.label}</span>}
            </Link>
          ))}
        </nav>
        <Link to="/" className="p-6 border-t border-white/5 text-rose-400 font-bold flex items-center gap-3"><LogIn size={18} /> {isOpen && 'خروج'}</Link>
      </aside>
      <div className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b px-8 flex items-center justify-between">
          <button onClick={() => setIsOpen(!isOpen)} className="bg-slate-50 p-2 rounded-lg text-slate-500"><Menu /></button>
          <div className="flex items-center gap-4">
             <div className="text-left hidden sm:block"><p className="font-black text-slate-800">أحمد العمري</p><p className="text-[10px] text-indigo-600 font-bold">Admin</p></div>
             <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">ع</div>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto p-8"><Outlet /></main>
      </div>
    </div>
  );
};

export default App;
