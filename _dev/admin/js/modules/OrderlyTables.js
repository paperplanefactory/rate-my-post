import $ from 'jquery';
import DataTable from 'datatables.net-dt';

class OrderlyTables {
  constructor() {
    this.statsTable = $('.js-rmp-stats-table');
    this.analyticsTable = $('.js-rmp-analytics-table');
    this.events();
  }

  events() {
    this.statsTable.DataTable();
    this.analyticsTable.DataTable({
      "order": [[ 0, "desc" ]]
    });
  }


}

export default OrderlyTables;
