var mysql = require('mysql');

var dbConfig = {
    host     : 'localhost', //接続先ホスト
    user     : 'root',      //ユーザー名
    password : 'xxx',          //パスワード
    database : 'test'       //DB名
};

var connection;

function handleDisconnect() {
    console.log('create mysql connection');
    connection = mysql.createConnection(dbConfig); //接続する準備

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); //2秒待ってから処理
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    module.exports = connection; //connectionを(他のファイルから)requireで呼び出せるようにする

}

handleDisconnect();
