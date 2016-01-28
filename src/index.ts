/// <reference path="typings/tsd.d.ts"/>
import * as request from 'request';
import {parseString, Builder} from 'xml2js';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

interface Channel {
  item:Item[];
}

interface Item {
  title:string[];
  description:string[];
}

const keywords:string[] = [
  '명작 다시 듣기',
  '주관베스트',
  '사연진품명품'
];

request('http://wizard2.sbs.co.kr/w3/podcast/V0000328482.xml', (error, response, body) => {
  parseString(body, (error, result) => {
    let channel:Channel = result.rss.channel[0] as Channel;
    let items:Item[] = channel.item;

    channel.item = items.filter(item => {
      let f:number = keywords.length;
      while (--f >= 0) {
        if (item.description[0].indexOf(keywords[f]) > -1) return true;
      }
      return false;
    });

    let builder:Builder = new Builder;
    let xml = builder.buildObject(result);
    let file:string = path.join(os.homedir(), 'Dropbox', 'Rss', 'cultwoshow.xml');

    fs.writeFile(file, xml);
  });
});