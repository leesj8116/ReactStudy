import React, { useState } from 'react';
import InputField from './InputField';
import OptionLine from './OptionLine';
import TodoItem from './TodoItem';
import uuid from 'react-uuid';

export interface TODO {
    id: string;         // 내부 번호
    checked: boolean;   // 완료 여부
    context: string;    // 내용
}

const TodoBox = () => {
    const [todoList, setTodoList] = useState<TODO[]>([]);

    const isEmpty = todoList.length === 0;    // todo 항목이 비었는지 확인
    const isAllChecked = todoList.every(todo => todo.checked); // todo 가 모두 완료되었는지 확인

    /**
     * todoList에 todo를 추가한다.
     * @param inputContext 사용자가 입력한 해야할 일
     */
    const addTodo = (inputConetext: string) => {
        setTodoList([...todoList, {
            id: uuid(),
            checked: false,
            context: inputConetext
        }])
    }

    /**
     * todoList의 checked 값을 입력받은 flag로 모두 변경한다.
     * @param flag 
     */
    const allCheckedChange = (flag: boolean) => {
        setTodoList(todoList.map(todo => {return {...todo, checked: flag}}));
    }

    return (
        <div className='TodoBox'>
            <InputField addTodo={addTodo} allCheckedChange={allCheckedChange} isEmpty={isEmpty} isAllChecked={isAllChecked} />
            <ul>
                {todoList.map(e => {
                    return (
                        // @TODO: 어떻게 TODO와 todoList, setTodoList를 하나의 props로 전달할 수 있을까
                        <TodoItem
                            key={e.id}
                            id={e.id} checked={e.checked} context={e.context}
                            todoList={todoList} setTodoList={setTodoList}
                        />
                    );
                })}
            </ul>
            {todoList.length !== 0 && <OptionLine todoList={todoList} setTodoList={setTodoList} />}
        </div>
    );
}

export default TodoBox;