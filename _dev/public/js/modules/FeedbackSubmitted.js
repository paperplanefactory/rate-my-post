import rmp_frontend from 'rmp_frontend';

class FeedbackSubmitted {
  constructor(widgetContainer, response) {
    this.widgetContainer = widgetContainer;
    this.successMsg = response.successMsg;
    this.errorMsg = response.errorMsg;
    this.msgContainer = document.querySelector(this.widgetContainer + '.js-rmp-feedback-msg');
    this.input = document.querySelector(this.widgetContainer + '.js-rmp-feedback-input');
    this.button = document.querySelector(this.widgetContainer + '.js-rmp-feedback-button');
    this.loader = document.querySelector(this.widgetContainer + '.js-rmp-feedback-loader');
    this.events();
  }

  events() {
    this.loader.classList.remove('rmp-feedback-widget__loader--visible');
    if( this.errorMsg.length ) {
      this.msgContainer.classList.add('rmp-feedback-widget__msg--alert');
      this.msgContainer.innerHTML = this.errorMsg.join('<br />');
      return;
    }
    this.msgContainer.classList.remove('rmp-feedback-widget__msg--alert');
    this.msgContainer.textContent = this.successMsg;
    this.input.remove();
    this.button.remove();
  }
}

export default FeedbackSubmitted;
