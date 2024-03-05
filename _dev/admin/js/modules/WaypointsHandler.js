import $ from 'jquery';
import 'waypoints/lib/noframework.waypoints.min.js';

class WaypointsHandler {
  constructor(triggerID, targetClass) {
    this.trigger = document.getElementById(triggerID);
    this.target = $(targetClass);
    this.events();
  }

  events() {
    const waypoint = new Waypoint({
      element: this.trigger,
      handler: (direction) => {
        if(direction == 'down') {
          this.target.addClass('rmp-tab-content__sticky-save--hidden');
        } else {
          this.target.removeClass('rmp-tab-content__sticky-save--hidden');
        }
      },
      offset: 'bottom-in-view'
    });
  }
}

export default WaypointsHandler;
