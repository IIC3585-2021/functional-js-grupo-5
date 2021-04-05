/*
FUNCIONAMIENTO 

1. pide los nombres en newGame y instancia usuarios con newUser
*Formato de entrada de nombres es nombre1,nombre2,nombre3 ...
2. Inicia las rondas con newRound, y avanza por la lista de usuarios 
recibiendo y ejecutando las jugadas
* Formato de jugadas es jugada1-jugada2-jugada3
* Cada jugada es DB/SB/num1,num2
* num1 es el ponderador: 1, 2 ó 3
* num2 es el número: 1...20

SUPUESTOS
- las jugadas siempre son de 3 dardos (no se puede ganar entremedio)
*/

var _ = require('lodash');

function newGame(){
  const message = "Ingrese 2 o más integrantes separados por una coma:"
  var players = [];
  do {var players = prompt(message).split(",").map(newUser)} while (players.length<2);
  do{newRound(players)} while (_.every(players, player => player.puntaje != 0));
}

function newUser(nombre){
  return persona = {
    nombre : nombre,
    puntaje : 501
}}

const validStr = (jugada) => jugada == 'DB' || jugada == 'SB';

const validNum = (num, limit) => _.range(1, limit + 1).includes(num);

const isStr = (thing) => typeof jugada === 'string';

const bulls = (jugadas) => jugadas.filter(jugada => !Array.isArray(jugada)).map(jugada => validStr(jugada)).reduce((a,b) => (a && b),true);

const nums = (jugadas) => jugadas.filter(jugada => Array.isArray(jugada)).map(jugada => validNum(jugada[0],3)&& validNum(jugada[1],20)).reduce((a,b) => (a && b),true);


function newRound([user, ...rest]){
  if(user){
    const ingreso = ingresar_jugada(user.nombre)(user.puntaje);
    var jugadas = []
    do {var jugadas = prompt(`Ingrese las 3 jugadas de ${user.nombre} separadas entre ellas por "-":`).split("-").map(clean) } while ((jugadas.length != 3)  || ! (nums(jugadas) && bulls(jugadas)));
    user.puntaje = ingreso(jugadas);
    if (user.puntaje == 0) {
      console.log(`FELICITACIONES ${user.nombre}!! HAS GANADO!!`);
    }
    else {
      newRound(rest);
    }
  }
}

const ingresar_jugada = (nombre) => {
    return (puntaje_inicial) => {
        return (array_jugadas) => {
            let puntaje_final = compose(restar_puntaje, puntos_restados)(puntaje_inicial, array_jugadas);
            console.log(`${nombre} ahora tiene puntaje ${puntaje_final}`);
            return puntaje_final;
        };
    };
};

function clean(sucio){
  var cada_jugada = Array.from(sucio.split(","))
  if (cada_jugada.length == 1){return _.upperCase(_.head(cada_jugada))}
  else{return cada_jugada.map( x => parseInt(x)) }
}

const puntos_restados = (array_jugadas) => {
    let resta_total = array_jugadas.map(puntos_jugada).reduce((a,b) => (a+b));
    return resta_total;
};

const restar_puntaje = (puntaje_inicial, puntos_restados) => {
    return Math.abs(puntaje_inicial-puntos_restados);
};

const compose = (a, b) => (d, c) => a(d, b(c));





const puntos_jugada = (resultado) => {
    let puntos = 0;
    if (resultado == 'SB'){
        puntos = 25;
    } else if (resultado == 'DB'){
        puntos = 50;
    } else {
        puntos = resultado[0]*resultado[1]
    };
    return puntos;
};

var game = newGame();




