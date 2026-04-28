import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' // הוספת הייבוא הזה

function ManagerArea() {
  return (
      <div style={{ maxWidth: '800px', margin: '0 auto', direction: 'rtl' }}>
        <h1>מערכת ניהול שירות לקוחות</h1>
        
        {/* תפריט ניווט פשוט כדי שתוכלי לעבור בין העמודים */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/login" style={{ marginLeft: '10px' }}>התחברות</Link>
          <Link to="/login" style={{ marginLeft: '10px' }}>התנתקות</Link>
          <Link to="/operators" style={{ marginLeft: '10px' }}>מפעילים</Link>
          <Link to="/companies" style={{ marginLeft: '10px' }}>חברות</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>שיחות</Link>
        </nav>

        <hr />

       
      </div>
  )
}

export default ManagerArea