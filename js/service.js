const getRequestData = (_url)=> {
    let promise = fetch(_url);
    return promise.then((response) => response.json())
        .catch(error => {
            console.log(error);
        });
};

export default getRequestData;