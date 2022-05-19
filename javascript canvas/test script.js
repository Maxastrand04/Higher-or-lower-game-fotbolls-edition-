let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

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

function clickFunction(event){
    console.log("hehehe souiii")
    const rect = canvas.getBoundingClientRect()
    const xpos = event.clientX - rect.left
    const ypos = event.clientY - rect.top

    let help = helpButton.clickButton(xpos,ypos)
    if (help === true){
        Helpfunction()
    }
}

function Closefunction(event){
    const rect = canvas.getBoundingClientRect()
    const xpos = event.clientX - rect.left
    const ypos = event.clientY - rect.top
    
    var close = closeButton.clickButton(xpos,ypos)
    if ( close === true){
        //tar bort allt och ritar allt som ska vara med i början
        c.clearRect(0,0,canvas.width, canvas.height)
        helpButton.draw("Help button")
        canvas.removeEventListener("click", Closefunction)
        canvas.addEventListener("click", clickFunction)
    }
}

function Helpfunction(){
    var helpImage = new Image()
    helpImage.src = "./program images/Help image.png"
    helpImage.onload = function(){
        
        c.drawImage(helpImage, canvas.width/2 - 500, canvas.height/2 - 400);
    }
    //Timeouten är till för att knappen inte ska ritas ut före rutan och hamna bakom
    setTimeout(() => {  closeButton.draw("Close button"); }, 5);
    canvas.addEventListener("click", Closefunction)
    canvas.removeEventListener("click", clickFunction)

}
var closeButton = new Button(canvas.width/2 - 50, 760, 90, 100)

let helpButton = new Button(canvas.width-120, 20, 80, 101)
helpButton.draw("Help button")

canvas.addEventListener("click", clickFunction)