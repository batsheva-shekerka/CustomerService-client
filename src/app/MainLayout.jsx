import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', direction: 'rtl' }}>
      {/* תפריט צדדי קבוע מימין */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: '#1E293B', // צבע כהה יוקרתי
        color: '#F8FAFC',
        borderLeft: '1px solid #334155',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
        zIndex: 10
      }}>
        <Navbar />
      </aside>

      {/* אזור התוכן המשתנה משמאל */}
      <main style={{ 
        flex: 1, 
        overflowY: 'auto', 
        backgroundColor: '#F8FAFC', // רקע בהיר ונקי לתוכן
        padding: '2rem' 
      }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;