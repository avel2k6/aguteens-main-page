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

import { initList, TList } from './components/list';
import { slowInfiniteScroll } from './components/horizontal-scroll';


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

(() => {
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
