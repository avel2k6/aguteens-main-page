import './index.less';

type TListItem = {
    // Текст вопроса.
    question: string;

    // Текст ответа.
    answer: string;
};

export type TList = TListItem[];

const classes = {
    component: 'list',
    item: 'list__item',
    question: 'list__question',
    questionOpened: 'list__question_opened',
    answer: 'list__answer',
    answerOpened: 'list__answer_opened',
};

const dataAttributes = {
    index: 'data-index',
};

export const initList = (
    element: HTMLDivElement,
    list: TList,
    openedIndex: number | null = null,
) => {
    const state = {
        openedIndex,
    };

    const setState = (newState: Partial<typeof state>) => {
        if (newState.openedIndex !== state.openedIndex) {
            state.openedIndex = newState.openedIndex;
            console.log(state);
            rerender();
        }
    };

    const handleToggleItem = (event: MouseEvent) => {
        const { target } = event;

        if (!(target instanceof HTMLDivElement)) {
            return;
        }

        const question = target.closest(`.${classes.question}`);
        if (!question) {
            return;
        }
        const index = parseInt(question.getAttribute(dataAttributes.index), 10);
        setState({
            openedIndex: state.openedIndex === index
                ? null
                : index,
        });
    };

    element.addEventListener('click', handleToggleItem);

    const render = () => {
        list.forEach((item, index) => {
            const row = document.createElement('div');

            const question = document.createElement('div');
            question.classList.add(classes.question);
            question.innerText = item.question;
            question.setAttribute(dataAttributes.index, `${index}`);

            const answer = document.createElement('div');
            answer.classList.add(classes.answer);
            answer.innerText = item.answer;
            answer.setAttribute(dataAttributes.index, `${index}`);

            row.appendChild(question);
            row.appendChild(answer);
            element.appendChild(row);
        });

        element.classList.add(classes.component);
    };

    const rerender = (): void => {
        Array
            .from(document.getElementsByClassName(classes.answerOpened))
            .forEach((elem) => elem.classList.remove(classes.answerOpened));

        Array
            .from(document.getElementsByClassName(classes.questionOpened))
            .forEach((elem) => elem.classList.remove(classes.questionOpened));

        if (state.openedIndex !== null) {
            const question = document.querySelector(`.${classes.question}[${dataAttributes.index}='${state.openedIndex}']`);
            question.classList.add(classes.questionOpened);

            const answer = document.querySelector(`.${classes.answer}[${dataAttributes.index}='${state.openedIndex}']`);
            answer.classList.add(classes.answerOpened);
        }
    };

    render();
    rerender();
};
