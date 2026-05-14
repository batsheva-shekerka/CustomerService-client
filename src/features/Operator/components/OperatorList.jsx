import React, { useState, useMemo } from 'react';
import { 
  Button, CircularProgress, Alert, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import AddOperator from './AddOperator';
import OperatorRow from './OperatorRow';
import { 
  useGetAllOperatorsQuery, 
  useDeleteOperatorMutation, 
  // useGetAllCompaniesQuery // ייבוא רשימת החברות עבור הפילטר
} from '../redux/api';
import { useGetAllCompaniesQuery } from '../../company/redux/api';

const OperatorsList = () => {
  // שליפת נתונים
  const { data: list = [], isLoading, isError, error } = useGetAllOperatorsQuery();
  const { data: companies = [] } = useGetAllCompaniesQuery();
  const [deleteOperator] = useDeleteOperatorMutation();

  // State עבור הפילטר
  const [selectedCompanyId, setSelectedCompanyId] = useState('all');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  // לוגיקת סינון: נבצע את הסינון רק כשהרשימה או הפילטר משתנים
  const filteredList = useMemo(() => {
    if (selectedCompanyId === 'all') return list;
    return list.filter(op => (op.companyId || op.CompanyId) === selectedCompanyId);
  }, [list, selectedCompanyId]);

  const handleEditClick = (operator) => {
    setSelectedOperator(operator);
    setIsDialogOpen(true); 
  };

  const handleAddNewClick = () => {
    setSelectedOperator(null); 
    setIsDialogOpen(true);
  };

  const handleDelete = async (operator) => {
    const id = operator.operatorId || operator.OperatorId;
    if (window.confirm("האם הינך בטוח?")) {
      try {
        await deleteOperator(id).unwrap();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (isError) return <Alert severity="error">שגיאה בטעינת נתונים: {error?.message || 'שגיאה לא ידועה'}</Alert>;

  return (
    <Box sx={{ padding: '20px' }} dir="rtl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>רשימת טלפניות</Typography>
        <Button variant="contained" onClick={handleAddNewClick}>
          הוספת טלפנית חדשה
        </Button>
      </Box>

      {/* אזור הפילטרים */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="company-filter-label">סנן לפי חברה</InputLabel>
          <Select
            labelId="company-filter-label"
            value={selectedCompanyId}
            label="סנן לפי חברה"
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <MenuItem value="all">כל הטלפניות</MenuItem>
            {companies.map((company) => (
              <MenuItem key={company.companyId || company.CompanyId} value={company.companyId || company.CompanyId}>
                {company.companyName || company.CompanyName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell />
              <TableCell align="right">טלפון</TableCell>
              <TableCell align="right">שם</TableCell>
              <TableCell align="right">אימייל</TableCell>
              <TableCell align="right">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList.map((op, index) => (
              <OperatorRow 
                key={op.operatorId || op.OperatorId || index} 
                op={op} 
                onEdit={handleEditClick} 
                onDelete={handleDelete} 
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddOperator 
        open={isDialogOpen} 
        handleClose={() => setIsDialogOpen(false)} 
        operatorToEdit={selectedOperator}
      />

      {filteredList.length === 0 && (
        <Typography sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
          לא נמצאו טלפניות העונות לסינון שנבחר.
        </Typography>
      )}
    </Box>
  );
};

export default OperatorsList;