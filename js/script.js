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
    let endGame = false;

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
        coll();
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

    function coll() { // Collision function

        var collision1 = ($("#player").collision($("#enemy1")));
        var collision2 = ($("#player").collision($("#enemy2")));
        var collision3 = ($("#bullet").collision($("#enemy1")));
        var collision4 = ($("#bullet").collision($("#enemy2")));
        var collision5 = ($("#player").collision($("#friend")));
        var collision6 = ($("#enemy2").collision($("#friend")));

        // Collision player + enemy1
        if (collision1.length > 0) {
            enemy1PosX = parseInt($("#enemy1").css("left"));
            enemy1PosY = parseInt($("#enemy1").css("top"));

            explosion1(enemy1PosX, enemy1PosY);

            enemy1PosY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", enemy1PosY);
        }

        // Collision player + enemy2
        if (collision2.length > 0) {
            enemy2PosX = parseInt($("#enemy2").css("left"));
            enemy2PosY = parseInt($("#enemy2").css("top"));

            explosion2(enemy2PosX, enemy2PosY);

            $("#enemy2").remove();

            resetEnemy2();
        }

        // Collision bullet + enemy1
        if (collision3.length > 0) {
            enemy1PosX = parseInt($("#enemy1").css("left"));
            enemy1PosY = parseInt($("#enemy1").css("top"));

            explosion1(enemy1PosX, enemy1PosY);
            $("#bullet").css("left", 950);

            enemy1PosY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", enemy1PosY);
        }

        // Collision bullet + enemy2
        if (collision4.length > 0) {
            enemy2PosX = parseInt($("#enemy2").css("left"));
            enemy2PosY = parseInt($("#enemy2").css("top"));

            explosion2(enemy2PosX, enemy2PosY);
            $("#bullet").css("left", 950);

            $("#enemy2").remove();

            resetEnemy2();
        }

        // Collision player + friend
        if (collision5.length > 0) {
            resetFriend();
            $("#friend").remove();
        }
    }

    function explosion1(enemy1PosX, enemy1PosY) { // Explosion effect for player + enemy1 collision
        $("#background").append("<div id='explosion1'></div");
        div1 = $("#explosion1");
        div1.css("background-image", "url(../src/imgs/explosao.png)");
        div1.css("top", enemy1PosY);
        div1.css("left", enemy1PosX);
        div1.animate({ width: 200, opacity: 0 }, "slow");

        var explosionTimer1 = window.setInterval(removeExplosion1, 1000);

        function removeExplosion1() {

            div1.remove();
            window.clearInterval(explosionTimer1);
            explosionTimer1 = null;
        }
    }

    function explosion2(enemy2PosX, enemy2PosY) { // Explosion effect for player + enemy2 collision
        $("#background").append("<div id='explosion2'></div");
        div2 = $("#explosion2");
        div2.css("background-image", "url(../src/imgs/explosao.png)");
        div2.css("top", enemy2PosY);
        div2.css("left", enemy2PosX);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var explosionTimer2 = window.setInterval(removeExplosion2, 1000);

        function removeExplosion2() {

            div2.remove();
            window.clearInterval(explosionTimer2);
            explosionTimer2 = null;
        }
    }

    function resetEnemy2() { // Reset enemy2 position after collision

        var collisionTimer4 = window.setInterval(reset4, 5000);

        function reset4() {
            window.clearInterval(collisionTimer4);
            collisionTimer4 = null;

            if (endGame === false) {
                $("#background").append("<div id='enemy2'></div");
            }
        }
    }

    function resetFriend() { // Reset friend position after collision
        var friendTimer = window.setInterval(reset6, 6000);

        function reset6() {
            window.clearInterval(friendTimer);
            friendTimer = null;

            if (endGame === false) {
                $("#background").append("<div id='friend' class='animation3'></div>");
            }
        }
    }
}

const startGame = document.getElementById('startGame');
startGame.addEventListener('click', start);