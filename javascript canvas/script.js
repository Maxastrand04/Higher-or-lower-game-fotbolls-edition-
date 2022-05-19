// Inleder med att deklarera saker för canvas samt hämtar information från en annan JS fil för att inte ha listor härs

import * as pFact from './Player information.js'

let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

//Deklarerar vaiabler som har koll på vilken bild som är aktiva
var rightImage;
var leftImage;

//Variabel som räknar poäng
let scoreCount = 0;

// Klassen Button är till för att göra en "higher" knapp och en "lower" knapp  
// De har samma funktioner, därmed ändras postion och färger med variabler som deklareras när de ritas ut
class Button {
    constructor(xpoint, ypoint, height, width){
        this.xpoint = xpoint;
        this.ypoint = ypoint;
        this.height = height;
        this.width = width;
    }

    //ritar ut knappen
    draw(typeOfButton){
        var xposition = this.xpoint;
        var yposition = this.ypoint;
        var button = new Image();
        button.src = `./program images/buttons/${typeOfButton}.png`;
        button.onload = function(){
            c.drawImage(button, xposition, yposition);
        }
    }
    //Kollar så när canvasen blir tryckt med "click" vilket är vänster klick med musen så letar den om det var knappen som tröcks ned
    clickButton(xmouse, ymouse){
        
        //Till för att trycket ska vara mera centrerad i knappen
        xmouse += 17
        ymouse += 17
        
        //Kollar mitt punkten i knappen
        let xmiddle = this.xpoint + (this.width/2)
        let ymiddle = this.ypoint + (this.height/2)

        //Kollar avståndet från mitten av knappen
        var xdistance = xmouse - xmiddle
        xdistance = Math.abs(xdistance)

        var ydistance = ymouse -ymiddle
        ydistance = Math.abs(ydistance)
        
        //If statements för om man tröck i knappen 
        if (xdistance< this.width/2){
        
            if (ydistance< this.height/2){
                return true
            }
        }
    }
}


// funktion som slumpar de första två spelarna när sidan startas 
function starterfunction(x,y,image,){
    var randomNumber = Math.floor(Math.random() * pFact.playerArray.length);
    rightImage = pFact.playerArray[randomNumber] 
    
    image.src = `./player images/${rightImage}.png`;
    image.onload = function(){
        c.drawImage(image, x, y);
    }
}

function drawLogo(){
    var logoimg = new Image();
    logoimg.src = `./program images/Higher or lower logo.png`
    logoimg.onload = function(){
        c.drawImage(logoimg, canvas.width/2 - 141.5, 50)
    }
}

function orText(height){
    c.fillStyle = "white"
    c.font = "40px Arial"
    c.textAlign = "center"
    c.fillText("OR", canvas.width/2, canvas.height - height)
}

function newImage(){
    c.clearRect(0,0,canvas.width,canvas.height)
    
    //higherButton.drawArrow("Up arrow", c)
    //lowerButton.drawArrow("Down arrow", c)
    drawLogo();
    orText(335);

    leftImage = rightImage
    img1.src = `./player images/${leftImage}.png`;
    img1.onload = function(){
        
        c.drawImage(img1, 100, 100);
    }
    c.fillStyle = "White"
    c.font = "70px Arial"
    c.textAlign = "center"
    c.fillText(`${leftImage}`, 342.5, canvas.height - 200)
    c.fillText(`${pFact.playervalue[rightImage]} 000 000 €`, 342.5 ,canvas.height - 100)
    lowerButton.draw("Lower button");
    higherButton.draw("Higher button");

    let randomNumber = Math.floor(Math.random() * pFact.playerArray.length);
    rightImage = pFact.playerArray[randomNumber]
    c.fillText(`${rightImage}`, canvas.width - 342.5, canvas.height - 200)
    console.log(rightImage, leftImage); 

    img2.src = `./player images/${rightImage}.png`;

    c.fillstyle = "white"
    c.font = "30px Arial"
    c.textAlign = "center"
    c.fillText(`score: ${scoreCount}`, canvas.width - 100, canvas.height - 50)
}

function clickFunction(event){
    const rect = canvas.getBoundingClientRect()
    const xpos = event.clientX - rect.left
    const ypos = event.clientY - rect.top

    let higher = higherButton.clickButton(xpos, ypos );
    let lower = lowerButton.clickButton(xpos, ypos );
    let help = helpButton.clickButton(xpos,ypos)
    if ( higher === true ){
        Higher()
    }
    if (lower === true ){
        Lower()
    }
    if (help === true){
        Help()
    }
}


function Higher(){
    if(pFact.playervalue[leftImage] < pFact.playervalue[rightImage]){
    scoreCount += 1
    newImage();
    
    }
    else if(pFact.playervalue[leftImage] === pFact.playervalue[rightImage]){
        scoreCount += 1
        newImage();
        
    }
    else{
        c.clearRect(0,0,canvas.width,canvas.height)
        
        c.fillStyle = "White"
        c.font = "90px Arial"
        c.textAlign = "center"
        c.fillText("Game Over", canvas.width/2, canvas.height/2)

        c.font = "50px Arial"
        c.fillText(`Your score was: ${scoreCount}`, canvas.width/2, canvas.height/2 + 200)

        canvas.removeEventListener("click", clickFunction)

    }
}

function Lower(){
    if(pFact.playervalue[leftImage] > pFact.playervalue[rightImage]){
        scoreCount += 1
        newImage();
        }
    else if(pFact.playervalue[leftImage] === pFact.playervalue[rightImage]){
        scoreCount += 1
        newImage();
    }
    else{
        c.clearRect(0,0,canvas.width,canvas.height)
        
        c.fillStyle = "White"
        c.font = "90px Arial"
        c.textAlign = "center"
        c.fillText("Game Over", canvas.width/2, canvas.height/2)

        c.font = "50px Arial"
        c.fillText(`Your score was: ${scoreCount}`, canvas.width/2, canvas.height/2 + 200)

        canvas.removeEventListener("click", clickFunction)

    }
}

//funktion för hjälp knappen i programmet
function Help(){
    var helpImage = new Image()
    helpImage.src = "./program images/Help image.png"
    helpImage.onload = function(){
        
        c.drawImage(helpImage, canvas.width/2 - 500, canvas.height/2 - 400);
    }
    var closeButton = new Button()
    closeButton.draw("Close button")
    canvas.addEventListener("click", Closefunction)
}

//funktion för att stänga ned hjälp rutan
function Closefunction(){
    const rect = canvas.getBoundingClientRect()
    const xpos = event.clientX - rect.left
    const ypos = event.clientY - rect.top
    
    let help = helpButton.clickButton(xpos,ypos)
    if (help === true){
        //tar bort allt och ritar allt som ska vara med i början
        c.clearRect(0,0,canvas.width, canvas.height)

        drawLogo();
        lowerButton.draw("Lower button")
        higherButton.draw("Higher button")
        helpButton.draw("Help button")
        orText(335)

        starterfunction(100, 100, img1)
        c.fillStyle = "White"
        c.font = "70px Arial"
        c.textAlign = "center"

        leftImage = rightImage

        c.fillText(`${pFact.playervalue[leftImage]} 000 000 €`, 342.5 ,canvas.height - 100)
        c.fillText(`${leftImage}`, 342.5, canvas.height - 200)

        starterfunction(canvas.width - 585, 100, img2)
        c.fillText(`${rightImage}`, canvas.width - 342.5, canvas.height - 200)
        console.log(pFact.playervalue[leftImage], pFact.playervalue[rightImage])

        c.fillstyle = "white"
        c.font = "30px Arial"
        c.textAlign = "center"
        c.fillText(`score: ${scoreCount}`, canvas.width - 100, canvas.height - 50)

    }
}


//---------------------------------------------------Programmet startar-----------------------------------------------------

//ritar ut higher/lower loggan
drawLogo();

//Skapar bildvariabel 1 (vänstra bilden)
var img1 = new Image();

//Skapar bildvariabel 2 (högra bilden)
var img2 = new Image();

//skapar knapparna och ritar ut de i programmet
let lowerButton = new Button(canvas.width/2 - 100, canvas.height - 300, 200, 200) 
lowerButton.draw("Lower button");

let higherButton = new Button(canvas.width/2 - 100, canvas.height - 600, 200, 200)
higherButton.draw("Higher button");

let helpButton = new Button(canvas.width-120, 20, 10, 20)
helpButton.draw("Help button")

//Ritar ut "or" texten mellan knapparna
orText(335)

//Ritar första bilden och skriver ut dess värde
starterfunction(100, 100, img1)
c.fillStyle = "White"
c.font = "70px Arial"
c.textAlign = "center"

leftImage = rightImage

c.fillText(`${pFact.playervalue[leftImage]} 000 000 €`, 342.5 ,canvas.height - 100)
c.fillText(`${leftImage}`, 342.5, canvas.height - 200)

//Ritar andra bilden
starterfunction(canvas.width - 585, 100, img2)
c.fillText(`${rightImage}`, canvas.width - 342.5, canvas.height - 200)
console.log(pFact.playervalue[leftImage], pFact.playervalue[rightImage])

c.fillstyle = "white"
c.font = "30px Arial"
c.textAlign = "center"
c.fillText(`score: ${scoreCount}`, canvas.width - 100, canvas.height - 50)


//letar efter knapptryck och kör därefter en av funktionerna
canvas.addEventListener("click", clickFunction) 