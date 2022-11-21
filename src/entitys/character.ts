import { Vetor2 } from "./vetor";
import { Obstacle } from "./obstacle";
import * as w4 from "../wasm4";

export class Character{
   
    vetor2:Vetor2 = new Vetor2(0,0);
    size:i32[] = [16,16];
    color:u16 = 0x0012;
    
    frameNumber: i32 = 0;
    frameList: usize[] = [];
    
    // Define o sprite
    setSprite(frameNumber:i32, frameList:usize[]) : void{
		this.frameNumber = frameNumber;
		this.frameList = frameList;
    }
    
    // Métodos para desenhar na tela
    draw(): void {
        store<u16>(w4.DRAW_COLORS, this.color);
        w4.rect(this.vetor2.x, this.vetor2.y, this.size[0], this.size[1]);
    }
	
    drawSprite(frameCount: i32): void {
		store<u16>(w4.DRAW_COLORS, 0x2043)
		if(frameCount % 15 == 0)
			this.frameNumber++;		
		if(this.frameNumber >= this.frameList.length)
			this.frameNumber = 0;
		w4.blit(this.frameList[this.frameNumber], this.vetor2.x, this.vetor2.y, this.size[0], this.size[1], 1);
    }
   
    // Métodos de verificação de colisão
    collision(otherChar: Character): boolean {
		
		if(
		this.vetor2.x < otherChar.vetor2.x + otherChar.size[0] &
		otherChar.vetor2.x < this.vetor2.x + this.size[0] &
		this.vetor2.y < otherChar.vetor2.y + otherChar.size[1] &
		otherChar.vetor2.y < this.vetor2.y + this.size[1]
		){
			return true;
		}
		return false;	
	}
	
	collisionObjects(otherObjects: Obstacle[]): boolean[]{
		var collisions = new Array<boolean>(otherObjects.length);
		for(let i:i32 = 0; i < otherObjects.length; i++){
			if(
			this.vetor2.x < otherObjects[i].vetor2.x + otherObjects[i].size[0] &
			otherObjects[i].vetor2.x < this.vetor2.x + this.size[0] &
			this.vetor2.y < otherObjects[i].vetor2.y + otherObjects[i].size[1] &
			otherObjects[i].vetor2.y < this.vetor2.y + this.size[1]
			)
			{
				collisions[i] = true;
			}
			else{
				collisions[i] = false;			
				}
			}
		return collisions;
	}
}
