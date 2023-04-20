class compositionElement {
    constructor(price, calories) {
        // Making Call Back Function
        this.price = price;
        this.calories = calories;
    }
}

class Hamburger {
    // Set
    // Мережа фастфудів пропонує кілька видів гамбургерів: (set)
    static #SIZE_SMALL = new compositionElement(50, 20);
    static #SIZE_HUGE = new compositionElement(100, 40);


    // Гамбургер може бути з одним із декількох видів начинок:
    static #STUFFING_CHEESE = new compositionElement(10, 20);
    static #STUFFING_SALAD = new compositionElement(20, 5);
    static #STUFFING_POTATOE = new compositionElement(15, 10);

    // Можна додати добавки:
    static #TOPPING_SAUCE = new compositionElement(15, 0);
    static #TOPPING_MAYO = new compositionElement(20, 5);







    // Get
    static get SIZE_SMALL () { return Hamburger.#SIZE_SMALL};
    static get SIZE_HUGE () { return Hamburger.#SIZE_HUGE};
    static get STUFFING_CHEESE () { return Hamburger.#STUFFING_CHEESE};
    static get STUFFING_SALAD () { return Hamburger.#STUFFING_SALAD};
    static get STUFFING_POTATOE () { return Hamburger.#STUFFING_POTATOE};
    static get TOPPING_SAUCE () { return Hamburger.#TOPPING_SAUCE};
    static get TOPPING_MAYO () { return Hamburger.#TOPPING_MAYO};


    // Default
    #size = null;
    #stuff = null;
    #ingredients = [];


    constructor(...args) {
        args.forEach(this.#changeComposition.bind(this));
    }

    #changeComposition(element) {
        switch (element) {
            // Size cases
            case Hamburger.#SIZE_SMALL:
            case Hamburger.#SIZE_HUGE:
                this.#changeSize(element);
                break;


            // stuff cases
            case Hamburger.#STUFFING_CHEESE:
            case Hamburger.#STUFFING_SALAD:
            case Hamburger.#STUFFING_POTATOE:
                this.#changeStuff(element);
                break;


            default:
                this.addTopping(element);
        }
    }
    #changeSize(size) {
        this.#size = size;
    }

    #changeStuff(stuff) {
        this.#stuff = stuff;
    }

    addTopping(topping) {
        this.#ingredients.push(topping);
    }

    calculate() {
        return this.#size.calories +
            this.#stuff.calories +
            this.#ingredients.reduce((totalCalories, ingredient) => totalCalories + ingredient.calories, 0);
    }

    calculatePrice() {
        return this.#size.price +
            this.#stuff.price +
            this.#ingredients.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
    }
}


// маленький гамбургер з начинкою з сиру
const hamburger = new Hamburger(Hamburger .SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавка з майонезу
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// запитаємо скільки там калорій
console.log('Calories: ' + hamburger.calculate ());

// скільки коштує
console.log('Price: ' + hamburger.calculatePrice());

// я тут передумав і вирішив додати ще приправу
hamburger.addTopping(Hamburger .TOPPING_SAUCE);

// А скільки тепер коштує?
console.log('Price with sauce: ' + hamburger.calculatePrice());