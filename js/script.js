function start() {

    $("#startGame").hide();

    $("#background").append("<div id='player' class='animation1'></div>");
    $("#background").append("<div id='enemy1' class='animation2'></div>");
    $("#background").append("<div id='enemy2'></div>");
    $("#background").append("<div id='friend' class='animation3'></div>");

    const game = {};

    // Game Loop

    game.timer = setInterval(loop, 30);

    function loop() {
        bgMovement();
    }

    function bgMovement() { // Function that moves the background
        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);
    }
}

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', start);