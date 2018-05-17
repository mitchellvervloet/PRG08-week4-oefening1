class Game {
    
    private ui:UI
    private bombs:Bomb[]
    private car:Car
    
    constructor() {
        this.ui = new UI()
        this.car = new Car()
        this.bombs = [new Bomb(), new Bomb(), new Bomb(), new Bomb()]
        this.gameLoop()
    }
    
    private gameLoop():void{
        this.car.update()

        for (let b of this.bombs){
            b.update()

            // als de car de bomb raakt, dan krijg je punten
            if (Util.checkCollision(this.car.getRectangle(), b.getRectangle())) {
                b.reset()
                this.ui.bombDestroyed()
            }

            // als de bom beneden uit beeld gaat, dan de score in de ui updaten
            if(b.getRectangle().bottom - b.getRectangle().height > window.innerHeight) {
                b.reset()
                this.ui.buildingDestroyed()
            }
        }

        this.ui.update()

        if(this.ui.getBuildingsDestroyed() < 4) {
            console.log("GAME OVER")
        } 

        requestAnimationFrame(() => this.gameLoop())
    }
} 

window.addEventListener("load", () => new Game())