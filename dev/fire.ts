class Fire {

    private element: HTMLElement
    private x: number
    private y: number

    constructor() {
        this.element = document.createElement("fire")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        this.x = 100
        this.y = window.innerHeight - this.getRectangle().height
    }

    public update(): void {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    public remove() {
        // verwijder het HTML element uit de DOM
    }
}