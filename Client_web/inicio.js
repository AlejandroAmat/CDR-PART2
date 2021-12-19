var error_given = 0;
document.getElementById("cont-login").addEventListener('click', function(e) { //funcio onClick()
    e.preventDefault(); //evitem que faci el que per defecte fa ja que dóna problemes al fer canvi de pàgina
    var url = "http://192.168.1.133:4344?";
    var req = new XMLHttpRequest();
    let constraints = document.getElementById("p_input").value; //Guardem la contrassenya
    var fin_url = url + constraints; //Construim l'url

    req.open('GET', fin_url); 
    console.log("sss");
    req.onload = function() { 
        if (req.readyState == 4 && req.status == 200) { //Quan la resposta està preparada
            console.log(req.responseText);
            if (req.responseText == "error") { //Si no hi ha l'usuari a la base de dades mostrem error per pantalla
                if (!error_given) {
                    var err = document.getElementById("error-m");
                    err.insertAdjacentHTML("beforeend", '<p class="errormsg"> No such combination of password and user in DataBase');
                    error_given = 1;
                }
            } else {
                location.href = "http://192.168.1.133:5500/account.html"; //Si no hi ha error canviem a la pàgina de compte
                sessionStorage.setItem('usuari', req.responseText); //Guardem la resposta per poder accedir-hi des de l'altre script
            }
        } else {
            alert("No response");
        }
    };
    req.send();

});