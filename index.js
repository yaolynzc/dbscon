// 0.引入torrent解析模块
var torparser = require("torrent-parser");

// 1.引入mysql模块
var mysql = require('mysql');
// 2.设置mysql连接参数
var connection = mysql.createConnection({
    host     : '116.196.74.122',
    user     : 'root',
    password : 'flame',
    database : 'sp2web'
  });

// 解析torrent文件
let parsedTorrent    = torparser.decodeTorrentFile("./screen.torrent");
// console.log(parsedTorrent);

var filelist = JSON.stringify(parsedTorrent.files);
// 常见几种视频文件类型的检测
var videoRegEx = new RegExp("^.+\.(mkv)|(mp4)|(avi)|(rmvb)|(wmv)|(rm)|(mpeg)|(ts)$");

if (videoRegEx.test(filelist.toLowerCase())){
  // 定义mysql数据对象
  var torlists = {
    ID: parsedTorrent.infoHash,
    NAME: parsedTorrent.name,
    FILES: filelist
  };

  // 保存对象
  var query = connection.query('INSERT INTO torlists SET ?', torlists, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
}

// console.log(filelist);