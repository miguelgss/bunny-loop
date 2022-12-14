import * as w4 from "../wasm4";
import { Character } from "../entitys/character";

export class Battle{
	options: string[] = ['Act', 'Def', 'Run'];
	selectedOption:i32 = 0;
	enemySprite:usize[] = [];
	battleOn: boolean = false;
	
	battleFrameCount: i32 = 0;
	frameNumber: i32 = 0;
	frameYAnimation: i32[] = [32, 33, 34, 35, 36, 36, 35, 34, 33, 32]
	
	draw() : void {
		
		this.battleFrameCount++;
		if(this.selectedOption > this.options.length - 1){
			w4.trace(`Antes DOWN: ${this.selectedOption}`);
			this.selectedOption = 0;
			w4.trace(`Depois DOWN: ${this.selectedOption}`);
		}
			
		if(this.selectedOption < 0){
			w4.trace(`Antes UP: ${this.selectedOption}`);
			this.selectedOption = this.options.length - 1;
			w4.trace(`Depois UP: ${this.selectedOption}`);
		}
		
		store<u16>(w4.DRAW_COLORS, 0x0034);
		w4.rect(0,0,160,160);
		
		store<u16>(w4.DRAW_COLORS, 0x0012);
		w4.rect(10,10,140,80);
		
		store<u16>(w4.DRAW_COLORS, 0x0012);
		w4.rect(10,90,140,60);
		
		if(this.battleFrameCount % 8 == 0){
			this.frameNumber++;
		}
		if(this.frameNumber >= this.frameYAnimation.length){
			this.frameNumber = 0;
		}
		
		store<u16>(w4.DRAW_COLORS, 0x1234);
		w4.blit(this.enemySprite[0], 64, this.frameYAnimation[this.frameNumber], 32, 32, 1);
		
		for(let i:i32 = 0; i < this.options.length; i++){
			if (i == this.selectedOption)
				store<u16>(w4.DRAW_COLORS, 1);
			else
				store<u16>(w4.DRAW_COLORS, 3);
				
			w4.text(this.options[i], (i * 30) + 35, 120);
		}
	}	
	
	executeOption():void{
		switch(this.selectedOption) {
			case 0:
				w4.trace(`Entrou em ${this.options[this.selectedOption]}`);
				break;
			case 1:
				w4.trace(`Entrou em ${this.options[this.selectedOption]}`);
				break;
			case 2:
				w4.trace(`Entrou em ${this.options[this.selectedOption]}`);
				this.battleOn = false;
				break;
		}
	}
}
