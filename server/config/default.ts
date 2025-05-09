import fs from 'fs';
    const publicKey = fs.readFileSync("./public.pem",'utf-8');
    const privateKey =fs.readFileSync("./private.pem",'utf-8');
export default {
    "port" : 1337,
    'dbUrl' : "mongodb://localhost:27017/vans-life",
    'saltWorkFactor' : 10,
    'publicKey' : publicKey,
    'privateKey' : privateKey,
}