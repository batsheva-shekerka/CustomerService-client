import React from 'react';
import { useGetDailyImprovementQuery ,useGetWeeklyImprovementQuery} from '../../company/redux/api';
import { useSelector } from 'react-redux';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Award, Clock, Smile, MessageSquare, Calendar } from 'lucide-react';
// ייבוא רכיבי Material UI שהיו חסרים בקוד המקור
import { Box, CircularProgress, Alert } from '@mui/material'; 
import './ManagerDashboard.css';

const ManagerDashboard = ({ companyId: propId, name: propName }) => {
  // const o= useSelector((state) => state);
  // סדר עדיפויות ל-ID: קודם prop (מהמנהל), אחרת מה-Redux (המשתמש המחובר)
  const reduxId = useSelector((state) => state.auth?.operator?.companyId);
  console.log("companyid",reduxId)
  const currentId = propId || reduxId;

  // סדר עדיפויות לשם
  const reduxName = useSelector((state) => state.auth?.operator?.firstName || "מנהל/ת");
  const companyName = propName || reduxName;
//   const { 
//     data: tipsData, 
//     isLoading: isTipsLoading, 
//     isError: isTipsError 
//   } = useGetDailyImprovementQuery(currentId, { skip: !currentId });
  const { 
    data: rawData, 
    isLoading, 
    isError, 
    error 
  } = useGetDailyImprovementQuery(currentId, { skip: !currentId });
  const { 
    data: weeklyData, 
    isLoading:isWeekLoading, 
    isError:isErrorLoading, 
  } = useGetWeeklyImprovementQuery(currentId, { skip: !currentId });
  // console.log("נתוני הסטייט",o)
  // 1. עיבוד הנתונים לגרף
  // בהנחה ש-rawData הוא מערך של אובייקטים המכילים יום וציון
  // עדכון עיבוד הנתונים לגרף השבועי
const performanceData = React.useMemo(() => {
  if (!weeklyData || !Array.isArray(weeklyData)) return [];

  return weeklyData.map(item => ({
    // אם אין שם יום, נשתמש בתאריך או אינדקס
    day: item.dayName || item.key || "יום", 
    // שימוש בשם השדה המדויק שמופיע ב-Console ב-"image_a03efe.jpg"
    score: Number(item.overallScore).toFixed(2),
    operatorToneScore:Number(item.operatorToneScore).toFixed(2) ,
    conflictResolutionScore:Number(item.conflictResolutionScore).toFixed(2) ,
    professionalismScore:Number(item.professionalismScore).toFixed(2) 
  }));
}, [weeklyData]);
  // 2. חילוץ נתונים לכרטיסים (מתוך האיבר האחרון או שדות ייעודיים)
  const latestStats = React.useMemo(() => {
  if (!rawData) return null;
  // אם השרת מחזיר אובייקט בודד, נשתמש בו. אם מערך, ניקח את האחרון.
  return Array.isArray(rawData) ? rawData[rawData.length - 1] : rawData;
}, [rawData]);
  console.log("rodata",latestStats)
//   console.log("imporvementtips",tipsData)
  console.log("weekaverage",weeklyData)

  if (isLoading||isWeekLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (isError || isErrorLoading) return (
  <Box sx={{ p: 3 }}>
    <Alert severity="error">שגיאה בטעינת הנתונים</Alert>
  </Box>
);

  const tipTranslations = {
    0:"היית נהדר כל הכבוד!",
    1: "דבר ברור יותר",
    2: "היה סבלני עם הלקוח",
    3: "ודא שסגרת את הפנייה כראוי",
    4: "ודא שסגרת את הפנייה כראוי",
    5: "בהירות והסבר",

    // הוסיפי כאן את כל ערכי ה-Enum שלך
};
  return (
    <div className="dashboard-page" dir="rtl">
      <div className="container-center">
        
        {/* Header */}
        <div className="header-flex">
          <div>
            <h1 className="title-main">האזור האישי שלי</h1>
            <p className="subtitle">שלום {companyName}, הנה סיכום הביצועים שלך.</p>
          </div>
          <div className="date-badge">
             <Calendar size={20} color="blue"/>
             <span className="font-medium">{new Date().toLocaleDateString('he-IL')}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard 
            title="ציון גובה טון" 
            value={Number(latestStats?.operatorToneScore || "0").toFixed(2)} 
            trend={latestStats?.operatorToneScore > 80 ? "עומד ביעד" : "טעון שיפור"} 
            icon={<Award size={28} />} 
            color="indigo" 
          />
          <StatCard 
            title="זמן טיפול (AHT)" 
            value={Number(latestStats?.conflictResolutionScore || "--:--").toFixed(2)} 
            trend="ממוצע יומי" 
            icon={<Clock size={28} />} 
            color="emerald" 
          />
          <StatCard 
            title="סנטימנט לקוחות" 
            value={`${Number(latestStats?.professionalismScore || 0).toFixed(2)}%`} 
            trend="על סמך שיחות אחרונות" 
            icon={<Smile size={28} />} 
            color="amber" 
          />
          <StatCard 
            title="ממוצע כללי" 
            value={`${Number(latestStats?.overallScore || 0).toFixed(2)}%`}
            trend="על סמך שיחות אחרונות" 
            icon={<Smile size={28} />} 
            color="amber" 
          />
        </div>

        {/* Layout המרכזי */}
        <div className="main-layout">
          
          {/* Chart Card */}
          <div className="chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E293B', margin: 0 }}>מגמת שיפור שבועית</h3>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6366f1', backgroundColor: '#EEF2FF', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>נתוני אמת</span>
            </div>
            <div style={{ height: '18rem', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                {/* <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} dy={10} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart> */}
                <AreaChart data={performanceData}>
    <defs>
      {/* הגדרות gradients לכל פרמטר */}
      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorTone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorConflict" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
      </linearGradient>
    </defs>
    
    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} dy={10} />
    <YAxis hide domain={[0, 100]} />
    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
    
    {/* גרף ציון כללי - סגול */}
    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" name="ציון כללי" />
    
    {/* גרף טון נציג - ירוק */}
    <Area type="monotone" dataKey="operatorToneScore" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTone)" name="טון נציג" />
    
    {/* גרף פתרון קונפליקטים - כתום */}
    <Area type="monotone" dataKey="conflictResolutionScore" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorConflict)" name="פתרון קונפליקטים" />
    
    {/* גרף מקצועיות - כחול */}
    <Area type="monotone" dataKey="professionalismScore" stroke="#3b82f6" strokeWidth={2} fillOpacity={0} name="מקצועיות" />
    
  </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="insights-card">
              <h3 style={{ fontWeight: 'bold', color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={18} color="#6366f1" />
                טיפים לשיפור היום
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  {tipsData && tipsData.length > 0 ? (
    tipsData.map((tip, index) => {
      const tipValue = typeof tip === 'object' ? tip.improvementTips : tip;      
      return (
        <li key={index} style={{ fontSize: '0.875rem', color: '#475569', backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '0.5rem', borderRight: '4px solid #6366f1' }}>
          {tipTranslations[tipValue] || `טיפ מספר ${tipValue}`}
        </li>
      );
    })
  ) : (
    <li style={{ fontSize: '0.875rem', color: '#94A3B8' }}>אין טיפים חדשים כרגע, המשך בעבודה הטובה!</li>
  )}
</ul>
            </div> */}
            
            <div className="target-card">
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', margin: 0 }}>היעד השבועי שלך</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>100%</span>
                <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>{Number(latestStats?.overallScore || 0).toFixed(2)}% כעת</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${latestStats?.overallScore || 0}%` }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    // </div>
  );
};

const StatCard = ({ title, value, trend, icon, color }) => {
  const colorMap = {
    indigo: { text: '#4f46e5', bg: '#eef2ff' },
    emerald: { text: '#059669', bg: '#ecfdf5' },
    amber: { text: '#d97706', bg: '#fffbeb' }
  };

  return (
    <div className="stat-card">
      <div>
        <p style={{ color: '#64748B', fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem', margin: 0 }}>{title}</p>
        <h4 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>{value}</h4>
        <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#94A3B8', marginTop: '0.5rem', margin: 0 }}>{trend}</p>
      </div>
      <div style={{ 
        padding: '1rem', borderRadius: '1rem', 
        color: colorMap[color].text, backgroundColor: colorMap[color].bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
  );
};

export default ManagerDashboard;