import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from "react";

interface ICounterProps {
    initialValue?: number;
}

interface ICounterState {
    value: number;
}

class Counter extends React.Component<ICounterProps, ICounterState>{
    state: Readonly<ICounterState> = {
       value: this.props.initialValue || 0
    }
    
    handleIncrement() {
        this.setState({...this.state, value: this.state.value + 1})
    }

    handleDecrement() {
        this.setState({...this.state, value: this.state.value - 1})
    }

    render() {
        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: "center",
                    margin: 'auto',
                    maxWidth: 'fit-content',
                    marginBottom: '20px'
                }}
            >
                <IconButton aria-label='Decrement' onClick={this.handleDecrement.bind(this)} sx={{ width: 40, height: 40 }}>
                    <RemoveIcon />
                </IconButton>
                    <p>{this.state.value}</p>
                <IconButton aria-label="Increment" onClick={this.handleIncrement.bind(this)} sx={{ width: 40, height: 40 }}>
                    <AddIcon />
                </IconButton>
            </Box>
        )
    }
}

export default Counter;