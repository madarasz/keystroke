var startTime = Date.now(),
    beingPressed = [], // contains keys currently being pressed: keycode, keyDownTimestamp
    keystrokeLog = [], // contains keystrokes logged: keycode, keyDownTimestamp, keyUpTimestamp
    mouseLog = [];     // contains mouse movements logged: type (movement, buttonDown, buttonUp), x, y, timestamp, [mousecode]

document.addEventListener('keydown', keyDownEvent, false);
document.addEventListener('keyup', keyUpEvent, false);
window.onmousemove = mouseMoveEvent;
document.addEventListener('mousedown', mouseButtonEvent, false);
document.addEventListener('mouseup', mouseButtonEvent, false);

// when a key pressed down
function keyDownEvent(event) {
    var timeStamp = Date.now() - startTime;

    // if not being pressed down before
    if (getIndex(event.which, beingPressed) == -1) {
        // store in beingPressed
        beingPressed.push({ keycode: event.which, keyDownTimestamp: timeStamp });
    }

}

// when a key is let go
function keyUpEvent(event) {
    var timeStamp = Date.now() - startTime,
        index = getIndex(event.which, beingPressed);

    // error handling, key was not pushed before
    if (index == -1) {
        console.log('WARN: key was not down before, code: ' + event.which);
        keystrokeLog.push({ keycode: event.which, keyDownTimestamp: -1, keyUpTimestamp: timeStamp });
        return false;
    }

    // add keyUp timestamp
    beingPressed[index].keyUpTimestamp = timeStamp;
    // store info
    keystrokeLog.push(beingPressed[index]);
    // echo on console
    console.log('"' + keyboardMap[beingPressed[index].keycode] +'"', beingPressed[index]);
    // delete from beingPressed
    beingPressed.splice(index, 1);
}

// when the mouse is moved
function mouseMoveEvent(event) {
    event = event || window.event; // handle IE

    var timeStamp = Date.now() - startTime,
        movement = { type: 'movement', x: event.pageX, y: event.pageY, timestamp: timeStamp };

    mouseLog.push(movement);
    console.log(movement);
}

function mouseButtonEvent(event) {
    var timeStamp = Date.now() - startTime,
        click = { type: event.type, x: event.pageX, y: event.pageY, timestamp: timeStamp, mousecode: event.button };

    mouseLog.push(click);
    console.log(click);
}

// gives back index of keycode in array
function getIndex(keycode, keyArray) {
    for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i].keycode == keycode) {
            return i;
        }
    }

    // not found
    return -1;
}