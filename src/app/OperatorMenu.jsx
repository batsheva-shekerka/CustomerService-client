import { Link, useLocation } from "react-router-dom";
import { LogIn, LogOut, Phone, Award, BarChart2 } from 'lucide-react';

const OperatorMenu = () => {
  const location = useLocation();

  // פונקציית עזר לבדיקה אם הקישור פעיל כרגע כדי לצבוע אותו
  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: isActive(path) ? '#6366F1' : '#94A3B8', 
    backgroundColor: isActive(path) ? '#334155' : 'transparent',
    textDecoration: 'none',
    borderRadius: '8px',
    margin: '4px 12px',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 0' }}>
      {/* לוגו או כותרת התפריט */}
      <div style={{ padding: '0 24px 24px 24px', borderBottom: '1px solid #334155', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>CallCenter AI</h2>
        <span style={{ fontSize: '0.75rem', color: '#6366F1', fontWeight: 'bold' }}>אזור נציג</span>
      </div>

      {/* קישורי הניווט */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link to="/calls" style={linkStyle("/calls")}>
          <Phone size={18} />
          <span>השיחות שלי</span>
        </Link>
        
        <Link to="/calls-scored" style={linkStyle("/calls-scored")}>
          <Award size={18} />
          <span>שיחות כולל ציון</span>
        </Link>
        
        <Link to="/monthlygraf" style={linkStyle("/monthlygraf")}>
          <BarChart2 size={18} />
          <span>מרכז הביצועים</span>
        </Link>

        <div style={{ margin: '16px 12px', borderTop: '1px solid #334155', paddingTop: '16px' }}></div>

        <Link to="/login" style={linkStyle("/login")}>
          <LogIn size={18} />
          <span>התחברות</span>
        </Link>

        {/* כפתור התנתקות מודגש בתחתית */}
        <Link to="/login" onClick={() => localStorage.removeItem('token')} style={{
          ...linkStyle("/logout"),
          marginTop: 'auto',
          color: '#EF4444' // צבע אדום להתנתקות
        }}>
          <LogOut size={18} />
          <span>התנתקות מהמערכת</span>
        </Link>
      </nav>
    </div>
  );
};

export default OperatorMenu;