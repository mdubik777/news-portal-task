import EventObserver from "./observer";

class NewsPortalModel {
    constructor(){
        this.onUpdateArticles = new EventObserver(this);
    }

    fetchArticles(_url) {
        const getRequestData = (_url)=> {
            let promise = fetch(_url);
            return promise.then((response) => response.json())
                .catch(error => {
                    console.log(error);
                });
        };

        let _setArticles = this.setArticles.bind(this);

        getRequestData(_url).then(({ articles }) => {
            _setArticles({ articles })
        });
    }

    getArticles(){
        return this._articles;
    }

    setArticles({articles}) {
        this._articles = articles;

        this.onUpdateArticles.broadcast(this.getArticles());
    }
}

export default NewsPortalModel;