import './index.less';

const attributes = {
    showNav: 'data-show-nav',
    closeNav: 'data-close-nav',
};

const classes = {
    component: 'header-nav',
    visible: 'header-nav_visible',
};


const bodyClasses = {
    // Класс убирает прокрутку, когда открыто мобильное меню
    noOverflow: 'nav-body-no-mobile-overflow',
};

const headerClasses = {
    // Класс убирает анимации, когда открыто меню, чтобы работал блюр
    noAnimation: 'nav-header-no-animation',
};

export const initHeaderNav = () => {
    const state = {
        isOpened: false,
    };

    const component = document.querySelector(`.${classes.component}`);
    if (!component) {
        return;
    }

    const opener = document.querySelector(`[${attributes.showNav}]`);
    const closer = document.querySelector(`[${attributes.closeNav}]`);
    const header = document.querySelector('.header');

    const handleShow = () => {
        state.isOpened = true;
        render();

    };

    const handleClose = () => {
        state.isOpened = false;
        render();
    };

    opener?.addEventListener('click', handleShow);
    closer?.addEventListener('click', handleClose);


    const render = () => {
        if (state.isOpened) {
            component.classList.add(classes.visible);
            document.body.classList.add(bodyClasses.noOverflow);
            header.classList.add(headerClasses.noAnimation);
            return;
        }

        component.classList.remove(classes.visible);
        document.body.classList.remove(bodyClasses.noOverflow);
        header.classList.remove(headerClasses.noAnimation);
    };
};
