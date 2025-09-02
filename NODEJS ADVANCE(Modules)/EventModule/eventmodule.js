const EvenEmmiter=require(`events`)//pehle to event emmiter jo event realease karega usko import karna hein
// const emmiter=new EvenEmmiter()//ab uska object bana liya matlb uska instance banalia jo main kam karega
//event ke liye do chise hoti to ek to
//1.emit ( eventname,[args]) ye event ko execute  karta hein ye function banke use call katein hein basic
//doosra
//2.on ( eventname,callback) ye event ko listen karta hein matlab event listener and event handler hein sathmein

// //basic understanding ki kaise chalte hein
// emmiter.on('greet', () => {
//     console.log('Hello there!')
// })
// emmiter.emit('greet')

// // now see how to pass arguments through the emit function
// emmiter.on('greet', (name) => {
//     console.log(`Hello there ${name}!`)
// })
// emmiter.emit('greet', 'John')


//interview question

//1.listens for multiple events types of user events like login logout purchase  adn profile update
//2. tracks how many tiems the events are triggerd for each event 
//3. logs a summary file of all evnets occurances with a special suommary event is triggerd 
//4. save all this things in a event counter file and show the ral time change in the file also

//atfirst sare events listen or create karle
const useremmiter=new EvenEmmiter()
const eventCounter = {
    LOGIN: 0,
    LOGOUT: 0,
    PURCHASE: 0,
    PROFILE_UPDATE: 0
}
const countFile="SUMMARYCOUNT.json"
const fs=require("fs")
const savecount=()=>{
    fs.writeFileSync(countFile,JSON.stringify(eventCounter,null,2))
}
if(fs.existsSync(countFile)){
    const data=fs.readFileSync(countFile,"utf-8")
   Object.assign(eventCounter,JSON.parse(data))
}
useremmiter.on("LOGIN",(username)=>{
    console.log(`User logged in: ${username}`)
    eventCounter.LOGIN++
    savecount()
})
useremmiter.on("LOGOUT",(username)=>{
    console.log(`User logged out: ${username}`)
    eventCounter.LOGOUT++
    savecount()
})
useremmiter.on("PURCHASE",(username,item)=>{
    console.log(`User made a purchase: ${username}, Item: ${item}`)
    eventCounter.PURCHASE++
    savecount()
})
useremmiter.on("PROFILE_UPDATE",(username)=>{
    console.log(`User updated profile: ${username}`)
    eventCounter.PROFILE_UPDATE++
    savecount()
})
useremmiter.on("SUMMARY",()=>{
    console.log("Event Summary:")
    console.log(`- LOGIN: ${eventCounter.LOGIN}`)
    console.log(`- LOGOUT: ${eventCounter.LOGOUT}`)
    console.log(`- PURCHASE: ${eventCounter.PURCHASE}`)
    console.log(`- PROFILE_UPDATE: ${eventCounter.PROFILE_UPDATE}`)
})
//ab sare event emiiter pass karna hein and sare value pass karna hein
useremmiter.emit("LOGIN","JohnDoe")
useremmiter.emit("LOGOUT","JohnDoe")
useremmiter.emit("PURCHASE","JohnDoe","Laptop")
useremmiter.emit("PROFILE_UPDATE","JohnDoe")
useremmiter.emit("SUMMARY")