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

import { initList, TList } from './components/list';
import { slowInfiniteScroll } from './components/horizontal-scroll';


(() => {
    const firstFAQ: TList = [
        {
            question: 'Избавиться от боязни сцены',
            answer: 'Мы поможем вам справиться с тревожностью и страхом перед публичными выступлениями. Наша программа включает в себя техники релаксации, дыхательные упражнения и практические занятия, направленные на развитие уверенности и коммуникабельности.'
        },
        {
            question: 'Познакомиться с интересными людьми',
            answer: 'В рамках курса вы сможете встретить единомышленников, которые разделяют ваши интересы и стремления. Мы организуем мероприятия, где можно пообщаться, поделиться опытом и расширить профессиональную сеть.',
        },
        {
            question: 'Раскрыть возможности своего голоса',
            answer: 'Наши тренеры помогут вам раскрыть потенциал вашего голоса, научат правильно дышать, работать с интонацией и темпом речи. Вы получите инструменты для более эффективной коммуникации и выражения своих мыслей.'
        },
        {
            question: 'Определиться с выбором будущей профессии',
            answer: 'Наш курс поможет вам лучше понять свои интересы и способности, а также предоставит информацию о различных профессиях, связанных с коммуникацией и публичными выступлениями. Вы сможете сделать осознанный выбор направления развития. '
        }
    ];

    const first = document.querySelector('#first-faq');

    if (!first) {
        return;
    }
    if (!(first instanceof HTMLDivElement)) {
        return;
    }

    initList(first, firstFAQ, 0);
})();

(() => {
    const scrollableCases = document.querySelector('.block-cases__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    slowInfiniteScroll(
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
    slowInfiniteScroll(
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
    slowInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const partnersFaq: TList = [
        {
            question: 'Я никогда не пел, у меня получится?',
            answer: 'Да, абсолютно! В нашем курсе каждый начинающий может развивать свои навыки. Мы предлагаем индивидуальный подход к каждому участнику, начиная с базовых упражнений и заканчивая продвинутыми техниками. Главное - это желание учиться и совершенствоваться. '
        },
        {
            question: 'Где я смогу работать после прохождения курса?',
            answer: 'Вы можете работать в театре, кино, телевидении, рекламе, образовании, корпоративных коммуникациях, как частный преподаватель или консультант. Также возможна работа в сфере публичных выступлений, мастер-классов, тренингов и других направлений, где важна коммуникабельность и умение говорить. ',
        },
        {
            question: 'Можно ли стажироваться в AGUTEENS?',
            answer: 'Да, мы предлагаем стажировки для студентов и выпускников, желающих получить практический опыт работы в сфере коммуникаций и публичных выступлений. Стажировка проводится по индивидуальному плану, с учетом интересов и целей студента. '
        },
        {
            question: 'Где пригодятся мои навыки?',
            answer: 'Все, что связано с коммуникацией, публичными выступлениями, обучением, продвижением, управлением командой. Это может быть как профессиональная сфера, так и личностное развитие. '
        }
    ];

    const partnersFaqBlock = document.querySelector('.block-partners__faq-list');

    if (!partnersFaqBlock) {
        return;
    }
    if (!(partnersFaqBlock instanceof HTMLDivElement)) {
        return;
    }

    initList(partnersFaqBlock, partnersFaq, 1);
})();

(() => {
    const scrollableTopVideos = document.querySelector('.block-video__top .block-video__cards');
    if (!scrollableTopVideos) {
        return;
    }
    if (!(scrollableTopVideos instanceof HTMLDivElement)) {
        return;
    }
    const scrollController = slowInfiniteScroll(
        scrollableTopVideos,
        {
            direction: 'left',
            infinite: true,
        }
    );
    scrollController.start();
})();

(() => {
    const scrollableBottom = document.querySelector('.block-video__bottom .block-video__cards');
    if (!scrollableBottom) {
        return;
    }
    if (!(scrollableBottom instanceof HTMLDivElement)) {
        return;
    }
    const scrollController = slowInfiniteScroll(
        scrollableBottom,
        {
            direction: 'right',
            infinite: true,
        }
    );

    scrollController.start();
})();
