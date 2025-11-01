import './index.less';
type TListItem = {
    question: string;
    answer: string;
};
export type TList = TListItem[];
export declare const initList: (element: HTMLDivElement, list: TList, openedIndex?: number | null) => void;
export {};
