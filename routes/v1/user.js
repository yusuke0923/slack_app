var express = require('express');
var request = require('request');
var connection = require('../../mysqlConnection');
var router = express.Router();

router.get('/test', function (req, res) {
    res.json({
        message:"This is user api test!!!"
    });
});

router.get('/mysql', function(req, res) {
    connection.query('select * from usertable', function (error, results, fields) {
        if (error) throw error; //errorの場合
        res.send(results);//画面にresponseとして表示
        console.log("results: " + results[0].name); //jsonで受け取った場合の値の取得方法
    });
});

router.post('/post', function(req, res) {
    status = post();
    res.status(status);
});

function post() {
    var options = {
        url: 'https://hooks.slack.com/services/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',
        form: 'payload={\"channel\": \"#test\", \"username\": \"webhookbot\", \"text\": \"これは webhookbot という名のボットから #test に投稿されています。\", \"icon_emoji\": \":ghost:\"}',
        json: true
    };
    request.post(options, function(error, response, body) {
        // if (!error && response.statusCode == 200) {
        //     console.log(body);
        // } else {
        //     console.log('error: '+ response.statusCode + body);
        // }
        return response.statusCode;
    });
}

module.exports = router;
