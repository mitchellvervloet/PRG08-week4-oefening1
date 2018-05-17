class UI {
    private textfield:HTMLElement
    private bar:HTMLElement
    private score:number = 0
    private destroyedbuildings:number = 0

    constructor() {
        this.textfield = document.createElement("textfield")
        this.bar = document.createElement("bar")
        let foreground = document.getElementsByTagName("foreground")[0]

        foreground.appendChild(this.textfield)
        foreground.appendChild(this.bar)
    }
    public update(){
        this.textfield.innerHTML = "Score: " + this.score
        this.bar.style.backgroundPositionX = 0 - (this.destroyedbuildings * 72) + "px"
    }

    public buildingDestroyed() {
        this.destroyedbuildings++
    }

    public getBuildingsDestroyed() {
        return this.destroyedbuildings
    }

    public bombDestroyed() {
        this.score++
    }
}