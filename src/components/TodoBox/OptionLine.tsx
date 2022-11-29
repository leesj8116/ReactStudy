import React from "react";
import { CATEGORY_OPTION, CATEGORY_TYPE } from "../../CONST_VALUE";

type optionLineProps = {
    todoCnt: number,
    category: CATEGORY_OPTION,
    changeCategory: (category: CATEGORY_TYPE) => void,
    clearCompletedTodo: (() => void) | undefined,
};

const OptionLine = ({todoCnt, category, changeCategory, clearCompletedTodo}: optionLineProps) => {

    // 하단의 옵션 클릭시 category 값을 변경하는 이벤트
    const optionClickEvent = (event: React.MouseEvent<HTMLLIElement>) => {
        const text = event.currentTarget.textContent;

        // @TODO: enum과 string 타입을 유연하게 전환하면서 활용하고 싶은데, 쉽지 않음..
        Object.entries(CATEGORY_OPTION).filter(([key,]) => key === text?.toUpperCase()).forEach(([key, categoryOption]) => {
            changeCategory(categoryOption);
        });
    }

    // 아이템 갯수에 따른 안내 메세지
    const cntText = `${todoCnt} ${todoCnt === 1 ? 'item' : 'items'} left`;

    // 카테고리 항목을 표현하기 위한 li 태그 
    const LIST_OPTION_LI = Object.entries(CATEGORY_OPTION).map(([key, categoryOption]) => {
        return (
            <li className={categoryOption === category ? 'selected' : ''}
                onClick={optionClickEvent}>
                {categoryOption}
            </li>
        );
    });

    const clearCompletedBtnClickEvent = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (typeof clearCompletedTodo !== 'undefined') {
            clearCompletedTodo();
        }
    }

    return (
        <div className='box-size option-line'>
            <span>{cntText}</span>
            <ul className="option">
                {LIST_OPTION_LI}
            </ul>
            <span onClick={clearCompletedBtnClickEvent} style={{cursor: 'pointer', display: clearCompletedTodo === undefined ? 'none' : 'block'}}>clear completed</span>
        </div>
    );
}

export default OptionLine;