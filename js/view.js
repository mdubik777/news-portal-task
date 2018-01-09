import Factory from "./factory";
import ColoredBtn from "./decorator";
import domObj from "./constants";
import StrategyBehavior from "./strategy";
import { showLoading } from "./strategy";
import { cleanContainer } from "./strategy";


const factory = new Factory();

class NewsView {
    constructor(model){
        this.model = model;
        this.onClickGetArticles = null;
    }


    renderSources(_newsSources) {
        let strategyClean = new StrategyBehavior(cleanContainer);
        strategyClean.actionMethod(domObj.lazyBtnContainer);

        _newsSources.forEach(newsSource => {
            let li = factory.create('createChannelBtn', domObj.navList,  newsSource);
            let notActiveBtn = new ColoredBtn('notActive');
            li.style.background = notActiveBtn.background;
            li.style.color = notActiveBtn.color;


            li.addEventListener("click", (evt) => this.onClickGetArticles(evt, newsSource), false);
        });
    }

    renderArticles(articles) {
        articles.forEach(article => {
            factory.create('createArticle', domObj.section, article);
        });
    }

}

export default NewsView;