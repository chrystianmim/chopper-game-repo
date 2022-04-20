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
    const enemy1Speed = 3.5;
    const enemy2Speed = 1.25;
    const friendSpeed = 1;
    let letPlayerFire = true;
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
        moveEnemy2();
        moveFriend();
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
            playerFire();
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

    function moveEnemy2() {
        let enemy2PosX = parseInt($("#enemy2").css("left"));

        if (enemy2PosX <= 0) {
            $("#enemy2").css("left", 775);
        } else {
            $("#enemy2").css("left", enemy2PosX - enemy2Speed);
        }
    }

    function moveFriend() {
        let friendPosX = parseInt($("#friend").css("left"));

        if (friendPosX >= 694) {
            $("#friend").css("left", 0);
        } else {
            $("#friend").css("left", friendPosX + friendSpeed);
        }
    }

    function playerFire() {
        if (letPlayerFire === true) {

            letPlayerFire = false;

            // bullet position

            posY = parseInt($("#player").css("top"));
            posX = parseInt($("#player").css("left"));
            bulletX = posX + 190;
            bulletY = posY + 37;
            $("#background").append("<div id='bullet'></div>");
            $("#bullet").css("top", bulletY);
            $("#bullet").css("left", bulletX);

            var fireTime = window.setInterval(fireMovement, 30)
        }

        function fireMovement() {
            posX = parseInt($("#bullet").css("left"));
            if (posX >= 900) {
                window.clearInterval(fireTime);
                fireTime = null;
                $("#bullet").remove();
                letPlayerFire = true;
            } else {
                $("#bullet").css("left", posX + 30);
            }
        }
    }
}

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', start);