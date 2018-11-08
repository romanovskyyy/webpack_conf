const http = require('http');
const path = require('path');
const cookie = require('cookie');
const Express = require('express');
const request = require('request');
const Agent = require('http').Agent;
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const proxy = httpProxy.createProxyServer({
    secure: false,
    rejectUnauthorized: false,
    agent: new Agent({ rejectUnauthorized: false })
});

const apiRegExp = /^\/api/;
const adminApiRegExp = /^\/admin\/api/;

function apiProxy() {
    return function(req, res, next) {
        if (apiRegExp.test(req.url)) {
            proxy.proxyRequest(req, res, {
                target: process.env.API_URL,
                rejectUnauthorized: false,
                secure: false
            });
        } else if (adminApiRegExp.test(req.url)) {
            proxy.proxyRequest(req, res, {
                target: process.env.ADMIN_API_URL,
                rejectUnauthorized: false,
                secure: false
            });
        } else {
            next();
        }
    };
}

const app = new Express();

app.use(apiProxy());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Express.static(path.resolve(__dirname, '../build')));

app.use('/confirm-email/:token', (req, res) => {
    const token = req.params.token;
    const url = `${process.env.API_URL}/api/confirm-email/${token}`;

    return new Promise((resolve) => {
        request(url, {}, (err) => {
            resolve(err);
        });
    }).then((err) => res.redirect(err ? '/verification/fail' : '/verification/success'));
});

app.use('/auth/:social/callback', (req, res) => {
    const social = req.params.social;

    let url = `${process.env.API_URL}/api/auth/${social}/callback?`;

    if (social === 'twitter') {
        const oauth_token = req.query.oauth_token;
        const oauth_verifier = req.query.oauth_verifier;

        url += `oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`;
    } else {
        const code = req.query.code;

        url += `code=${code}`;
    }

    return new Promise((resolve) => {
        request(url, {}, (err, response) => {
            if (!err) {
                const cookies = response.headers['set-cookie'];

                if (cookies && cookies.length) {
                    for (const c of cookies) {
                        const parsed = cookie.parse(c);
                        const keys = Object.keys(parsed);
                        const cookieName = keys[0];
                        res.cookie(cookieName, parsed[cookieName]);
                    }
                }
            }

            resolve();
        });
    }).then(() => res.redirect('/page-after-login'));
});

app.use('/public-admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/publicAdmin.html'));
});

app.use('/admin', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendFile(path.resolve(__dirname, '../build/admin.html'));
});

app.use('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

const server = new http.Server(app);
server.listen(process.env.PORT || 3001, () =>
    console.log(`App is running on port ${process.env.PORT || 3001}`)
);

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        server.close();
        process.exit();
    });
});
