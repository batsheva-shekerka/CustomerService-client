import OperatorMenu from "./OperatorMenu";
import AdminMenu from "./AdminMenu";
import SystemManagerMenu from "./SystemManagerMenu";
import { jwtDecode } from "jwt-decode";


const  Navbar = () => {
    const userRole = localStorage.getItem('token'); // או מתוך Context/Redu
    console.log("storage",userRole)
    const decoded = jwtDecode(userRole);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;   
//   const userRole = localStorage.getItem('role'); // או מתוך Context/Redu
  console.log("userrole",role)
  return (
    <nav>
      {role === 'Operator' ? <OperatorMenu /> :role === 'Admin' ? <AdminMenu />:<SystemManagerMenu />}
    </nav>
  );
};export default Navbar;