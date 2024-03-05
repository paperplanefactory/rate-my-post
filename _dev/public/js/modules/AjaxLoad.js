import rmp_frontend from 'rmp_frontend';
import IconHighlighter from './IconHighlighter';
import BrowserSupport from './BrowserSupport';

class AjaxLoad {
  constructor(postID) {
    this.postID = postID;
    this.widgetContainer = '.js-rmp-widgets-container--' + postID + ' ';
    this.settings = rmp_frontend;
    this.avgRatingContainer = document.querySelectorAll(this.widgetContainer + '.js-rmp-avg-rating, .js-rmp-results-widget--' + postID + ' .js-rmp-avg-rating');
    this.voteCountContainer = document.querySelectorAll(this.widgetContainer + '.js-rmp-vote-count, .js-rmp-results-widget--' + postID + ' .js-rmp-vote-count');
    this.noVotesContainer = document.querySelector(this.widgetContainer + '.js-rmp-not-rated');
    this.resultsTextContainer = document.querySelector(this.widgetContainer + '.js-rmp-results');
    this.noVotesContainer = document.querySelector(this.widgetContainer + '.js-rmp-not-rated');
    this.resultsTextContainer = document.querySelector(this.widgetContainer + '.js-rmp-results');
    this.msgContainer = document.querySelector(this.widgetContainer + '.js-rmp-msg');
    this.data = {
      action:'load_results',
      postID: this.postID,
      nonce: this.settings.nonce,
    }
    this.events();
  }


  async events() {
    const formData = new FormData();
    Object.keys(this.data).forEach(key => formData.append(key, this.data[key]));

    const response = await fetch(this.settings.admin_ajax, {
      method: 'POST',
      body: formData,
    });
    if(!response.ok) {
      return;
    }
    const body = await response.json();
    let voteCount = body.voteCount;
    let avgRating = body.avgRating;
    let error = body.errorMsg;
    this.loadResults(voteCount, avgRating, error);
  }

  loadResults(voteCount, avgRating, error) {
    if( error.length ) {
      if( this.msgContainer ) {
        this.msgContainer.textContent = error;
        this.msgContainer.classList.add('rmp-rating-widget__msg--alert');
      }
      return;
    }
    // inject data
    if(this.avgRatingContainer) {
      this.avgRatingContainer.forEach((item) => {
        item.textContent = avgRating;
      })
    }
    if(this.voteCountContainer) {
      this.voteCountContainer.forEach((item) => {
        item.textContent = voteCount;
      })
    }

    // highlight icons
    let highlightIcons = new IconHighlighter(this.widgetContainer, this.postID, avgRating);
    // handle classes
    if( avgRating === 0 ) {
      this.noVotesContainer?.classList?.remove('rmp-rating-widget__not-rated--hidden');
      this.resultsTextContainer?.classList?.add('rmp-rating-widget__results--hidden');
    } else {
      this.noVotesContainer?.classList?.add('rmp-rating-widget__not-rated--hidden');
      this.resultsTextContainer?.classList?.remove('rmp-rating-widget__results--hidden');
    }
    let browserSupport = new BrowserSupport();
  }
}

export default AjaxLoad;
