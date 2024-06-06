class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = randsymbol()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.correct = a+b
        }
        else if (sign == '-') {
            this.correct = a-b
        }
        else if (sign == '*') {
            this.correct = a*b
        }
        else if (sign == '/') {
            this.correct = a/b
        }
        this.answers = [randint(this.correct - 10, this.correct + 10),
                        randint(this.correct - 10, this.correct + 10),
                        this.correct,
                        randint(this.correct - 10, this.correct + 10),
                        randint(this.correct - 10, this.correct + 10)
        ]
        shuffle(this.answers)
    }
    display() {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            btns[i].innerHTML = this.answers[i]
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) { // Цикл повторяется до тех пор, пока остаются элементы для перемешивания
      randomIndex = Math.floor(Math.random() * currentIndex); // Выбираем оставшийся элемент.
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [    // Меняем местами с текущим элементом.
        array[randomIndex], array[currentIndex]];
    }
    return array; // Возвращаем перемешанный массив
  }
  


function randint(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}
function randsymbol(symbols = ["+", "-", "*", "/"]) {
    return symbols[randint(0,3)]
}





question_field = document.querySelector('.main-text')
btns = document.querySelectorAll('.btn')
second_text = document.querySelector('.second-text')
start_text = document.querySelector('.start-text')
btn_start = document.querySelector('.btn-start')
btn_start.addEventListener('click', function() {
    question_field.style.display = 'block'
    second_text.style.display = 'flex'
    btn_start.style.display = 'none'
    start_text.style.display = 'none'
})
current_question = new Question()
current_question.display()
correct_ans = 0
total_ans = 0
result = document.querySelector('.result')
setTimeout(function() {
    result.innerHTML = `Конец теста.
    Набрано баллов ${correct_ans} из ${total_ans}.
    Процент правильных ответов ${Math.round((correct_ans/total_ans) * 100) }`
}, 10000)
for (let i = 0; i < btns.length; i += 1) {
    btns[i].addEventListener('click', function() {
        if (btns[i].innerHTML == current_question.correct) {
            anime({
                targets : btns[i],
                background : 'green',
                duration : 500,
                easing : 'linear',
            })
            correct_ans += 1
            total_ans += 1
        } else {
            anime({
                targets : btns[i],
                background : 'red',
                duration : 500,
                easing : 'linear',
            })
            total_ans += 1
        }
        current_question = new Question()
        current_question.display()
    })
}


