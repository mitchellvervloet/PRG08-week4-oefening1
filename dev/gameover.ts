class GameOver {
    private textfield: HTMLElement

    constructor() {
        this.textfield = document.createElement("textfield")
        let foreground = document.getElementsByTagName("foreground")[0]

        foreground.appendChild(this.textfield)
    }
    public update() {
        this.textfield.innerHTML = "GAME OVER, MAN!"
    }
}