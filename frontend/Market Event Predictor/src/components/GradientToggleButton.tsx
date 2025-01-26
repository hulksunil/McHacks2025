import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const GradientToggleButton = ({ position, onPositionChange }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Box sx={{ position: 'relative', ...position }}>
      <Button
        variant="contained"
        onClick={handleToggle}
        sx={{
          background: isToggled
            ? 'linear-gradient(45deg, rgb(3, 20, 114) 30%, rgb(9, 35, 230) 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          border: 'none',
          borderRadius: '20px', // Rounded corners
          padding: '10px 20px', // Symmetrical padding
          margin: '10px 0', // Symmetrical margin
          width: '125px', // Fixed width
          position: 'absolute',
          top: position.top,
          left: position.left,
          transform: 'translate(-50%, -50%)', // Center the button
        }}
      >
        {isToggled ? 'Toggled' : 'Toggle'}
      </Button>
    </Box>
  );
};

export default GradientToggleButton;