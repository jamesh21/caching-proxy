const axios = require('axios')
const express = require('express')


class ProxyServer {
    constructor(originUrl, port) {
        this.originUrl = originUrl
        this.port = port
        this.app = express()
    }
    // Need a route for all calls to our localhost url that will check cachez   
    async makeRequest(req, res) {
        const requestUrl = this.originUrl + req.originalUrl
        
        // check cache for url
        // not in cache make request and place in cache
        try {
            const result = await axios.get(requestUrl)
            // console.log(result.data)
            // res.send(result.data)
            res.set('X-Cache', 'MISS');
            res.status(200).json(result.data)
        } catch(err) {
            console.error(err)
            res.status(500).json(err)
        }
    }

    start() {
        this.app.get("/favicon.ico", (req, res) => res.status(204).end());
        this.app.use('*', this.makeRequest.bind(this))
        this.app.listen(this.port, ()=> {
            console.log(`app is listening on port ${this.port}`)
        })
    }
}

module.exports = ProxyServer