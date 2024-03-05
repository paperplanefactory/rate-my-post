import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxClass {
  constructor() {
    this.updateBtn = $('.js-rmp-mb-style-btn');
    this.msg = $('.js-rmp-style-msg');
    this.input = $('.js-rmp-class-input');
    this.postID = rmp_options.postID,
    this.ajaxUrl = rmp_options.admin_ajax;
    this.updateAction = 'update_custom_class';
    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.updateBtn.on('click', (event) => this.updateClass());
  }

  updateClass() {
    this.resetDataObject()
    this.removeStatusIndicators();
    this.updateBtn.addClass('rmp-btn--processing');
    this.data['action'] = this.updateAction;
    this.data['postID'] = rmp_options.postID;

    let widgetsClass = this.input.val();

    if( !widgetsClass ) {
      widgetsClass = '';
    }

    this.data['class'] = widgetsClass;

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
      this.msg.addClass('rmp-customize-mb__style__msg--alert');
      this.updateBtn.addClass('rmp-btn--alert');
      this.msg.html(response.errorMsg.join('<br />'));
      setTimeout( () => {
        this.removeStatusIndicators();
      }, 2000 );
      return;
    }
    this.msg.addClass('rmp-customize-mb__style__msg--success');
    this.updateBtn.addClass('rmp-btn--success');
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.removeStatusIndicators();
    }, 2000 );
  }

  removeStatusIndicators() {
    this.updateBtn.removeClass('rmp-btn--success rmp-btn--alert rmp-btn--processing');
    this.msg.removeClass('rmp-customize-mb__style__msg--alert rmp-customize-mb__style__msg--success');
    this.msg.html('');
  }

  resetDataObject() {
    this.data = {
      nonce: rmp_options.nonce,
    }
  }

}

export default AjaxClass;
