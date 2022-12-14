import * as w4 from "../wasm4";
import { Character } from "../entitys/character";

export class Battle{
	options: string[] = ['Act', 'Def', 'Run'];
	selectedOption:i32 = 0;
	battleOn: boolean = false;
	
	draw() : void {
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
