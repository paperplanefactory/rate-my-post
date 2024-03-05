
class FreezeWidget {
  constructor(widgetContainer) {
    this.widgetContainer = widgetContainer;
    this.ratingItems = document.querySelectorAll(this.widgetContainer + '.js-rmp-rating-item');
    this.ratingTextContainer = document.querySelector(this.widgetContainer + '.js-rmp-hover-text');
    this.submitBtn = document.querySelector(this.widgetContainer + '.js-submit-rating-btn');
    this.events();
  }

  events() {
    this.ratingItems.forEach((item) => {
      // Remove all event listeners from element.
      item.replaceWith(item.cloneNode(true));
    })
    this.ratingItems = document.querySelectorAll(this.widgetContainer + '.js-rmp-rating-item');
    this.submitBtn.replaceWith(this.submitBtn.cloneNode(true));
    this.submitBtn = document.querySelector(this.widgetContainer + '.js-submit-rating-btn');
    this.ratingItems.forEach((item) => {
      item.style.cursor = 'default';
    })
    this.submitBtn.classList.remove('rmp-rating-widget__submit-btn--visible');
    if(this.ratingTextContainer) {
      this.ratingTextContainer.textContent = '';
    }
  }
}

export default FreezeWidget;
