import React, { useState } from 'react';
import { Button, CircularProgress, Alert,Box } from '@mui/material';
import AddOperator from './AddOperator';
// ייבוא ה-Hooks החדשים
import { useGetAllOperatorsQuery, useDeleteOperatorMutation } from '../redux/api';

const OperatorsList = () => {
  // 1. שליפת נתונים אוטומטית מהשרת
  // ה-Hook הזה מחליף את ה-useEffect ואת ה-useSelector של ה-list
  const { data: list = [], isLoading, isError, error } = useGetAllOperatorsQuery();

  // 2. פונקציית מחיקה
  const [deleteOperator] = useDeleteOperatorMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handleEditClick = (operator) => {
    setSelectedOperator(operator);
    setIsDialogOpen(true); 
  };

  const handleAddNewClick = () => {
    setSelectedOperator(null); 
    setIsDialogOpen(true);
  };

 const handleDelete = async (operator) => {
  // חילוץ בטוח של ה-ID
  const id = operator.operatorId || operator.OperatorId;
  
  if (window.confirm("האם הינך בטוח?")) {
    try {
      await deleteOperator(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
};

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // הצגת מצבי טעינה ושגיאה בצורה יפה של MUI
  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (isError) return <Alert severity="error">שגיאה בטעינת נתונים: {error?.message || 'שגיאה לא ידועה'}</Alert>;

  return (
    <div style={{ padding: '20px' }} dir="rtl">
      <Button variant="contained" onClick={handleAddNewClick} sx={{ mb: 2 }}>
        הוספת טלפנית חדשה
      </Button>
      
      <h2>רשימת טלפניות</h2>
      
      <table border="1" style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>טלפון</th>
            <th>שם</th>
            <th>אימייל</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {list.map((op, index) => {
            const id = op.operatorId || op.OperatorId;
            const firstName = op.firstName || op.FirstName || "";
            const lastName = op.lastName || op.LastName || "";
            const phone = op.phone || op.Phone || "";
            const mail = op.mail || op.Mail || "";

            return (
              <tr key={id || index}>
                <td>{phone}</td>
                <td>{firstName} {lastName}</td>
                <td>{mail}</td>
                <td>
                  <Button color="primary" onClick={() => handleEditClick(op)}>ערוך</Button>
                  <Button 
                    onClick={() => handleDelete(op)}
                    sx={{ color: 'white', bgcolor: '#ff4d4d', '&:hover': { bgcolor: '#cc0000' }, ml: 1 }}
                  >
                    מחק
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AddOperator 
        open={isDialogOpen} 
        handleClose={handleCloseDialog} 
        operatorToEdit={selectedOperator}
      />

      {list.length === 0 && <p style={{ marginTop: '20px' }}>אין טלפניות להצגה.</p>}
    </div>
  );
};

export default OperatorsList;