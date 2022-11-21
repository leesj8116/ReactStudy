import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LIST_OPTION } from "../../CONST_VALUE";
import { TODO } from "./TodoBox";

type optionLineProps = {
    todoList: TODO[],
    // setTodoList: Dispatch<SetStateAction<TODO[]>>
};

const OptionLine = ({todoList}: optionLineProps) => {
    const [category, setCategory] = useState<string>(LIST_OPTION[0]);   // 카테고리
    const [categoryItem, setCategoryItem] = useState<TODO[]>([]);       // 카테고리에 의해 분류된 아이템

    // 하단의 옵션 클릭시 category 값을 변경하는 이벤트
    const optionClickEvent = (event: React.MouseEvent<HTMLLIElement>) => {
        const text = event.currentTarget.textContent;

        // @TODO : LIST_OPTION을 통해서 값을 지정할 수는 없을까..
        // category값을 string으로 지정해서 문제일까 고민 중
        setCategory(text ?? LIST_OPTION[0]);
    }

    // 아이템 갯수에 따른 안내 메세지
    const cntText = `${todoList.length} ${todoList.length === 1 ? 'item' : 'items'} left`;

    // 카테고리 항목을 표현하기 위한 li 태그 
    const LIST_OPTION_LI = LIST_OPTION.map(e => {
        return (
            <li className={e === category ? 'selected' : ''}
                onClick={optionClickEvent}>
                {e}
            </li>
        );
    })

    return (
        <div className='box-size option-line'>
            <span>{cntText}</span>
            <ul className="option">
                {LIST_OPTION_LI}
            </ul>
            <span>clear completed</span>
        </div>
    );
}

export default OptionLine;