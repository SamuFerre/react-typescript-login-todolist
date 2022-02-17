
import React, {useRef, useContext} from "react";
import { TodosContext } from "../../store/todos-context";
import icon from '../../img/add_task_black.svg';



const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext)
    const todoTextInputRef = useRef<HTMLInputElement>(null);
    
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const enteredText = todoTextInputRef.current!.value;
        if (enteredText.trim().length === 0) {

            return;
        }

        todosCtx.addTodo(enteredText);
    };

    return (<form onSubmit={submitHandler} className="todos-form">
        <label className="todos-form__label" htmlFor="text">Add New Todo</label>
        <input className="todos-form__input" type='text' id="text" ref={todoTextInputRef} required />
        <button className="todos-form__button"><img src={icon} alt="icon"/></button>
    </form>);
};

export default NewTodo;