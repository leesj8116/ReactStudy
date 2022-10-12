import React, { useState } from 'react';
import InputField from './InputField';
import OptionLine from './OptionLine';
import TodoItem from './TodoItem';

export interface TODO {
    id: string;         // 내부 번호
    checked: boolean;   // 완료 여부
    context: string;    // 내용
}

const TodoBox = () => {
    const [todoList, setTodoList] = useState<TODO[]>([]);

    return (
        <div className='TodoBox'>
            <InputField todoList={todoList} setTodoList={setTodoList}/>
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