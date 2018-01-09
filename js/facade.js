import './../css/styles.less';
import NewsPortalModel from "./model";
import NewsView from "./view";
import NewsController from "./controller";

export default module = (() =>  {
    let _private = {
        channels: [],
        getChannels: function() {
            return this.channels;
        },
        set: function(_channels) {
            this.channels = _channels;
        },
        run: function() {
            let model = new NewsPortalModel(),
                view = new NewsView(model),
                controller = new NewsController(model, view);


            controller.initialize();
            view.renderSources(this.getChannels());
        }
    };
    return {
        facade: function(args) {
            _private.set(args.channels);
            if (args.run) {
                _private.run();
            }
        }
    }
})();

