import { Vetor2 } from "./vetor";
import * as w4 from "../wasm4";

export class Obstacle{

	vetor2:Vetor2 = new Vetor2(0,0);
	size:i32[] = [8,8];
	
	draw(x:i32, y:i32, weight:i32, height:i32) : void{
		this.vetor2.x = x; this.vetor2.y = y;
		this.size[0] = weight; this.size[1] = height;
		store<u16>(w4.DRAW_COLORS, 0x0023);
        w4.rect(this.vetor2.x, this.vetor2.y, this.size[0], this.size[1]);
	}
	
	// TODO: Gerador de Objetos para o cenário.
}
