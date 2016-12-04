// `input` will be defined elsewhere, it's a means
// for us to capture the state of input from the player

var startScreen = (function(input) {

    // the red component of rgb
    var hue = 0; 
    // are we moving toward red or black?
    var direction = 1; 
    var transitioning = false;

    // record the input state from last frame
    // because we need to compare it in the
    // current frame
    var wasButtonDown = false;

    // a helper function
    // used internally to draw the text in
    // in the center of the canvas (with respect
    // to the x coordinate)
    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    }
    
    // draw the main menu to the canvas
    function draw(ctx, elapsed) {
        
        // let's draw the text in the middle of the canvas
        // note that it's ineffecient to calculate this 
        // in every frame since it never changes 
        // however, I leave it here for simplicity
        var y = ctx.canvas.height / 2;
        
        // create a css color from the `hue`
        var color = 'rgb(' + hue + ',0,0)';
        
        // clear the entire canvas
        // (this is not strictly necessary since we are always
        // updating the same pixels for this screen, however it
        // is generally what you need to do.)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw the title of the game
        // this is static and doesn't change
        ctx.fillStyle = 'white';
        ctx.font = '48px monospace';
        centerText(ctx, 'My Awesome Game', y);

        // draw instructions to the player
        // this animates the color based on the value of `hue`
        ctx.fillStyle = color;
        ctx.font = '24px monospace';
        centerText(ctx, 'click to begin', y + 30);
    }

    // update the color we're drawing and
    // check for input from the user
    function update() {
        // we want `hue` to oscillate between 0 and 255
        hue += 1 * direction;
        if (hue > 255) direction = -1;
        if (hue < 0) direction = 1;
        
        // note that this logic is dependent on the frame rate,
        // that means if the frame rate is slow then the animation
        // is slow. 
        // we could make it indepedent on the frame rate, but we'll 
        // come to that later.

        // here we magically capture the state of the mouse
        // notice that we are not dealing with events inside the game
        // loop.
        // we'll come back to this too.
        var isButtonDown = input.isButtonDown();

        // we want to know if the input (mouse click) _just_ happened
        // that means we only want to transition away from the menu to the
        // game if there _was_ input on the last frame _but none_ on the 
        // current one.
        var mouseJustClicked = !isButtonDown && wasButtonDown;

        // we also check the value of `transitioning` so that we don't 
        // initiate the transition logic more the once (like if the player
        // clicked the mouse repeatedly before we finished transitioning)
        if (mouseJustClicked && !transitioning) {
            transitioning = true;
            // do something here to transition to the actual game
        }

        // record the state of input for use in the next frame
        wasButtonDown = isButtonDown;
    }

    // this is the object that will be `startScreen`
    return {
        draw: draw,
        update: update
    };

}());