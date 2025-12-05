import './index.less';

/**
 * Скорость автоматического скролла в пикселях за один шаг.
 */
const DEFAULT_AUTO_SCROLL_SPEED = 2;

/**
 * Скорость скролла мышкой в пикселях за один шаг.
 */
const DEFAULT_MOUSE_SCROLL_SPEED = 6;

/**
 * Коэффициент ускорения/замедления
 */
const ACCELERATION = 0.05;

/**
 * Задержка между шагами скролла в миллисекундах.
 */
const SCROLL_DELAY = 30;

/**
 * Задержка между шагами скролла в миллисекундах, если карусель неактивна.
 */
const SCROLL_IDLE_DELAY = 500;

/**
 * Задержка между началом автоскролла на тач девайсах.
 */
const TOUTCH_AUTOSCROLL_DELAY = 10000;

/**
 * Отступ от края контейнера до элемента при скролле в пикселях.
 */
const SCROLL_PADDING = 10;

/**
 * Количество повторов контента внутри блока прокрутки. Нужно для создания эффекта непрерывности.
 */
const REPEAT_COUNT = 10;

/**
 * Время жизни кэша в миллисекундах.
 */
const CACHE_DURATION = 2000;

const classes = {
    component: 'horizontal-scroll',
    cards: 'horizontal-scroll__cards',
    scrollable: 'horizontal-scroll__cards_scrollable',
    control: 'horizontal-scroll__control',
    controlHidden: 'horizontal-scroll__control_hidden',
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
 * Определяет, что перед нами тач устройство.
 */
const isTouchDevice = () => ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);

/**
 * Создает медленную прокрутку элемента влево или вправо. Если передан параметр infinite, то элемент будет прокручиваться бесконечно.
 * В противном случае прокрутка будет остановлена при достижении края элемента.
 * (На самом деле не бесконечно, а контент прокрутки размножится в несколько раз, что создает ощущение бесконечной плавной прокрутки)
 *
 * @param  scrollableElement - Элемент, который нужно прокрутить.
 * @param direction - Направление прокрутки ('right' или 'left').
 * @param  [infinite=false] - Флаг, указывающий, нужно ли прокручивать бесконечно.
 * @param controls - Элементы управления прокруткой.
 * @param autoScroll - Признак, что запущена автоматическая прокрутка.
 * @param autoScrollSpeed - Скорость автоматического прокручивания.
 * @param mouseScrollSpeed - Скорость прокручивания мышкой при наведении.
 * @param showControlsOnHover - Показывать ли элементы управления при наведении мышки.
 */
export const initInfiniteScroll = (
    scrollableElement: HTMLDivElement,
    {
        direction,
        infinite = false,
        showControls = false,
        autoScroll = false,
        autoScrollSpeed = DEFAULT_AUTO_SCROLL_SPEED,
        mouseScrollSpeed = DEFAULT_MOUSE_SCROLL_SPEED,
        showControlsOnHover = false,
    }: {
        // Направление прокрутки.
        direction: 'right' | 'left';

        // Бесконечный скролл.
        infinite: boolean;

        // Показывать кнопки управления или нет.
        showControls?: boolean;

        // Признак, что запущена автоматическая прокрутка
        autoScroll?: boolean;

        // Скорость автопрокручивания.
        autoScrollSpeed?: number;

        // Скорость при наведении мыши.
        mouseScrollSpeed?: number;

        // Признак, что надо показывать кнопки при наведении.
        showControlsOnHover?: boolean;
    }) => {

    /**
     * Состояние компонента.
     */
    const state = {
        // Направление прокрутки.
        direction,

        // Целевая скорость, с какой надо крутить.
        targetSpeed: autoScroll
            ? autoScrollSpeed
            : 0,

        // Текущая скорость прокрутки. Будет стремиться к целевой.
        currentSpeed: 0,

        // Признак, что компонент активен и занимается расчетами скролла.
        isActive: autoScroll,

        // Признак мобильно устройства.
        isTouch: isTouchDevice(),
    };

    if (!(scrollableElement instanceof HTMLDivElement)) {
        return;
    }

    if (infinite) {
        scrollableElement.innerHTML = scrollableElement.innerHTML.repeat(REPEAT_COUNT);
    }


    const component = document.createElement('div');
    component.classList.add(classes.component);
    scrollableElement.parentElement.appendChild(component);
    component.appendChild(scrollableElement);
    scrollableElement.classList.add(classes.cards);

    if (state.isTouch) {
        scrollableElement.classList.add(classes.scrollable);
    }


    const prevButton = document.createElement('div');
    prevButton.classList.add(classes.control, classes.controlLeft);

    const nextButton = document.createElement('div');
    nextButton.classList.add(classes.control, classes.controlRight);

    if (!showControls || state.isTouch) {
        prevButton.classList.add(classes.controlHidden);
        nextButton.classList.add(classes.controlHidden);
    }

    prevButton.addEventListener('mouseenter', () => {
        state.direction = 'left';
        state.targetSpeed = mouseScrollSpeed;
        state.isActive = true;
        scroll();
    });
    prevButton.addEventListener('mouseleave', () => {
        state.targetSpeed = autoScroll ? autoScrollSpeed : 0;
        state.isActive = false;
        state.direction = direction;
        if (!autoScroll) {
            state.currentSpeed = 0;
        }
    });
    nextButton.addEventListener('mouseenter', () => {
        state.direction = 'right';
        state.targetSpeed = mouseScrollSpeed;
        state.isActive = true;
        scroll();
    });
    nextButton.addEventListener('mouseleave', () => {
        state.targetSpeed = autoScroll ? autoScrollSpeed : 0;
        state.isActive = false;
        state.direction = direction;
        if (!autoScroll) {
            state.currentSpeed = 0;
        }
    });

    component.appendChild(nextButton);
    component.appendChild(prevButton);


    // Устанавливаем максимальную позицию прокрутки
    const maxScroll = scrollableElement.scrollWidth - scrollableElement.clientWidth;

    // Двигаем на середину ленты.
    scrollableElement.scrollLeft = maxScroll/2;

    /**
     * Обработчик, который показывает кнопки управления.
     */
    const handleShowControls = () => {
        Array.from(component.getElementsByClassName(classes.control)).forEach((controlElement) => {
            controlElement.classList.remove(classes.controlHidden);
        });
        state.targetSpeed = 0;
    };

    /**
     * Обработчик, который прячет кнопки управления.
     */
    const handleHideControls = () => {
        Array.from(component.getElementsByClassName(classes.control)).forEach((controlElement) => {
            controlElement.classList.add(classes.controlHidden);
        });

        state.direction = direction;
        state.isActive = true;
        state.targetSpeed = autoScrollSpeed;
        scroll();
    };

    // Таймер запуска автоскролла.
    let touchTimer: ReturnType<typeof setTimeout> = null;

    /**
     * Обработчик остановки прокрутки для тач девайсов.
     * Если был включен автоскролл, он включается обратно через 10 секунд бездействия.
     */
    const handleStopTouch = () => {
        state.targetSpeed = 0;
        state.isActive = false;

        if (touchTimer) {
            clearTimeout(touchTimer);
        }

        if (!autoScroll) {
            return;
        }

        touchTimer = setTimeout(
            () => {
                state.targetSpeed = autoScrollSpeed;
                state.isActive = true;
                scroll();
            },
            TOUTCH_AUTOSCROLL_DELAY
        );
    };


    component.addEventListener('touchmove', handleStopTouch);

    if (showControlsOnHover && !state.isTouch) {
        component.addEventListener('mouseenter', handleShowControls );
        component.addEventListener('mouseleave', handleHideControls );
    }


    /**
     * Приближает текущую скорость к целевой.
     */
    const updateSpeed = () => {
        if (state.currentSpeed === state.targetSpeed) {
            return;
        }

        if (Math.abs(state.currentSpeed - state.targetSpeed) < ACCELERATION) {
            state.currentSpeed = state.targetSpeed;
        }

        if (state.currentSpeed < state.targetSpeed) {
            state.currentSpeed += ACCELERATION;
            return;
        }

        if (state.currentSpeed > state.targetSpeed) {
            state.currentSpeed -= ACCELERATION;
            return;
        }
    };

    /**
     * Отрисовка сдвига карусели.
     * @param scrollPosition
     * @param scrollDirection
     */
    const renderScroll = (scrollPosition: number, scrollDirection: typeof direction) => {
        // Для оптимизации отрисовки не крутим, пока элемент не виден.
        if (!isVisible(scrollableElement)) {
            return;
        }

        if (scrollDirection === 'left') {
            if (scrollPosition >= maxScroll - SCROLL_PADDING) {
                scrollableElement.scrollLeft = 0;
            }
            scrollableElement.scrollLeft += state.currentSpeed;
        }

        if (scrollDirection === 'right') {
            if (scrollPosition <= SCROLL_PADDING) {
                scrollableElement.scrollLeft = maxScroll;
            }
            scrollableElement.scrollLeft -= state.currentSpeed;
        }
    };

    // Таймер запуска автоскролла.
    let scrollTimer: ReturnType<typeof setTimeout> = null;

    /**
     * Запускаем таймеры карусели, которые следят за скроллом.
     */
    const scroll = () => {
        if (!state.isActive) {
            return;
        }

        // Получаем текущую позицию прокрутки
        const scrollPosition = scrollableElement.scrollLeft;

        updateSpeed();

        //  Прокручиваем влево
        if (state.direction === 'left') {
            requestAnimationFrame(() => renderScroll(scrollPosition, 'left'));
        }

        // Прокручиваем вправо
        if (state.direction === 'right') {
            requestAnimationFrame(() => renderScroll(scrollPosition, 'right'));
        }

        // Задержка опроса для оптимизации. Если карусель стоит, ее не надо часто опрашивать и перерисовывать.
        const delay = state.currentSpeed === 0 || !isVisible(scrollableElement)
            ? SCROLL_IDLE_DELAY
            : SCROLL_DELAY;

        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(
            () => {scroll();},
            delay,
        );
    };

    if (autoScroll) {
        scroll();
    }
};
