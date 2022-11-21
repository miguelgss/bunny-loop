import * as w4 from "../wasm4";

export class PlayerMenu{
	options: string[] = ['Deck', 'Itens', 'Test 2', 'Test 3'];
	selectedOption:i32 = 0;
	
	draw():void{	
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
        w4.rect(2, 2, 78, 156);
		for(let i:i32 = 0; i < this.options.length; i++){
			if (i == this.selectedOption)
				store<u16>(w4.DRAW_COLORS, 2);
			else
				store<u16>(w4.DRAW_COLORS, 3);
				
			w4.text(this.options[i], 6, (i * 16) + 6);
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
				break;
			case 3:
				w4.trace(`Entrou em ${this.options[this.selectedOption]}`);
				break;		
		}
	}
}
