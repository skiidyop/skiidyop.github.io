var fps = 120;
var crouchKey = 'c';
var jumpKey = ' ';
var crouchTime = -1;
var jumpTime = -1;
var ready = true;
var tries = 0;
var successes = 0;
var totalDelay = 0;
var jumpChanging = false;
var crouchChanging = false;

function calcSGlide() {
    var oneFrame = Math.floor(1000/fps);
    var timing = crouchTime-jumpTime;
    var delay = timing-oneFrame;

    if (timing < 0) {
        return "crouched before jumped";
    } else if (delay >= 0 && delay < oneFrame) {
        successes += 1;
        totalDelay += delay;
        return "superglide successful";
    } else if (delay > 0) {
        totalDelay += delay;
        return "crouched " + delay + " ms late" ;
    } else if (delay < 0) {
        totalDelay += delay;
        return "crouched " + (delay * -1) + " ms early";
    }
    
}

function changeIndicators() {
    document.getElementById('success').innerHTML = (Math.floor(successes/tries * 10000)/100) + '%';
    document.getElementById('timing').innerHTML = (Math.floor(totalDelay/tries * 100)/100)+ ' ms';
    if (jumpTime != -1) {
        document.getElementById('jumpInd').style.backgroundColor = 'green';
    } else {
        document.getElementById('jumpInd').style.backgroundColor = 'red';
    }

    if (crouchTime != -1) {
        document.getElementById('crouchInd').style.backgroundColor = 'green';
    } else {
        document.getElementById('crouchInd').style.backgroundColor = 'red';
    }
}

function displayResults(result) {
    document.getElementById('results').innerHTML = result;
    setTimeout(function(){
        document.getElementById('results').innerHTML = 'Ready';
        ready = true;
        crouchTime = -1;
        jumpTime = -1;
        changeIndicators();
    }, 1500)
}

document.addEventListener('keydown', (event) => {
    if (!ready) {
        return;
    }
    if (event.key == jumpKey) {
        jumpTime = new Date().getTime();
    }
    if (event.key == crouchKey) {
        crouchTime = new Date().getTime();
    }
    
    if (crouchTime!=-1 && jumpTime!=-1) {
        ready = false;
        tries += 1;
        displayResults(calcSGlide());
    }
    changeIndicators();
})

function changeFps(input) {
    fps = input.value;
}

function changeKey(keyType) {
    if (keyType === 'jump') {
        document.getElementById('jump').style.borderColor = 'red';
        jumpChanging = true;
    } else if (keyType === 'crouch') {
        document.getElementById('crouch').style.borderColor = 'red';
        crouchChanging = true;
    }
}

document.addEventListener('keydown', function(event) {
    console.log(jumpChanging);
    
    if (jumpChanging) {
        console.log(event.key)
        jumpKey = event.key;
        document.getElementById('jump').innerHTML = event.key;
        document.getElementById('jump').style.borderColor = 'green';
        jumpChanging = false;
    }
    if (crouchChanging) {
        crouchKey = event.key;
        document.getElementById('crouch').innerHTML = event.key;
        document.getElementById('crouch').style.borderColor = 'green';
        crouchChanging = false;
    }
});