let shuffledQuestions;
let currentIndex;
let correctAnswers = 0;
let name;


function getQuestions(route) {
    return axios({
        method: 'get',
        url: route
    }).then(response => {
        return response.data;
    });
}

swal({
    content: {
      element: "input",
      attributes: {
        placeholder: "coloca tu nombre",
        type: "text",
      },
    },
  }).then(data=>{
    console.log("data", data);
    name=data;
  })

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
    const question = shuffledQuestions[n];
    selectElementById("categoria").innerHTML = question.categoria;
    selectElementById("pregunta").innerHTML = question.pregunta;
    selectElementById("imagen").setAttribute("src" ,question.imagen);
    selectElementById("imagen").style.objectFit = question.objectFit;
    const respuestas = shuffleArray([question.respuesta, question.incorrecta1, question.incorrecta2, question.incorrecta3]);
    for (let i = 1; i < 5; i++){
        const button = selectElementById("btn"+i);
        button.innerHTML = respuestas[i - 1];
        button.addEventListener('click', buttonClick);
        button.style.backgroundColor = 'white';
    }
}

function buttonClick() {
    const btns = document.querySelectorAll(".btn");
    const question = shuffledQuestions[currentIndex];
    if(question.respuesta === this.innerHTML){
        correctAnswers++;
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
            title: `FELICITACIONES ${name}`,
            text: `Terminaste el Cuestionario contestaste ${correctAnswers}/${shuffledQuestions.length}`,
            icon: "success",
            button: "Finalizar",
        });
    }
  }, 2000)
}

