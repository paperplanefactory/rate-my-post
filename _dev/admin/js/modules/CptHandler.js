import $ from 'jquery';

class CptHandler {
  constructor() {
    this.cptRating = $('.js-rmp-cpt-rating');
    this.cptResults = $('.js-rmp-cpt-results')
    this.cptRatingInput = $('.js-rmp-cpt-rating-input');
    this.cptResultsInput = $('.js-rmp-cpt-results-input');
    this.events();
  }

  events() {
    this.cptRating.on('click', (event) => this.populateRatingInput());
    this.cptResults.on('click', (event) => this.populateResultsInput());
  }

  populateRatingInput() {
    let text = this.cptRating.text().trim();
    this.cptRatingInput.val(text);
  }

  populateResultsInput() {
    let text = this.cptResults.text().trim();
    this.cptResultsInput.val(text);
  }

}

export default CptHandler;
