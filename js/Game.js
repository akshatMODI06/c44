class Game {
  constructor(){

  }  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }  
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    bike1 = createSprite(100,200);
    bike1.scale = 0.8;
    bike1.addImage("bike1",bike1_img);
    bike2 = createSprite(300,200);
    bike2.scale = 0.8;
    bike2.addImage("bike2",bike2_img);
    bike3 = createSprite(500,200);
    bike3.scale = 1.2;
    bike3.addImage("bike3",bike3_img);
    bike4 = createSprite(700,200);
    bike4.scale = 0.8;
    bike4.addImage("bike4",bike4_img);
    bikes = [bike1, bike2, bike3, bike4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
      player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      var index = 0;
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        bikes[index-1].x = x;
        bikes[index-1].y = y;
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          bikes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = bikes[index-1].y;
        }      
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    } 
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}