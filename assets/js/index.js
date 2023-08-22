
const main = $('#main')
var titleEl = document.getElementById('question-title');
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
let allDone = $('.allDone')
let loading = $('.loading')
let alpha = $('#alpha');
const start = $('#start')
const startGame = $('#startGame')

var currentQuestionIndex = 0;
let alphaCount = 0;

function updateAlpha() {
    if (alphaCount === 101) {
       loading.fadeOut()
       
     setTimeout(expand,1000)

    } else{
      alpha.html(alphaCount);
      alphaCount++;
      setTimeout(updateAlpha, 100);
    }
}

updateAlpha(); 

function expand(){

 allDone.fadeIn(1000)
 start.fadeIn(1000)


}


startGame.click(()=>{
    var form = document.getElementById("difficultyForm");
    var selectedDifficulty = form.querySelector('input[name="difficulty"]:checked');
    let beta = selectedDifficulty.value
    if(beta === "easy"){

      main.addClass('hide')
      questionsEl.classList.remove('hide');
      showQuestion(questionsEasy)

    }else if(beta === "medium"){
      main.addClass('hide')
      showQuestion(questionMedium)
    }else if(beta === "hard"){
      main.addClass('hide')
        alert("done")
    } else{
      alert("you have to pick a difficulty")
    }
   
})

function showQuestion(questions){

  var currentQuestion = questions[currentQuestionIndex];
  titleEl.textContent = currentQuestion.title;
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
}
