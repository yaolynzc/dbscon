// 0.引入torrent解析模块
var torparser = require("torrent-parser");

// 1.引入mongoose模块
var mongoose = require('mongoose');
// 2.设置mongoose的promise，连接服务器
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://admin:flame@127.0.0.1:27017/sp2web',{useMongoClient: true});
// 3.创建模型
var listModel = mongoose.model('torlist',
      {
        name:String,
        file:String,
        memo:JSON,
        ctime:Date,
        mtime:Date
      }
    );

// 解析torrent文件
let parsedTorrent    = torparser.decodeTorrentFile("./screen.torrent");

// console.log(parsedTorrent);

// 定义mongoose实例对象
var list = new listModel({ 
  name:parsedTorrent.name,
  file: parsedTorrent.infoHash,
  memo: parsedTorrent.files,
  ctime: Date.now(),
  mtime: Date.now()
});

// 保存对象
list.save(function(err, res) {
  // 如果错误，打印错误信息
  if (err) {
    console.log(err);
  }
  // 返回插入的数据对象
  // console.log(res);
})

