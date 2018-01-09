const buildUrl = (() => {
    const baseUrl= 'https://newsapi.org/v2/top-headlines?sources=',
        apiKey = '&apiKey=83b6d448f18244e79fa4e8619b3edf03';

    let instance,
        channelId;

    let getUrl = function () {
        if (!channelId) {
            channelId = 'cnn';
        }

        return baseUrl + channelId + apiKey;
    };

    let setChannelId = function (_channelID) {
        channelId = _channelID;
    };

    let createInstance = function () {
        return {
            getUrl: getUrl,
            setChannelId: setChannelId
        }
    };

    return {
        getInstance: function () {
            return instance || (instance = createInstance());
        }
    }
})();

export default buildUrl;