import 'dotenv/config'
import { kv } from '@vercel/kv';
import express from 'express'
import cors from "cors"
import helmet from 'helmet';
import morgan from 'morgan';
import axios from 'axios';
// import { expressjwt, ExpressJwtRequest } from "express-jwt";
// import JwksRsa from 'jwks-rsa';
// import jwtAuthz from 'express-jwt-authz';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import html from './html.js';

// require('dotenv').config()
// const kv = require('@vercel/kv');


async function getUser() {
    const user = await kv.get('abc');
    return user
}

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))

const x = await getUser()
console.log(x);

const quotes = [
    { quote: 'Hello, world (again)!' }
];

const checkJwt = auth({
    audience: 'https://quotes-api',
    issuerBaseURL: 'https://dev-kc3.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  
// enforce on all endpoints
// app.use(jwtCheck);
// const checkJwt = auth();



/* 
GET /basic => return one random quote
GET /premium => return five random quotes
*/

app.get('/', async (req, res) => {
    res.send(html)
})

app.get('/basic', checkJwt, requiredScopes('read:onequote'), async (req, res) => {
    const headers = {
        'Accept': 'application/json',
    }
    const quotes = (await axios({ method: 'get', url: `https://api.quotable.io/quotes/random?limit=1`, headers })).data
    res.send(quotes)
})

app.get('/premium', checkJwt, requiredScopes(['read:onequote', 'read:multiplequotes']), async (req, res) => {
    const headers = {
        'Accept': 'application/json',
    }
    const quotes = (await axios({ method: 'get', url: `https://api.quotable.io/quotes/random?limit=5`, headers })).data
    res.send(quotes)
})



app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on port ${process.env.PORT || 3001}`);
});