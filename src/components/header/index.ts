import './index.less';

const classes = {
    header: 'header',
    headerScrolled: 'header_scrolled',
    // contentCentered: 'header__content_centered',
    // logo: 'header__logo',
    // logoScrolled: 'header__logo_scrolled',
    // logoAgu: 'header__logo__agu',
    // logoAguScrolled: 'header__logo__agu_scrolled',
    // logoArcs: 'header__logo__arcs',
    // logoArcsScrolled: 'header__logo__arcs_scrolled',
    // logoFamily: 'header__logo__family',
    // logoFamilyScrolled: 'header__logo__family_scrolled',
    // logoForum: 'header__logo__forum',
    // logoForumScrolled: 'header__logo__forum_scrolled',
    // links: 'header__links',
    // link: 'header__link',
    // menu: 'header__link_menu',
    // cart: 'header__link_cart',
    // lk: 'header__link_lk',
};
//
// const attributes = {
//     scrolled: 'data-logo-scrolled',
//     static: 'data-logo-static',
// };

/**
 * Инициализация событий для заголовка.
 */
export const initHeaderListeners = () => {
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
     * Если страница прокручена, то добавляет классы для изменения стиля заголовка.
     * Если страница не прокручена, то удаляет классы для изменения стиля заголовка.
     * Также изменяет размер логотипа в зависимости от положения скролла.
     */
    const render = () => {
        const header = document.body.querySelector(`.${classes.header}`);

        /**
         * Список элементов, которые нужно изменить при скролле. Каждый элемент имеет класс, который нужно добавить или удалить.
         */
        const elements: {element: Element; scrollClass: string}[] = [
            { element: header, scrollClass: classes.headerScrolled},
        ];

        if (state.isScrolled) {
            elements.forEach(({element, scrollClass}) => element.classList.add(scrollClass));
            return;
        }
        elements.forEach(({element, scrollClass}) => element.classList.remove(scrollClass));
    };

    render();
};
