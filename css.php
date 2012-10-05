<!--styles-->
	<style>
		*{font-family: helvetica, arial, sans-serif;}
		body{font-size: 12px; background: #FFF; margin: 0px; height: 100%; width: 100%;}
		#wrap{margin: 0px 0px 0px 10px;}
		#header{}
		.left{text-align: left;}
		.center{text-align: center;}
		.right{text-align: right;}
		.hidden{display: none;}
		.fl{float: left;}
		.fr{float: right;}
		.hr{border: 1px solid #e0e0e0;}
		.para{float: left;position: relative;left: 50%;}
		.llax{float: left;position: relative;left: -50%;}
		.meta{padding-bottom: 10px; padding-left: 0px;}
		.app-title{margin-left: 0px;}
		#page-title{margin-left: 10px; margin-top: 10px; font-size: 26px; color: #08C;}
		.nav-ctrl{margin: 0px; padding: 0px; line-height: 1em;}
		#nav a{margin-right: 10px; font-size: 14px;}

		/* columns */
		.column {font-family: helvetica, arial, sans-serif; width: 200px; float: left; min-height: 600px; border-right: 1px solid #e0e0e0;}
		.column:last-child{border-right: 0px;}
		.column-content{min-height: 50px;}
		.column-ctrl{margin-top: 0px; width: 200px; height: 20px;}
		.column-ctrl select{font-size: 11px; width: 50px; height: 20px; margin-left: 0px; margin-top: 5px;}
		.column-ctrl-text{margin-left: 10px; margin-right: 5px; font-weight: bold;}
		.column-delete-top{margin: -25px 20px 0px 0px; width: 16px; height: 16px;}
		.column-add-top{margin: -25px 0px 0px 0px; width: 16px; height: 16px;}
		.column-num{margin-top: -25px; font-weight: bold; margin-left: 15px; font-size: 14px;}
		.column-title{margin-left: 10px; font-size: 12px; min-height: 35px; font-weight: 600;}
		.anchor-title{margin-left: 10px; margin-top: 5px; line-height: 1em; font-size: 12px; min-height: 30px; font-weight: 600;}
		
		/* cards */
		.card{margin: 0px 10px 10px 10px;}
		.title-card .card-content-view{margin: 0px 10px -10px 0px !important;}
		.title-card .card-content-edit textarea{width: 170px; margin-left: -5px; height: 38px;}
		.rounded{-moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; border: 1px solid #d8d8d8;}
		.card-content-view {width: 170px; margin: 10px 10px 10px 0px; padding: 5px; min-height: 35px;}
		.card-content-view {width: 170px; margin: 10px 10px 10px 0px; padding: 5px; min-height: 35px;}

		.card-content-edit {width: 170px; margin: 10px 10px 10px 0px; padding: 5px; line-spacing: 1em;}
		.ctrl,.ctrl-edit{ margin: 5px 5px 5px 5px;}
		.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; }
		.ui-sortable-placeholder * { visibility: hidden; }

		/* edit form */
		.card-content-edit{}
		.card-content-edit textarea{width: 160px; height: 80px;}
		.card-content-edit .title{float: left; font-size: 12px; font-weight: bold;}
		.card-add,.card-save,.card-close,.card-delete{cursor: pointer;}

		/* add/edit */
		.colors{padding-bottom: 10px;}
		.colorclick{float: left; font-size: 11px; height: 12px; width: 12px; border: 1px solid #000; text-align: center; margin-right: 3px; cursor: pointer;}
		.columnclick{float: left; font-size: 11px; width: 10px; border: 0px solid #696969; text-align: center; margin-right: 5px; cursor: pointer;}
		
		/* plot */

		/* plot list */
		.plot-list-title{margin-top: 4px; font-size: 18px; color: #000;}
		.plot-list-title-edit{margin-left: 10px;}
		.plot-ctrl{margin-right: 30px;}
		.plot-block{margin-left: 0px;}
		.plot-desc{width: 500px;}
	</style>