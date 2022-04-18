function start() {

    $("#startGame").hide();

    $("#background").append("<div id='player'></div>");
    $("#background").append("<div id='enemy1'></div>");
    $("#background").append("<div id='enemy2'></div>");
    $("#background").append("<div id='friend'></div>");

}

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', start);