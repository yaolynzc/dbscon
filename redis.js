// 0.引入torrent解析模块
var torparser = require("torrent-parser");

// 1.引入redis模块
var redis = require("redis"),
    client = redis.createClient();
// 监听数据库错误信息
client.on("error", function (err) {
  console.log("Error " + err);
});

// 1.引入mysql模块
var mysql = require('mysql');
// 2.设置mysql连接参数
var connection = mysql.createConnection({
    host     : '52.69.238.26',
    user     : 'root',
    password : 'flame',
    database : 'sp2web'
  });

// 解析torrent文件
let parsedTorrent    = torparser.decodeTorrentFile("./screen.torrent");

// console.log(parsedTorrent);

// 定义redis数据k/v对象
var torlists = {
  ID: parsedTorrent.infoHash,
  NAME: parsedTorrent.name,
  FILES: JSON.stringify(parsedTorrent.files)
}

client.multi([
  ["incr", "id"]
]).exec(function (error, res) {
  console.log(res[0]);
  // 保存对象
  if (res.length > 0) {
    client.hmset(torlists.ID, torlists, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        // console.log(res);
        client.sadd("torlists", torlists.ID);
      }
    });
  }
});

client.keys('*',function (error, res) {
  if (error) {
    console.log(error);
  } else {

    if(res.length > 1){
      for(var i of res){
        // id：属于string类型，torlists：属于无序集合类型，都无法使用hgetall命令
        if (i != "id" && i != "torlists") {
          client.hgetall(i.toString(), function (error, res) {
            if (error) {
              console.log(error);
            } else {
              console.log(res);
            }
          });
        }
      }
    }
  }
});

// 关闭链接
// client.end(true);
