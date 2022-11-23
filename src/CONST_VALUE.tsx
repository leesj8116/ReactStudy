
// 화면에서 사용하는 아이콘 사이즈 (가로 세로 정비율)
export const ICON_SIZE = '50px' as const;

// todo 추가시 하단에 나오는 목록 분류 옵션
export enum CATEGORY_OPTION {
    ALL = 'All', 
    ACTIVE = 'Active',
    COMPLETED = 'Completed'
};

export type CATEGORY_TYPE = CATEGORY_OPTION.ALL | CATEGORY_OPTION.ACTIVE | CATEGORY_OPTION.COMPLETED;