export class Vetor2 {
    constructor(
        public x: i32,
        public y: i32
    ) {};

    equals(other: Vetor2): bool {
        return this.x == other.x && this.y == other.y;
    }

    movement(x: i32, y: i32): void{
        this.x += x; this.y += y;
    }
    
	followVetor(objective: Vetor2, frameCount: i32, movePerFrame:i32):void{
	if (frameCount % movePerFrame == 0) {
		let distanceX = objective.x - this.x;
		let distanceY = objective.y - this.y;
		let distance = Math.hypot(distanceX, distanceY);
		
		//w4.trace(`Distance: ${distance}`);
		//w4.trace(`X: ${distanceX}`);
		//w4.trace(`Y: ${distanceY}`);
		
		distanceX = Math.round(distanceX / distance) as i32;
		distanceY = Math.round(distanceY / distance) as i32;
		
		this.movement(
			distanceX * 1,
			distanceY * 1
		);
		
		//w4.trace(`Movimento X: ${distanceX}`);
		//w4.trace(`Movimento Y: ${distanceY}`);
	}
}
}
