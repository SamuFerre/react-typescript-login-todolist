import React, {useContext} from 'react';

import TodoItem from './TodoItem';
import { TodosContext } from '../../store/todos-context';

const Todos = () => {

  const todosCtx = useContext(TodosContext);

  const todoClass = () => {
    if(todosCtx.items.length === 0) {
      return false;
    } else {
      return true;
    }
  }


  return (
    <div>
      <ul className={todoClass() ? 'todos p-2' : 'todos'}>
        {todosCtx.items.map((item) => (
          <TodoItem
            key={item.id}
            text={item.text}
            onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
          />
        ))}
      </ul>
    </div>
      
  );
};

export default Todos;