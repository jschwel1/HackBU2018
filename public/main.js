function goForward(){
	$.ajax({
        type: "GET",
        url: "/goForward",
        success: function () { 
			console.log('test');
        }
});
}

function goBackward(){
	$.ajax({
        type: "GET",
        url: "/Backward",
        success: function () { 
			console.log('test');
        }
});
}
function goLeft(){
	$.ajax({
        type: "GET",
        url: "/Left",
        success: function () { 
			console.log('test');
        }
});
}
function goRight(){
	$.ajax({
        type: "GET",
        url: "/Right",
        success: function () { 
			console.log('test');
        }
});
}
function stop(){
	$.ajax({
        type: "GET",
        url: "/Stop",
        success: function () { 
			console.log('test');
        }
});
}
function goForwardLeft(){
        $.ajax({
        type: "GET",
        url: "/goForwardLeft",
        success: function () {
                        console.log('test');
        }
});
}
function goForwardRight(){
        $.ajax({
        type: "GET",
        url: "/goForwardRight",
        success: function () {
                        console.log('test');
        }
});
}
function goBackwardLeft(){
        $.ajax({
        type: "GET",
        url: "/goBackwardLeft",
        success: function () {
                        console.log('test');
        }
});
}
function goBackwardRight(){
        $.ajax({
        type: "GET",
        url: "/goBackwardRight",
        success: function () {
                        console.log('test');
        }
});
}


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
	goForward();
    }
    else if (e.keyCode == '40') {
        // down arrow
	goBackward();
    }
    else if (e.keyCode == '37') {
       // left arrow
	goLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
	goRight();
    }
    else if (e.keyCode == '32'){
        stop();
    }
}
