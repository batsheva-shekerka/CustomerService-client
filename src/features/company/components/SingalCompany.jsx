import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, 
  CircularProgress, Divider, Avatar 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BusinessIcon from '@mui/icons-material/Business';
import ShortTextIcon from '@mui/icons-material/ShortText'; 
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; 
import FolderOpenIcon from '@mui/icons-material/FolderOpen'; 
import { useGetByIdCompanyQuery, useUpdateCompanyMutation } from '../redux/api';
import { useSelector } from 'react-redux';

const SingalCompany = () => {
  const companyId = useSelector((state) => state.auth?.operator?.companyId);

  const { data: company, isLoading, isError } = useGetByIdCompanyQuery(companyId, { skip: !companyId });
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    introPhrase: '',
    audioFolderRoute: ''
  });

  useEffect(() => {
    if (company) {
      setFormData({
        companyName: company.companyName || company.CompanyName || '',
        introPhrase: company.introPhrase || company.IntroPhrase || '',
        audioFolderRoute: company.audioFolderRoute || company.AudioFolderRoute || ''
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // תיקון קריטי: שליחת הנתונים במבנה התואם ל-Mutation ({ id, data })
      await updateCompany({ 
        id: companyId, 
        data: formData 
      }).unwrap();
      
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update company: ", err);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (isError || !company) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">שגיאה בטעינת פרטי החברה או שלא נמצאו נתונים.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 650, margin: '0 auto' }} dir="rtl">
      {/* כותרת עמוד מרכזית */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2, boxShadow: 2 }}>
          <BusinessIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: '700', color: '#0f172a' }}>
          פרופיל החברה שלך
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          ניהול ועדכון פרטי השלוחה והגדרות המערכת הכלליות
        </Typography>
      </Box>

      {/* כרטיס המידע הראשי - פריסה אנכית מסודרת */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
          
          {/* שדה 1: שם החברה */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <ShortTextIcon sx={{ color: 'primary.main', fontSize: '20px' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#475569' }}>
                שם החברה / שלוחה
              </Typography>
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                variant="outlined"
              />
            ) : (
              <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <Typography variant="body1" sx={{ fontWeight: '500', color: '#0f172a' }}>
                  {formData.companyName || "לא הוגדר שם"}
                </Typography>
              </Box>
            )}
          </Box>

          {/* שדה 2: משפט פתיחה */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <ChatBubbleOutlineIcon sx={{ color: 'primary.main', fontSize: '20px' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#475569' }}>
                משפט פתיחה לנציגות
              </Typography>
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                name="introPhrase"
                value={formData.introPhrase}
                onChange={handleChange}
                variant="outlined"
              />
            ) : (
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', minHeight: '60px' }}>
                <Typography variant="body1" sx={{ color: '#334155', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {formData.introPhrase || "לא הוגדר משפט פתיחה"}
                </Typography>
              </Box>
            )}
          </Box>

          {/* שדה 3: ניתוב תיקיית מידע */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <FolderOpenIcon sx={{ color: 'primary.main', fontSize: '20px' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#475569' }}>
                ניתוב תיקיית מידע
              </Typography>
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                name="audioFolderRoute"
                value={formData.audioFolderRoute}
                onChange={handleChange}
                variant="outlined"
              />
            ) : (
              <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#0f172a', letterSpacing: '0.5px' }}>
                  {formData.audioFolderRoute || "לא הוגדר נתיב"}
                </Typography>
              </Box>
            )}
          </Box>

          {/* כפתורי פעולה דינמיים */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {!isEditing ? (
              <Button 
                variant="contained" 
                startIcon={<EditIcon sx={{ ml: 1, mr: 0 }} />} 
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: '8px', px: 4, py: 1, fontWeight: 'bold' }}
              >
                ערוך פרטים
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<CancelIcon sx={{ ml: 1, mr: 0 }} />}
                  disabled={isUpdating}
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      companyName: company.companyName || company.CompanyName || '',
                      introPhrase: company.introPhrase || company.IntroPhrase || '',
                      audioFolderRoute: company.audioFolderRoute || company.AudioFolderRoute || ''
                    });
                  }}
                  sx={{ borderRadius: '8px', fontWeight: 'bold' }}
                >
                  ביטול
                </Button>
                <Button 
                  variant="contained" 
                  color="success" 
                  startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <SaveIcon sx={{ ml: 1, mr: 0 }} />}
                  onClick={handleSave}
                  disabled={isUpdating}
                  sx={{ borderRadius: '8px', px: 4, fontWeight: 'bold' }}
                >
                  {isUpdating ? 'שומר...' : 'שמור שינויים'}
                </Button>
              </Box>
            )}
          </Box>

        </Box>
      </Paper>
    </Box>
  );
};

export default SingalCompany;