var request = require('request');
var xml2js_1 = require('xml2js');
var os = require('os');
var path = require('path');
var fs = require('fs');
var keywords = [
    '명작 다시 듣기',
    '주관베스트',
    '사연진품명품'
];
request('http://wizard2.sbs.co.kr/w3/podcast/V0000328482.xml', function (error, response, body) {
    xml2js_1.parseString(body, function (error, result) {
        var channel = result.rss.channel[0];
        var items = channel.item;
        channel.item = items.filter(function (item) {
            var f = keywords.length;
            while (--f >= 0) {
                if (item.description[0].indexOf(keywords[f]) > -1)
                    return true;
            }
            return false;
        });
        var builder = new xml2js_1.Builder;
        var xml = builder.buildObject(result);
        var file = path.join(os.homedir(), 'Dropbox', 'Rss', 'cultwoshow.xml');
        fs.writeFile(file, xml);
    });
});
//# sourceMappingURL=index.js.map