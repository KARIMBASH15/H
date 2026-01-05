
import React from 'react';
import { Settings, Save, Image, Star, Megaphone, Bell } from 'lucide-react';

const AdminSiteSettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة محتوى الموقع العام</h1>
          <p className="text-slate-500">تحكم في الصور والنصوص والعروض التي يراها العميل.</p>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200">
          <Save size={18} /> حفظ جميع التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Banner Control */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border space-y-6">
          <h3 className="font-black text-slate-800 flex items-center gap-2 border-b pb-4"><Megaphone size={18} className="text-indigo-600" /> بانر الموقع الرئيسي</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase">عنوان البانر الرئيسي</label>
              <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 font-bold border-none outline-none focus:ring-2 ring-indigo-500" defaultValue="عيش الفخامة بكل تفاصيلها" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase">الوصف المختصر</label>
              <textarea className="w-full p-4 rounded-2xl bg-slate-50 font-bold border-none outline-none focus:ring-2 ring-indigo-500" rows={3} defaultValue="نقدم لك تجربة إقامة استثنائية تجمع بين الأصالة والراحة العصرية."></textarea>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase">صورة الخلفية</label>
              <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 text-center bg-slate-50 group hover:border-indigo-300 transition cursor-pointer">
                <Image className="mx-auto text-slate-300 mb-2 group-hover:text-indigo-500" size={32} />
                <p className="text-xs font-bold text-slate-400 uppercase">تغيير الصورة الرئيسية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Notifications */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border space-y-6">
          <h3 className="font-black text-slate-800 flex items-center gap-2 border-b pb-4"><Bell size={18} className="text-indigo-600" /> تنبيهات الحجز الفورية</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-bold text-slate-700 text-sm">تفعيل إرسال التأكيد بالواتساب</span>
              <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 cursor-pointer flex justify-end"><div className="w-4 h-4 bg-white rounded-full"></div></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-bold text-slate-700 text-sm">عرض "غرفة واحدة متبقية" بشكل تلقائي</span>
              <div className="w-12 h-6 bg-slate-200 rounded-full p-1 cursor-pointer flex justify-start"><div className="w-4 h-4 bg-white rounded-full"></div></div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase">رسالة الشكر بعد الحجز</label>
              <textarea className="w-full p-4 rounded-2xl bg-slate-50 font-bold border-none outline-none focus:ring-2 ring-indigo-500" rows={3} defaultValue="شكراً لاختيارك فندق السفير. سيتم التواصل معك قريباً لتأكيد تفاصيل الوصول."></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSiteSettings;
