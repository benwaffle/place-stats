const request = require('request')

var colors = ["#FFFFFF","#E4E4E4","#888888","#222222","#FFA7D1","#E50000","#E59500","#A06A42","#E5D900","#94E044","#02BE01","#00D3DD","#0083C7","#0000EA","#CF6EE4","#820080"];

function decode(e) {
    var i = new Uint8Array(1000 * 1000);
    var s = 0;
    var e = new Uint8Array(e.buffer, 4)
    for (var t = 0; t < e.byteLength; t++) {
        i[s + 2 * t] = e[t] >> 4;
        i[s + 2 * t + 1] = e[t] & 15;
    }
    s += e.byteLength * 2
    return i
}

request('https://www.reddit.com/api/place/board-bitmap', (err, resp, body) => {
    if (err) {
        console.error(`download bitmap error: ${err}`)
        return
    }

    var canvas = decode(new Buffer(body))

    var count = {}
    for (var color of colors)
        count[color] = 0
    for (var tile of canvas)
        count[colors[tile]]++

    console.log(JSON.stringify(count))
})