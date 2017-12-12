import './../css/common.css';

let loadButton = document.getElementById('button-load');

loadButton.onclick = function(){
    require.ensure(['./create-links'], function(require) {
        let ReportClass = require('./create-links');

        let newsReporter = new ReportClass.default();
        newsReporter.renderSources();
    });
};