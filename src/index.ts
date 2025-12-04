import './common/root.less';
import './common/normalize.less';
import './common/fonts.less';

import './components/html';
import './components/page';
import './components/noise';
import './components/block-main';
import './components/block-links';
import './components/block-offer';
import './components/block-welcome';
import './components/block-faq';
import './components/block-cases';
import './components/block-teachers';
import './components/block-tickets';
import './components/ticket';
import './components/block-reviews';
import './components/block-partners';
import './components/block-video';
import './components/footer';
import './components/buy-button';
import './components/block-bottom';
import './components/bg-video';
import './components/play-button';


import { initList } from './components/list';
import { initInfiniteScroll } from './components/horizontal-scroll';
import { initHeaderListeners } from './components/header';
import { initReplaceImageListeners } from './components/replace-image';
import { initModalListeners } from './components/modal';
import { initSpoiler } from './components/spoiler';

(() => {
    initHeaderListeners();
})();

(() => {
    initReplaceImageListeners();
})();

(() => {
    initModalListeners();
})();

(() => {
    initSpoiler(document.querySelector('.spoiler'));
})();

(() => {
    const first = document.querySelector('#first-faq');

    if (!first) {
        return;
    }
    if (!(first instanceof HTMLDivElement)) {
        return;
    }

    initList(first, 0);
})();

(() => {
    const scrollableCases = document.querySelector('.block-cases__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    initInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const scrollableCases = document.querySelector('.block-teachers__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    initInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const scrollableCases = document.querySelector('.block-review__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    initInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const partnersFaqBlock = document.querySelector('.block-partners__faq-list');

    if (!partnersFaqBlock) {
        return;
    }
    if (!(partnersFaqBlock instanceof HTMLDivElement)) {
        return;
    }

    initList(partnersFaqBlock, 1);
})();

(() => {
    const scrollableTopVideos = document.querySelector('.block-video__top .block-video__cards');
    if (!scrollableTopVideos) {
        return;
    }
    if (!(scrollableTopVideos instanceof HTMLDivElement)) {
        return;
    }
    const scrollController = initInfiniteScroll(
        scrollableTopVideos,
        {
            direction: 'left',
            infinite: true,
            controls: true,
            autoSpeed: 2, // <-- set desired automatic speed for top (pixels per step)
            controlsOnHover: true, // show controls only while wrapper is hovered
        }
    );
    scrollController.startAuto();
    // pause auto-rotation on hover, resume on leave
    const topWrapper = (scrollController as any)?.wrapper as HTMLElement | undefined;
    if (topWrapper) {
        // prefer the inner cards element as target, fallback to wrapper
        const topCards = topWrapper.querySelector<HTMLElement>('.horizontal-scroll__cards') || topWrapper;

        const showTopControls = () => {
            const controls = topWrapper.querySelectorAll<HTMLElement>('.horizontal-scroll__control');
            controls.forEach(c => c.style.display = 'block');
            scrollController.stop();
            topWrapper.classList.add('horizontal-scroll_hover');
        };
        const hideTopControls = (ev?: MouseEvent | PointerEvent) => {
            const related = (ev as any)?.relatedTarget as Node | null;
            if (related && topWrapper.contains(related)) return;
            const controls = topWrapper.querySelectorAll<HTMLElement>('.horizontal-scroll__control');
            controls.forEach(c => c.style.display = 'none');
            scrollController.startAuto();
            topWrapper.classList.remove('horizontal-scroll_hover');
        };

        // attach to both wrapper and the inner cards to be robust
        [topWrapper, topCards].forEach(el => {
            el.addEventListener('pointerenter', showTopControls);
            el.addEventListener('pointerleave', hideTopControls);
            el.addEventListener('mouseenter', showTopControls);
            el.addEventListener('mouseleave', hideTopControls);
        });
    }
})();

(() => {
    const scrollableBottom = document.querySelector('.block-video__bottom .block-video__cards');
    if (!scrollableBottom) {
        return;
    }
    if (!(scrollableBottom instanceof HTMLDivElement)) {
        return;
    }
    const scrollController = initInfiniteScroll(
        scrollableBottom,
        {
            direction: 'right',
            infinite: true,
            controls: true,
            autoSpeed: 2, // <-- set desired automatic speed for bottom
            controlsOnHover: true, // same for bottom
        }
    );

    scrollController.startAuto();
    // pause auto-rotation on hover, resume on leave
    const bottomWrapper = (scrollController as any)?.wrapper as HTMLElement | undefined;
    if (bottomWrapper) {
        const bottomCards = bottomWrapper.querySelector<HTMLElement>('.horizontal-scroll__cards') || bottomWrapper;

        const showBottomControls = () => {
            const controls = bottomWrapper.querySelectorAll<HTMLElement>('.horizontal-scroll__control');
            controls.forEach(c => c.style.display = 'block');
            scrollController.stop();
            bottomWrapper.classList.add('horizontal-scroll_hover');
        };
        const hideBottomControls = (ev?: MouseEvent | PointerEvent) => {
            const related = (ev as any)?.relatedTarget as Node | null;
            if (related && bottomWrapper.contains(related)) return;
            const controls = bottomWrapper.querySelectorAll<HTMLElement>('.horizontal-scroll__control');
            controls.forEach(c => c.style.display = 'none');
            scrollController.startAuto();
            bottomWrapper.classList.remove('horizontal-scroll_hover');
        };

        [bottomWrapper, bottomCards].forEach(el => {
            el.addEventListener('pointerenter', showBottomControls);
            el.addEventListener('pointerleave', hideBottomControls);
            el.addEventListener('mouseenter', showBottomControls);
            el.addEventListener('mouseleave', hideBottomControls);
        });
    }
})();
