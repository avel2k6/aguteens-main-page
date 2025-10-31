import './index.less';

const SCROLL_SPEED = 1;

const SCROLL_DELAY = 20;

const classes = {
    component: 'horizontal-scroll',
    control: 'horizontal-scroll__control',
    scrollable: 'horizontal-scroll__scrollable',
    controlLeft: 'horizontal-scroll__control_left',
    controlRight: 'horizontal-scroll__control_right',
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
        controls: boolean;
    }) => {
    const state = {
        direction,
        isActive: false,
    };

    if (!(element instanceof HTMLDivElement)) {
        return;
    }

    if (infinite) {
        element.innerHTML = element.innerHTML.repeat(50);
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

    /**
     * Сдвигает элемент на SCROLL_SPEED.
     */
    const scroll = () => {
        // Получаем текущую позицию прокрутки
        const scrollPosition = element.scrollLeft;

        // Устанавливаем максимальную позицию прокрутки
        const maxScroll = element.scrollWidth - element.clientWidth;

        // Проверяем направление и выполняем соответствующие действия
        if (state.direction === 'left') {
            // Прокручиваем влево
            if (scrollPosition >= maxScroll) {
                return;
            }
            element.scrollLeft += SCROLL_SPEED;
            if (!state.isActive) {
                return;
            }
            setTimeout(() => scroll(), SCROLL_DELAY);
        }
        if (state.direction === 'right') {
            // Прокручиваем вправо
            if (scrollPosition <= 0) {
                return;
            }
            element.scrollLeft -= SCROLL_SPEED;
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
