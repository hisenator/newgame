
class Bomb {
  constructor (){
    this.r = 50
    this.x = random (w);
    this.y = 0 - this.r;
    this.speed = 7


  }

  display(){
    image(queenImg, this.x, this.y, this.r, this.r)
  }
  move(){
    this.y++;
  }
}
