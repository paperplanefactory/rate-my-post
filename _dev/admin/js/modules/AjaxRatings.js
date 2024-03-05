import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxRatings {
  constructor() {
    this.updateBtn = $('.js-rmp-mb-update');
    this.resetBtn = $('.js-rmp-mb-reset');
    this.voteCount = $('.js-rmp-mb-vote-count');
    this.avgRating = $('.js-rmp-mb-avg');
    this.currentVoteCount = this.voteCount.val();
    this.currentAvgRating = this.avgRating.val();
    this.msg = $('.js-rmp-mb-msg');
    this.postID = rmp_options.postID,
    this.ajaxUrl = rmp_options.admin_ajax;
    this.updateAction = 'update_results';
    this.resetAction = 'reset_results';
    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.updateBtn.on('click', (event) => this.updateRating());
    this.resetBtn.on('click', (event) => this.resetRating());
  }

  updateRating() {
    this.resetDataObject()
    this.removeStatusIndicators();
    this.updateBtn.addClass('rmp-btn--processing');
    this.data['action'] = this.updateAction;
    this.data['votes'] = this.voteCount.val();
    this.data['avg'] = this.avgRating.val();
    this.data['postID'] = rmp_options.postID,
    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterUpdate(response, this.voteCount.val(), this.avgRating.val());
      }
    });
  }

  afterUpdate(response, newVoteCount, newAvgRating) {
    if( response.errorMsg.length ) {
      this.msg.addClass('rmp-meta-box__action-msg--alert');
      this.updateBtn.addClass('rmp-btn--alert');
      this.msg.html(response.errorMsg.join('<br />'));
      this.voteCount.val(this.currentVoteCount);
      this.avgRating.val(this.currentAvgRating);
      setTimeout( () => {
        this.removeStatusIndicators();
      }, 2000 );
      return;
    }
    this.currentAvgRating = newAvgRating;
    this.currentVoteCount = newVoteCount;
    this.msg.addClass('rmp-meta-box__action-msg--success');
    this.updateBtn.addClass('rmp-btn--success');
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.removeStatusIndicators();
    }, 2000 );
  }

  removeStatusIndicators() {
    this.updateBtn.removeClass('rmp-btn--success rmp-btn--alert rmp-btn--processing');
    this.resetBtn.removeClass('rmp-btn--success rmp-btn--alert rmp-btn--processing');
    this.msg.removeClass('rmp-meta-box__action-msg--success rmp-meta-box__action-msg--alert');
    this.msg.html('');
  }

  resetRating() {
    this.resetDataObject()
    this.removeStatusIndicators();
    this.resetBtn.addClass('rmp-btn--processing');
    this.data['action'] = this.resetAction;
    this.data['postID'] = rmp_options.postID,
    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterReset(response);
      }
    });
  }

  afterReset(response) {
    if( response.errorMsg.length ) {
      this.msg.addClass('rmp-meta-box__action-msg--alert');
      this.resetBtn.addClass('rmp-btn--alert');
      this.msg.html(response.errorMsg.join('<br />'));
      setTimeout( () => {
        this.removeStatusIndicators();
      }, 2000 );
      return;
    }
    this.msg.addClass('rmp-meta-box__action-msg--success');
    this.resetBtn.addClass('rmp-btn--success');
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.removeStatusIndicators();
    }, 2000 );
    this.voteCount.val('0');
    this.avgRating.val('0');
  }

  resetDataObject() {
    this.data = {
      nonce: rmp_options.nonce,
    }
  }

}

export default AjaxRatings;
