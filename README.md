# PRG08 Week 4 oefening 1

## Polymorphism

Gebruik het type van de parent om verschillende typen children generiek te kunnen aanspreken. In dit voorbeeld erven `Car` en `Boat` van `GameObject`. `GameObject` heeft een `update` method:
```
objects:GameObject[] = []

this.objects.push(new Car(), new Boat())

for(let o of this.objects){
    o.update()
}
```

### Type Guards

Check welk type een object echt is. Alleen Car heeft een drive functie. Met `instanceof` kijken we of het object een Car is.
```
if(o instanceof Car) {
    o.drive()
}
```

## Opdracht

- Maak een array in Game.ts waarin de UI, de Car en de Bombs geplaatst worden
- In de gameloop loop je door die array heen. Daarbij roep je de `update` functie van UI, car en bomb aan.
- Zorg met `instanceof` dat de checks voor collision en game-over blijven werken

## Opdracht en huiswerk

- Bij gameover maak je het `foreground` element in de DOM leeg (daarin staan de car, ui, en bomb elementen)
- Je maakt ook de gameobjects array in game.ts leeg
- Plaats een instance van gameover.ts in de gameobjects array. Daarvan wordt automatisch de update aangeroepen in de game loop
- Kan je een knop maken in gameover.ts waarmee je de game opnieuw start met een car, ui en bombs?

### Collision 

Gebruik de DOM rectangle om de positie en afmeting van een element te achterhalen:

```
let rectangle : ClientRect = divelement.getBoundingClientRect()

function checkCollision(a: ClientRect, b: ClientRect) {
    return (a.left <= b.right &&
          b.left <= a.right &&
          a.top <= b.bottom &&
          b.top <= a.bottom)
}
```