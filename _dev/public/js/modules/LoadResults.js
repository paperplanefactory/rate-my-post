import rmp_frontend from 'rmp_frontend';
import SocialWidget from './SocialWidget';
import FeedbackWidget from './FeedbackWidget';
import IconHighlighter from './IconHighlighter';
import CookiePush from './CookiePush';
import AnalyticsPush from './AnalyticsPush';

class LoadResults {
  constructor(postID, widgetContainer, response, rating) {
    this.postID = postID;
    this.widgetContainer = widgetContainer;
    this.voteCount = response.voteCount;
    this.avgRating = response.avgRating;
    this.errorMsg = response.errorMsg;
    this.token = response.token;
    this.id = response.id;
    this.avgRatingContainer = document.querySelectorAll(this.widgetContainer + '.js-rmp-avg-rating, .js-rmp-results-widget--' + postID + ' .js-rmp-avg-rating');
    this.voteCountContainer = document.querySelectorAll(this.widgetContainer + '.js-rmp-vote-count, .js-rmp-results-widget--' + postID + ' .js-rmp-vote-count');
    this.noVotesContainer = document.querySelector(this.widgetContainer + '.js-rmp-not-rated');
    this.resultsTextContainer = document.querySelector(this.widgetContainer + '.js-rmp-results');
    this.ratingIcons = document.querySelectorAll(this.widgetContainer + '.js-rmp-rating-icon');
    this.resultIcons = document.querySelectorAll('.js-rmp-results-widget--' + postID + ' .js-rmp-results-icon');
    this.msgContainer = document.querySelector(this.widgetContainer + '.js-rmp-msg');
    this.tnxMsg = rmp_frontend.afterVote;
    this.rating = rating;
    this.hideRatings = rmp_frontend.notShowRating;
    this.events();
  }

  events() {
    if( this.errorMsg.length ) {
      this.msgContainer.innerHTML = this.errorMsg.join('<br />');
      this.msgContainer.classList.add('rmp-rating-widget__msg--alert');
      this.ratingIcons.forEach((item) => {
        item.classList.remove('rmp-icon--processing-rating', 'rmp-icon--hovered');
      })
      return;
    }

    if(this.avgRatingContainer) {
      this.avgRatingContainer.forEach((item) => {
        item.textContent = this.avgRating;
      })
    }

    if(this.voteCountContainer) {
      this.voteCountContainer.forEach((item) => {
        item.textContent = this.voteCount;
      })
    }
    this.toneDownIcons();
    this.highlightIcons();
    this.noVotesContainer?.classList?.add('rmp-rating-widget__not-rated--hidden');
    this.resultsTextContainer?.classList?.remove('rmp-rating-widget__results--hidden');
    this.msgContainer.textContent = this.tnxMsg;

    let socialWidget = new SocialWidget(this.widgetContainer, this.rating);
    let feedbackWidget = new FeedbackWidget(this.widgetContainer, this.postID, this.rating, this.token, this.id );
    let cookiePush = new CookiePush(this.postID);
    let analyticsPush = new AnalyticsPush(this.rating);
  }

  toneDownIcons() {
    this.ratingIcons.forEach((item) => {
      item.classList.remove('rmp-icon--full-highlight', 'rmp-icon--half-highlight', 'rmp-icon--processing-rating', 'rmp-icon--hovered', 'js-rmp-remove-half-star', 'js-rmp-replace-half-star');
    });
    this.resultIcons.forEach((item) => {
      item.classList.remove('rmp-icon--full-highlight', 'rmp-icon--half-highlight', 'rmp-icon--processing-rating', 'js-rmp-remove-half-star', 'js-rmp-replace-half-star');
    });
  }

  highlightIcons() {
    let highlightIcons = new IconHighlighter(this.widgetContainer, this.postID, this.avgRating);
  }

}

export default LoadResults;
