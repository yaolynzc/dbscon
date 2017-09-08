// 0.引入torrent解析模块
var torparser = require("torrent-parser");

// 1.引入mysql模块
var mysql = require('mysql');
// 2.设置mysql连接参数
var connection = mysql.createConnection({
    host     : '220.249.123.34',
    user     : 'root',
    password : 'flame',
    database : 'leador123456'
  });

// 解析torrent文件
let parsedTorrent    = torparser.decodeTorrentFile("./screen.torrent");

// console.log(parsedTorrent);

// 定义mysql数据对象
var torlists = {
  ID: parsedTorrent.infoHash,
  NAME: parsedTorrent.name,
  FILES: JSON.stringify(parsedTorrent.files)
};

// 保存对象
var query = connection.query('INSERT INTO torlists SET ?', torlists, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

