// All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All our options

const optionElements = document.querySelectorAll('.option');

// question

const question = document.getElementById('question');

// nomber of question

const nomberOfQuestion = document.getElementById('number-of-question'),
      nomberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс вопроса
    indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Когда закончится война?',
        options: [
            'Скоро',
            'Никогда',
            'Через 3 года',
            'Нескоро',
        ],
        rightAnswer: 0
    },
    {
        question: 'Можно детям ходить в школу во время войны?',
        options: [
            'Да',
            'Без разницы',
            'Нет',
            'Да, но нет',
        ],
        rightAnswer: 2
    },
    {
        question: 'Куда бежать во время обстрела?',
        options: [
            'Домой',
            'Под дерево',
            'В подвал',
            'В бомбоубежище',
        ],
        rightAnswer: 3
    },
]

nomberOfAllQuestions.innerHTML = questions.length; //выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос
    
    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    nomberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = [] // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNomber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNomber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            }else {
                indexOfQuestion = randomNomber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNomber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updadeAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updadeAnswerTracker('wrong');
    }
    disabledOptions();
}


const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updadeAnswerTracker = status => {
        answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

btnNext.addEventListener('click', validate)

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})