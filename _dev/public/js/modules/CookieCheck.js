import rmp_frontend from 'rmp_frontend';
import Cookies from 'js-cookie'
import FreezeWidget from './FreezeWidget';

class CookieCheck {
  constructor(widgetContainer, postID) {
    this.postID = postID;
    this.widgetContainer = widgetContainer;
    this.existingCookie = Cookies.get('rmp-rate');
    this.cookiesDisabled = rmp_frontend.cookieDisable;
    this.tnxMsg = rmp_frontend.afterVote;
    this.msgContainer = document.querySelector(this.widgetContainer + '.js-rmp-msg');
    this.ratingWidget = document.querySelector(this.widgetContainer + '.js-rmp-rating-widget');
    this.events();
  }

  events() {
    if(this.cookiesDisabled == 2) {
      return;
    }

    if(typeof this.existingCookie === 'undefined') {
      return;
    }

    let postsArray = this.existingCookie.split(',');
    if(!postsArray.includes(this.postID)) {
      return;
    }

    let freezeWidget = new FreezeWidget(this.widgetContainer);
    if(this.msgContainer) {
      this.msgContainer.textContent = this.tnxMsg;
    }
    this.ratingWidget?.classList?.add('rmp-rating-widget--has-rated');

  }


}

export default CookieCheck;
