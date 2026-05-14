import React, { useState } from 'react';
import { 
  Button, CircularProgress, Alert, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography,IconButton,Collapse // הוסיפי את Typography כאן
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AgentDashboard from '../../Score/components/AgentDashboard';

const OperatorRow = ({ op, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  if (!op) return null;

  const id = op.operatorId || op.OperatorId;
  const firstName = op.firstName || op.FirstName || "";
  const lastName = op.lastName || op.LastName || "";
  const phone = op.phone || op.Phone || "";
  const mail = op.mail || op.Mail || "";

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{phone}</TableCell>
        <TableCell align="right">{firstName} {lastName}</TableCell>
        <TableCell align="right">{mail}</TableCell>
        <TableCell align="right">
          <Button variant="outlined" color="primary" onClick={() => onEdit(op)} sx={{ ml: 1 }}>
            ערוך
          </Button>
          <Button 
            variant="contained" 
            onClick={() => onDelete(op)} 
            sx={{ bgcolor: '#ff4d4d', '&:hover': { bgcolor: '#cc0000' } }}
          >
            מחק
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, padding: 3, bgcolor: '#f4f7f9', borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                נתוני ביצועים: {firstName} {lastName}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px', border: '1px dashed #ccc', mt: 2 }}>
                <Typography color="textSecondary">
                   <AgentDashboard operatorId={id} 
      name={`${firstName} ${lastName}`}></AgentDashboard> 
                  </Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

// השורה הקריטית שמונעת את השגיאה ב-image_921cf5.jpg
export default OperatorRow;