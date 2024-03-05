import $ from 'jquery';

class SchemaRepeater {
  constructor() {
    this.addBtn = $('.js-rmp-schema-field-add-repeater');
    this.removeBtn = $('.js-rmp-schema-field-remove-repeater');
    this.removeBtnClass = '.js-rmp-schema-field-remove-repeater';
    this.events();
  }

  events() {
    this.addBtn.on('click', (event) => this.addRepeater());
    this.removeBtn.on('click', (event) => this.removeRepeater());
    this.adjustRemoveBtn();
  }

  addRepeater() {
    let repeaterToCopy = $(event.currentTarget).parent().siblings('.js-rmp-single-from-complex').last();
    repeaterToCopy.clone().find('input:text').val('').end().insertAfter(repeaterToCopy);

    let allRemoveButtons = $(this.removeBtnClass);
    allRemoveButtons.off();
    allRemoveButtons.on('click', (event) => this.removeRepeater());
    this.adjustRemoveBtn();
  }

  removeRepeater() {
    let repeater = $(event.currentTarget).closest('.js-rmp-single-from-complex');

    let repeaterSiblings = repeater.siblings();

    if(repeaterSiblings.length > 1) {
      repeater.remove();
    }
    this.adjustRemoveBtn();
  }

  adjustRemoveBtn() {
    let allRemoveButtons = $(this.removeBtnClass);
    allRemoveButtons.each((index, element) => {
      $(element).removeClass('rmp-schema-multiple-container__remove__btn--disabled');
      let repeater = $(element).closest('.js-rmp-single-from-complex');
      let repeaterSiblings = repeater.siblings();
      if(repeaterSiblings.length < 2) {
        $(element).addClass('rmp-schema-multiple-container__remove__btn--disabled');
      }
    });
  }

}

export default SchemaRepeater;
