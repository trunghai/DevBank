<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div class="panelContent">
						<table width="100%">
							<tr>
								<td>
									<h5 class="screen-title" ><span style="white-space:pre-wrap;">ACCOUNT_PERIOD_TITLE</span></h5>
									<div class="line-separate"/>
								</td>
							</tr>
							<tr>
                                <td>
                                    <div class="tab" style="margin-top: 0px;">
                                        <div class="item selected">
                                            <div class="left"></div>
                                            <div class="text"><span>ACCOUNT_PERIOD_INFO</span></div>
                                            <div class="right"></div>
                                        </div>
                                        <div class="item" onclick="showPageFindTrans()">
                                            <div class="left"></div>
                                            <div class="text"><span>ACCOUNT_PERIOD_TAB_SEARCH</span></div>
                                            <div class="right"></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
						 </table>
						 <br/>
						 <table width='100%' align='center' class='table-account'>
							<tr class="tr-two-col">
								<td class="td-two-col">
									 <div class="div-two-col sm-col-title"><b><span>ACCOUNT_PERIOD_TYPE</span></b></div>
									 <div class="div-two-col sm-col-value"><span id="acc_dtl_type"></span></div>
								</td>
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>COM_ACCOUNT_NUMBER</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_acc"></span></div>
								</td>
							</tr>
							<tr class="tr-two-col">
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>COM_NUM_MONEY_SAVING</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_amount"></span></div>    
								</td>
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>COM_PERIOD</span></b></div>
									<div class="div-two-col sm-col-value">
										<span id="acc_dtl_period"></span>
										<span id="acc_dtl_period_day" style="display : none;">ACCOUNT_PERIOD_DAY</span>
										<span id="acc_dtl_period_month" style="display : none;">ACCOUNT_PERIOD_MONTH</span>
										<span id="acc_dtl_period_year" style="display : none;">ACCOUNT_PERIOD_YEAR</span>
									</div>
								</td>
							</tr>
							<tr class="tr-two-col">
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>ACC_INTEREST_YEAR</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_interest_rate"></span></div>    
								</td>
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>ACC_PROFITS_INTERIM</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_profits_interim"></span></div>
								</td>
							</tr>
							<tr class="tr-two-col">
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>ACCOUNT_PERIOD_DATESTART</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_datestart"></span></div>    
								</td>
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>ACCOUNT_AMOUNT_BLOCK</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_amount_block"></span></div>
								</td>
							</tr>
							<tr class="tr-two-col">
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>COM_DEADLINE_DATE</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_dateend"></span></div>    
								</td>
								<td class="td-two-col">
									<div class="div-two-col sm-col-title"><b><span>ACCOUNT_REASON_BLOCK</span></b></div>
									<div class="div-two-col sm-col-value"><span id="acc_dtl_reason_block"></span></div>
								</td>
							</tr>
						</table>
						<br/>
						<table width='100%' align='center'>
						    <tr>
						        <td>
						             <input type="button" style="margin-left:0;float:left;" class="btnshadow btn-second" onclick="acc_list_acount_info_dtl_btnBack()" value="CM_BTN_GOBACK"/>
						        </td>
						        <td>
						             <input type="button" id ="exeTrans" style="display:none;" class="btnshadow btn-second" onclick="acc_list_acount_info_dtl_btnFinal()" value="ACCOUNT_PERIOD_BTN_FINAL"/>
						        </td>
						    </tr>
						</table>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>