const { Console } = require("console");

const student = {
    name: 'Qq',
    surname: 'Ww',
    sayMySurname: function(){
        console.log(this.surname)
    }
}

student.sayMyName = function() {
    console.log(this.name) //зыс -- ссылка на конкретный объект
}

//student.sayMyName();
student.sayMySurname();

class People{
    constructor(name,surname){
        this.name = name
        this.surname = surname
    }

    introduce(){
        console.log(`I'm ${this.name} ${this.surname}`)
    }

    get age(){
        return this._age //_ значит приватный
    }

    set age(value){
        if (value <= 16){
            console.error('not valid age')
            return
        }
        this._age = value
    }
}

const Ivan = new People('qw','we')
Ivan.introduce()

Ivan.age = 16
console.log(Ivan.age)

class Student extends People{ 
    get score(){
        return this._score
    }

    get score(value){
        this._score = value
    }
}

const stud = new Student('zx','xc')
stud.score={
math:5,
english:4
}

console.log(stud)