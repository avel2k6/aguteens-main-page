import './index.less';

const classes = {
    logo: 'logo',
    logoScrolled: 'logo_scrolled',
    logoAgu: 'logo__agu',
    logoAguScrolled: 'logo__agu_scrolled',
    logoArcs: 'logo__arcs',
    logoArcsScrolled: 'logo__arcs_scrolled',
    logoFamily: 'logo__family',
    logoFamilyScrolled: 'logo__family_scrolled',
    logoForum: 'logo__forum',
    logoForumScrolled: 'logo__forum_scrolled',
};

/**
 * Инициализация событий для заголовка.
 */
export const initLogoListeners = () => {
    const state = {
        isScrolled: false,
    };

    /**
     * Обработчик скролла. Изменяет состояние заголовка в зависимости от положения скролла.
     */
    const handleScroll = () => {
        const isScrolled = window.scrollY !== 0;
        if (isScrolled === state.isScrolled) {
            return;
        }
        state.isScrolled = isScrolled;
        render();
    };

    document.addEventListener('scroll', handleScroll);

    /**
     * Отрисовывает заголовок в зависимости от состояния.
     */
    const render = () => {
        const logo = document.body.querySelector(`.${classes.logo}`);
        const agu = document.body.querySelector(`.${classes.logoAgu}`);
        const arcs = document.body.querySelector(`.${classes.logoArcs}`);
        const family = document.body.querySelector(`.${classes.logoFamily}`);
        const forum = document.body.querySelector(`.${classes.logoForum}`);

        /**
         * Список элементов, которые нужно изменить при скролле. Каждый элемент имеет класс, который нужно добавить или удалить.
         */
        const elements: {element: Element; scrollClass: string}[] = [
            { element: logo, scrollClass: classes.logoScrolled },
            { element: agu, scrollClass: classes.logoAguScrolled },
            { element: arcs, scrollClass: classes.logoArcsScrolled },
            { element: family, scrollClass: classes.logoFamilyScrolled },
            { element: forum, scrollClass: classes.logoForumScrolled },
        ];

        if (state.isScrolled) {
            elements.forEach(({element, scrollClass}) => element.classList.add(scrollClass));
            return;
        }
        elements.forEach(({element, scrollClass}) => element.classList.remove(scrollClass));
    };

    render();
};
