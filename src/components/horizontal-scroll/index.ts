import './index.less';

const SCROLL_SPEED = 1;

const SCROLL_DELAY = 20;

const SCROLL_PADDING = 10;

const REPEAT_COUNT = 10;

const CACHE_DURATION = 2000;

const classes = {
    component: 'horizontal-scroll',
    control: 'horizontal-scroll__control',
    scrollable: 'horizontal-scroll__scrollable',
    controlLeft: 'horizontal-scroll__control_left',
    controlRight: 'horizontal-scroll__control_right',
};

/**
 * Кэш результатов проверки видимости элементов.
 */
const cache = new Map();

/**
 * Проверяет, виден ли элемент на экране. Использует кэширование для ускорения работы.
 * @param element
 */
const isVisible = (element: Element) => {

    const cached = cache.get(element);
    const now = Date.now();
    if (cached && now - cached.timestamp < CACHE_DURATION) {
        return cached.result;
    }

    const rect = element.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const result = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    cache.set(element, { timestamp: now, result });

    return result;
};

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
export const slowInfiniteScroll = (
    element: HTMLDivElement,
    {
        direction,
        infinite = false,
        controls = false,

    }: {
        direction: 'right' | 'left';
        infinite: boolean;
        controls?: boolean;
    }) => {
    const state = {
        direction,
        isActive: false,
    };

    if (!(element instanceof HTMLDivElement)) {
        return;
    }

    if (infinite) {
        element.innerHTML = element.innerHTML.repeat(REPEAT_COUNT);
    }

    const component = document.createElement('div');
    component.classList.add(classes.component);
    element.parentElement.appendChild(component);
    component.appendChild(element);

    if (controls) {
        const prevButton = document.createElement('div');
        prevButton.classList.add(classes.control, classes.controlLeft);

        const nextButton = document.createElement('div');
        nextButton.classList.add(classes.control, classes.controlRight);

        element.appendChild(prevButton);
        element.appendChild(nextButton);
        prevButton.addEventListener('mouseenter', () => {
            state.direction = 'right';
            start();
        });
        prevButton.addEventListener('mouseleave', () => {
            stop();
        });
        nextButton.addEventListener('mouseenter', () => {
            state.direction = 'left';
            start();
        });
        nextButton.addEventListener('mouseleave', () => {
            stop();
        });

        component.appendChild(nextButton);
        component.appendChild(prevButton);
    }


    // Устанавливаем максимальную позицию прокрутки
    const maxScroll = element.scrollWidth - element.clientWidth;

    // Двигаем на середину ленты.
    element.scrollLeft = maxScroll/2;

    const render = (scrollPosition: number, scrollDirection: typeof direction) => {
        // Для оптимизации отрисовки не крутим, пока элемент не виден.
        if (!isVisible(element)) {
            return;
        }

        if (scrollDirection === 'left') {
            if (scrollPosition >= maxScroll - SCROLL_PADDING) {
                element.scrollLeft = 0;
            }
            element.scrollLeft += SCROLL_SPEED;
        }

        if (scrollDirection === 'right') {
            if (scrollPosition <= SCROLL_PADDING) {
                element.scrollLeft = maxScroll;
            }
            element.scrollLeft -= SCROLL_SPEED;
        }

    };

    /**
     * Сдвигает элемент на SCROLL_SPEED.
     */
    const scroll = () => {
        // Получаем текущую позицию прокрутки
        const scrollPosition = element.scrollLeft;

        // Проверяем направление и выполняем соответствующие действия
        if (state.direction === 'left') {
            // Прокручиваем влево
            requestAnimationFrame(() => render(scrollPosition, 'left'));
            if (!state.isActive) {
                return;
            }
            setTimeout(() => scroll(), SCROLL_DELAY);
        }
        if (state.direction === 'right') {
            // Прокручиваем вправо
            requestAnimationFrame(() => render(scrollPosition, 'right'));
            if (!state.isActive) {
                return;
            }
            setTimeout(() => scroll(), SCROLL_DELAY);
        }
    };

    const start = () => {
        state.isActive = true;
        scroll();
    };

    const stop = () => {
        state.isActive = false;
    };

    const changeDirection = (newDirection: typeof direction) => {
        state.direction = newDirection;
    };

    return {
        start,
        stop,
        changeDirection,
    };
};
