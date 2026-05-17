import { Link, useLocation } from "react-router-dom";
import { LogIn, LogOut, Users, Building2, ShieldAlert } from 'lucide-react';

const SystemManagerMenu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: isActive(path) ? '#38BDF8' : '#94A3B8', // גוון תכלת למנהל להבדלה ויזואלית
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
      {/* כותרת מנהל */}
      <div style={{ padding: '0 24px 24px 24px', borderBottom: '1px solid #334155', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>CallCenter AI</h2>
        <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 'bold' }}>פאנל ניהול מערכת</span>
      </div>

      {/* קישורים למנהל */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link to="/ManagerDashboard" style={linkStyle("/ManagerDashboard")}>
          <ShieldAlert size={18} />
          <span>אזור מנהל ראשי</span>
        </Link>

        <Link to="/operators" style={linkStyle("/operators")}>
          <Users size={18} />
          <span>ניהול מפעילים</span>
        </Link>
        
        <Link to="/companies" style={linkStyle("/companies")}>
          <Building2 size={18} />
          <span>ניהול חברות</span>
        </Link>

        <div style={{ margin: '16px 12px', borderTop: '1px solid #334155', paddingTop: '16px' }}></div>

        <Link to="/login" style={linkStyle("/login")}>
          <LogIn size={18} />
          <span>התחברות</span>
        </Link>

        <Link to="/login" onClick={() => localStorage.removeItem('token')} style={{
          ...linkStyle("/logout"),
          marginTop: 'auto',
          color: '#EF4444'
        }}>
          <LogOut size={18} />
          <span>התנתקות</span>
        </Link>
      </nav>
    </div>
  );
};

export default SystemManagerMenu;