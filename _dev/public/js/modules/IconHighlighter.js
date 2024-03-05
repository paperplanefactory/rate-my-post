import BrowserSupport from './BrowserSupport';
import rmp_frontend from 'rmp_frontend';

class IconHighlighter {
  constructor(widgetContainer, postID, avgRating) {
    this.postID = postID;
    this.widgetContainer = widgetContainer;
    this.avgRating = avgRating;
    this.resultIcons = document.querySelectorAll('.js-rmp-results-widget--'+ postID +' .js-rmp-results-icon');
    this.ratingIcons = document.querySelectorAll(this.widgetContainer + '.js-rmp-rating-icon');
    this.hideRatings = rmp_frontend.notShowRating;
    this.events();
  }


  events() {
    let fullStars = Math.floor(this.avgRating);
    let extraHalfStar = false;
    let extraFullStar = false;
    let browserCompatbilityClass = '';
    let decimalValue = Math.round(this.avgRating % 1 * 10);

    if(decimalValue > 2 && decimalValue < 8) {
      extraHalfStar = true;
    }
    if(decimalValue >= 8) {
      extraFullStar = true;
    }

    if(decimalValue > 2 && decimalValue < 5) {
       browserCompatbilityClass = 'js-rmp-remove-half-star';
    }

    if(decimalValue >= 5 && decimalValue < 8) {
       browserCompatbilityClass = 'js-rmp-replace-half-star';
    }
    // highlight icons in results widget
    this.resultIcons.forEach((item, index) => {
      if(index + 1 <= fullStars) {
        item.classList.add('rmp-icon--full-highlight');
      }
      if( extraHalfStar && (index + 1 == fullStars + 1)  ) {
        item.classList.add('rmp-icon--half-highlight');
        item.classList.add(browserCompatbilityClass);
      }

      if( extraFullStar && (index + 1 == fullStars + 1)  ) {
        item.classList.add('rmp-icon--full-highlight');
      }
    });
    // if rating widget should not be colored
    if(this.hideRatings == 2) {
      return;
    }
    // highlight rating icons
    this.ratingIcons.forEach((item, index) => {
      if(index + 1 <= fullStars) {
        item.classList.add('rmp-icon--full-highlight');
      }
      if( extraHalfStar && (index + 1 == fullStars + 1)  ) {
        item.classList.add('rmp-icon--half-highlight');
        item.classList.add(browserCompatbilityClass);
      }

      if( extraFullStar && (index + 1 == fullStars + 1)  ) {
        item.classList.add('rmp-icon--full-highlight');
      }
    });
    let browserSupport = new BrowserSupport();
  }

}

export default IconHighlighter;
