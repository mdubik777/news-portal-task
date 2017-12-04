'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseUrl = 'https://newsapi.org/v2/top-headlines?sources=',
    apiKey = '&apiKey=83b6d448f18244e79fa4e8619b3edf03',
    newsSources = ['cnn', 'mtv-news', 'google-news', 'time'];

var navList = document.getElementById('buttons-list'),
    section = document.getElementById('section'),
    chosenButtons = void 0;

var getRequestData = function getRequestData(_url) {
    var promise = fetch(_url);
    return promise.then(function (response) {
        return response.json();
    }).catch(function (error) {
        console.log(error);
    });
};

var NewsReporter = function () {
    function NewsReporter() {
        _classCallCheck(this, NewsReporter);
    }

    _createClass(NewsReporter, [{
        key: 'renderSources',
        value: function renderSources() {
            var _this = this;

            newsSources.forEach(function (newsSource) {
                var li = document.createElement('li');
                li.className = 'channel-button';
                li.textContent = newsSource.split('-').join(' ').toUpperCase();
                navList.appendChild(li);
                li.addEventListener("click", function (evt) {
                    return _this.onClickHandler(evt, newsSource);
                }, false);
            });

            chosenButtons = document.getElementsByClassName('channel-button');
        }
    }, {
        key: 'renderArticles',
        value: function renderArticles(_ref) {
            var articles = _ref.articles;

            var getNewsDate = function getNewsDate(_date) {
                var options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                return new Date(_date).toLocaleString("en", options);
            };

            var markupsButton = articles.reduce(function (prevVal, elem) {
                var publishedAt = elem.publishedAt,
                    description = elem.description,
                    _elem$source = elem.source,
                    id = _elem$source.id,
                    name = _elem$source.name,
                    title = elem.title,
                    url = elem.url,
                    urlToImage = elem.urlToImage;

                return prevVal + '<div class="data-box clearfix">' + '<div class="image-box">' + ('<a target="_blank" href= ' + url + ' >') + ('<img src=' + urlToImage + '>') + '</a>' + '</div>' + '<div class="description-container">' + ('<div class="source"> ' + name + ' </div>') + '<div class="title">' + ('<a target="_blank" href= ' + url + ' > ' + title + ' </a>') + '</div>' + ('<div class="description"> ' + title + ' </div>') + '</div>' + '<div class="date">' + getNewsDate(publishedAt) + '</div>' + '</div>';
            }, '');

            this.constructor.hideLoading(section);

            section.insertAdjacentHTML('beforeend', markupsButton);
        }
    }, {
        key: 'onClickHandler',
        value: function onClickHandler(e, channelId) {
            var _this2 = this;

            var element = e.target;

            if (element.classList.contains('checked')) {
                return false;
            }

            section.innerHTML = '';
            var chosenButtonsArray = [].concat(_toConsumableArray(chosenButtons));

            chosenButtonsArray.forEach(function (chosenButton) {
                chosenButton.classList.remove('checked');
            });

            element.classList.add('checked');

            var buildUrl = function buildUrl(_url, id, _apiKey) {
                return _url + id + _apiKey;
            };

            getRequestData(buildUrl(baseUrl, channelId, apiKey)).then(function (_ref2) {
                var articles = _ref2.articles;

                console.log({ articles: articles });
                _this2.renderArticles({ articles: articles });
            });

            this.constructor.showLoading(section);
        }
    }], [{
        key: 'showLoading',
        value: function showLoading(container) {
            var spinnerMarkup = '<div class="spinner">\n            <div class="rect1"></div>\n            <div class="rect2"></div>\n            <div class="rect3"></div>\n            <div class="rect4"></div>\n            <div class="rect5"></div></div>';

            container.insertAdjacentHTML('beforeend', spinnerMarkup);
        }
    }, {
        key: 'hideLoading',
        value: function hideLoading(container) {
            container.innerHTML = '';
        }
    }]);

    return NewsReporter;
}();

var newsReporter = new NewsReporter();

newsReporter.renderSources();