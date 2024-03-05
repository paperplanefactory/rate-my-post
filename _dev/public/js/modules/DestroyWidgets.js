
class DestroyWidgets {
  constructor() {
    this.ratingItems = document.querySelectorAll('.js-rmp-rating-item');
    this.ratingItemsLists = document.querySelector('.js-rmp-rating-icons-list');
    this.events();
  }

  events() {
    this.ratingItems.forEach((item) => {
      // Remove all event listeners from element.
      item.replaceWith(item.cloneNode(true));
    })
    this.ratingItems = document.querySelectorAll('.js-rmp-rating-item');
    this.ratingItems.forEach((item) => {
      item.style.cursor = 'auto';
    })
    this.ratingItemsLists.replaceWith(this.ratingItemsLists.cloneNode(true));
    this.ratingItemsLists = document.querySelector('.js-rmp-rating-icons-list');
  }

}

export default DestroyWidgets;
