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

// 保存对象
client.hmset(torlists.ID.toString(), torlists, function (error, res) {
  if (error) {
    console.log(error);
  } else {
    // console.log(res);
  }
});

client.keys('*',function (error, res) {
  if (error) {
    console.log(error);
  } else {
    console.log(res);

    if(res.length > 1){
      for(var i of res){
        // console.log(i);
        client.hgetall(i.toString(),function(error,res){
          if(error){
            console.log(error);
          }else{
            console.log(res);
          }
        });
      }
      
    // // 关闭链接
    // client.end(true);
    }
  }
});
