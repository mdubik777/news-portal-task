class Factory {
    create(type, container, source) {
        let element;

       switch(type) {
           // case 'showLoading':
           //     element = new ShowLoading(container);
           //     break;
           //
           // case 'cleanContainer':
           //     element = new CleanContainer(container);
           //     break;

           case 'createChannelBtn':
               element = new CreateChannelBtn(container, source);
               break;

           case 'createArticle':
               element = new CreateArticle(container, source);
               break;
       }

        return element;
    }
}
//
// class ShowLoading {
//     constructor (container) {
//         this.spinnerMarkup = `<div class="spinner">
//         <div class="rect1"></div>
//         <div class="rect2"></div>
//         <div class="rect3"></div>
//         <div class="rect4"></div>
//         <div class="rect5"></div></div>`;
//
//         container.insertAdjacentHTML('beforeend' , this.spinnerMarkup);
//     }
// }
//
// class CleanContainer {
//     constructor (container) {
//         // this.clean = function (container) {
//             container.innerHTML = '';
//         // }
//     }
// }

class CreateChannelBtn {
    constructor (container, source) {
        // this.create = function (container, source) {
            const li = document.createElement('li');
            li.className = 'channel-button';
            li.textContent = source.split('-').join(' ').toUpperCase();
            container.appendChild(li);

            return li;
        // }
    }
}

class CreateArticle {
    constructor (container, article) {
        // this.create = function (container, article) {

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

            let {publishedAt, description, title, url, urlToImage} = article;

            const articleContainer = document.createElement('div');
            articleContainer.classList = 'data-box clearfix';

            const imageBox = document.createElement('div');
            imageBox.className = 'image-box';

            const img = document.createElement('img');
            img.src = urlToImage;

            const linkToSource = document.createElement('a');
            linkToSource.href = url;

            const descContainer = document.createElement('div');
            descContainer.className = 'description-container';

            const titleBox = document.createElement('div');
            titleBox.className = 'title';

            const descBox = document.createElement('div');
            descBox.className = 'description';
            descBox.textContent = description;

            const linkToSourceNews = document.createElement('a');
            linkToSourceNews.href = url;
            linkToSourceNews.textContent = title;

            const dateBox = document.createElement('div');
            dateBox.className = 'date';


            dateBox.textContent = getNewsDate(publishedAt);


            titleBox.append(linkToSourceNews);
            descContainer.appendChild(titleBox);
            descContainer.appendChild(descBox);
            linkToSource.appendChild(img);
            imageBox.appendChild(linkToSource);
            articleContainer.appendChild(imageBox);
            articleContainer.appendChild(descContainer);
            articleContainer.appendChild(dateBox);

            container.appendChild(articleContainer);
        }

    // }
}

export default Factory;