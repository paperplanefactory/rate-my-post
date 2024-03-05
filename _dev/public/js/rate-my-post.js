import InitWidget from './modules/InitWidget';
import AjaxLoad from './modules/AjaxLoad';
import BrowserSupport from './modules/BrowserSupport';
import DestroyWidgets from './modules/DestroyWidgets';
import rmp_frontend from 'rmp_frontend';

function init_rate_my_post() {
  // deal with half-highlighted icons for older browsers
  let browserSupport = new BrowserSupport();
  // check if rating or results widget is present
  let ratingWidgets = document.getElementsByClassName('js-rmp-rating-widget');
  let resultsWidgets = document.getElementsByClassName('js-rmp-results-widget');
  let ratingWidgetContainers = document.getElementsByClassName('js-rmp-widgets-container');
  // exit if rating or results widget is not present
  if( ratingWidgets.length < 1 && resultsWidgets.length < 1  ) {
    return;
  }
  // save post ids to array
  let postsIDs = [];

  Array.from(ratingWidgetContainers).forEach((item) => {
    let postID = item.dataset.postId;
    postsIDs.push(postID);
  });

  // remove duplicates
  let uniquePostIDs = postsIDs.filter((item, index) => postsIDs.indexOf(item) === index);
  // postsIDs = [...new Set(postsIDs)]; //requires polyfill

  // ajax load results
  if( rmp_frontend.ajaxLoad == 2 ) {
    let ajaxLoad = new AjaxLoad(uniquePostIDs[0]); // limit to one due to script executions
    let initWidget = new InitWidget(uniquePostIDs[0]);
    return;
  }

  // init each widget
  uniquePostIDs.forEach((postID) => {
    let initWidget = new InitWidget(postID);
  });
};

// Init
if (document.readyState !== 'loading') {
  init_rate_my_post();
} else {
  document.addEventListener('DOMContentLoaded', init_rate_my_post);
}

export function re_init() {
  console.log('re-init running');
  let destroyWidgets = new DestroyWidgets();
  init_rate_my_post();
}

// Init single rate my post
export function init_single_rate_my_post(postID, ajaxLoad) {
  if(ajaxLoad) {
    let ajaxLoad = new AjaxLoad(postID);
  }
  let initWidget = new InitWidget(postID);
}
