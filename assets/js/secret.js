const submit = $('#submit')
const password = $('#password')
const menu = $(".menu")
const form = $("#form")
const alpha = $("#alpha")
const beta = $("#beta")
const omega = $("#omega")
const game = $("#games")
console.log("follow the white ______")

var backgroundMusic = new Audio('../assets/sfx/computer-startup-6331.mp3');

backgroundMusic.loop = true;
backgroundMusic.play()

submit.click((event)=>{
let pass = password.val()    

if(pass == "rabbit"){
event.preventDefault()
form.addClass('hide')
menu.removeClass('hide')


}
})

let retrievedAchievementData = JSON.parse(localStorage.getItem("achievements"));
console.log(retrievedAchievementData.twentyGames)

if(retrievedAchievementData.pointsAlpha === true){
alpha.removeClass('hide')
}
if(retrievedAchievementData.pointsBeta === true){
    beta.removeClass('hide')
 }
if(retrievedAchievementData.pointsOmega === true){
        omega.removeClass('hide')
 }
if(retrievedAchievementData.twentyGames >= 20){
    game.removeClass('hide')
}

