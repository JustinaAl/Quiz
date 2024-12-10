let body = document.querySelector('body');

if (localStorage.getItem('DarkLightMode') === 'light') {
    body.classList.add('light');
    darkLightInput.checked = true;
} else {
    body.classList.remove('light');
    darkLightInput.checked = false;
}

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