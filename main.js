var startTime = Date.now(),
    beingPressed = [], // contains keys currently being pressed: keycode, keyDownTimestamp
    keystrokeLog = []; // contains keystrokes logged: keycode, keyDownTimestamp, keyUpTimestamp

document.addEventListener('keydown', keyDownEvent, true);
document.addEventListener('keyup', keyUpEvent, true);

function keyDownEvent(e) {
    var timeStamp = Date.now() - startTime;

    // if not being pressed down before
    if (getIndex(e.keyCode, beingPressed) == -1) {
        // store in beingPressed
        beingPressed.push({ keycode: e.keyCode, keyDownTimestamp: timeStamp });
    }

}

function keyUpEvent(e) {
    var timeStamp = Date.now() - startTime,
        index = getIndex(e.keyCode, beingPressed);

    // error handling, key was not pushed before
    if (index == -1) {
        console.log('WARN: key was not down before, code: ' + e.keyCode);
        keystrokeLog.push({ keycode: e.keyCode, keyDownTimestamp: -1, keyUpTimestamp: timeStamp });
        return false;
    }

    // add keyUp timestamp
    beingPressed[index].keyUpTimestamp = timeStamp;
    // store info
    keystrokeLog.push(beingPressed[index]);
    // echo on console
    console.log(beingPressed[index]);
    // delete from beingPressed
    beingPressed.splice(index, 1);
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