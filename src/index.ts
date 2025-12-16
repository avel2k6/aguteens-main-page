import './common/root.less';
import './common/normalize.less';
import './common/fonts.less';

import './components/bg-video';
import './components/block-ages';
import './components/block-bottom';
import './components/block-carousel-big';
import './components/block-faq';
import './components/block-faq-with-image';
import './components/block-icons';
import './components/block-links';
import './components/block-main';
import './components/block-nominations';
import './components/block-offer';
import './components/block-partners';
import './components/block-reviews';
import './components/block-stages';
import './components/block-carousel-medium';
import './components/block-tickets';
import './components/block-video';
import './components/block-welcome';
import './components/buy-button';
import './components/footer';
import './components/html';
import './components/icons';
import './components/noise';
import './components/page';
import './components/play-button';
import './components/ticket';


import { initList } from './components/list';
import { initInfiniteScroll } from './components/horizontal-scroll';
import { initHeaderListeners } from './components/header';
import { initReplaceImageListeners } from './components/replace-image';
import { initModalListeners } from './components/modal';
import { initSpoiler } from './components/spoiler';
import { initHeaderNav } from './components/header-nav';
import { initLogoListeners } from './components/logo';

/**
 * Инициализация всех скриптов.
 */
const initMainPage = () => {
    (() => {
        initHeaderListeners();
    })();

    (() => {
        initLogoListeners();
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
        const carouselsBig = document.querySelectorAll('.block-carousel-big__cards');

        carouselsBig.forEach((carouselBig) => {
            if (!(carouselBig instanceof HTMLDivElement)) {
                return;
            }
            initInfiniteScroll(
                carouselBig,
                {
                    direction: 'left',
                    infinite: true,
                    showControls: true,
                }
            );
        });
    })();

    (() => {
        const carouselsMedium = document.querySelectorAll('.block-carousel-medium__cards');

        carouselsMedium.forEach((carouselMedium) => {
            if (!(carouselMedium instanceof HTMLDivElement)) {
                return;
            }
            initInfiniteScroll(
                carouselMedium,
                {
                    direction: 'left',
                    infinite: true,
                    showControls: true,
                }
            );
        });
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
        const partnersFaqBlock = document.querySelector('.block-faq');

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
