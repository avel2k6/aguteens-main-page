import './index.less';

const classes = {
    component: 'spoiler',
    title: 'spoiler__title',
    titleOpened: 'spoiler__title_opened',
    content: 'spoiler__content',
    contentOpened: 'spoiler__content_opened',
};

/**
 * Инициализация спойлера.
 *
 * @param element
 */
export const initSpoiler = (
    element: HTMLDivElement,
) => {
    if (!element) {
        return;
    }

    /**
     * Состояние компонента.
     */
    const state = {
        // Признак, что спойлер открыт.
        isOpened: false,
    };

    /**
     * Изменение состояния компонента.
     * @param newState
     */
    const setState = (newState: Partial<typeof state>) => {
        if (newState.isOpened !== state.isOpened) {
            state.isOpened = newState.isOpened;
            rerender();
        }
    };

    /**
     * Обработчик клика по заголовку спойлера.
     * @param event
     */
    const handleToggleSpoiler = (event: MouseEvent) => {
        const { target } = event;

        if (!(target instanceof HTMLDivElement)) {
            return;
        }

        const title = target.closest(`.${classes.title}`);
        if (!title) {
            return;
        }
        setState({
            isOpened: !state.isOpened,
        });
    };

    element.addEventListener('click', handleToggleSpoiler);

    /**
     * Перерисовка компонента.
     */
    const rerender = (): void => {
        const content = element.querySelector(`.${classes.content}`);
        const title = element.querySelector(`.${classes.title}`);

        if (!(content instanceof HTMLElement)) {
            return;
        }

        if (state.isOpened) {
            content.classList.add(classes.contentOpened);
            title.classList.add(classes.titleOpened);
            content.style.height = `${content.scrollHeight}px`;
            return;
        }
        content.style.height = '0';
        content.classList.remove(classes.contentOpened);
        title.classList.remove(classes.titleOpened);
    };

    rerender();
};
