 const path=require('path');
 
// console.log(__filename)
// console.log(__dirname)

//join method
console.log(path.join(__dirname,"subfolder","mainfile.txt"))
//resolve metthod
console.log(path.resolve("sample2.txt"))
//parse method
console.log(path.parse(__filename))
//base method
console.log(path.basename(__filename))
//extname method
console.log(path.extname(__filename))
//format method
console.log(path.format({
    dir: path.dirname(__filename),
    base: path.basename(__filename),
    ext: path.extname(__filename)
}))
//dirname method
console.log(path.dirname(__filename))
//path.resolve vs path.join
//Almost ✅ but let me fine-tune that for you:

// path.join("file.txt") → just returns "file.txt" (a relative string). It doesn’t try to figure out where that file really is.

// path.resolve("file.txt") → returns something like "/current/working/directory/file.txt". It makes the path absolute, but ⚠️ it does not check if the file actually exists — it just builds the absolute path string.

// 👉 So the real difference:

// join = string concatenation with correct slashes.

// resolve = absolute path construction (whether file exists or not).
