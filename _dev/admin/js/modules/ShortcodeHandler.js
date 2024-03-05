import $ from 'jquery';

class ShortcodeHandler {
  constructor() {
    this.shortcode = $('.js-rmp-crw-shortcode');
    this.events();
  }

  events() {
    this.shortcode.on('click', (event) => this.copyText());
  }

  copyText() {
    let shortcode = $(event.currentTarget).text();
    this.copyToClipboard(shortcode);
  }

  copyToClipboard(text) {
    let rmp_dummy = document.createElement("textarea");
    document.body.appendChild(rmp_dummy);
    rmp_dummy.value = text;
    rmp_dummy.select();
    document.execCommand("copy");
    document.body.removeChild(rmp_dummy);
  }

}

export default ShortcodeHandler;
