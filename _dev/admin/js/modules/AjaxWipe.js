import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxWipe {
  constructor() {
    this.wipeBtn = $('.js-rmp-delete-data');
    this.wipeMsg = $('.js-rmp-delete-data-msg');
    this.ajaxUrl = rmp_options.admin_ajax;
    this.btnSuccessClass = 'rmp-btn--success';
    this.btnAlertClass = 'rmp-btn--alert';
    this.btnProcessingClass = 'rmp-btn--processing';
    this.data = {
      nonce: rmp_options.nonce,
      action: 'wipe_data'
    }
    this.events();
  }

  events() {
    this.wipeBtn.on('click', (event) => this.wipe());
  }

  wipe() {
    if( !confirm('All votes, feedback and analytics will be permanently lost! Proceed?') ) {
      return;
    }
    
    this.wipeBtn.removeClass(this.btnProcessingClass);
    this.wipeBtn.removeClass(this.btnSuccessClass);
    this.wipeBtn.removeClass(this.btnAlertClass);
    this.wipeBtn.addClass(this.btnProcessingClass);
    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterMigration(response);
        console.log(response);
      }
    });
  }

  afterMigration(response) {
    console.log(response);
    if( response.errorMsg.length ) {
      this.wipeBtn.addClass(this.btnAlertClass);
      this.wipeMsg.html(response.errorMsg.join('<br />'));
      return;
    }
    this.wipeBtn.addClass(this.btnSuccessClass);
    this.wipeMsg.text(response.successMsg);
  }

}

export default AjaxWipe;
