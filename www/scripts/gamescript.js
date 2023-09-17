function sprite(options) {
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        tickPerFrame = options.tickPerFrame || 0,
        numberOfFrame = options.numberOfFrame || 1;
    
    that.context = options.context;
    that.w = options.w;
    that.h = options.h;
    that.img = options.img;
    that.x = options.x;
    that.y = options.y;
    that.scaleRatio = 1;

    that.update = function () {
        tickCount +=1;

        if (tickCount > tickPerFrame) {
            tickCount = 0;

            if (frameIndex < numberOfFrame - 1) {
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };

    that.render = function () {
                that.context.drawImage(
                    that.img,
                    frameIndex * that.w / numberOfFrame,
                    0,
                    that.w / numberOfFrame,
                    that.h,
                    that.x,
                    that.y,
                    that.w / numberOfFrame,
                    that.h
                );
            };    

//init var
    var dino,
        dinoImage,
        canvas;

    canvas = document.getElementById("cnv");
    canvas.width = 1024;
    canvas.height = 480;

    dinoImage = new Image();

    dino = sprite( {
        context: canvas.getContext("2d"),
        w: 1740,
        h: 210,
        img: dinoImage,
        numberOfFrame: 10,
        tickPerFrame: 5,
        x: 0,
        y: canvas.height - 210
    });

    dinoImage.src = "images/character/dino.png";

    function gameLoop() {
        requestAnimationFrame(gameLoop)
        canvas.getContext("2d").clearRect(0,0, canvas.width, canvas.height);

        dino.update();
        dino.render();
    }

    return that;
}