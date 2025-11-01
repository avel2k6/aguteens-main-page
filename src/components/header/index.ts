import './index.less';

const classes = {
    header: 'header',
    headerScrolled: 'header_scrolled',
    contentCentered: 'header__content_centered',
    logo: 'header__logo',
    logoScrolled: 'header__logo_scrolled',
    logoAgu: 'header__logo__agu',
    logoAguScrolled: 'header__logo__agu_scrolled',
    logoArcs: 'header__logo__arcs',
    logoArcsScrolled: 'header__logo__arcs_scrolled',
    logoFamily: 'header__logo__family',
    logoFamilyScrolled: 'header__logo__family_scrolled',
    logoForum: 'header__logo__forum',
    logoForumScrolled: 'header__logo__forum_scrolled',
    links: 'header__links',
    link: 'header__link',
    menu: 'header__link_menu',
    cart: 'header__link_cart',
    lk: 'header__link_lk',
};

export const initHeader = () => {
    const state = {
        isScrolled: false,
    };

    document.addEventListener('scroll', () => {
        const isScrolled = window.scrollY !== 0;
        if (isScrolled === state.isScrolled) {
            return;
        }
        state.isScrolled = isScrolled;
        render();
    });

    const render = () => {
        const header = document.body.querySelector(`.${classes.header}`);
        const logo = document.body.querySelector(`.${classes.logo}`);
        const agu = document.body.querySelector(`.${classes.logoAgu}`);
        const arcs = document.body.querySelector(`.${classes.logoArcs}`);
        const family = document.body.querySelector(`.${classes.logoFamily}`);
        const forum = document.body.querySelector(`.${classes.logoForum}`);

        const elements: {element: Element; scrollClass: string}[] = [
            { element: header, scrollClass: classes.headerScrolled},
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
