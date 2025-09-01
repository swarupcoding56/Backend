const fs = require('fs');

// const file1 = fs.createReadStream('sample.txt', 'utf-8');
// file1.pipe(fs.createWriteStream('sample2.txt'));

// fs.writeFile('sample3.txt', "hello swarup i know you are in love with surupa banik", (err) => {
// 	if (err) {
// 		console.error('Error writing sample3.txt:', err);
// 	} else {
// 		console.log('sample3.txt created successfully');
// 	}
// });
// fs.appendFile('sample3.txt', "\nI know you both are perfect for each other", (err) => {
//     if (err) {
//         console.error('Error appending to sample3.txt:', err);
//     } else {
//         console.log('Content appended to sample3.txt successfully');
//     }
// });
// fs.readFile('sample3.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.error('Error reading sample3.txt:', err);
//     } else {
//         console.log('Contents of sample3.txt:');
//         console.log(data);
//     }
//  });
// fs.rename('sample3.txt', 'renamed_sample3.txt', (err) => {
// //     if (err) {
// //         console.error('Error renaming sample3.txt:', err);
// //     } else {
// //         console.log('sample3.txt renamed to renamed_sample3.txt successfully');
// //     }
// fs.open('sample2.txt', 'r', (err, fd) => {
//     if (err) {
//         console.error('Error opening sample2.txt:', err);
//     } else {
//         const buffer = Buffer.alloc(1024);
//         fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buf) => {
//             if (err) {
//                 console.error('Error reading sample2.txt:', err);
//             } else {
//                 console.log('File data:', buf.toString('utf-8', 0, bytesRead));
//             }
//             fs.close(fd, (err) => {
//                 if (err) {
//                     console.error('Error closing sample2.txt:', err);
//                 } else {
//                     console.log('sample2.txt closed successfully');
//                 }
//             });
//         });
//     }
// console.log(Object.keys(fs));
fs.open('sample2.txt', 'r', (err, fd) => {
    if (err) {
        console.error('Error opening sample2.txt:', err);
    } else {
        fs.fstat(fd, (
            err, stats) => {
            if (err) {
                console.error('Error getting file stats for sample2.txt:', err);
            } else {
                console.log('File stats for sample2.txt:');
                console.log(stats);
            }
            fs.close(fd, (err) => {
                if (err) {
                    console.error('Error closing sample2.txt:', err);
                }
            });
        });
    }
});
fs.cpSync('sample2.txt', 'sample4.txt');
fs.unlink('sample4.txt', (err) => {
    if (err) {
        console.error('Error deleting sample4.txt:', err);
    } else {
        console.log('sample4.txt deleted successfully');
    }
});
if (!fs.existsSync('sample5')) {
    fs.mkdirSync('sample5');
}
fs.rm('sample5', { recursive: true, force: true }, (err) => {
    if (err) {
        console.error('Error deleting sample5:', err);
    } else {
        console.log('sample5 deleted successfully');
    }
});