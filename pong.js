var scoJ1 = 0;
var scoJ2 = 0;
var timer;
var x=0;
var y=0;
var wallH = 0;
var wallV = 0;
var jeu = document.getElementById('jeu');
var ctx2 = jeu.getContext('2d');
var win = 0;
var canvas = document.getElementById('monCanvas');
var ctx = canvas.getContext('2d');
var canH=jeu.height;  	//Hauteur du canvas "Jeu"
var canW=jeu.width;		//Largeur du canvas "Jeu"

var canWP=(canW-25); //Definis les postion en 
var canWG=0;		 //abscisse des raquettes

var canHP=((canH/2)-75); //Definis les postion en 
var canHPD=((canH/2)-75);//ordonnee des raquettes

var keys={					//*******************************************//
  upD: false,				//                                           //
  downD: false,				//buffer qui gère le double appui sur touche //		
  upG: false,				//											 //
  downG: false			    //*******************************************//
};
function draw(){ //fonction qui dessine le début du plateau
 

  x=canW/2-25;
  ctx.clearRect(0,0,canW,canH);   //*********************************//
  ctx.fillStyle="white";		  //Vide les deux canvas 			 //
  ctx2.clearRect(0,0,canW,canH);  //Et defini les couleurs sur blanc //	
  ctx2.fillStyle="white";		  //*********************************//
  ctx.beginPath();
  for (var i = 0; i <= canH; i=i+20) {
   ctx.rect(((canW/2)-5),i,10,10); //dessine la délimitation centrale du plateau
 }
 Score();
 ctx.fill();
 ctx.stroke();
 ctx2.beginPath();
ctx2.arc(x+25, y+25, 25, 0, Math.PI * 2, true); // Balle
ctx2.fill();
ctx2.stroke();

dessinePalette();					  //**********************//
}

function pong(){  //gestion des rebonds
  setTimeout(movementKey,0);
  if (win==1){
    canWP=(canW-25);
    canWG=0;
    canHP=((canH/2)-75);
    canHPD=((canH/2)-75);
    x=0;
    y=0;
  draw();					  //**********************//
  clearInterval(timer);				  
  return;			  				
}
if (scoJ1 == 3 || scoJ2 == 3) {
 canWP=(canW-25);
 canWG=0;
 canHP=((canH/2)-75);
 canHPD=((canH/2)-75);
 x=0;
 y=0;
 draw();
 clearInterval(timer);
 return;	
}
if (wallH == 0 && wallV == 0) {   
  dessineBalle();
  dessinePalette();
  x+=(Math.random()+1);
  y+=(Math.random()+1);
  if (x>(canWP-50) && y>=canHPD && y<=(canHPD+150)) {
    wallH = 1;
  }
  if (y>(canH-50)){
    wallV = 1;
  }
  if (x < 0 ) {
   win = 1;
   scoJ2++;
 }
 if (x > canW){
   win = 1;
   scoJ1++;
 }
}
if (wallH == 1 && wallV == 1){
  dessineBalle();
  dessinePalette();
  x-=(Math.random()+1);
  y-=(Math.random()+1);
  if (x<(canWG+25) && y>=canHP && y<=(canHP+150)) {
    wallH = 0;
  }
  if (y<=0) {
    wallV = 0;
  }
  if (x < 0 ) {
   win = 1;
   scoJ2++;
 }
 if (x > canW){
   win = 1;
   scoJ1++;
 }
}
if (wallH == 0 && wallV == 1){
  dessineBalle();
  dessinePalette();
  x+=(Math.random()+1);
  y-=(Math.random()+1);
  if (x>(canWP-50) && y>=canHPD && y<=(canHPD+150)) {
    wallH = 1;
  }
  if (y<=0) {
    wallV = 0;
  }
  if (x < 0 ) {
   win = 1;
   scoJ2++;
 }
 if (x > canW){
   win = 1;
   scoJ1++;
 }
}
if (wallH == 1 && wallV == 0){
  dessineBalle();
  dessinePalette();
  x-=(Math.random()+1);
  y+=(Math.random()+1);
  if (x<(canWG+25) && y>=canHP && y<=(canHP+150)) {
    wallH = 0;
  }
  if (y>(canH-50)) {
    wallV = 1;
  }
  if (x < 0 ) {
   win = 1;
   scoJ2++;
 }
 if (x > canW){
   win = 1;
   scoJ1++;
 }

}

}

function time(){

  timer = setInterval(pong, 0 );
}
function dessinePalette()  //dessin des palettes
{
  if (canHP<=0) {
    canHP = 0;
  }
  if (canHP>= (canH-150)) {
    canHP = canH-150;
  }
  if (canHPD<=0) {
    canHPD = 0;
  }
  if (canHPD>= (canH-150)) {
    canHPD = canH-150;
  }
  ctx2.rect(0, canHP, 25, 150);
  ctx2.fill();
  ctx2.stroke();



  ctx2.rect(canWP, canHPD, 25, 150);
  ctx2.fill();
  ctx2.stroke(); 
}

function movementKey()  //Mouvement des raquettes
{
  if(keys.upD){
    canHPD-=2;
  }
  if (keys.downD){
    canHPD+=2;
  }
  if (keys.upG){
    canHP-=2;
  }
  if (keys.downG){
    canHP+=2;
  }
}

function trueKey(key){			//************************************************************//
  if (key==90){
    keys.upG = true;
  }
  else if (key==83){
    keys.downG = true;
  }
  else if (key==79){
    keys.upD = true;
  }
  else if (key==76){
    keys.downD = true;
  }
}
								// GESTION DU BUFFER AVEC ONKEYDOWN ET ONKEYUP
                function falseKey(key){
                 if (key==90){
                  keys.upG = false;
                }
                else if (key==83){
                  keys.downG = false;
                }
                else if (key==79){
                  keys.upD = false;
                }
                else if (key==76){
                  keys.downD = false;
}							//******************************************************************//	
}
function dessineBalle() {    //Fonction qui dessine la balle
  ctx2.clearRect(0,0,canW,canH);
  ctx2.fillStyle="white";
  ctx2.beginPath();
  ctx2.arc(x+25, y+25, 25, 0, Math.PI * 2, true);  
  ctx2.moveTo(x+85,y+50);
  ctx2.fill();
  ctx2.stroke();
}
function newGame(){
	win = 0;
}
function Score() {
	ctx.font="72px Arial";
	ctx.fillText(scoJ1,(canW/2)-90, 100);
	ctx.fillText(scoJ2,(canW/2)+50, 100);
	ctx.fillStyle = "white";	
	ctx.fill();
}
