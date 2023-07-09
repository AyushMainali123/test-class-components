import { Alert, AlertTitle, Button, Input, List, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import React from "react";
import { ITodoState } from './Todolist.types';
import SingleTodo from './single-todo/SingleTodo-RCC';

type ITodoListProps = Record<string, never>;


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


    handleTodoEdit(todoId: string, newValue: string) {
        const newTodos = this.state.todos.map(todo => {
            if (todo.id === todoId) {
               return {...todo, title: newValue}
            }
            return todo;
        })

        this.setState({...this.state, todos: newTodos})
    }

    render(): React.ReactNode {
        return (
            <Box>
                <Typography variant="h6" mx="auto" textAlign={'center'} mb="20px" >Todo List</Typography> 

                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <Box mb='12px' maxWidth={'max-content'} mx="auto" display={'flex'} gap={'4px'} alignItems={'center'}>
                        <Input placeholder="Enter your todo" value={this.state.todoItem} onChange={this.handleInputChange.bind(this)} size="small"  />
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
                        {
                            this.state.todos.length > 0 && this.state.todos.map(todo => (
                                <SingleTodo
                                    key={todo.id}
                                    {...todo}
                                    handleCheckBoxChange={this.handleCheckBoxChange.bind(this)}
                                    handleTodoDelete={this.handleTodoDelete.bind(this)}
                                    handleTodoEdit={this.handleTodoEdit.bind(this)}
                                />
                            ))
                        }
                    </List>
                </Box>
            </Box>
        )
    }
}

export default TodoList;