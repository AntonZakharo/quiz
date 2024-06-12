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
            if (a%b == 0) {
                this.correct = a/b
            }
            else {
                while (a%b != 0) {
                    a = randint(1, 30)
                    b = randint(1, 30)
                    if (a%b == 0 && a != b) {
                        this.correct = a/b
                        this.question = `${a} ${sign} ${b}`
                    }
                }
            }
        }
        let end = false
        this.answers = [randint(this.correct - 10, this.correct + 10),
                        randint(this.correct - 10, this.correct + 10),
                        this.correct,
                        randint(this.correct - 10, this.correct + 10),
                        randint(this.correct - 10, this.correct + 10)]
        while (end != true) {
        if (this.answers.length !== new Set(this.answers).size) {
            this.answers = [randint(this.correct - 10, this.correct + 10),
                randint(this.correct - 10, this.correct + 10),
                this.correct,
                randint(this.correct - 10, this.correct + 10),
                randint(this.correct - 10, this.correct + 10)]
        } else {
            end = true
        }
        }   
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

let last_result_html = document.querySelector('.last_result')
let cookies = document.cookie.split(';')
for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split('=')[0] == 'test-result') {
        let last_result = cookies[i].split('=')[1]
        last_result = last_result.split('/')
        last_result_html.innerHTML = `Ваш последний результат ${last_result[0]}/${last_result[1]}
        Точность ${last_result[2]}`
        break
    } 
} 


question_field = document.querySelector('.main-text')
btns = document.querySelectorAll('.btn')
second_text = document.querySelector('.second-text')
start_text = document.querySelector('.start-text')
btn_start = document.querySelector('.btn-start')
result = document.querySelector('.result')
result_text = document.querySelector('.result-text')
result_image = document.querySelector('.result-image')


btn_start.addEventListener('click', function() {
    question_field.style.display = 'block'
    second_text.style.display = 'flex'
    last_result_html.style.display = 'none'
    btn_start.style.display = 'none'
    start_text.style.display = 'none'
    setTimeout(function() {
        question_field.style.display = 'none'
        second_text.style.display = 'none'
        if (Math.round((correct_ans/total_ans) * 100) <= 25 || total_ans < 3) {
            result_text.innerHTML = 'Пора открыть учебник за 4 класс'
            result_image.innerHTML = `<img src="images/skeletons.jpg">`
        }
        else if (Math.round((correct_ans/total_ans) * 100) <= 50) {
            result_text.innerHTML = 'Неплохо'
            result_image.innerHTML = `<img src="images/neploh.png">`
        }
        else if (Math.round((correct_ans/total_ans) * 100) <= 75) {
            result_text.innerHTML = 'Хорош'
            result_image.innerHTML = `<img src="images/horosh.png">`
        }
        else if (Math.round((correct_ans/total_ans) * 100) == 100) {
            result_text.innerHTML = 'Красавчик'
            result_image.innerHTML = `<img src="images/winner.jpg">`
        }


        
        result.innerHTML = `Конец теста.
        Набрано баллов ${correct_ans} из ${total_ans}.
        Процент правильных ответов: ${Math.round((correct_ans/total_ans) * 100) }%`
        let cookie = correct_ans + '/' + total_ans + '/' + Math.round((correct_ans/total_ans) * 100)
        let cookie_cookie = `test-result=${cookie};max-age=1000000000`
    }, 10000)
})



current_question = new Question()
current_question.display()
correct_ans = 0
total_ans = 0

for (let i = 0; i < btns.length; i += 1) {
    btns[i].addEventListener('click', function() {
        if (btns[i].innerHTML == current_question.correct) {
            anime({
                targets : btns[i],
                keyframes : [
                    {background : '#00ff00'},
                    {background : '#baffed'}
                ],
                duration : 500,
                easing : 'linear',
            })
            correct_ans += 1
            total_ans += 1
        } else {
            anime({
                targets : btns[i],
                keyframes : [
                    {background : '#ff0000'},
                    {background : '#baffed'}
                ],
                duration : 500,
                easing : 'linear',
            })
            total_ans += 1
        }
        current_question = new Question()
        current_question.display()
    })
}

