
// const camera = document.getElementById('source-video-cam');
const camera = document.querySelector(`[data-draggable="true"]`);



//basic positioning 
let cameraTop = "75vh";
let cameraLeft = "1vw";

//moving camera box ondrag
const dragElement = (elmnt) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (window.innerWidth > window.innerHeight && window.innerWidth / window.innerHeight < 16 / 8) {
        /* if present, the header is where you move the DIV from:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (!window.innerWidth < 600) {
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        //when screen is not a phone or is an extra large width
        if (!(window.innerWidth / window.innerHeight < 5 / 6) && !(window.innerWidth / window.innerHeight > 16 / 8)) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            cameraTop = (elmnt.offsetTop - pos2) + "px";
            cameraLeft = (elmnt.offsetLeft - pos1) + "px";
            //convert to percentage
            cameraTop = (parseInt(cameraTop) / window.innerHeight) * 100 + "vh";
            cameraLeft = (parseInt(cameraLeft) / window.innerWidth) * 100 + "vw";

            elmnt.style.top = cameraTop;
            elmnt.style.left = cameraLeft;

        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
dragElement(camera);

//onscreensize change
window.addEventListener('resize', () => {

    if (window.innerWidth / window.innerHeight < 5 / 6) {
        camera.style.left = '0px';
        camera.style.top = '50%';

    } else {
        if (window.innerWidth / window.innerHeight > 16 / 8) {
            camera.style.left = '0px';
            camera.style.top = '0px';
        }
        else {
            camera.style.top = cameraTop;
            camera.style.left = cameraLeft;
        }
    }

}
);
