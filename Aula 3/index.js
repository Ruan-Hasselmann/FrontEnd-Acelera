let IntervId;
let iniciado = false;

function start() {
	if (!iniciado) {
  	document.querySelector('#contador').style.color = 'black';
    IntervId = setInterval(function () {
          document.querySelector('[id="contador"]').textContent = relogio();  	
    }, 1000);
    iniciado = true;
  }
}

function relogio() {
		let hoje = new Date();
		let hora = hoje.getHours().toString().padStart(2, '0');
    let minuto = hoje.getMinutes().toString().padStart(2, '0');
    let segundo = hoje.getSeconds().toString().padStart(2, '0');
    
    return `${hora}:${minuto}:${segundo}`;
}

function stop(){
	if (iniciado) {
  	iniciado = false;
		document.querySelector('#contador').style.color = 'red';
		clearInterval(IntervId);
  }
}

function shutdown(){
	clearInterval(IntervId);
	document.querySelector('[id="contador"]').textContent = "";  	
}
