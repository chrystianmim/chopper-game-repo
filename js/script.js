function start() {

    $("#startGame").hide();

    $("#background").append("<div id='player' class='animation1'></div>");
    $("#background").append("<div id='enemy1' class='animation2'></div>");
    $("#background").append("<div id='enemy2'></div>");
    $("#background").append("<div id='friend' class='animation3'></div>");

    const game = {};
    const keys = {
        w: 87,
        s: 83,
        d: 68
    }
    const enemy1Speed = 3;
    let enemy1PosY = parseInt(Math.random() * 334);

    game.keyPressed = []; // check if player pressed a key

    $(document).keydown(function (e) {
        game.keyPressed[e.which] = true;
    })

    $(document).keyup(function (e) {
        game.keyPressed[e.which] = false;
    })

    // Game Loop

    game.timer = setInterval(loop, 30);

    function loop() {
        bgMovement();
        movePlayer();
        moveEnemy1();
    }

    function bgMovement() { // Function that moves the background
        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);
    }

    function movePlayer() { // #player moves (up, down, fire) function
        if (game.keyPressed[keys.w]) {
            let moveVert = parseInt($("#player").css("top"));
            if (moveVert <= 10) {
                return false
            } else {
                $("#player").css("top", moveVert - 10);
            }
        }

        if (game.keyPressed[keys.s]) {
            let moveVert = parseInt($("#player").css("top"));
            if (moveVert >= 430) {
                return false
            } else {
                $("#player").css("top", moveVert + 10);
            }
        }

        if (game.keyPressed[keys.d]) {
            // function fire
        }
    }

    function moveEnemy1() {
        let enemy1PosX = parseInt($("#enemy1").css("left"));

        if (enemy1PosX <= 0) {
            enemy1PosY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", enemy1PosY);
        } else {
            $("#enemy1").css("left", enemy1PosX - enemy1Speed);
            $("#enemy1").css("top", enemy1PosY);
        }
    }
}

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', start);