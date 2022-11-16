import * as w4 from "./wasm4";

// Import Entities
import { Character } from "./entitys/character";
import { Obstacle } from "./entitys/obstacle";

// Import Scenes
import { PlayerMenu } from "./scenes/player-menu";

const player = new Character();
const navi = new Character();
const enemy = new Character();
const obstacle = new Obstacle();

const playerMenu = new PlayerMenu();

// Objects position
player.vetor2.x = 90-8; player.vetor2.y = 80-8;

enemy.vetor2.x = 30-8; enemy.vetor2.y = 40-8;
navi.vetor2.x = 60-8; navi.vetor2.y = 70-8;
navi.size[0] = 4; navi.size[1] = 4;

// Constants
const gamepad = load<u8>(w4.GAMEPAD1);
let prevState: u8;

// GeneralChecks
let frameCount = 0;
let menuOn:boolean = false;
let gameRunning:boolean = true;

// Start before main loop
export function start (): void{
		
}
// Main Loop
export function update (): void {

	frameCount++;
	
	obstacle.draw(40,0,20,40);
	obstacle.draw(60,0,20,40);
	obstacle.draw(100,0,20,40);
	obstacle.draw(80,0,20,40);
	obstacle.draw(20,0,20,60);
	obstacle.draw(120,0,20,60);
	obstacle.draw(0,0,20,60);
	obstacle.draw(140,0,20,60);
	//obstacle.draw(40,40,80,80);
	
	// Checa colisão do obstacle.draw mais recente (ultimo)
	var testList = [obstacle, obstacle];
	if(player.collisionObjects(testList)[1]){
		w4.text("Coll. Obj: true", 2, 16);
	}
	else {
		w4.text("Coll. Obj: false", 2, 16);
	}
	
	input();
	
	if(gameRunning){
		naviMove();
		enemy.vetor2.followVetor(player.vetor2, frameCount, 5);
	}
    
    if(player.collision(enemy)){
		enemy.color = 0x0031;
		w4.text("Collision: true", 2, 2);
	}
	else {
		w4.text("Collision: false", 2, 2);
		enemy.color = 0x0024;
	}
	
	enemy.draw();
	navi.draw();
	player.draw();
	
	if(menuOn){
		playerMenu.draw();
	}

}

export function input(): void {
    const gamepad = load<u8>(w4.GAMEPAD1);
    
    const PressedThisFrame = gamepad & (gamepad ^ prevState);
	prevState = gamepad;

	if(gameRunning){
		if (gamepad & w4.BUTTON_UP)
			player.vetor2.movement(0,-1);
		if (gamepad & w4.BUTTON_DOWN)
			player.vetor2.movement(0,1);
		if (gamepad & w4.BUTTON_LEFT)
			player.vetor2.movement(-1,0);
		if (gamepad & w4.BUTTON_RIGHT)
			player.vetor2.movement(1,0);
	}
	if(menuOn){
		if (PressedThisFrame & w4.BUTTON_UP)
			playerMenu.selectedOption -= 1;
		if (PressedThisFrame & w4.BUTTON_DOWN)
			playerMenu.selectedOption += 1;
		if (PressedThisFrame & w4.BUTTON_2)
			playerMenu.executeOption();
	}
	if (PressedThisFrame & w4.BUTTON_1){
		menuOn = !menuOn;
		gameRunning = !menuOn;
		w4.text("Menu: on", 2, 16);
	}		
}
//function inputOnMenu(): i32{
	//const gamepad = load<u8>(w4.GAMEPAD1);
	//const PressedThisFrame = gamepad & (gamepad ^ prevState);
	//prevState = gamepad;
	
    //if (PressedThisFrame & w4.BUTTON_2){
		//w4.trace("teste")
		//return 5;
	//}
	//return 0;
//}

export function naviMove():void{
	if (frameCount % 3 == 0){
		navi.vetor2.movement(player.vetor2.x - navi.vetor2.x - 5,
							 player.vetor2.y - navi.vetor2.y - 5);
	}
}
