import './index.less';
/**
 * Создает медленную прокрутку элемента влево или вправо. Если передан параметр infinite, то элемент будет прокручиваться бесконечно.
 * В противном случае прокрутка будет остановлена при достижении края элемента.
 * (На самом деле не бесконечно, а контент прокрутки размножится в несколько раз, что создает ощущение бесконечной плавной прокрутки)
 *
 * @param  element - Элемент, который нужно прокрутить.
 * @param direction - Направление прокрутки ('right' или 'left').
 * @param  [infinite=false] - Флаг, указывающий, нужно ли прокручивать бесконечно.
 * @param controls - Элементы управления прокруткой.
 */
export declare const slowInfiniteScroll: (element: HTMLDivElement, { direction, infinite, controls, }: {
    direction: 'right' | 'left';
    infinite: boolean;
    controls: boolean;
}) => {
    start: () => void;
    stop: () => void;
    changeDirection: (newDirection: "right" | "left") => void;
};
