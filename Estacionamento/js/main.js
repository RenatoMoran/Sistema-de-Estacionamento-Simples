document.getElementById('formulario').addEventListener('submit',cadastraVeiculo);

function cadastraVeiculo(e){
	var modelocarro = document.getElementById('modelocarro').value;
	var placacarro = document.getElementById('placacarro').value;
	var time = new Date();

	// Impede de cadastrar um carro com dados vazios!
	if(!modelocarro || !placacarro){
		alert("Favor preencher os campos em branco!");
		return false;
	}

	// Cria uma varíavel para armazenar os valores do form
	var carro = {
		modelo: modelocarro,
		placa: placacarro,
		hora: time.getHours(),
		minutos: time.getMinutes()

	}

	console.log(carro);

	// Inclui na Application do Developer Tools os valores que vem do form
	if( localStorage.getItem('patio2') === null ){
		var carros = [];
			carros.push(carro);
			localStorage.setItem('patio2',JSON.stringify(carros));
		
	}else{
		var carros = JSON.parse(localStorage.getItem('patio2'));
		carros.push(carro);
		localStorage.setItem('patio2',JSON.stringify(carros));
	}

	//e.preventDefault(); // Trava os valores na tela Application
}

function apagarVeiculo(placa){
	var carros = JSON.parse(localStorage.getItem('patio2'));

	for (var i = 0; i < carros.length; i++) {
		if (carros[i].placa == placa) {
			carros.splice(i,1);
		}
		localStorage.setItem('patio2',JSON.stringify(carros));
	}

	document.getElementById('formulario').reset();

	mostraPatio();

	e.preventDefault();
}

function mostraPatio(){
	var carros = JSON.parse(localStorage.getItem('patio2'));
	var carrosResultado = document.getElementById('resultados');

	carrosResultado.innerHTML = '';

	for(var i = 0 ; i < carros.length ; i++){
		var modelo = carros[i].modelo;
		var placa = carros[i].placa;
		var hora = carros[i].hora;
		var minutos = carros[i].minutos;

		carrosResultado.innerHTML += '<tr> <td>'+modelo+
							   '</td> <td>'+placa+
							   '</td> <td>'+hora+ ' : ' + minutos + '</td>'+
							   '<td><button class="btn btn-danger" onclick="apagarVeiculo(\''+placa+'\')">Excluir</button></td>'+
							   ' <tr>';
	}

}