import React from 'react';
import { BiChevronDown } from "react-icons/bi";
import { ICON_SIZE } from '../../CONST_VALUE';

// todoList에 대한 관리는 상위 컴포넌트에서 진행
type InputFieldProps = {
    addTodo: (inputContext: string) => void,
    isEmpty: boolean,
    isAllChecked: boolean,
    allCheckedChange: (flag: boolean) => void,
};

const InputField = ({addTodo, isEmpty, isAllChecked, allCheckedChange}: InputFieldProps) => {

    /**
     * Enter 이벤트 : 입력한 내용을 todoList에 반영한다
     * @param e 
     */
    const onEnterPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.replace(/^[\s]+$/gm, '').length !== 0) {

            addTodo(e.currentTarget.value);
            e.currentTarget.value = '';     // 목록에 추가를 완료한 값은 초기화
        }
    }

    /**
     * check-icon 이벤트 : 모든 todo의 checked 상태를 변경한다
     * @param e 
     */
    const allCheckedEvent = (e: React.MouseEvent<SVGAElement>) => {        
        const allchecked = e.currentTarget.classList.contains('check-icon-off');
        allCheckedChange(allchecked);
    }

    return (
        <div className='input-field box-size'>
            <div className='all-check'>
                {!isEmpty && 
                <BiChevronDown size={ICON_SIZE}
                    className={ isAllChecked ? 'check-icon-on' : 'check-icon-off'}
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