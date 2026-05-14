import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetAllOperatorsQuery } from '../../Operator/redux/api';
import { useGetDailyImprovementQuery } from '../redux/api';

const CompanyRow = ({ company, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const id = company.companyId || company.CompanyId;
  
  // 1. שליפת רשימת הטלפניות לספירה כללית
  const { data: allOperators = [] } = useGetAllOperatorsQuery();
  const companyOperators = allOperators.filter(op => (op.companyId || op.CompanyId) === id);

  // 2. שליפת האובייקט הבודד מהשרת (רק כשהשורה נפתחת)
  const { data: dailyScores, isLoading } = useGetDailyImprovementQuery(id, {
    skip: !open, 
  });

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, '&:hover': { bgcolor: '#fcfdfe' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
          {company.companyName || company.CompanyName}
        </TableCell>
        <TableCell align="right">{company.introPhrase || company.IntroPhrase}</TableCell>
        <TableCell align="center">
          <IconButton color="primary" onClick={() => onEdit(company)}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: '#ff4d4d' }} onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, padding: 3, bgcolor: '#f8f9fa', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                סיכום ביצועי חברה - {company.companyName || company.CompanyName}
              </Typography>
              
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : dailyScores ? ( // בדיקה שמונעת את השגיאה מ-image_84f517.png
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  
                  {/* כמות טלפניות */}
                  <Grid item xs={12} sm={4} md={2.4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px solid #d1d9e6', borderRadius: '10px' }}>
                      <Typography variant="subtitle2" color="textSecondary">טלפניות</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{companyOperators.length}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4} md={2.4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px solid #d1d9e6', borderRadius: '10px', bgcolor: '#eceff1' }}>
                      <Typography variant="subtitle2" color="textSecondary">סה"כ שיחות</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#455a64' }}>
                        {dailyScores.totalCalls || 0}
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* ציון כולל - OverallScore */}
                  <Grid item xs={12} sm={4} md={2.4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px solid #d1d9e6', borderRadius: '10px', bgcolor: '#e8f5e9' }}>
                      <Typography variant="subtitle2" color="textSecondary">ציון כולל</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                        {dailyScores.overallScore?.toFixed(1) || 0}%
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* פתרון קונפליקטים - ConflictResolutionScore */}
                  <Grid item xs={12} sm={4} md={2.4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px solid #d1d9e6', borderRadius: '10px', bgcolor: '#fff3e0' }}>
                      <Typography variant="subtitle2" color="textSecondary">קונפליקטים</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ef6c00' }}>
                        {dailyScores.conflictResolutionScore?.toFixed(1) || 0}%
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* מקצועיות - ProfessionalismScore */}
                  <Grid item xs={12} sm={4} md={2.4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px solid #d1d9e6', borderRadius: '10px', bgcolor: '#e3f2fd' }}>
                      <Typography variant="subtitle2" color="textSecondary">מקצועיות</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                        {dailyScores.professionalismScore?.toFixed(1) || 0}%
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* טונציה - OperatorToneScore */}
                  <Grid item xs={12} sm={4} md={2.4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px solid #d1d9e6', borderRadius: '10px', bgcolor: '#f3e5f5' }}>
                      <Typography variant="subtitle2" color="textSecondary">טונציה</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                        {dailyScores.operatorToneScore?.toFixed(1) || 0}%
                      </Typography>
                    </Paper>
                  </Grid>

                </Grid>
              ) : (
                <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                  לא נמצאו נתוני שיחות להיום עבור חברה זו.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CompanyRow;