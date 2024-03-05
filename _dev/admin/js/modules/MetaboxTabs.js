import $ from 'jquery';

class MetaboxTabs {
  constructor() {
    this.tabs = $('.js-rmp-customize-mb-tab');
    this.tabContent = $('.js-rmp-customize-mb-schema-container, .js-rmp-customize-mb-style-container, .js-rmp-customize-mb-strings-container');
    this.events();
  }

  events() {
    this.tabs.on('click', (event) => this.switchTab());
  }

  switchTab() {
    this.tabs.removeClass('rmp-customize-mb__tabs__tab--selected');
    this.tabContent.removeClass('rmp-customize-mb__schema--visible');
    $(event.currentTarget).addClass('rmp-customize-mb__tabs__tab--selected');
    let tabToShow = '.' + $(event.currentTarget).attr('data-tab-class');
    $(tabToShow).addClass('rmp-customize-mb__schema--visible');

  }

}

export default MetaboxTabs;
