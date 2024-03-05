import $ from 'jquery';
import rmp_options from 'rmp_options';

class MigrateRatings {
  constructor() {
    this.migrateButton = $('.js-rmp-migrate');
    this.migrateMsg = $('.js-rmp-migration-msg');
    this.ajaxUrl = rmp_options.admin_ajax;
    this.btnSuccessClass = 'rmp-btn--success';
    this.btnAlertClass = 'rmp-btn--alert';
    this.btnProcessingClass = 'rmp-btn--processing';
    this.data = {
      nonce: rmp_options.nonce,
      action: 'migrate_data'
    }
    this.events();
  }

  events() {
    this.migrateButton.on('click', (event) => this.migrate());
  }

  migrate() {
    this.migrateButton.removeClass(this.btnProcessingClass);
    this.migrateButton.removeClass(this.btnSuccessClass);
    this.migrateButton.removeClass(this.btnAlertClass);
    this.migrateButton.addClass(this.btnProcessingClass);
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
      this.migrateButton.addClass(this.btnAlertClass);
      this.migrateMsg.html(response.errorMsg.join('<br />'));
      return;
    }
    this.migrateButton.addClass(this.btnSuccessClass);
    this.migrateMsg.text(response.successMsg);
  }


}

export default MigrateRatings;
