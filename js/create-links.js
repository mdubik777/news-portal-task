import './../css/styles.less';
import getRequestData from "./service";
import utils from "./helper";


const baseUrl= 'https://newsapi.org/v2/top-headlines?sources=',
    apiKey = '&apiKey=83b6d448f18244e79fa4e8619b3edf03',
    newsSources = ['cnn', 'mtv-news', 'google-news', 'time'];

let navList = document.getElementById('buttons-list'),
    section = document.getElementById('section'),
    chosenButtons,
    lazyBtnContainer = document.getElementById('lazy-button-container');

export default class NewsReporter {
    renderSources() {
        utils.cleanButtonContainer(lazyBtnContainer);
        newsSources.forEach(newsSource => {
            const li = document.createElement('li');
            li.className = 'channel-button';
            li.textContent = newsSource.split('-').join(' ').toUpperCase();
            navList.appendChild(li);
            li.addEventListener("click", (evt) => this.onClickHandler(evt, newsSource), false);
        });

        chosenButtons = document.getElementsByClassName('channel-button');
    }

    renderArticles({ articles }) {
        const getNewsDate = (_date) => {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric'
            };
            return new Date(_date).toLocaleString("en", options);
        };

        let markupsButton = articles .reduce((prevVal, elem) => {
            let {publishedAt, description, source: {id, name}, title, url, urlToImage} = elem;
            return  prevVal + '<div class="data-box clearfix">' +
                '<div class="image-box">' + `<a target="_blank" href= ${url} >` + `<img src=${urlToImage}>` + '</a>' + '</div>' +
                '<div class="description-container">' +
                `<div class="source"> ${name} </div>` +
                '<div class="title">' + `<a target="_blank" href= ${url} > ${title} </a>` + '</div>' +
                `<div class="description"> ${title} </div>` + '</div>' +
                '<div class="date">' + getNewsDate(publishedAt) + '</div>' +
                '</div>';
        }, '');


        utils.hideLoading(section);

        section.insertAdjacentHTML('beforeend', markupsButton);
    }

    onClickHandler(e, channelId){
        let element = e.target;

        console.log(element);

        if(element.classList.contains('checked')){
            return false;
        }

        section.innerHTML = '';
        let chosenButtonsArray = [...chosenButtons];

        chosenButtonsArray.forEach(chosenButton => {
            chosenButton.classList.remove('checked');
        });

        element.classList.add('checked');

        const buildUrl = (_url, id, _apiKey ) => {
            return _url + id + _apiKey;
        };

        getRequestData(buildUrl(baseUrl, channelId, apiKey))
            .then(({ articles }) => {
                console.log({ articles });
                this.renderArticles({ articles });
            });

        utils.showLoading(section);
    }
}

// let newsReporter = new NewsReporter();

// newsReporter.renderSources();

// export default newsReporter;
// export default class newsReporter
