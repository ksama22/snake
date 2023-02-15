/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {

	/**
	 * Inicialitza els paràmetres del joc i crea el canvas
	 * @constructor
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 * @param {number} amount -  nombre de quadrats per fila de la quadrícula
	 */

	constructor(width, height, amount) {
		this.width = width;
		this.height = height;
		this.amount = amount;
		this.initCanvas(width, height);
		this.start();
		//on comenza la serp com a direccio
		this.direccioSerp = [1, 0];
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas(width, height) {
		let canvasHTML = document.createElement("canvas");
		canvasHTML.id = "myCanvas";
		canvasHTML.width = width;
		canvasHTML.height = height;
		document.getElementById("piton").appendChild(canvasHTML);
		this.canva = canvasHTML.getContext("2d");
		this.serp = [[0, 0], [1, 0]];
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.canva.beginPath();
		this.canva.rect(0, 0, this.width, this.height);
		this.canva.stroke();
		this.addFood();
		this.puntuacio = 0;
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x, y, color) {
		let tamanyHeight = this.height / this.amount;
		let tamanyWidth = this.width / this.amount;
		this.canva.beginPath();
		this.canva.rect(tamanyWidth * x, tamanyHeight * y, tamanyHeight, tamanyWidth);
		this.canva.strokeStyle = color;
		this.canva.stroke();
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.canva.clearRect(0, 0, this.width, this.height);
		this.canva.beginPath();
		this.canva.rect(0, 0, this.width, this.height);
		this.canva.stroke();
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {

		for (let i = 0; i < this.serp.length; i++) {
			this.drawSquare(this.serp[i][0], this.serp[i][1], "green");
		}
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		this.drawSquare(this.poma[0], this.poma[1], "red");
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x, y) {
		if (this.serp[this.serp.length - 1][0] == x && this.serp[this.serp.length - 1][1] == y) {
			return true;
		}
		return false;
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		this.poma = [4, 5];
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		//Actualiza la nueva posicion de la serpiente
		let nouX = (this.serp[this.serp.length - 1][0] + this.direccioSerp[0]);
		let nouY = (this.serp[this.serp.length - 1][1] + this.direccioSerp[1]);
		//Borra el ultimo
		this.serp.shift();
		//Añade el primero
		this.serp.push([nouX, nouY]);


		for (let i = 0; i < this.serp.length; i++) {
			//Si la serp surt del limits, torna apareixa
			if (this.serp[i][0] == this.amount) this.serp[i][0] = 0;
			if (this.serp[i][1] == this.amount) this.serp[i][1] = 0;
			if (this.serp[i][0] < 0) this.serp[i][0] = this.amount;
			if (this.serp[i][1] < 0) this.serp[i][1] = this.amount;
		}

	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear()
		this.drawSnake();
		this.newTile();
		this.drawFood();

		if (this.collides(this.poma[0], this.poma[1])) {
			this.poma = [randInt(0, 14), randInt(0, 14)];
			//Tindria que NO fer el shift
			this.serp.unshift(this.serp.length - 1)
			//this.serp.unshift(this.serp[0])
			this.puntuacio++;
		}
		
		//console.log("Wii");
		//Actualitza la puntuacio
		document.getElementById("puntos").innerText = this.puntuacio;
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		switch (e.keyCode) {
			case 38:
				//console.log("ARRIBA");
				this.direccioSerp = [0, -1];
				break;
			case 37:
				//console.log("IZQUIERDA");
				this.direccioSerp = [-1, 0];
				break;
			case 39:
				//console.log("DERECHA");
				this.direccioSerp = [1, 0];
				break;
			case 40:
				//console.log("ABAJO");
				this.direccioSerp = [0, 1];
				break;
			default:
				//console.log(e.keyCode);
				break;
		}
	}
}
let game = new Game(500, 500, 15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game), 200); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms

function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}