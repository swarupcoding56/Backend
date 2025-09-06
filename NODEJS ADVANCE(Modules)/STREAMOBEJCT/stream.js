const http = require('http');
const {Transform,pipeline} = require('stream')
const fs = require('fs');

//ki ek file se data lekr use kaise server or locally alag file pe render karwaye uske bahut sare methods hein orderwise 4 method hamne banaye hein lets check it up
//1==> const server = http.createServer(async (req, res) => {
//     await fs.writeFile('sample.txt', "hello world");
//     const newFile = await fs.readFile("sample.txt", "utf-8");
//     await fs.writeFile('sample2.txt', newFile);
//     res.end("Files written successfully");
// // });
// 2==>const server = http.createServer( (req, res) => {
// const file="newfile.txt"
// fs.writeFileSync(file,"nobita")
// fs.cpSync('sample.txt',file)
// res.write("done")
// res.end()
// // })
// 3==>const server = http.createServer((req, res) => {
// const read=fs.createReadStream('sample.txt')
// const write=fs.createWriteStream('sample2.txt')
// read.pipe(write)
// res.end()//most efficient way to file streaming in node js it is called piping method in node js 
// // })
//     const read=fs.createReadStream('sample.txt')
//     const write1=fs.createWriteStream('sample2.txt')
//4==> const server = http.createServer((req, res) => {
//     read.on('data',(chunk)=>{
//         console.log(chunk.toString())
//         write1.write(chunk)
//     })
//     read.on('end',()=>{
//         write1.end()
//     })
//     read.pipe(res)
// })
//string proceesing :
    const server = http.createServer((_, res) => {
         const read = fs.createReadStream('sample.txt', 'utf-8')
         const write = fs.createWriteStream('sample2.txt')
        // read.on('data', (chunk) => {
        //     const modified = chunk.toString().toUpperCase().replace(/gay/gi, "boy")

        //     write.write(modified)
        // })
        // read.on('end', () => {
        //     write.end()
        //     res.end()
        // })
        const transformstream = new Transform({
    transform(chunk, encoding, callback) {
        const modified = chunk.toString().toUpperCase().replace(/gay/gi, "teri");
        callback(null, modified);
    }
});
        pipeline(read, transformstream, write, (err) => {
            if (err) {
                console.error('Pipeline failed:', err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.end();
            }
        });
    })


server.listen(4000, () => {
    console.log('Server running at http://localhost:4000/');
});