import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // התפריט שלך

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* חלק עליון - תפריט */}
      <header>
        <Navbar />
      </header>

      {/* חלק תחתון - תוכן משתנה */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;