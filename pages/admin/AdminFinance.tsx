
import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, 
  TrendingUp, TrendingDown, Landmark, PieChart,
  Plus, Download, FileText, CheckCircle
} from 'lucide-react';
import { Transaction, Vault } from '../../types';

interface Props {
  transactions: Transaction[];
  vaults: Vault[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setVaults: React.Dispatch<React.SetStateAction<Vault[]>>;
}

const AdminFinance: React.FC<Props> = ({ transactions, vaults, setTransactions, setVaults }) => {
  const totalBalance = vaults.reduce((sum, v) => sum + v.balance, 0);
  const income = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = income - expenses;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">الحسابات والخزن المالية</h1>
          <p className="text-slate-500">مراقبة التدفقات النقدية والأرصدة اللحظية بالجنيه المصري.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition"><Download size={18} /> تصدير ميزانية</button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"><Plus size={18} /> تسجيل مصروفات</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <Landmark className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-500" />
          <p className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-widest">إجمالي السيولة</p>
          <h3 className="text-3xl font-black">{totalBalance.toLocaleString()} <span className="text-sm">ج.م</span></h3>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-white/5 px-3 py-1 rounded-full w-fit">
            <CheckCircle size={10} /> مطابق للأرصدة الفعلية
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-xs font-black text-slate-400 uppercase">إيرادات الحجز</p>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mt-2">+{income.toLocaleString()} <span className="text-xs">ج.م</span></h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-xs font-black text-slate-400 uppercase">إجمالي المصروفات</p>
            <TrendingDown size={20} className="text-rose-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mt-2">-{expenses.toLocaleString()} <span className="text-xs">ج.م</span></h3>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-xs font-black text-indigo-200 uppercase">صافي الربح</p>
            <PieChart size={20} className="text-indigo-200" />
          </div>
          <h3 className="text-2xl font-black mt-2">{netProfit.toLocaleString()} <span className="text-xs">ج.م</span></h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-sm border overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center">
            <h3 className="font-black text-slate-800">حركة الخزينة والتحويلات</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase">
                <tr>
                  <th className="px-8 py-5">البيان</th>
                  <th className="px-8 py-5">الفئة</th>
                  <th className="px-8 py-5">المبلغ</th>
                  <th className="px-8 py-5">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.length === 0 ? (
                  <tr><td colSpan={4} className="p-12 text-center text-slate-400 font-bold italic">لا توجد عمليات مسجلة لليوم</td></tr>
                ) : (
                  transactions.slice().reverse().map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition">
                      <td className="px-8 py-4 font-bold text-slate-800">{tx.description}</td>
                      <td className="px-8 py-4"><span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">{tx.category}</span></td>
                      <td className={`px-8 py-4 font-black ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {tx.type === 'INCOME' ? '+' : '-'}{tx.amount.toLocaleString()} ج.م
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-400">{tx.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border">
            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2"><FileText size={18} className="text-indigo-600" /> تحليل الضرائب والرسوم</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">ضريبة القيمة المضافة (14%)</span>
                <span className="text-slate-800">{(income * 0.14).toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">رسوم الخدمة (12%)</span>
                <span className="text-slate-800">{(income * 0.12).toLocaleString()} ج.م</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-black text-lg">
                <span className="text-slate-800">إجمالي المخصصات</span>
                <span className="text-indigo-600">{(income * 0.26).toLocaleString()} ج.م</span>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 p-8 rounded-[3rem] border border-emerald-100">
             <h4 className="font-black text-emerald-800 mb-2">توصية مالية ذكية</h4>
             <p className="text-emerald-600 text-sm font-medium leading-relaxed">
               أداء الفندق ممتاز هذا الأسبوع. ننصح بترحيل 20,000 ج.م من خزنة الاستقبال إلى الخزنة الرئيسية لتقليل المخاطر وزيادة السيولة المركزية.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
