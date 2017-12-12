
const utils = {
    showLoading(container) {
        const spinnerMarkup = `<div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div></div>`;

        container.insertAdjacentHTML('beforeend' , spinnerMarkup);
    },
    hideLoading(container) {
        container.innerHTML = '';
    },
    cleanButtonContainer(container) {
        container.innerHTML = '';
    }
};

export default utils;