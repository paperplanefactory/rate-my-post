import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxOptions {
  constructor(saveButtonClass, settingsClass, ajaxAction, statusMsgClass, resetButton, resetAction) {
    this.saveButton = $(saveButtonClass);
    this.options = $(settingsClass);
    this.optionsAction = ajaxAction;
    this.statusMsg = $(statusMsgClass);
    this.savingString = rmp_options.save;
    this.msgSuccessClass = 'rmp-tab-content__action-msg--success';
    this.msgAlertClass = 'rmp-tab-content__action-msg--alert';
    this.btnSuccessClass = 'rmp-btn--success';
    this.btnAlertClass = 'rmp-btn--alert';
    this.btnProcessingClass = 'rmp-btn--processing';
    this.ajaxUrl = rmp_options.admin_ajax;
    this.resetConfirm = rmp_options.resetConfirm;
    this.resetButton = $(resetButton);
    this.resetAction = resetAction;

    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.saveButton.on('click', (event) => this.gatherOptions());
    this.resetButton.on('click', (event) => this.resetOptions());
  }

  gatherOptions() {
    this.data['action'] = this.optionsAction;
    $(this.options).each((index, item) => {
      let key = $(item).attr('data-key');
      let val = false;
      if($(item).is(':checkbox')) { // for checkboxes only
        if($(item).is(':checked')) {
          val = '2';
        } else {
          val = '1';
        }
      } else {
        val = $(item).val();
      }
      this.data[key] = val;
    });
    // console.log(this.data);
    this.saveOptions(this.data);
  }

  saveOptions(options) {
    this.statusMsg.removeClass(this.msgAlertClass);
    this.statusMsg.removeClass(this.msgSuccessClass);
    this.saveButton.removeClass(this.btnProcessingClass);
    this.saveButton.removeClass(this.btnSuccessClass);
    this.saveButton.removeClass(this.btnAlertClass);
    this.statusMsg.text(this.savingString);
    this.saveButton.addClass(this.btnProcessingClass);
    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: options,
      dataType: 'JSON',
      success: (response) => {
        this.afterSave(response);
      }
    });
  }

  afterSave(response) {
    // console.log(response);
    if( response.errorMsg.length ) {
      this.statusMsg.addClass(this.msgAlertClass);
      this.saveButton.addClass(this.btnAlertClass);
      this.statusMsg.html(response.errorMsg.join('<br />'));
      return;
    }
    this.statusMsg.addClass(this.msgSuccessClass);
    this.saveButton.addClass(this.btnSuccessClass);
    this.statusMsg.text(response.successMsg);
    setTimeout( () => {
      this.saveButton.removeClass(this.btnProcessingClass);
      this.saveButton.removeClass(this.btnSuccessClass);
      this.saveButton.removeClass(this.btnAlertClass);
    }, 2000 );
  }

  resetOptions() {
    if( !confirm(this.resetConfirm) ) {
      return;
    }
    this.statusMsg.removeClass(this.msgAlertClass);
    this.statusMsg.removeClass(this.msgSuccessClass);
    this.resetButton.removeClass(this.btnProcessingClass);
    this.resetButton.removeClass(this.btnSuccessClass);
    this.resetButton.removeClass(this.btnAlertClass);
    this.statusMsg.text(this.savingString);
    this.resetButton.addClass(this.btnProcessingClass);
    this.data['action'] = this.resetAction;
    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterReset(response);
        // console.log(response);
      }
    });
  }

  afterReset(response) {
    if( response.errorMsg.length ) {
      this.statusMsg.addClass(this.msgAlertClass);
      this.resetButton.addClass(this.btnAlertClass);
      this.statusMsg.html(response.errorMsg.join('<br />'));
      return;
    }
    this.statusMsg.addClass(this.msgSuccessClass);
    this.resetButton.addClass(this.btnSuccessClass);
    this.statusMsg.text(response.successMsg);
    setTimeout( () => location.reload(), 1000 );
  }

}

export default AjaxOptions;
