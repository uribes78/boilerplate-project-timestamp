const { Router } = require('express');

const createTimeJson = (data) => {
    return new Promise((resolve, reject) => {
        if (!/\d{13}/i.test(data))
            data = Date.parse(data);

        let ts = new Date( Number(data) );

        if (!ts)
            return reject(new Error('Invalid date convertion'));

        return resolve({
            unix: ts.getTime(),
            utc: ts.toUTCString()
        });
    });
};

const api = () => {
    let routes = new Router();

    // your first API endpoint... 
    routes.get("/hello", function (req, res) {
        res.json({greeting: 'hello API'});
    });

    routes.get('/:date', (req, res, next) => {
        const { date } = req.params;

        createTimeJson(date)
            .then(data => res.status(200).json(data).end())
            .catch(err => res.status(400).json(err).end());
    });

    return routes;
}

module.exports = api;
