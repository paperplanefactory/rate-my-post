import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxFeedback {
  constructor() {
    this.deleteItem = $('.rmp-js-ind-delete-feedback');
    this.deleteBtn = $('.js-rmp-mb-delete-feedback');
    this.msg = $('.js-rmp-mb-feedback-msg');
    this.feedbackTable = $('.js-rmp-feedback-table');
    this.postID = rmp_options.postID,
    this.ajaxUrl = rmp_options.admin_ajax;
    this.indDeleteAction = 'individually_delete_feedback';
    this.allDeleteAction = 'delete_feedback';
    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.deleteItem.on('click', (event) => this.indDeleteFeedback());
    this.deleteBtn.on('click', (event) => this.deleteAllFeedback());
  }

  indDeleteFeedback() {
    this.resetDataObject()
    let feedbackID = $(event.currentTarget).attr('data-id');

    if( ! feedbackID ) {
      alert('Feedback submitted before version 2.7 cannot be deleted individually! You can delete all feedback by pressing delete feedback button at the bottom.');
      return;
    }

    this.data['action'] = this.indDeleteAction;
    this.data['postID'] = rmp_options.postID,
    this.data['feedbackID'] = feedbackID,

    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterIndDeleteFeedback(response);
      }
    });
  }

  afterIndDeleteFeedback(response) {
    if( response.errorMsg.length ) {
      alert(response.errorMsg.join('<br />'));
      return;
    }

    let feedbackRow = $('.js-rmp-feedback--' + response.feedbackID);
    feedbackRow.remove();
  }

  deleteAllFeedback() {
    this.resetDataObject()
    this.removeStatusIndicators();
    this.deleteBtn.addClass('rmp-btn--processing');
    this.data['action'] = this.allDeleteAction;
    this.data['postID'] = rmp_options.postID,
    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterAllDeleteFeedback(response);
      }
    });
  }

  afterAllDeleteFeedback(response) {
    if( response.errorMsg.length ) {
      this.msg.addClass('rmp-meta-box__feedback__msg--alert');
      this.deleteBtn.addClass('rmp-btn--alert');
      this.msg.html(response.errorMsg.join('<br />'));
      setTimeout( () => {
        this.removeStatusIndicators();
      }, 2000 );
      return;
    }
    this.msg.addClass('rmp-meta-box__feedback__msg--success');
    this.deleteBtn.addClass('rmp-btn--success');
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.removeStatusIndicators();
      this.deleteBtn.remove();
      this.feedbackTable.remove();
    }, 2000 );
  }

  removeStatusIndicators() {
    this.msg.removeClass('rmp-meta-box__feedback__msg--alert rmp-meta-box__feedback__msg--success');
    this.msg.html('');
    this.deleteBtn.removeClass('rmp-btn--alert rmp-btn--success rmp-btn--processing');
  }

  resetDataObject() {
    this.data = {
      nonce: rmp_options.nonce,
    }
  }

}

export default AjaxFeedback;
