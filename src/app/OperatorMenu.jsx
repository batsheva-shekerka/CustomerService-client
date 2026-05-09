import { Link } from "react-router-dom";


const OperatorMenu = () => {
    return (
    <nav style={{ marginBottom: '20px' }}>
          <Link to="/login" style={{ marginLeft: '10px' }}>התחברות</Link>
          <Link to="/login" style={{ marginLeft: '10px' }}>התנתקות</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>שיחות</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>שיחות כולל ציון</Link>
          <Link to="/monthlygraf" style={{ marginLeft: '10px' }}>גרף חודשי</Link>
        </nav>
        // <hr />
    );
};export default OperatorMenu;