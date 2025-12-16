import './index.less';

const classes = {
    component: 'list',
    item: 'list__item',
    question: 'list__question',
    questionOpened: 'list__question_opened',
    answer: 'list__answer',
    answerContent: 'list__answer__content',
    answerOpened: 'list__answer_opened',
};

const dataAttributes = {
    index: 'data-index',
};

export const initList = (
    element: HTMLDivElement,
    openedIndex: number | null = null,
) => {
    const state = {
        openedIndex,
    };

    const setState = (newState: Partial<typeof state>) => {
        if (newState.openedIndex !== state.openedIndex) {
            state.openedIndex = newState.openedIndex;
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

    const rerender = (): void => {
        Array
            .from(element.getElementsByClassName(classes.answerOpened))
            .forEach((elem) => {
                elem.classList.remove(classes.answerOpened);
                (elem as HTMLElement).style.height = '0px';
            });

        Array
            .from(element.getElementsByClassName(classes.questionOpened))
            .forEach((elem) => {
                elem.classList.remove(classes.questionOpened);
            });

        if (state.openedIndex !== null) {
            const question = element.querySelector(`.${classes.question}[${dataAttributes.index}='${state.openedIndex}']`);
            if (question) {
                question.classList.add(classes.questionOpened);
            }

            const answer = element.querySelector(`.${classes.answer}[${dataAttributes.index}='${state.openedIndex}']`);
            if (answer) {
                answer.classList.add(classes.answerOpened);
                (answer as HTMLElement).style.height = `${answer.scrollHeight}px`;
            }
        }
    };

    rerender();
};
