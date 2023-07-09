import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useEffect, useRef, useState } from 'react';
const InputWithFocus = () => {

    const inputRef = useRef<HTMLInputElement>()

    const [focused, setFocused] = useState(false);

    useEffect(() => {
        if(focused) {
            inputRef.current?.focus({
                preventScroll: true
            });
        }
    }, [focused])

    const handleFocusButtonClick = () =>  {
        setFocused(true)
    }

    const handleFocus = () => {
        setFocused(true);
    }

    const handleBlur = () => {
          setFocused(false);
    }

   return (
        <Box>
            <Input inputRef={inputRef} onBlur={handleBlur} onFocus={handleFocus} />
            <Button variant='contained' onClick={handleFocusButtonClick}>Focus</Button>
        </Box>
    )
}

export default InputWithFocus;