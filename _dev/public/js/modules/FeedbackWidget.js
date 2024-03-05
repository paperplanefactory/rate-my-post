import rmp_frontend from 'rmp_frontend';
import AjaxFeedback from './AjaxFeedback';

class FeedbackWidget {
  constructor(widgetContainer, postID, rating, token, ratingID) {
    this.widgetContainer = widgetContainer;
    this.postID = postID;
    this.feedbackEnabled = rmp_frontend.feedback;
    this.maxRating = rmp_frontend.positiveThreshold;
    this.emptyFeedbackMsg = rmp_frontend.emptyFeedback;
    this.msgContainer = document.querySelector(this.widgetContainer + '.js-rmp-feedback-msg');
    this.rating = rating;
    this.ratingWidget = document.querySelector(this.widgetContainer + '.js-rmp-rating-widget');
    this.feedbackWidget = document.querySelector(this.widgetContainer + '.js-rmp-feedback-widget');
    this.inputContainer = document.querySelector(this.widgetContainer + '.js-rmp-feedback-input');
    this.submitButton = document.querySelector(this.widgetContainer + '.js-rmp-feedback-button');
    this.loader = document.querySelector(this.widgetContainer + '.js-rmp-feedback-loader');
    this.input = false;
    this.token = token;
    this.ratingID = ratingID;
    this.events();
  }

  events() {
    if(this.feedbackEnabled != 2 || this.rating > this.maxRating) {
      return;
    }
    this.feedbackWidget.classList.add('rmp-feedback-widget--visible');
    this.ratingWidget.classList.add('rmp-rating-widget--hidden');
    this.submitButton.addEventListener('click', (event) => this.submitButtonClicked());
  }

  submitButtonClicked() {
    this.input = this.inputContainer.value;
    if(this.input.trim().length < 1 ) { // feedback was not inserted
      this.msgContainer.classList.add('rmp-feedback-widget__msg--alert');
      this.msgContainer.textContent = this.emptyFeedbackMsg;
      return;
    }
    this.submitButton.replaceWith(this.submitButton.cloneNode(true));
    this.submitButton = document.querySelector(this.widgetContainer + '.js-rmp-feedback-button');
    this.loader.classList.add('rmp-feedback-widget__loader--visible')
    let saveFeedback = new AjaxFeedback(this.widgetContainer, this.postID, this.input, this.token, this.ratingID);
  }

}

export default FeedbackWidget;
