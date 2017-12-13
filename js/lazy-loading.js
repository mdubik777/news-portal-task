import './../css/common.css';
import './../data/data.json';

let loadButton = document.getElementById('button-load');

loadButton.onclick = function(){
    require.ensure(['./create-links'], function(require) {
        let ReportClass = require('./create-links');

        let newsReporter = new ReportClass.default();
        newsReporter.renderSources();
    });
};