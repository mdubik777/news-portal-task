import buildUrl from "./singleton";
import ColoredBtn from "./decorator";
import StrategyBehavior from "./strategy";
import domObj from "./constants";
import { showLoading } from "./strategy";
import { cleanContainer } from "./strategy";


class NewsController {
    constructor(newsModel, newsView){
        this.newsView = newsView;
        this.newsModel = newsModel;
    }

    onClickGetArticles(e, channelId) {

        let strategyClean = new StrategyBehavior(cleanContainer);
        strategyClean.actionMethod(domObj.section);

        let pressedBtn = e.target;

        let strategyShow = new StrategyBehavior(showLoading);
        strategyShow.actionMethod(domObj.section);

        buildUrl.getInstance().setChannelId(channelId);
        let _url = buildUrl.getInstance().getUrl();


        this.newsModel.fetchArticles(_url);

        this.newsModel.onUpdateArticles.subscribe(
            (data) => {
                this.onSetActiveBtn(pressedBtn);
                let strategyClean = new StrategyBehavior(cleanContainer);
                strategyClean.actionMethod(domObj.section);
                this.newsView.renderArticles(data);
            }
        );

    }

    onSetActiveBtn(pressedBtn){
        let chosenButtons = document.getElementsByClassName('channel-button');

        let chosenButtonsArray = [...chosenButtons];

        chosenButtonsArray.forEach(chosenButton => {
            let notActiveBtn = new ColoredBtn();
            chosenButton.style.background = notActiveBtn.background;
            chosenButton.style.color = notActiveBtn.color;
        });

        pressedBtn.classList.add('checked');
        let activeBtn = new ColoredBtn();
        activeBtn.setColor = function( color ){
            this.color = color;
        };
        activeBtn.setBackground = function( background ){
            this.background = background;
        };

        activeBtn.setBackground( "#8181ca" );
        activeBtn.setColor( "#000000" );

        pressedBtn.style.background = activeBtn.background;
        pressedBtn.style.color = activeBtn.color;
    }

    initialize() {
        this.newsView.onClickGetArticles = this.onClickGetArticles.bind(this);
    }
}


export default NewsController;