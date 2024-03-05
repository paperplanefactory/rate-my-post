
class AnalyticsPush {
  constructor(rating) {
    this.commonAnalyticsTracker = typeof window.ga;
    this.MiAnalyticsTracker = typeof window.__gaTracker;
    this.rating = rating;
    this.events();
  }

  events() {
    // common analytics tracker
    if(this.commonAnalyticsTracker !== 'undefined' ) {
        ga(
          'send',
          'event',
          'Rate my Post',
          'Post Rated ' + this.rating + '/5'
        );
        console.log('ga analytics tracker')
        return;
    }

    // monster insights tacker
    if(this.MiAnalyticsTracker !== 'undefined' ) {
      __gaTracker(
        'send',
        'event',
        'Rate my Post',
        'Post Rated ' + this.rating + '/5'
      );
      console.log('__gaTracker analytics tracker')
      return;
    }
    // unsupported tracker
    console.log('Analytics tracker not found')

  }

}

export default AnalyticsPush;
