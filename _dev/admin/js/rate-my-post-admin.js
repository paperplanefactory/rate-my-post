import $ from 'jquery';
import Tabs from './modules/Tabs';
import AjaxOptions from './modules/AjaxOptions';
import MigrateRatings from './modules/MigrateRatings';
import CptHandler from './modules/CptHandler';
import RelationsHandler from './modules/RelationsHandler';
import OrderlyTables from './modules/OrderlyTables';
import AjaxRatings from './modules/AjaxRatings';
import AjaxFeedback from './modules/AjaxFeedback';
import WaypointsHandler from './modules/WaypointsHandler';
import ShortcodeHandler from './modules/ShortcodeHandler';
import AjaxSchema from './modules/AjaxSchema';
import SchemaRepeater from './modules/SchemaRepeater';
import SchemaSelector from './modules/SchemaSelector';
import AjaxStrings from './modules/AjaxStrings';
import AjaxClass from './modules/AjaxClass';
import MetaboxTabs from './modules/MetaboxTabs';
import AjaxWipe from './modules/AjaxWipe';
import AjaxNotices from './modules/AjaxNotices';
import AjaxLicense from './modules/AjaxLicense';

$(document).ready(() => {

  let ajaxNotices = new AjaxNotices();

  let settingsPage = $('.js-rmp-menu').length;
  let orderlyTablesPage = $('.js-rmp-orderly-tables').length;
  let metaboxPage = $('.js-rmp-meta-box').length;
  let crw = $('.column-crw_shortcode').length;
  let metaboxPagePro = $('.js-rmp-customize-mb').length;

  if(settingsPage) {
    let tabs = new Tabs();
    let ajaxSettings = new AjaxOptions('.js-rmp-save-options', '.js-rmp-option', 'rmp_update_options', '.js-rmp-options-msg', '.js-rmp-reset-options', 'reset_options');
    let ajaxCustomization = new AjaxOptions('.js-rmp-save-customization', '.js-rmp-customization', 'update_customization', '.js-rmp-customization-msg', '.js-rmp-reset-customization', 'reset_customization');
    let ajaxSecurity = new AjaxOptions('.js-rmp-save-security', '.js-rmp-security', 'update_security', '.js-rmp-security-msg', '.js-rmp-reset-security', 'reset_security');
    let migration = new MigrateRatings();
    let cptHandler = new CptHandler();
    let relationsHandler = new RelationsHandler();
    let stickySaveSettings = new WaypointsHandler('js-rmp-options-waypoint', '.js-rmp-options-sticky');
    let stickySaveCustomization = new WaypointsHandler('js-rmp-customization-waypoint', '.js-rmp-customization-sticky');
    let stickySaveSecurity = new WaypointsHandler('js-rmp-security-waypoint', '.js-rmp-security-sticky');
    let ajaxWipe = new AjaxWipe();
    let ajaxLicense = new AjaxLicense();
  }

  if(orderlyTablesPage) {
    let orderlyTables = new OrderlyTables();
  }

  if(metaboxPage) {
    let ajaxRating = new AjaxRatings();
    let ajaxFeedback = new AjaxFeedback();
  }

  if(metaboxPagePro) {
    let ajaxSchema = new AjaxSchema();
    let schemaRepeater = new SchemaRepeater();
    let schemaSelector = new SchemaSelector();
    let ajaxStrings = new AjaxStrings();
    let ajaxClass = new AjaxClass();
    let metaboxTabs = new MetaboxTabs();
  }

  if(crw) {
    let shortcodeHandler = new ShortcodeHandler();
  }

});
