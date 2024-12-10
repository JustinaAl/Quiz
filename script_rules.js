let body = document.querySelector('body');

//Dark light function
function darkLight(){
    if(darkLightInput.checked){
        body.classList.add("light");
    }
    else{
        body.classList.remove("light");
    }
}

//Dark light mode button
darkLightInput.addEventListener("change",()=> darkLight());