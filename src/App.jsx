import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// ייבוא הקומפוננטות שלך
import OperatorsList from './features/Operator/components/OperatorList'
import AddOperator from './features/Operator/components/AddOperator'
import CompaniesList from './features/company/components/CompanyList'
import Login from './features/Login/components/Login'
import CallsList from './features/Calls/components/CallList'
import PersonalArea from './features/Operator/components/PersonalArea'
import ManagerArea from './features/Operator/components/ManagerArea'
import SystemManagerArea from './features/Operator/components/SystemManagerArea'

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '800px', margin: '0 auto', direction: 'rtl' }}>
        <h1>מערכת ניהול שירות לקוחות</h1>
        
        <nav style={{ marginBottom: '20px' }}>
          {/* <Link to="/login" style={{ marginLeft: '10px' }}>התחברות</Link> */}
        </nav>

        <hr />

        <Routes>
          {/* עכשיו כל הנתיבים פתוחים - בלי ProtectedRoute שגורם לקריסה */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/operators" element={<OperatorsList />} />
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/personalarea" element={<PersonalArea />} />
          <Route path="/managerarea" element={<ManagerArea />} />
          <Route path="/systemmanagerarea" element={<SystemManagerArea />} />
          <Route path="/add-operator" element={<AddOperator />} />
          <Route path="/calls" element={<CallsList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App