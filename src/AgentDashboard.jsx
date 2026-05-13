import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Award, Clock, Smile, MessageSquare, ChevronLeft, Calendar } from 'lucide-react';

const AgentDashboard = () => {
  const performanceData = [
    { day: 'א', score: 82 },
    { day: 'ב', score: 88 },
    { day: 'ג', score: 85 },
    { day: 'ד', score: 92 },
    { day: 'ה', score: 90 },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - ממוקד ואישי */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E293B]">האזור האישי שלי</h1>
            <p className="text-[#64748B] mt-1 text-lg">שלום שרה, הנה סיכום הביצועים שלך להיום.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-3 border border-slate-200">
             <Calendar className="text-indigo-500" size={20} color='blue'/>
             <span className="text-slate-600 font-medium">13 במאי, 2026</span>
          </div>
        </div>

        {/* Top Stats Grid - כרטיסים נפרדים בשורה אחת */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="ציון איכות" 
            value="89" 
            trend="+4% מהשבוע שעבר" 
            icon={<Award size={28} />} 
            color="indigo" 
          />
          <StatCard 
            title="זמן טיפול (AHT)" 
            value="4:12" 
            trend="עומד ביעד המערכת" 
            icon={<Clock size={28} />} 
            color="emerald" 
          />
          <StatCard 
            title="סנטימנט לקוחות" 
            value="84%" 
            trend="חיובי מאוד" 
            icon={<Smile size={28} />} 
            color="amber" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">מגמת שיפור שבועית</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">Live Data</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} dy={10} />
                  <YAxis hide domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border-r-4 border-indigo-500">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-500" />
                תובנות חכמות
              </h3>
              <ul className="space-y-4">
                <li className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">
                   עבודה מעולה על **זיהוי צרכי לקוח** בתחילת השיחה.
                </li>
                <li className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">
                   המלצה: נסי להפחית את זמן השתיקה הממוצע בזמן חיפוש נתונים.
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1E293B] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-2">היעד השבועי שלך</h3>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold">92%</span>
                <span className="text-slate-400 text-sm">89% כעת</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[89%] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// קומפוננטת כרטיס מדד - עיצוב נקי ומקצועי
const StatCard = ({ title, value, trend, icon, color }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    amber: 'text-amber-600 bg-amber-50'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-50 flex items-center justify-between hover:translate-y-[-4px] transition-all duration-300">
      <div>
<div style={{ 
  width: '200px', 
  height: '200px', 
  backgroundColor: 'blue', 
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px'
}}>
  בדיקת צבע כחול
</div>        <p className="text-slate-500 font-medium text-sm mb-1">{title}</p>
        <h4 className="text-3xl font-black text-slate-800">{value}</h4>
        <p className="text-xs font-bold text-slate-400 mt-2">{trend}</p>
      </div>
      <div className={`p-4 rounded-2xl ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
};

export default AgentDashboard;