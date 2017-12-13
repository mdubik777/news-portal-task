module.exports = function (source) {
    const parsedSource = JSON.parse(source);

    const findNumberKeys = (parsedSource) => {

        for (let key in parsedSource) {
            if (!(isNaN(Number(key))) && typeof Number(key) === 'number') {
                delete parsedSource[key];
            }
        }

        return parsedSource;
    };

    return JSON.stringify(findNumberKeys(parsedSource));
};