let base_preguntas = readText("base-preguntas.json");
let interprete_bp = JSON.parse(base_preguntas);
let pregunta;

function escogerPregunta(n) {
  pregunta = interprete_bp[n]
  select_id("categoria").innerHTML = pregunta.categoria
  select_id("pregunta").innerHTML = pregunta.pregunta
  select_id("imagen").setAttribute("src" ,pregunta.imagen)
  style("imagen").objectFit = pregunta.objectFit
  const respuestas = mezclar([pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2, pregunta.incorrecta3]);
  select_id("btn1").innerHTML = respuestas[0]
  select_id("btn2").innerHTML = respuestas[1]
  select_id("btn3").innerHTML = respuestas[2]
  select_id("btn4").innerHTML = respuestas[3]
  select_id("btn1").addEventListener("click", oprimir_btn)
  select_id("btn2").addEventListener("click", oprimir_btn)
  select_id("btn3").addEventListener("click", oprimir_btn)
  select_id("btn4").addEventListener("click", oprimir_btn)
  select_id("btn1").style.backgroundColor = "white"
  select_id("btn2").style.backgroundColor = "white"
  select_id("btn3").style.backgroundColor = "white"
  select_id("btn4").style.backgroundColor = "white"
  console.log(respuestas)
}

function oprimir_btn(event) {
  const btns = document.querySelectorAll(".btn")
  console.log(event)
  if(pregunta.respuesta === this.innerHTML){
    btns.forEach(btn => {
      if(btn.innerHTML === pregunta.respuesta ) {
        btn.style.backgroundColor = "green"
      } else {
        btn.style.backgroundColor = "red"
      }
    });
  } else {
    btns.forEach(btn => {
      if(btn.innerHTML === pregunta.respuesta ) {
        btn.style.backgroundColor = "green"
      }
    })
    this.style.backgroundColor = "red"
  }

  setTimeout(() => {
    const indicePreguntaActual = preguntasMezcladas.indexOf(pregunta)
  if(indicePreguntaActual + 1 < preguntasMezcladas.length) { 
    escogerPregunta(indicePreguntaActual + 1)
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

function mezclar(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}

const preguntasMezcladas = mezclar(interprete_bp);

escogerPregunta(0)

function select_id(id) {
  return document.getElementById(id);
}



function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}/* request asincrono de http -- conocido como ajax */
