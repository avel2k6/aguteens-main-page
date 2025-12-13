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
import {initHeaderNav} from './components/header-nav';

/**
 * Инициализация всех скриптов.
 */
const initMainPage = () => {
    (() => {
        initHeaderListeners();
    })();

    (() => {
        initHeaderNav();
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
                showControls: true,
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
                showControls: true,
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
                showControls: true,
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
        initInfiniteScroll(
            scrollableTopVideos,
            {
                direction: 'left',
                infinite: true,
                showControls: false,
                showControlsOnHover: true,
                autoScroll: true,
            }
        );
    })();

    (() => {
        const scrollableBottom = document.querySelector('.block-video__bottom .block-video__cards');
        if (!scrollableBottom) {
            return;
        }
        if (!(scrollableBottom instanceof HTMLDivElement)) {
            return;
        }
        initInfiniteScroll(
            scrollableBottom,
            {
                direction: 'right',
                infinite: true,
                showControls: false,
                showControlsOnHover: true,
                autoScroll: true,
            }
        );
    })();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainPage);
} else {
    initMainPage();
}
