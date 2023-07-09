import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import React, { createRef } from "react";

type IInputWithFocusProps = Record<string, never>;

interface IInputWithFocusState {
    focused: boolean,
}


class InputWithFocus extends React.Component<IInputWithFocusProps, IInputWithFocusState> {

    inputRef = createRef<HTMLInputElement>();

    state: Readonly<IInputWithFocusState> = {
        focused:  false
    }

    handleFocusButtonClick() {
        this.setState({ ...this.state, focused: true });
    }

    handleFocus() {
        this.setState({ focused: true });
    }

    handleBlur() {
        this.setState({focused: false})
    }

    componentDidUpdate(_prevProps: Readonly<IInputWithFocusProps>, prevState: Readonly<IInputWithFocusState>): void {
        if (prevState.focused === false && this.state.focused === true) {
            this.inputRef.current?.focus({
                preventScroll: true
            });
        }
    }

    componentWillUnmount(): void {
        this.inputRef.current?.blur();
    }

    render(): React.ReactNode {
        return (
            <Box>
                <Input inputRef={this.inputRef} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)} />
                <Button variant='contained' onClick={this.handleFocusButtonClick.bind(this)}>Focus</Button>
            </Box>
        )
    }
}

export default InputWithFocus;