import $ from 'jquery';
import rmp_options from 'rmp_options';

class AjaxSchema {
  constructor() {
    this.updateBtn = $('.js-rmp-mb-schema-btn');
    this.msg = $('.js-rmp-mb-schema-msg');
    this.schemaSelect = $('.js-rmp-schema-select');
    this.postID = rmp_options.postID,
    this.ajaxUrl = rmp_options.admin_ajax;
    this.updateAction = 'update_schema';
    this.data = {
      nonce: rmp_options.nonce,
    }
    this.events();
  }

  events() {
    this.updateBtn.on('click', (event) => this.updateSchema());
  }

  updateSchema() {
    this.resetDataObject()
    this.removeStatusIndicators();
    this.updateBtn.addClass('rmp-btn--processing');
    this.data['action'] = this.updateAction;
    this.data['postID'] = rmp_options.postID;

    let schemaType = this.schemaSelect.find(':selected').val();

    let schemaData = this.getSchemaData(schemaType);

    let schemaInfo = {};

    schemaInfo['type'] = schemaType;

    schemaInfo['details'] = schemaData;

    this.data['schema'] = schemaInfo;

    $.ajax({
      type: 'POST',
      url: this.ajaxUrl,
      data: this.data,
      dataType: 'JSON',
      success: (response) => {
        this.afterUpdate(response);
      }
    });

  }

  getSchemaData(schemaType) {
    let schemaContainerClass = '.js-rmp-schema-' + schemaType.toLowerCase();
    let schemaContainer = $(schemaContainerClass);

    if(schemaContainer.length) {
      let schemaFields = {};
      // process all schema inputs
      let schemaInputs = $(schemaContainerClass + ' .js-rmp-schema-field');

      // deal with all, but complex schema
      schemaInputs.each((index, element) => {
        let parentSchemaFieldName = $(element).attr('data-schema-key-parent');
        let schemaFieldName = $(element).attr('data-schema-key');

        let schemaFieldValue = $(element).children('input').val();

        if(parentSchemaFieldName === undefined) { // has no parent, safe to store
          schemaFields[schemaFieldName] = schemaFieldValue;
        }
      });

      // deal with complex schema
      let schemaComplex = $(schemaContainerClass + ' .js-rmp-schema-complex');

      if(schemaComplex.length) {

        schemaComplex.each((index, element) => {

          let schemaFieldNameTopLevel = $(element).attr('data-schema-key-has-children');

          let schemaSingleFromComplex = $(element).children('.js-rmp-single-from-complex');

          let complexData = [];

          schemaSingleFromComplex.each((index, element) => {

            let childData = {};

            let schemaStructure = $(element).attr('data-schema-structure');

            if(schemaStructure === 'array') {
              childData = [];
            }

            let children = $(element).children('.js-rmp-schema-field');

            children.each((index, element) => {
              let schemaFieldName = $(element).attr('data-schema-key');
              let schemaFieldValue = $(element).children('input').val();

              if(!Array.isArray(childData)) {
                childData[schemaFieldName] = schemaFieldValue;
              } else {
                childData.push(schemaFieldValue);
              }
            });

            // push to array
            complexData.push(childData);

          }); // end of schemaSingleFromComplex.each


          schemaFields[schemaFieldNameTopLevel] = complexData;

        }); // end of schemaComplex.each
      } // end of schemaComplex.length

      return schemaFields;

    } // end of schemaContainer.length

    return false;

  }

  afterUpdate(response) {
    if( response.errorMsg.length ) {
      this.msg.addClass('rmp-customize-mb__schema__msg--alert');
      this.updateBtn.addClass('rmp-btn--alert');
      this.msg.html(response.errorMsg.join('<br />'));
      setTimeout( () => {
        this.removeStatusIndicators();
      }, 2000 );
      return;
    }
    this.msg.addClass('rmp-customize-mb__schema__msg--success');
    this.updateBtn.addClass('rmp-btn--success');
    this.msg.text(response.successMsg);
    setTimeout( () => {
      this.removeStatusIndicators();
    }, 2000 );
  }

  removeStatusIndicators() {
    this.updateBtn.removeClass('rmp-btn--success rmp-btn--alert rmp-btn--processing');
    this.msg.removeClass('rmp-customize-mb__schema__msg--alert rmp-customize-mb__schema__msg--success');
    this.msg.html('');
  }

  resetDataObject() {
    this.data = {
      nonce: rmp_options.nonce,
    }
  }

}

export default AjaxSchema;
