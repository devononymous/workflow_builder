import React from 'react';
import { Button, Typography, Box, useTheme } from '@mui/material';
import errorImage from '../assets/404_page_cover.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: theme.spacing(2),
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
                textAlign: 'center',
                boxSizing: 'border-box',
                overflow: 'hidden' 
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '500px' }}
            >
                <Box
                    component="img"
                    src={errorImage}
                    alt="Error illustration"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '500px',
               
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                        objectFit: 'contain' 
                    }}
                />
            </motion.div>

            <Box sx={{ 
                width: '100%',
                maxWidth: '600px',
  
                boxSizing: 'border-box'
            }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        color: theme.palette.error.main,
                        fontWeight: 700,
                        mb: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
                    }}
                >
                    Oops! Page Not Found
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        fontSize: { xs: '0.875rem', sm: '1rem' }, 
                        lineHeight: 1.5
                    }}
                >
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </Typography>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                width: '100%',
                maxWidth: '400px',
                mb: 2
            }}>
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', maxWidth: '200px' }}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        onClick={() => navigate('/')}
                        sx={{
                            textTransform: "capitalize",
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Go Back
                    </Button>
                </motion.div>
            </Box>

            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.disabled,
                    mt: 'auto', 
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    pb: 2
                }}
            >
                Error code: 404 | Not Found
            </Typography>
        </Box>
    );
};

export default ErrorPage;