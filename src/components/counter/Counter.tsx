import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

interface ICounterProps {
    initialValue?: number;
}

const Counter = ({initialValue}: ICounterProps) => {
    const [value, setValue] = useState(initialValue || 0)
       const  handleIncrement = () => {
       setValue(prev => prev + 1)
    }

    const handleDecrement = () => {
        setValue(prev => prev - 1)
    }

    return (
              <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: "center",
                    margin: 'auto',
                    maxWidth: 'fit-content'
                }}
            >
                <IconButton aria-label='Decrement' onClick={handleDecrement} sx={{ width: 40, height: 40 }}>
                    <RemoveIcon />
                </IconButton>
                    <p>{value}</p>
                <IconButton aria-label="Increment" onClick={handleIncrement} sx={{ width: 40, height: 40 }}>
                    <AddIcon />
                </IconButton>
            </Box>  
    )
}

export default Counter;