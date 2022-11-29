import React, { useState } from 'react';
import InputField from './InputField';
import OptionLine from './OptionLine';
import TodoItem from './TodoItem';
import uuid from 'react-uuid';
import { CATEGORY_OPTION, CATEGORY_TYPE } from '../../CONST_VALUE';

export interface TODO {
    id: string;         // 내부 번호
    checked: boolean;   // 완료 여부
    context: string;    // 내용
}

const TodoBox = () => {
    const [todoList, setTodoList] = useState<TODO[]>([]);
    const [category, setCategory] = useState<CATEGORY_TYPE>(CATEGORY_OPTION.ALL);   // 카테고리

    const isEmpty = todoList.length === 0;    // todo 항목이 비었는지 확인
    const isAllChecked = todoList.every(todo => todo.checked); // todo 가 모두 완료되었는지 확인

    /**
     * todoList에 todo를 추가한다.
     * @param inputContext 사용자가 입력한 해야할 일
     */
    const addTodo = (inputContext: string) => {
        setTodoList([...todoList, {
            id: uuid(),
            checked: false,
            context: inputContext
        }])
    }

    /**
     * todoList의 checked 값을 입력받은 flag로 모두 변경한다.
     * @param flag 
     */
    const allCheckedChange = (flag: boolean) => {
        setTodoList(todoList.map(todo => {return {...todo, checked: flag}}));
    }

    /**
     * id값에 일치하는 todo의 checked를 토글한다.
     * @param id 
     */
    const toggleTodoChecked = (id: string) => {
        setTodoList(todoList.map(todo => {
            return todo.id === id ? {...todo, checked: !(todo.checked)} : todo
        }));
    }

    /**
     * id값에 일치하는 todo를 todoList에서 삭제한다.
     * @param id 
     */
    const deleteTodo = (id: string) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    }

    /**
     * id값에 일치하는 todo의 context를 수정한다.
     * @param id 
     * @param context 
     */
    const editTodo = (id: string, context: string) => {
        setTodoList(todoList.map(todo => {
            return todo.id === id ? {...todo, context: context} : todo
        }));
    }

    /**
     * 입력받은 category 값으로 현재 선택한 카테고리 값을 변경한다.
     * @param category CATEGORY_OPTION 중의 하나
     */
    const changeCategory = (category: CATEGORY_TYPE) => {
        setCategory(category);
    }

    /**
     * category 선택에 따라 todo를 분류하여 반환한다.
     * @returns 
     */
    const optionLineFilter = () => {
        return todoList.filter(todo => {
            switch(category) {
                case CATEGORY_OPTION.ACTIVE:
                    return !todo.checked;
                case CATEGORY_OPTION.COMPLETED:
                    return todo.checked;
                case CATEGORY_OPTION.ALL:
                default:
                    return true;
            }
        });
    }
    
    /**
     * 완료한 todo를 삭제한다
     */
    const clearCompletedTodo = (todoList.filter(e => e.checked).length === 0) ? undefined : () => {
        setTodoList(todoList.filter(e => !e.checked));
    }

    return (
        <div className='TodoBox'>
            <InputField addTodo={addTodo} allCheckedChange={allCheckedChange} isEmpty={isEmpty} isAllChecked={isAllChecked} />
            <ul>
                {optionLineFilter().map(e => {
                    return (
                        <TodoItem
                            key={e.id}
                            todo={e}
                            toggleTodoChecked={toggleTodoChecked}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                        />
                    );
                })}
            </ul>
            {todoList.length !== 0 && <OptionLine todoCnt={optionLineFilter().length} category={category} changeCategory={changeCategory} clearCompletedTodo={clearCompletedTodo} />}
        </div>
    );
}

export default TodoBox;