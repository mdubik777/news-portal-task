import './../css/common.css';
import './../data/data.json';

let loadButton = document.getElementById('button-load');

loadButton.onclick = function(){
    require.ensure(['./facade'], function(require) {
        let module = require('./facade');
        module.default.facade({run:true, channels: ['cnn', 'mtv-news', 'google-news', 'time']});

    });
};