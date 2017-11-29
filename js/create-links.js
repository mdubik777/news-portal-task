const baseUrl= 'https://newsapi.org/v2/top-headlines?',
    apiKey = '&apiKey=83b6d448f18244e79fa4e8619b3edf03',
    newsSources = ['cnn', 'mtv-news', 'google-news', 'time'],
    keySource = 'sources=';

let navList = document.getElementById('buttons-list'),
    section = document.getElementById('section');


class NewsReporter {
    getArticles ({channel}) { // Эта функция не имеет отношения к нашему контейнеру. В идеале она должна лежать отдельно вне этого класса
        const url = `${baseUrl}${keySource}${channel}${apiKey}`; // Можно сделать функцию, где весь урл есть и мы просто в нужное место засовываем название канала, то есть есть строка-шаблон, где есть 1 ${channel}
        const promise = fetch(url);
        return promise.then((response) => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    renderSources() {
        let resultMarkupSources = '';

        newsSources.forEach(newsSource => {
            resultMarkupSources += '<li id="' + newsSource + '" class="channel-button">' + newsSource.split('-').join(' ').toUpperCase() + '</li>' // Это может быть шаблонная строка. С точки зрения оптимизации операция конкатенации строк очень энергозатратная, ее лучше не использовать. Можно добавлять всё в массив и потом делать join либо сразу использовать шаблоны. Здесь это логично
        });

        navList.insertAdjacentHTML('beforeend' , resultMarkupSources);
        navList.addEventListener('click',(e) => {
            section.innerHTML = '';
            e.preventDefault();
            let element = e.target;
            if (element.classList.contains('channel-button')) {
                let chosenButtons = document.getElementsByClassName('channel-button'),
                    chosenButtonsArray = Array.prototype.slice.call(chosenButtons);

                for (let i = 0; i < chosenButtonsArray.length; i++ ) { ///  Здесь можно использовать forEach
                    chosenButtonsArray[i].classList.remove('checked');
                }
                element.classList.add('checked');
            }

            let obj = {
                id: element.id
            }; // Зачем надо создавать этот объект?

            const {id} = obj; 

            this.getArticles({channel: id}) // Плохо выбирать создавать класс с id, как соурс код, потому что нам не нужны эти id на элементах и если потом поменяется суорс код, то тебе придется менять в куче мест + заденет стили. Надо постараться сделать так, чтобы это было собрано в одном месте
                .then(({articles}) => {
                    this.renderArticles({ articles });
                });

            const showLoading = (container) => {
                const spinnerMarkup = '<div class="spinner">' + // Это может быть шаблон-строка, ане сумма строк
                    '<div class="rect1"></div>' +
                    '<div class="rect2"></div>' +
                    '<div class="rect3"></div>' +
                    '<div class="rect4"></div>' +
                    '<div class="rect5"></div>' + '</div>';

                container.insertAdjacentHTML('beforeend' , `${spinnerMarkup}`); // А вот здесь наоборот шаблон-строка не нужна)
            };

            showLoading(section);

        });
    }

    renderArticles({ articles }) {
        const getNewsDate = (_date) => {
            let options = { //options у тебя не изменяются, а значит могут быть const
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric'
            };
            return new Date(_date).toLocaleString("en", options);
        };

        let resultMarkupArticles = '';

        for (let i = 0; i < articles.length; i++) { // Здесь лучше всего использовать reduce функцию для массива
            let {publishedAt, author, description, source: {id, name}, title, url, urlToImage} = articles[i];

            resultMarkupArticles += '<div class="data-box clearfix">' +
                '<div class="image-box">' + '<a target="_blank" href=' + url + '>' + '<img src=' + urlToImage + '>' + '</a>' + '</div>' +
                '<div class="description-container">' +
                '<div class="source">' + name + '</div>' +
                '<div class="title">' + '<a target="_blank" href=' + url + '>' + title + '</a>' + '</div>' +
                '<div class="description">' + description + '</div>' + '</div>' +
                '<div class="date">' + getNewsDate(publishedAt) + '</div>' +
                '</div>';
        }

        const hideLoading = (container) => {
            container.innerHTML = '';
        };

        hideLoading(section);

        section.insertAdjacentHTML('beforeend', resultMarkupArticles);

    }
}


let newsReporter = new NewsReporter();
newsReporter.renderSources();
