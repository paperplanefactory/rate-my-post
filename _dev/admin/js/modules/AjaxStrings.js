import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxStrings {
  constructor() {
    this.updateBtn = $('.js-rmp-mb-strings-btn');
    this.msg = $('.js-rmp-strings-msg');
    this.inputs = $('.js-rmp-custom-string');
    this.postID = rmp_options.postID,
    this.ajaxUrl = rmp_options.admin_ajax;
    this.updateAction = 'update_custom_strings';
    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.updateBtn.on('click', (event) => this.updateStrings());
  }

  updateStrings() {
    this.resetDataObject()
    this.removeStatusIndicators();
    this.updateBtn.addClass('rmp-btn--processing');
    this.data['action'] = this.updateAction;
    this.data['postID'] = rmp_options.postID;

    let customStrings = {};

    this.inputs.each((index, element) => {
      let key = $(element).attr('data-custom-string-key');
      let value = $(element).val();

      if(value.replace(/\s/g, "").length > 0) {
        customStrings[key] = value;
      }
    });

    if(jQuery.isEmptyObject(customStrings)) {
      customStrings['hasStrings'] = false;
    }

    this.data['strings'] = customStrings;

    console.log(this.data);

    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterUpdate(response);
      }
    });

  }

  afterUpdate(response) {
    if( response.errorMsg.length ) {
      this.msg.addClass('rmp-customize-mb__strings__msg--alert');
      this.updateBtn.addClass('rmp-btn--alert');
      this.msg.html(response.errorMsg.join('<br />'));
      setTimeout( () => {
        this.removeStatusIndicators();
      }, 2000 );
      return;
    }
    this.msg.addClass('rmp-customize-mb__strings__msg--success');
    this.updateBtn.addClass('rmp-btn--success');
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.removeStatusIndicators();
    }, 2000 );
  }

  removeStatusIndicators() {
    this.updateBtn.removeClass('rmp-btn--success rmp-btn--alert rmp-btn--processing');
    this.msg.removeClass('rmp-customize-mb__strings__msg--alert rmp-customize-mb__strings__msg--success');
    this.msg.html('');
  }

  resetDataObject() {
    this.data = {
      nonce: rmp_options.nonce,
    }
  }

}

export default AjaxStrings;
