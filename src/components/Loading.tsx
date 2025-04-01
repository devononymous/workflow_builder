import { CircularProgress, Box } from '@mui/material';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading = ({ fullScreen = false }: LoadingProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      ...(fullScreen && { 
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'background.paper',
        zIndex: 9999 
      }),
      ...(!fullScreen && {
        py: 4
      })
    }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;