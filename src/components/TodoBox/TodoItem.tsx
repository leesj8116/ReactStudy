import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiCheckCircle, BiCircle, BiX } from 'react-icons/bi';
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

    // context의 내용을 편집 태그로 변경하도록 해주는 flag
    const [editFlag, setEditFlag] = useState<boolean>(false);

    // X 표시를 띄우기 위해 호버 상태를 확인하는 flag
    const [hoverFlag, setHoverFlag] = useState<boolean>(false);


    /**
     * 좌측의 동그라미를 클릭시 checked를 on/off 해주는 함수
     * @param e 
     */
    const todoCheckedEvent = (e:React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        
        setTodoList(todoList.map(todo => {
            if (todo.id === id) {
                todo.checked = !todo.checked;
            }
            return todo;
        }));
    }

    // 클릭했을 때 선택한 todo를 삭제하는 이벤트
    const deleteItemEvent = (e:React.MouseEvent<SVGAElement>) => {
        e.stopPropagation();
        setTodoList(todoList.filter(todo => todo.id !== id));
    }

    return (
        <li className='box-size item' onMouseOver={() => setHoverFlag(true)} onMouseLeave={() => setHoverFlag(false)}>
            <span className='side-icon' onClick={todoCheckedEvent}>
                {checked ? <BiCheckCircle size={'5vh'} color='#008000'/> : <BiCircle size={'5vh'}/>}
            </span>
            <span className={'content-text  ' + (checked ? 'todo-checked' : '')}>
                {context}
            </span>
            <span>
                {hoverFlag && <BiX size={'5vh'} color='#cc9a9a' onClick={deleteItemEvent} />}
            </span> 
        </li>
    );
}

export default TodoItem;