let shuffledQuestions;
let currentIndex;

function getQuestions(route) {
    return axios({
        method: 'get',
        url: route
    }).then(response => {
        return response.data;
    });
}

getQuestions("base-preguntas.json")
    .then(questions => {
        shuffledQuestions = shuffleArray(questions);
        pickQuestion(0);
    });

function selectElementById(id) {
    return document.getElementById(id);
}

function shuffleArray(array) {
    return array.sort((_a, _b) => 0.5 - Math.random());
}

function pickQuestion(n) {
    currentIndex = n;
    let question = shuffledQuestions[n];
    selectElementById("categoria").innerHTML = question.categoria;
    selectElementById("pregunta").innerHTML = question.pregunta;
    selectElementById("imagen").setAttribute("src" ,question.imagen);
    selectElementById("imagen").style.objectFit = question.objectFit;
    const respuestas = shuffleArray([question.respuesta, question.incorrecta1, question.incorrecta2, question.incorrecta3]);
    for (let i = 1; i < 5; i++){
        let button = selectElementById("btn"+i);
        button.innerHTML = respuestas[i - 1];
        button.addEventListener('click', buttonClick);
        button.style.backgroundColor = 'white';
    }
}

function buttonClick() {
    let question = shuffledQuestions[currentIndex];
    const btns = document.querySelectorAll(".btn");
    if(question.respuesta === this.innerHTML){
        btns.forEach(btn => {
            btn.style.backgroundColor = btn.innerHTML === question.respuesta ? "green" : "red";
        });
    } else {
        btns.forEach(btn => {
            if(btn.innerHTML === question.respuesta ) {
                btn.style.backgroundColor = "green";
            }
        })
        this.style.backgroundColor = "red";
    }
    nextQuestion();
}

function nextQuestion(){
  setTimeout(() => {
    if(currentIndex + 1 < shuffledQuestions.length) { 
        pickQuestion(currentIndex + 1);
    } else {
        swal({
            title: "FELICITACIONES",
            text: "Terminaste el Cuestionario",
            icon: "success",
            button: "Finalizar",
        });
    }
  }, 2000)
}
