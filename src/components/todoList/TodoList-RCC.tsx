import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Alert, AlertTitle, Button, Checkbox, IconButton, Input, List, ListItem, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import React from "react";

type ITodoListProps = Record<string, never>;

interface ITodoState {
    id: string;
    title: string;
    done: boolean;
}

interface ITodoListState {
    todos: ITodoState[];
    todoItem: string;
}

const idGenerator = () => {
    let id = 0;
    return () => {
        id += 1;
        return id;
    }
}

const generateId = idGenerator();

class TodoList extends React.Component<ITodoListProps, ITodoListState> {

    state: Readonly<ITodoListState> = {
        todos: [],
        todoItem: ""
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.state, todoItem: event.target.value })
    }

    handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>, todoId: string) {
        const newTodos = this.state.todos.map(todo => {
            if (todo.id === todoId) {
                return {...todo, done: event.target.checked}
            }
            return todo;
        })
        this.setState({ ...this.state, todos: newTodos })
    }

    handleTodoDelete(todoId: string) {
        const newTodos = this.state.todos.filter(todo => todo.id !== todoId)
        this.setState({ ...this.state, todos: newTodos })
    }

    handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.state.todoItem.length === 0) return;
        const newTodoItem: ITodoState = {title: this.state.todoItem, id: generateId().toString(), done: false};
        this.setState({
            ...this.state,
            todoItem: '',
            todos: [...this.state.todos, newTodoItem]
        })
    }


    render(): React.ReactNode {
        return (
            <Box>
                <Typography variant="h6" mx="auto" textAlign={'center'} mb="20px" >Todo List</Typography> 

                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <Box mb='12px' maxWidth={'max-content'} mx="auto" display={'flex'} gap={'4px'} alignItems={'center'}>
                        <Input placeholder="Enter your todo" value={this.state.todoItem} onChange={this.handleInputChange.bind(this)} />
                        <Button variant="contained" type="submit">Add</Button>
                    </Box>
                </form>
                <Box>
                    {this.state.todos.length === 0 && (
                        <Alert variant="standard" severity="info">
                            <AlertTitle>Please add todo to continue</AlertTitle>
                        </Alert>
                    )}
                    <List>
                        {this.state.todos.length > 0 && this.state.todos.map(todo => (
                            <ListItem key={todo.id} divider sx={{padding: 0}}>
                                <Box display="flex" justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                                    <Box display="flex" alignItems={'center'} gap='4px'>
                                        <Checkbox checked={todo.done} onChange={e => this.handleCheckBoxChange.call(this, e, todo.id)}  />
                                        <Typography component={'label'} variant="subtitle2" fontSize={'18px'} sx={{textDecoration: todo.done ? 'line-through' : 'none'}}>{todo.title}</Typography>
                                    </Box>
                                    <Box>
                                        <IconButton aria-label="Edit" color="primary">
                                            <EditNoteIcon />
                                        </IconButton>
                                        <IconButton aria-label="Delete" color="error" onClick={this.handleTodoDelete.bind(this, todo.id)} >
                                            <DeleteIcon  />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        )
    }
}

export default TodoList;