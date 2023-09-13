const fs = require('fs');
const http = require('http');
const url = require('url')

// //blocking code execution -> synchronous
const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');
console.log(textIn);

const textOut = `ini adalah penjelasan tentang alpukat dengan bahasa ingris: ${textIn}`
fs.writeFileSync('./txt/write-this.txt', textOut) //menimpa tulisan dalam file, tulisan sebelumnya hilang
console.log('sukses') // gak wajib


//non-blocking code execution -> asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err,data) => {
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err,data2) => {
        console.log(data2);
        fs.readFile(`./txt/final.txt`, 'utf-8', (err,data3) => {
            fs.writeFile(`./txt/gabungan.txt`, `${data}\n${data2}\n${data3}`, err => {
                console.log(`berhasil menggabungkan data`);
            });
        });

        
    });
});
console.log('coba coba');


/////////////////////////////
// Server HTTP

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/hello'){
        res.end('ini hello FSW2')
    } else if(pathName === '/produck'){
        res.end(JSON.stringify({
            data: `Hello World!, Kalian luar biasa`,
        }));
    } else if (pathName === '/api') {
        const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    } else if(pathName === '/overview') {
        const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`);
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(overviewPage);
    
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('<h1> nyari apa? </h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server udah jalan')
});