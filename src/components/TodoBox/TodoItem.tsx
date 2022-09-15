import React, { Dispatch, SetStateAction } from 'react';
import { TODO } from './TodoBox';


// @TODO: TODO와 todoList, setTodoList를 이렇게 풀어헤치지 않고 전달하는 방법은?
type TodoItemProps = {
    id: number,
    checked: boolean,
    context: string,
    todoList: TODO[],
    setTodoList: Dispatch<SetStateAction<TODO[]>>
}


const TodoItem = ({id, checked, context, todoList, setTodoList}: TodoItemProps) => {

    /**
     * TodoItem을 클릭시 checked를 on/off 해주는 함수
     * @param e 
     */
    const onClickEvent = (e:React.MouseEvent<HTMLDivElement>) => {
        setTodoList(todoList.map(todo => {
            if (todo.id === id) {
                todo.checked = !todo.checked;
            }
            return todo;
        }));
    }

    return (
        <div className='box-size' onClick={onClickEvent}>
            {id} {checked ? 'true' : 'false'} {context}
        </div>
    );
}

export default TodoItem;