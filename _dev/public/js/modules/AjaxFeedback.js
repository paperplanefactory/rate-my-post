import rmp_frontend from 'rmp_frontend';
import FeedbackSubmitted from './FeedbackSubmitted';

class AjaxFeedback {
  constructor(widgetContainer, postID, feedback, token, ratingID) {
    this.widgetContainer = widgetContainer;
    this.postID = postID;
    this.feedback = feedback;
    this.settings = rmp_frontend;
    this.duration = false;
    this.ratingID = ratingID;
    this.token = token;
    this.recaptcha = rmp_frontend.grecaptcha;
    this.recaptchaKey = rmp_frontend.siteKey;
    this.data = {
      action:'process_feedback',
      feedback : this.feedback,
      postID : this.postID,
      duration: this.duration,
      rating_id: this.ratingID,
      rating_token: this.token,
      nonce: this.settings.nonce,
    }
    this.events();
  }

  events() {
    if(this.recaptcha != 2) { // recaptcha disabled
      this.saveFeedback();
      return;
    }
    import('grecaptcha')
    .then((grecaptcha) => {
       grecaptcha.ready( () => {
         grecaptcha.execute(
           this.recaptchaKey,
           {action: 'RMPfeedback'}
         )
         .then((token) => {
           this.data.token = token;
           this.saveFeedback();
         })
       })
    })
  }

  async saveFeedback() {
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
    let feedbackSubmitted = new FeedbackSubmitted(this.widgetContainer, body);
  }
}

export default AjaxFeedback;
