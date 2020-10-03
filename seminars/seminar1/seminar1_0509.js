//my

const t = [1.2];
console.log(t)
t.push(5/6)
console.log(t)

const obj = {
    a:1,
    b:2
}

console.log(obj)
obj.c = 3

console.log(obj)

console.log(obj)

const student = {
    name: 'Qq',
    surname: 'Ww'
}

//Имя: ..., Фамилия: ...
formattedSrt = "Name: " + student.name + ", Surname: " + student.surname
formattedSrtBetter = `Name: ${student.name}, Surname: ${student.surname}`

console.log(formattedSrt + "\n" +  formattedSrtBetter)

let one = 1
let two = 2

//number + number = addiction
console.log(one + two)

//boolean + number = addiction
one = true
console.log(one + two)

//boolean + boolean
console.log(true + true)

//string + number = concatenation
one = '1'
console.log(one + two)

//string + boolean = concatenation
console.log(true + one)

//string + string = concatenation
console.log('1' + '2')

one = 1
two = 2

if (one == two) {
    console.log('its equal!')
}

one = 1
two = 1

if (one == two) {
    console.log('its equal!')
}

one = 1 //-> '1'
two = '1'

if (one == two) {
    console.log('its equal!')
}
/*различие между == и ===
== отвечает за "равны ли объекты?"
    т.е. может приводить типы один к другому
=== отвечает за "эквивалентны ли объекты?"
    т.е. имеют ли объекты одинаковый тип и значение */
if (one === two) {
    console.log('its equal!')
}

let f1 = undefined

if (!f1) {
console.log('its falsy')
}

const obj1 = {
    a:1
}

console.log(obj1.b)
//console.log(obj1.b.c) <- error