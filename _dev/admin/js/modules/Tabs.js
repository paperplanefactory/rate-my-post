import $ from 'jquery';
import 'waypoints/lib/noframework.waypoints.min.js';

class Tabs {
  constructor() {
    this.tabs = $('.js-rmp-tab');
    this.tabContents = $('.js-rmp-tab-content');
    this.events();
  }

  events() {
    this.tabs.on('click', (event) => this.tabClicked());
  }

  tabClicked() {
    let tabNumber = $(event.currentTarget).data('tab');
    let tabContentToShow = $('.js-rmp-tab-content--' + tabNumber );
    // remove classes
    $(this.tabs).removeClass('rmp-menu__tabs__tab--selected');
    $(this.tabContents).removeClass('rmp-tab-content--visible');
    // add classes
    $(event.currentTarget).addClass('rmp-menu__tabs__tab--selected');
    $(tabContentToShow).addClass('rmp-tab-content--visible');
    Waypoint.refreshAll()
  }

}

export default Tabs;
