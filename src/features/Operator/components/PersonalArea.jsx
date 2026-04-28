import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' // הוספת הייבוא הזה
import CallsList from '../../Calls/components/CallList'
import { useSelector } from 'react-redux'; 

function PersonalArea() {
    // שליפת המפעיל מתוך ה-Redux
const userState = useSelector((state) => state.auth);
  console.log("Current user state:", userState);
  // חילוץ ה-ID מתוך אובייקט המפעיל
  const currentOperatorId = userState.operator?.operatorId;
  return (
    // עטיפת כל האפליקציה ב-Router
   
      <div style={{ maxWidth: '800px', margin: '0 auto', direction: 'rtl' }}>
        <h2>מחובר למערכת</h2>
        
        {/* תפריט ניווט פשוט כדי שתוכלי לעבור בין העמודים */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/login" style={{ marginLeft: '10px' }}>התחברות</Link>
          <Link to="/login" style={{ marginLeft: '10px' }}>התנתקות</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>שיחות</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>שיחות כולל ציון</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>גרף חודשי</Link>
        </nav>

        <hr />
        
        <CallsList readOnly={true} operatorId={currentOperatorId} />
       
      </div>
  )
}

export default PersonalArea