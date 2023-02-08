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
		this.serp = [0, 1];
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.canva.beginPath();
		this.canva.rect(0, 0, this.width, this.height);
		this.canva.stroke();
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
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		this.drawSquare(this.serp[0], this.serp[1], "blue");
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x, y) {
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear()
		this.start();
		this.drawSnake();
		//La serp es mou horitzontal
		//this.serp[0] = this.serp[0] + 1;

		//La serp es mou en vertical
		this.serp[0] = this.serp[0] + 1;

		//Si la serp surt del limits, torna apareixa
		if (this.serp[0] == 15) this.serp[0] = 0;
		if (this.serp[1] == 15) this.serp[1] = 0;
		if (this.serp[0] < 0) this.serp[0] = 15;
		if (this.serp[1] < 0) this.serp[1] = 15;
		console.log("Wii");
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		switch (e.keyCode) {
			case 38:
				console.log("ARRIBA");
				break;
			case 37:
				console.log("IZQUIERDA");
				break;
			case 39:
				console.log("DERECHA");
				break;
			case 40:
				console.log("ABAJO");
				break;
			default:
				console.log(e.keyCode);
				break;
		}
	}
}

let game = new Game(300, 300, 15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game), 100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
