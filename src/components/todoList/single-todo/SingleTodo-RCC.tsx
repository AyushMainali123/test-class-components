import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Checkbox, IconButton, Input, ListItem, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import React from "react";
import { ITodoState } from "../Todolist.types";
type ISingleTodoProps = ITodoState & {
    handleCheckBoxChange: (event: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
    handleTodoDelete: (todoId: string) => void;
    handleTodoEdit: (todoId: string, newValue: string) => void;
};

type ISingleTodoState = {
    isEditable: boolean;
    todoValue: string;
}

class SingleTodo extends React.Component<ISingleTodoProps, ISingleTodoState> {

    state: Readonly<ISingleTodoState> = {
        isEditable: false,
        todoValue: ''
    }

    constructor(props: ISingleTodoProps) {
        super(props);
    }
 

    handleEditButtonClick() {
        this.setState({ ...this.state, isEditable: true, todoValue: this.props.title });
    }

    handleTodoSave() {
        this.props.handleTodoEdit(this.props.id, this.state.todoValue);
        this.setState({ ...this.state, isEditable: false, todoValue: '' });
    }

    handleCancelButtonClick() {
        this.setState({...this.state, isEditable: false});
    }

    handleTodoValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({...this.state, todoValue: event.target.value});
    }

    render(): React.ReactNode {
        return (
            <>
                <ListItem  divider sx={{padding: 0}}>
                    <Box display="flex" justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                      
                        <Box display="flex" alignItems={'center'} gap='4px'>
                            <Checkbox checked={this.props.done} onChange={e => this.props.handleCheckBoxChange.call(this, e, this.props.id)}  />
                              {
                                this.state.isEditable && (
                                    <Input type="text" value={this.state.todoValue} onChange={this.handleTodoValueChange.bind(this)} sx={{maxWidth: '140px'}} />
                                )
                            }
                            {
                                this.state.isEditable === false && (
                                    <Typography component={'label'} variant="subtitle2" fontSize={'18px'} sx={{ textDecoration: this.props.done ? 'line-through' : 'none' }}>{this.props.title}</Typography>
                                )
                            } 
                        </Box>
                        <Box>
                            {
                                this.state.isEditable === false && (
                                    <>
                                        <IconButton aria-label="Edit" color="primary" onClick={this.handleEditButtonClick.bind(this)}>
                                            <EditNoteIcon />
                                        </IconButton>
                                        <IconButton aria-label="Delete" color="error" onClick={this.props.handleTodoDelete.bind(this, this.props.id)} >
                                            <DeleteIcon  />
                                        </IconButton>
                                    </>
                                )
                            }

                            {
                                this.state.isEditable === true && (
                                    <>
                                        <IconButton aria-label="Save" color="success" onClick={this.handleTodoSave.bind(this)}>
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton aria-label="Cancel" color="error" onClick={this.handleCancelButtonClick.bind(this)} >
                                            <CloseIcon  />
                                        </IconButton>
                                    </>
                                )
                            }
                        
                        </Box>
                    </Box>
                </ListItem>
            </>
        )
    }
}

export default SingleTodo;