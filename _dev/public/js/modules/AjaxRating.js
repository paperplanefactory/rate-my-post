import rmp_frontend from 'rmp_frontend';
import LoadResults from './LoadResults';

class AjaxRating {
  constructor(postID, widgetContainer, rating, startTime) {
    this.postID = postID;
    this.widgetContainer = widgetContainer;
    this.rating = rating;
    this.duration = Math.floor(Date.now() / 1000) - startTime;
    this.settings = rmp_frontend;
    this.recaptcha = rmp_frontend.grecaptcha;
    this.recaptchaKey = rmp_frontend.siteKey;
    this.data = {
      action:'process_rating',
      star_rating : this.rating,
      postID : this.postID,
      duration: this.duration,
      nonce: this.settings.nonce,
    }
    this.events();
  }

  events() {
    if(this.recaptcha != 2) { // recaptcha disabled
      this.saveRating();
      return;
    }
    import('grecaptcha')
    .then((grecaptcha) => {
       grecaptcha.ready( () => {
         grecaptcha.execute(
           this.recaptchaKey,
           {action: 'RMPrating'}
         )
         .then((token) => {
           this.data.token = token;
           this.saveRating();
         })
       })
    })
  }

  async saveRating() {
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
    let loadResults = new LoadResults(this.postID, this.widgetContainer, body, this.rating);
  }
}

export default AjaxRating;
