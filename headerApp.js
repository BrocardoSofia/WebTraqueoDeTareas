//cuando el usuario scrolea ejecuta headerFunction
window.onscroll = function() {headerFunction()};

//obtengo el header
var header = document.getElementById("pageHeader");

var sticky = header.offsetTop;

function headerFunction(){
    if(window.pageYOffset > sticky){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
}