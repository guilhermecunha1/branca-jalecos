const logoutButton = document.getElementById("logoutButton");
const logoutConfirm = document.getElementById("logoutConfirm");
const overlay = document.getElementById("overlay");
const cancelLogout = document.getElementById("cancelLogout");


if(logoutButton){

    logoutButton.addEventListener("click", (event)=>{

        event.preventDefault();

        logoutConfirm.classList.add("show");
        overlay.classList.add("show");

    });

}


function closeLogout(){

    logoutConfirm.classList.remove("show");
    overlay.classList.remove("show");

}


if(cancelLogout){

    cancelLogout.addEventListener("click", closeLogout);

}


if(overlay){

    overlay.addEventListener("click", closeLogout);

}