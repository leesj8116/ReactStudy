import React, { Dispatch, SetStateAction } from 'react';
import { BiChevronDown } from "react-icons/bi";
import uuid from 'react-uuid';
import { ICON_SIZE } from '../../CONST_VALUE';
import type { TODO } from "./TodoBox"

// 상위 컴포넌트에 있는 state를 함께 활용
type InputFieldProps = {
    todoList: TODO[],
    setTodoList: Dispatch<SetStateAction<TODO[]>>
};

let cnt = 1;

const InputField = ({todoList, setTodoList}: InputFieldProps) => {

    /**
     * Enter 이벤트 : 입력한 내용을 todoList에 반영한다
     * @param e 
     */
    const onEnterPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.replace(/^[\s]+$/gm, '').length !== 0) {

            setTodoList([...todoList, {
                id: uuid(),
                checked: false,
                context: e.currentTarget.value
            }])

            e.currentTarget.value = '';
        }
    }

    const allCheckedEvent = (e: React.MouseEvent<SVGAElement>) => {
        
        const allchecked = e.currentTarget.classList.contains('check-icon-on');

        setTodoList(todoList.map(e => {return {...e, checked: !allchecked}}))
    }

    return (
        <div className='input-field box-size'>
            <div className='all-check'>
                {(todoList.length !== 0) && 
                <BiChevronDown size={ICON_SIZE}
                    // 모두 체크되어있을 경우에만 색깔이 진해지도록 함..
                    className={todoList.filter(e => !e.checked).length === 0 ? 'check-icon-on' : 'check-icon-off'}
                    onClick={allCheckedEvent}
                />}
            </div>
            <input
                name='context'
                placeholder='What needs to be done?'
                onKeyDown={onEnterPressEvent}
                />
        </div>
    );
}

export default InputField;