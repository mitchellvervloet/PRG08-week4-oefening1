class Bomb {
    
    private element: HTMLElement
    private speed:number
    private x:number
    private y:number
        
    constructor() {
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        this.speed = 4 + Math.random() * 8
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = - 142
    }

    public update():void {
        this.y += this.speed
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    public reset(){
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = - 142
    }
}