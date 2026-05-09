import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
    <nav style={{ marginBottom: '20px' }}>
          <Link to="/login" style={{ marginLeft: '10px' }}>התחברות</Link>
          <Link to="/login" style={{ marginLeft: '10px' }}>התנתקות</Link>
          <Link to="/operators" style={{ marginLeft: '10px' }}>מפעילים</Link>
          <Link to="/companies" style={{ marginLeft: '10px' }}>חברות</Link>
          <Link to="/calls" style={{ marginLeft: '10px' }}>שיחות</Link>

        </nav>
        // <hr />
    );
};export default AdminMenu;