const url = require("url");
const { createTransaction, listTransactions } = require("../controllers/transaction.controller");

const routes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    if (req.method === 'POST' && pathname === '/transactions') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            req.body = JSON.parse(body);
            createTransaction(req, res);
        });
    } else if (req.method === 'GET' && pathname === '/transactions') {
        listTransactions(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

module.exports = routes;
