import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxLicense {
  constructor() {
    this.saveBtn = $('.js-rmp-license-btn');
    this.msg = $('.js-rmp-license-msg');
    this.input = $('.js-rmp-license');
    this.ajaxUrl = rmp_options.admin_ajax;
    this.updateAction = 'rmp_verify_license';
    this.msgSuccessClass = 'rmp-tab-content__action-msg--success';
    this.msgAlertClass = 'rmp-tab-content__action-msg--alert';
    this.btnSuccessClass = 'rmp-btn--success';
    this.btnAlertClass = 'rmp-btn--alert';
    this.btnProcessingClass = 'rmp-btn--processing';
    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.saveBtn.on('click', (event) => this.verifyLicense());
  }

  verifyLicense() {
    this.removeStatusIndicators();
    this.saveBtn.addClass('rmp-btn--processing');

    let licenseKey = this.input.val();

    this.data['action'] = this.updateAction;
    this.data['licenseKey'] = licenseKey;

    console.log(this.data);

    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        console.log(response);
        this.afterSave(response);
      }
    });

  }

  afterSave(response) {
    // console.log(response);
    if( response.errorMsg.length ) {
      this.msg.addClass(this.msgAlertClass);
      this.saveBtn.addClass(this.btnAlertClass);
      this.msg.html(response.errorMsg.join('<br />'));
      return;
    }
    this.msg.addClass(this.msgSuccessClass);
    this.saveBtn.addClass(this.btnSuccessClass);
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.saveBtn.removeClass(this.btnProcessingClass);
      this.saveBtn.removeClass(this.btnSuccessClass);
      this.saveBtn.removeClass(this.btnAlertClass);
    }, 2000 );
  }

  removeStatusIndicators() {
    this.msg.html('');
    this.msg.removeClass('rmp-tab-content__action-msg--success rmp-tab-content__action-msg--alert' );
    this.saveBtn.removeClass(this.btnSuccessClass);
    this.saveBtn.removeClass(this.btnAlertClass);
  }

}

export default AjaxLicense;
