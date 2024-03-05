import $ from 'jquery';

class SchemaSelector {
  constructor() {
    this.selectEl = $('.js-rmp-schema-select');
    this.allSchemaTypes = $('.js-rmp-schema-type');
    this.events();
  }

  events() {
    this.selectEl.on('change', (event) => this.showSchemaField());
  }

  showSchemaField() {
    this.allSchemaTypes.removeClass('rmp-customize-mb__schema__schema-field--selected');

    let selectedSchema = $(event.currentTarget).val();

    let selectedSchemaEl = $('.js-rmp-schema-' + selectedSchema.toLowerCase());

    if(selectedSchemaEl.length) {
      selectedSchemaEl.addClass('rmp-customize-mb__schema__schema-field--selected'); 
    }

  }

}

export default SchemaSelector;
