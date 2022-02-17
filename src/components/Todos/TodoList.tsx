
import NewTodo from './NewTodo';
import Todos from './Todos';
import TodosContextProvider from '../../store/todos-context';

function TodoList() {

  return (
    <TodosContextProvider>
        <NewTodo/>
        <Todos />   
    </TodosContextProvider>
  
  );
}

export default TodoList;