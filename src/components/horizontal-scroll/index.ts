import './index.less';

/**
 * Максимальная скорость скролла в пикселях за один шаг.
 */
const MAX_SCROLL_SPEED = 10;

/**
 * Задержка между шагами скролла в миллисекундах.
 */
const SCROLL_DELAY = 20;

/**
 * Коэффициент ускорения/замедления
 */
const ACCELERATION = 0.3;

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
export const initInfiniteScroll = (
    element: HTMLDivElement,
    {
        direction,
        infinite = false,
        controls = false,
        autoSpeed,
        controlsOnHover,
    }: {
        direction: 'right' | 'left';
        infinite: boolean;
        controls?: boolean;
        autoSpeed?: number;
        controlsOnHover?: boolean;
    }) => {
    const instanceAutoSpeed = typeof autoSpeed === 'number' ? autoSpeed : MAX_SCROLL_SPEED;
    // remember the initially configured direction and auto speed so
    // startAuto() (called without args) can restore original behavior
    const defaultDirection = direction;
    const defaultAutoSpeed = instanceAutoSpeed;

    /**
     * Состояние компонента.
     */
    const state = {
        // Направление прокрутки.
        direction,

        // Признак, что прокрутка работает.
        isActive: false,

        // Текущая скорость прокрутки
        currentSpeed: 0,

        // Целевая скорость прокрутки
        targetSpeed: 0,
    };

    if (!(element instanceof HTMLDivElement)) {
        return;
    }

    if (infinite) {
        element.innerHTML = element.innerHTML.repeat(REPEAT_COUNT);
    }

    const component = document.createElement('div');
    component.classList.add(classes.component);
    // if caller requested controls visible only while hovered, add modifier
    if (controlsOnHover) {
        component.classList.add('horizontal-scroll_auto-hide-controls');
    }
    element.parentElement.appendChild(component);
    component.appendChild(element);
    element.classList.add(classes.cards);

    // Устанавливаем максимальную позицию прокрутки
    const maxScroll = element.scrollWidth - element.clientWidth;

    // Двигаем на середину ленты.
    element.scrollLeft = maxScroll/2;

    /**
     * Плавно изменяет текущую скорость к целевой
     */
    const updateSpeed = () => {
        if (Math.abs(state.currentSpeed - state.targetSpeed) < ACCELERATION) {
            state.currentSpeed = state.targetSpeed;
        } else if (state.currentSpeed < state.targetSpeed) {
            state.currentSpeed += ACCELERATION;
        } else {
            state.currentSpeed -= ACCELERATION;
        }
    };

    const render = (scrollPosition: number, scrollDirection: typeof direction) => {
        // Для оптимизации отрисовки не крутим, пока элемент не виден.
        if (!isVisible(element)) {
            return;
        }

        // Обновляем скорость плавно
        updateSpeed();

        // Если скорость очень мала, останавливаем
        if (Math.abs(state.currentSpeed) < ACCELERATION && !state.isActive) {
            state.currentSpeed = 0;
            return;
        }

        if (scrollDirection === 'left') {
            if (scrollPosition >= maxScroll - SCROLL_PADDING) {
                element.scrollLeft = 0;
            }
            element.scrollLeft += state.currentSpeed;
        }

        if (scrollDirection === 'right') {
            if (scrollPosition <= SCROLL_PADDING) {
                element.scrollLeft = maxScroll;
            }
            element.scrollLeft -= state.currentSpeed;
        }
    };

    /**
     * Сдвигает элемент с плавной скоростью.
     */
    const scroll = () => {
        // Получаем текущую позицию прокрутки
        const scrollPosition = element.scrollLeft;

        // Проверяем направление и выполняем соответствующие действия
        if (state.direction === 'left' || state.direction === 'right') {
            requestAnimationFrame(() => render(scrollPosition, state.direction));

            if (state.isActive || Math.abs(state.currentSpeed) > ACCELERATION) {
                setTimeout(() => scroll(), SCROLL_DELAY);
            }
        }
    };

    const startManual = (scrollDirection: typeof direction) => {
        state.direction = scrollDirection;
        state.targetSpeed = MAX_SCROLL_SPEED;
        if (!state.isActive) {
            state.isActive = true;
            scroll();
        }
    };

    const startAuto = (scrollDirection?: typeof direction, speed?: number) => {
        // if caller provided a direction, use it; otherwise restore default
        state.direction = typeof scrollDirection === 'string' ? scrollDirection : defaultDirection;
        // if caller provided a speed override, use it; otherwise restore default auto speed
        state.targetSpeed = typeof speed === 'number' ? speed : defaultAutoSpeed;
        if (!state.isActive) {
            state.isActive = true;
            scroll();
        }
    };

    const stop = () => {
        state.targetSpeed = 0;
        // Не устанавливаем isActive в false сразу, чтобы дать возможность плавно остановиться
        // isActive установится в false автоматически когда скорость станет близкой к 0
    };

    const changeDirection = (newDirection: typeof direction) => {
        state.direction = newDirection;
    };

    // Обработчики для контролов
    if (controls) {
        const prevButton = document.createElement('button');
        prevButton.type = 'button';
        prevButton.classList.add(classes.control, classes.controlLeft);
        prevButton.setAttribute('aria-label', 'previous');
        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.classList.add(classes.control, classes.controlRight);
        nextButton.setAttribute('aria-label', 'next');
        component.appendChild(prevButton);
        component.appendChild(nextButton);

        prevButton.addEventListener('mouseenter', () => {
            startManual('right');
        });
        prevButton.addEventListener('mouseleave', () => {
            stop();
        });
        nextButton.addEventListener('mouseenter', () => {
            startManual('left');
        });
        nextButton.addEventListener('mouseleave', () => {
            stop();
        });
    }

    return {
        start: () => startManual(state.direction),
        startAuto,
        stop,
        changeDirection,
        wrapper: component,
    };
};