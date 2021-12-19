var usuari = sessionStorage.usuari; //Guardem la variable usuari escrita per l'altre script
document.getElementById("nomUsuari").innerHTML = usuari;
localStorage.removeItem('usuari'); //Netejem el localStorage

//Guardem els diferents elements del document html en variables:
const slideracc = document.getElementById("mark-slider");

const marksbutton = document.getElementById("cont-marks");
const timetablesbutton = document.getElementById("cont-timetables");
const tasksbutton = document.getElementById("cont-tasks");

const subjectmark = document.getElementById("subject-mark");
const namemark = document.getElementById("name-mark");
const output = document.getElementById("result-mark");
const lower = document.getElementById("lower");
const equals = document.getElementById("equals");
const greater = document.getElementById("greater");
const none = document.getElementById("noMarks");

const exit = document.getElementById("meVoy");

const tasksubj = document.getElementById("task-subj");
const taskname = document.getElementById("task-name");
const date = document.getElementById("task-date");
const lowert = document.getElementById("lowert");
const equalst = document.getElementById("equalst");
const greatert = document.getElementById("greatert");
const nonet = document.getElementById("noMarkst");

const timehour = document.getElementById("time-hour");
const timename = document.getElementById("subject-time");
const classname = document.getElementById("time-class");
const dayt = document.getElementById("dayt");
const lowere = document.getElementById("lowere");
const equalse = document.getElementById("equalse");
const greatere = document.getElementById("greatere");
const nonee = document.getElementById("noMarkse");


const limt = document.getElementById("lim-t");
const lime = document.getElementById("lim-e");
const limm = document.getElementById("lim-m");




slideracc.addEventListener("input", onSlider); //Quan es modifica l'slider actualitzem el valor

function onSlider() {
    output.innerHTML = slideracc.value / 10;
}

exit.addEventListener("click", (e) => { //Quan es clica el botó de exit fem el logout
    e.preventDefault();
    var req = new XMLHttpRequest();

    url = "http://192.168.1.133:4344?d";
    req.open('GET', url);
    req.onload = function() {
        if (req.readyState == 4 && req.status == 200) {
            if (req.responseText == "error") {
            } else {
                location.href = "http://192.168.1.133:5500/inicio.html"; //Si tot va bé tornem a la pàgina de login
            }
        } else {
            alert("No response");
        }
    };
    req.send();
});


marksbutton.addEventListener("click", (e) => { //Get al servidor, cas marks
    var primero = 1; //Aquesta variable ens servirà per saber si afegir & o no, és a dir saber si anteriorment s'ha afegit alguna restriccio
    e.preventDefault();
    var url = "http://192.168.1.133:4344?marks?";
    var req = new XMLHttpRequest();
    if (lower.checked) { //En funcio del check button activat afegim una restricció o una altra
        url += "mark[lt]=" + slideracc.value / 10;
        primero = 0;
    } else if (greater.checked) {
        url += "mark[gte]=" + slideracc.value / 10;
        primero = 0;
    } else if (equals.checked) {
        url += "mark=" + slideracc.value / 10;
        primero = 0;
    }

    if (subjectmark.value != "Subject") { //En funcio del dropdown seleccionat...
        if (!primero) url += "&";
        else primero = 0;
        url += "subject=" + subjectmark.value;
    }
    if (namemark.value != "") { //Si s'especifica algun nom concret
        if (!primero) url += "&";
        else primero = 0;
        url += "name=" + namemark.value;
    }

    if (limm.value != 0) { //Si es posa algun limit
        if (!primero) url += "&";
        url += "limit=" + limm.value;
    }



    req.open('GET', url);
    req.onload = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log(req.responseText);
            if (req.responseText == "[]") {

            } else { //Si la resposta no és buida creem la taula i movem la pantalla cap a la mateixa
                crearTaula(req.responseText);
                document.getElementById("primeraFila").scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            alert("No response");
        }
    };
    req.send();




})



tasksbutton.addEventListener("click", (e) => { //Fem l'equivalent per tasks
    var primero = 1;
    e.preventDefault();
    var url = "http://192.168.1.133:4344?tasks?";
    var req = new XMLHttpRequest();

    if (lowert.checked) {
        url += "date[lt]=" + date.value;
        primero = 0;
    } else if (greatert.checked) {
        url += "date[gte]=" + date.value;
        primero = 0;
    } else if (equalst.checked) {
        url += "date=" + date.value;
        primero = 0;
    }
    if (tasksubj.value != "Subject") {
        if (!primero) url += "&";
        else primero = 0;
        url += "subject=" + tasksubj.value;
    }
    if (taskname.value != "") {
        if (!primero) url += "&";
        else primero = 0;
        url += "name=" + taskname.value;
    }
    if (limt.value != 0) {
        if (!primero) url += "&";
        url += "limit=" + limt.value;
    }

    req.open('GET', url);
    req.onload = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log(req.responseText);
            if (req.responseText == "[]") {

            } else {
                crearTaula(req.responseText);
                document.getElementById("primeraFila").scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            alert("No response");
        }
    };
    req.send();
});

timetablesbutton.addEventListener("click", (e) => {//Fem l'equivalent per el timetables
    var primero = 1;
    e.preventDefault();
    var url = "http://192.168.1.133:4344?timetable?";
    var req = new XMLHttpRequest();

    if (lowere.checked) {
        url += "hour[lt]=" + timehour.value;
        primero = 0;
    } else if (greatere.checked) {
        url += "hour[gte]=" + timehour.value;
        primero = 0;
    } else if (equalse.checked) {
        url += "hour=" + timehour.value;
        primero = 0;
    }

    if (classname.value != "") {
        if (!primero) url += "&";
        else primero = 0;
        url += "room=" + classname.value;
    }
    if (timename.value != "Subject") {
        if (!primero) url += "&";
        else primero = 0;
        url += "subject=" + timename.value;
    }
    if (dayt.value != "Day") {
        if (!primero) url += "&";
        url += "day=" + dayt.value;
    }

    if (lime.value != 0) {

        if (!primero) url += "&";
        url += "limit=" + lime.value;
    }

    req.open('GET', url);
    // // console.log("sss");
    req.onload = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log(req.responseText);
            if (req.responseText == "[]") {

            } else {
                crearTaula(req.responseText);
                document.getElementById("primeraFila").scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            alert("No response");
        }
    };
    req.send();
})

function crearTaula(resposta) {
    let dades = JSON.parse(resposta);
    let primera = true;
    //Creem primera fila 
    let head = document.querySelector('#primeraFila');
    var s = "\n<tr>\n";
    Object.keys(dades[0]).forEach((key) => { //Agafem un objecte i ens quedem amb les claus, que ens defineixen la primera fila
        s += `<th>${key}</th>\n`;
    });
    s += "</tr>";
    head.innerHTML = s;

    //Creem cos de la taula:
    let cos = document.querySelector('#cosTaula');
    s = "\n<tr>\n";
    for (let item of dades) {
        Object.keys(item).forEach((key) => {
            if (key == "date") {
                var d = item[key].split("T"); //Per tal de complir amb el format esperat ens quedem amb el que va abans de T
                s += `<td>${d[0]}</td>\n`;
            } else
                s += `<td>${item[key]}</td>\n`;
        });
        s += "</tr>";
        cos.innerHTML = s;
    }
}