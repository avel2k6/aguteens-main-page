import './index.less';

const attributes = {
    showNav: 'data-show-nav',
    closeNav: 'data-close-nav',
};

const classes = {
    component: 'header-nav',
    visible: 'header-nav_visible',
    list: 'header-nav__list',
    subList: 'header-nav__sub-list',
    innerList: 'header-nav__inner-list',
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
    const state: {
        isOpened: boolean;
        clickedElement: Element | null;
    } = {
        isOpened: false,
        clickedElement: null,
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
        state.clickedElement = null;
        render();
    };

    opener?.addEventListener('click', handleShow);
    closer?.addEventListener('click', handleClose);
    component.addEventListener('click', (e: Event) => {
        const { target } = e;
        if (!(target instanceof Element)) {
            return;
        }

        const isList = target.classList.contains(classes.list);

        if (isList) {
            state.clickedElement = null;
            render();
            return;
        }

        const link = target.closest('a[href="#"]');
        if (link) {
            state.clickedElement = link;
            render();
            return;
        }
    });

    document.body.addEventListener('click', (e) => {
        const { target } = e;
        if (!(target instanceof Element)) {
            return;
        }

        const isOutside = !target.closest(`.${classes.component}`) && !target.closest(`[${attributes.showNav}]`);
        if (!isOutside) {
            return;
        }
        state.isOpened = false;
        state.clickedElement = null;
        render();
    });


    const render = () => {
        if (state.isOpened) {
            component.classList.add(classes.visible);
            document.body.classList.add(bodyClasses.noOverflow);
            header?.classList.add(headerClasses.noAnimation);
        } else {
            component.classList.remove(classes.visible);
            document.body.classList.remove(bodyClasses.noOverflow);
            header?.classList.remove(headerClasses.noAnimation);
            component.querySelectorAll(`.${classes.subList}`).forEach((subList) => subList.classList.remove(classes.visible));
            component.querySelectorAll(`.${classes.innerList}`).forEach((innerList) => innerList.classList.remove(classes.visible));
        }

        if (state.clickedElement) {
            Array.from(component.querySelectorAll(`.${classes.subList}`))
                .filter((sublist) => !sublist.contains(state.clickedElement))
                .forEach((subList) => subList.classList.remove(classes.visible));

            Array.from(component.querySelectorAll(`.${classes.innerList}`))
                .forEach((innerList) => innerList.classList.remove(classes.visible));

            state.clickedElement.nextElementSibling?.classList.add(classes.visible);
        } else {
            component.querySelectorAll(`.${classes.subList}`).forEach((subList) => subList.classList.remove(classes.visible));
            component.querySelectorAll(`.${classes.innerList}`).forEach((innerList) => innerList.classList.remove(classes.visible));
        }
    };
};
