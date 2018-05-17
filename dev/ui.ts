class UI {
    private textfield:HTMLElement
    private game:Game

    constructor(g:Game) {
        this.game = g
        this.textfield = document.createElement("textfield")
        let foreground = document.getElementsByTagName("foreground")[0]

        foreground.appendChild(this.textfield)
    }
    public update(){
        this.textfield.innerHTML = "Score: " + this.game.score
    }
}