class Car  {
    
    private element:HTMLElement
    private x:number = 200
    private y:number = window.innerHeight - 150
    private speedLeft: number = 0
    private speedRight: number = 0
         
    constructor() {
        this.element = document.createElement("car")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10
                break
            case "ArrowRight":
                this.speedRight = 10
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
        }
    }

    public update():void 
    {
        this.x = this.x + this.speedRight - this.speedLeft
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }  

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }
}