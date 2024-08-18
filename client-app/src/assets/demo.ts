console.log("Hello World!")

export interface  duck {

    name: string,
    numLegs: number,
    makeSound: (sound: string)=>void
}

const duck1: duck = {

    name: 'John',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)

}

const duck2: duck = {

    name: 'Alica',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)

}

export const duck = [duck1, duck2]