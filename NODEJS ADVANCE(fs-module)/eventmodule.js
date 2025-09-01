const EvenEmmiter=require(`events`)//pehle to event emmiter jo event realease karega usko import karna hein
const emmiter=new EvenEmmiter()//ab uska object bana liya matlb uska instance banalia jo main kam karega
//event ke liye do chise hoti to ek to
//1.emit ( eventname,[args]) ye event ko execute  karta hein ye event handler hein basic
//doosra
//2.on ( eventname,callback) ye event ko listen karta hein matlab event listener ki tarah
emmiter.on('greet', () => {
    console.log('Hello there!')
})
emmiter.emit('greet')