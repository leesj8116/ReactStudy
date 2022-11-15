import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiCheckCircle, BiCircle, BiX } from 'react-icons/bi';
import { ICON_SIZE } from '../../CONST_VALUE';
import { TODO } from './TodoBox';


// @TODO: TODO와 todoList, setTodoList를 이렇게 풀어헤치지 않고 전달하는 방법은?
type TodoItemProps = {
    todo: TODO,
    toggleTodoChecked: (id: string) => void,
    deleteTodo: (id: string) => void,
    editTodo: (id: string, context: string) => void,
}

const TodoItem = ({todo, toggleTodoChecked, deleteTodo, editTodo}: TodoItemProps) => {
    // context의 내용을 편집 태그로 변경하도록 해주는 flag
    const [editFlag, setEditFlag] = useState<boolean>(false);

    // X 표시를 띄우기 위해 호버 상태를 확인하는 flag
    const [hoverFlag, setHoverFlag] = useState<boolean>(false);

    const [newContext, setNewContext] = useState<string>(todo.context);

    /**
     * todo checkbox 선택 이벤트 : todo의 checked를 토글한다.
     * @param e 
     */
    const todoChecked = (e:React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        toggleTodoChecked(todo.id);
    }

    /**
     * 'X' 버튼 이벤트 : 선택한 목록의 todo를 삭제한다
     * @param e 
     */
    const deleteItem = (e:React.MouseEvent<SVGAElement>) => {
        e.stopPropagation();
        deleteTodo(todo.id);
    }

    /**
     * Enter 이벤트 : 입력한 todo의 context를 수정한다
     * @param e 
     */
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.replace(/^[\s]+$/gm, '').length !== 0) {
            // addTodo(e.currentTarget.value);
            editTodo(todo.id, newContext);
            e.currentTarget.value = '';     // 목록에 추가를 완료한 값은 초기화
            setNewContext('');
            setEditFlag(false);
        }
    }

    return (
        <li className='box-size item' onMouseOver={() => setHoverFlag(true)} onMouseLeave={() => setHoverFlag(false)}>
            <span className='side-icon' onClick={todoChecked}>
                {todo.checked ? <BiCheckCircle size={ICON_SIZE} color='#008000'/> : <BiCircle size={ICON_SIZE}/>}
            </span>
            {editFlag ? (<>
                <input className='content-text' onKeyDown={onEnterPress} onDoubleClick={() => {setEditFlag(!editFlag); setNewContext(''); }} onChange={(e) => setNewContext(e.currentTarget.value)} value={newContext}></input>
            </>) : (<> 
                <span className={'content-text  ' + (todo.checked ? 'todo-checked' : '')} onDoubleClick={() => {setEditFlag(!editFlag); setNewContext(todo.context);}}>{todo.context}</span>
                <span>{hoverFlag && <BiX size={ICON_SIZE} color='#cc9a9a' onClick={deleteItem} />}</span>
            </>)}
        </li>
    );
}

export default TodoItem;