

let allDone = $('.allDone')
let loading = $('.loading')
let alpha = $('#alpha');
const start = $('#start')
const startGame = $('#startGame')
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
  console.log(selectedDifficulty.value)    
})