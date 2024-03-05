class BrowserSupport {
  constructor() {
    this.starsToBeReplaced = document.querySelectorAll('.js-rmp-replace-half-star');
    this.starsToBeRemoved = document.querySelectorAll('.js-rmp-remove-half-star');
    this.testElement = document.createElement( "x-test" );
    this.supportTest = typeof this.testElement.style.webkitBackgroundClip;
    this.events();
  }


  events() {
    let supportsClip = true;
    if(this.supportTest === 'undefined') {
      supportsClip = false;
    }

    if(supportsClip) { // modern browser, no need for adjustments
      return;
    }

    this.starsToBeReplaced.forEach((item) => {
      item.classList.remove('rmp-icon--half-highlight');
      item.classList.add('rmp-icon--full-highlight');
    });
    this.starsToBeRemoved.forEach((item) => {
      item.classList.remove('rmp-icon--half-highlight');
    });
  }
}

export default BrowserSupport;
