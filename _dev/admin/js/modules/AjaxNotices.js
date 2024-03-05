import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxNotices {
  constructor() {
    this.closeBtnClass = '.js-rmp-admin-notice .notice-dismiss';
    this.ajaxUrl = rmp_options.admin_ajax;
    this.data = {
      nonce: rmp_options.nonce,
      action: 'rmp_dismiss_notice',
    }
    this.events();
  }

  events() {
    $(document).on('click', this.closeBtnClass, (event) => this.removeNotice());
  }

  removeNotice() {
    let noticeKey = $(event.target).parent('.js-rmp-admin-notice').attr('data-admin-notice-key');

    this.data['noticeKey'] = noticeKey;

    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        console.log(response); 
      }
    });
  }

}

export default AjaxNotices;
