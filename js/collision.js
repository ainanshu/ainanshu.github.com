function momFruitCollision(){
	
	if(!data.gameOver){
		for(var i = 0; i < fruit.num; i++){
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l < 900){
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount > 7){
						mom.momBodyCount = 7
					}
					if(fruit.fruitType[i] == "blue"){
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}	
		
	}
}

//mom baby的碰撞算距离
function momBabyCollision(){
	
	if(data.fruitNum > 0 && !data.gameOver){
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l < 900){
			baby.babyBodyCount = 0;
			//分值
			mom.momBodyCount = 0;
			//更新分值
			data.addScore();
			helo.born(baby.x,baby.y);
		}
		
	}
	
};






