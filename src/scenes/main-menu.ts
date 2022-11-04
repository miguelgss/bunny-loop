import * as w4 from "../wasm4";

export class MainMenu{
	option:i32 = 0;
	menuOptions:i32[] 
	draw():void{
		store<u16>(w4.DRAW_COLORS, 0x0034);
        w4.rect(2, 2, 78, 156);
	}	
}
