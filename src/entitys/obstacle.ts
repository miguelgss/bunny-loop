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
	
	drawStage(obstacleList:Obstacle[]) : void {
		for(let i:i32 = 0; i < obstacleList.length; i++){
			store<u16>(w4.DRAW_COLORS, 0x0023);
			w4.rect(obstacleList[i].vetor2.x, obstacleList[i].vetor2.y,
					obstacleList[i].size[0], obstacleList[i].size[1]);
		}
	}
	// TODO: Gerador de Objetos para o cenário.
	
	stageOne() : Obstacle[] {
		var obstacle1 = new Obstacle();
		var obstacle2 = new Obstacle();
		var obstacle3 = new Obstacle();
		
		obstacle1.size  = [30, 80]; obstacle1.vetor2.x = 0; obstacle1.vetor2.y = 0;
		obstacle2.size  = [131,50]; obstacle1.vetor2.x = 30; obstacle1.vetor2.y = 0;
		obstacle3.size  = [30, 80]; obstacle1.vetor2.x = 130; obstacle1.vetor2.y = 0;
		
		var obstaclesList = [obstacle1, obstacle2, obstacle3];
		return obstaclesList;
	}
}
