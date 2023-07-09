import Box from '@mui/material/Box'
import Counter from './components/counter'
import InputWithFocus from './components/input-with-focus'
import TodoList from './components/todoList/TodoList-RCC'
function App() {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
            alignItems: "center",
            margin: 'auto',
            maxWidth: 'fit-content'
        }}
      >

        <Box>
          <Counter  />
          <InputWithFocus />
          <TodoList />
        </Box>
      </Box>
    </>
  )
}

export default App
