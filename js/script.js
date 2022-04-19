function start() {

    $("#startGame").hide();

    $("#background").append("<div id='player' class='animation1'></div>");
    $("#background").append("<div id='enemy1' class='animation2'></div>");
    $("#background").append("<div id='enemy2'></div>");
    $("#background").append("<div id='friend' class='animation3'></div>");

}

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', start);