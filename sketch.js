var dog,sadDog,happyDog;
var feed, addFood , foodObject,foodStock;
var database,foods;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  foodObject = new Food();
  feed = createButton("feed the dog ");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood  = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  foodObject.display();
  drawSprites();
}

function readStock(data){
  foods =data.val();
  foodObject.updateFoodStock(foods);

}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObject.getFoodStock() <= 0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);
    }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);

  }
  database.ref('/').update({
    food: foodObject.getFoodStock()
  })
  }


function addFoods(){
  foods++ ;
  database.ref('/').update({
    food:foods
  })
}
