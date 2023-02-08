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

		//Crea el primer canvas
		var ctx = canvasHTML.getContext("2d");
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.strokeStyle = "red";
		ctx.stroke();
		// Guarda el canvas en una varible del OBJ
		this.context = ctx.canvas;
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.puntuacio = 0;
		// this.direccio = [vertical(y), horitizonal(x) ]
		this.direccio = [-1, 0];
		`[[0,0],[0,1],[0,2]]`
	

		//Agafa el canvas del OBJ canvas
		let canvas2HTML = this.context;
		var ctx2 = canvas2HTML.getContext("2d");
		ctx2.beginPath();
		//Iniciacion de la serpiente
		this.horizontalSerp = 20;
		this.verticalSerp = 20;
		ctx2.rect(this.horizontalSerp, this.verticalSerp, 20, 20);
		ctx2.sto
		ctx2.strokeStyle = "blue";
		ctx2.stroke();
		this.serpiente = ctx2;
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x, y, color) {
		/* segons la mida del canvas dibuixa un quadrat 
				fins a (amount), amount el tamanys de la serp
				entre el tamany de la cuadricula
		*/
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		array.forEach(element => {
			
		});
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
		this.food = [2,7];
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		// direccio [0,1] dreta ->
		// horitzontalSerp + 1
		// verticalSerp-20
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear();
		this.serp = this.newTile();
		this.drawSnake();
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		//Segons la posicio indica la direccio
		switch (e.keyCode) {
			case 38:
				console.log("ARRIBA");
				this.verticalSerp = this.verticalSerp - 20;
				break;
			case 37:
				console.log("IZQUIERDA");
				this.horizontalSerp = this.horizontalSerp - 20;
				break;
			case 39:
				console.log("DERECHA");
				this.horizontalSerp = this.horizontalSerp + 20;
				break;
			case 40:
				console.log("ABAJO");
				this.verticalSerp = this.verticalSerp + 20;

				break;
			default:
				console.log(e.keyCode);
				break;
		}
		/* Si la serpiente se pasa del recuadro se resetea la posicion*/
		if (this.horizontalSerp == 300) {
			this.horizontalSerp = 0;
		}
		/* Si la serpiente se pasa del recuadro se resetea la posicion*/
		if (this.verticalSerp == 300) {
			this.verticalSerp = 0;
		}
		/* Si la serpiente se pasa del recuadro se resetea la posicion*/
		if (this.horizontalSerp < 0) {
			this.horizontalSerp = 300;
		}

		if (this.verticalSerp < 0) {
			this.verticalSerp = 300;
		}
		/*NO HACE CLEAR, HAY QUE CAMBIARLO */

		this.serpiente.rect(0, 0, 300, 300);
		this.serpiente.strokeStyle = "red";

		//this.serpiente.rect(this.horizontalSerp, this.verticalSerp, 20, 20)
		this.serpiente.stroke()
		/* la serpiente deberia crearse en step() cada vez*/
		console.log(this.horizontalSerp, this.verticalSerp);

	}
}

let game = new Game(300, 300, 15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game), 100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
console.log("hola");

//Comenza el joc amb la serp al mitg
game.start()