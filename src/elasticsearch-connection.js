const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    node: {
        url: new URL('http://localhost:9200'),
        ssl: 'ssl options',
        agent: 'http agent options',
        id: 'custom node id',
        headers: { 'custom': 'headers' },
        roles: {
            master: true,
            data: true,
            ingest: true,
            ml: false
        }
    },
    auth: {
        username: 'elastic',
        password: 'admin1'
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true
})

export default client;