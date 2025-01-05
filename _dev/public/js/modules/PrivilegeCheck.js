import rmp_frontend from 'rmp_frontend';
import FreezeWidget from './FreezeWidget';

class PrivilegeCheck {
  constructor() {
    this.is_not_votable = rmp_frontend.is_not_votable;
    this.ratingWidget = document.querySelectorAll('.js-rmp-rating-widget');
    this.events();
  }

  events() {
    if(this.is_not_votable === 'true') {
      let freezeWidget = new FreezeWidget('');
      this.ratingWidget.forEach((item) => {
        // loop required if multiple widgets on one page
        item.classList.add('rmp-rating-widget--no-privilege');
      })
    }
  }

}

export default PrivilegeCheck;
