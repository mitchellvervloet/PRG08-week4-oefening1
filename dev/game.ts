class Game {
    
    private ui:UI
    private bombs:Bomb[]
    private healths:Health[]
    private car:Car
    
    public score:number = 0
    
    constructor() {
        this.ui = new UI(this)
        this.car = new Car()
        this.bombs = [new Bomb(), new Bomb(), new Bomb(), new Bomb()]
        this.healths = [new Health(), new Health()]
        this.gameLoop()
    }
    
    private gameLoop():void{
        this.car.update()
        this.ui.update()

        for (let h of this.healths) {
            h.update()
        }

        for (let b of this.bombs){
            b.update()

            if (Util.checkCollision(this.car.getRectangle(), b.getRectangle())) {
                b.reset()
                this.score++
            }

            if(b.getRectangle().bottom - b.getRectangle().height > window.innerHeight) {
                b.reset()
                console.log("Voeg Fire instance toe op positie " + b.getRectangle().left)
            }
        }

        requestAnimationFrame(() => this.gameLoop())
    }
} 

window.addEventListener("load", () => new Game())