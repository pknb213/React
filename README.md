# React

###`DataTable Install method`

npm install --save jszip
npm install --save pdfmake
npm install --save datatables.net-dt
npm install --save datatables.net-autofill-dt
npm install --save datatables.net-buttons-dt
npm install --save datatables.net-colreorder-dt
npm install --save datatables.net-fixedcolumns-dt
npm install --save datatables.net-fixedheader-dt
npm install --save datatables.net-keytable-dt
npm install --save datatables.net-responsive-dt
npm install --save datatables.net-rowgroup-dt
npm install --save datatables.net-rowreorder-dt
npm install --save datatables.net-scroller-dt
npm install --save datatables.net-select-dt

###`Using the Module`

require( 'jszip' );
require( 'pdfmake' );
require( 'datatables.net-dt' )();
require( 'datatables.net-autofill-dt' )();
require( 'datatables.net-buttons-dt' )();
require( 'datatables.net-buttons/js/buttons.colVis.js' )();
require( 'datatables.net-buttons/js/buttons.flash.js' )();
require( 'datatables.net-buttons/js/buttons.html5.js' )();
require( 'datatables.net-buttons/js/buttons.print.js' )();
require( 'datatables.net-colreorder-dt' )();
require( 'datatables.net-fixedcolumns-dt' )();
require( 'datatables.net-fixedheader-dt' )();
require( 'datatables.net-keytable-dt' )();
require( 'datatables.net-responsive-dt' )();
require( 'datatables.net-rowgroup-dt' )();
require( 'datatables.net-rowreorder-dt' )();
require( 'datatables.net-scroller-dt' )();
require( 'datatables.net-select-dt' )();

###`Common Js method`
var $  = require( 'jquery' );

var dt = require( 'datatables.net' )( window, $ );