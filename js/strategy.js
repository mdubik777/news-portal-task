export default class StrategyBehavior {
    constructor(strategy) {
        this.strategy = strategy;
    }

    actionMethod(container) {
        return this.strategy(container);
    }
}

export function showLoading(container) {
    const spinnerMarkup = `<div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div></div>`;

    container.insertAdjacentHTML('beforeend' , spinnerMarkup);
}

export function cleanContainer(container) {
    container.innerHTML = '';
}