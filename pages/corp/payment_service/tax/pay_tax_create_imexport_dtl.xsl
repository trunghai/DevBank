<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>

			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div>
						<div class="panelContent">
							<table width="100%">
								<tr>
									<td>
										<h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_CHILD_PAY_TAX</span></h5>
										<div class="line-separate" />
										<div id="seqFormLocal"></div>
									</td>
								</tr>
							</table>
							<h5 class="Header"><span style="white-space:pre-wrap">TAX_PAY_TAX_CUST_INFO</span></h5>
							<table width='100%' class='background-blacktrans'>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>COM_TAX_NUMBER</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TaxNumber"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_CUST_PAY_TAX</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TaxCustPayTax"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_CUST_PAY_TAX_ADDRESS</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TaxAddress"></span></div>
									</td>
								</tr>
							</table>
							<h5 class="Header">
								<span style="white-space:pre-wrap">TAX_INFO</span>
							</h5>
							<table width='100%' align='center' class='background-blacktrans'>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>COM_TAX_TYPE</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TaxType"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_TREASURY_NAME</span></b>
										</div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TreasuryName"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_TREASURY_ACC</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TreasuryAccNum"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_TREASURY_MNG</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.TreasuryMng"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>COM_DECLAR</span></b>
										</div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.Declar"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_MONEY_TYPE</span></b>
										</div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.MoneyType"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_DECLAR_DATE</span></b>
										</div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.DeclarDateCreate"></span></div>
									</td>
								</tr>
								<tr class='trow-default'>
									<td class='td-left'>
										<div><b><span>TAX_IE_CODE_TYPE</span></b></div>
									</td>
									<td class='td-right'>
										<div><span id="imEx.Num"></span></div>
									</td>
								</tr>
							</table>
							<h5 class="Header"><span style="white-space:pre-wrap">PAYMENT_TRANSFER_INFO</span></h5>
							<br />
							<div width="100%" id="tblContent" name="tblContent" style="overflow:auto"></div>
							<table width="100%">
								<tr>
									<td colspan="2" align="center" valign="middle" class="td-text">
										<div class="input-group" onClick="saveQueryInfo()">
											<span class="input-group-addon" style="width:40%;white-space:pre-wrap">TAX_SAVE_TAX_QUERY</span>
											<input style="white-space:pre-wrap" id="id.saveTaxQuery" type="button" class="form-control form-control-rightbutton" value="TAX_SAVE_CODE" />
											<span class="icon-movenext input-group-addon input-group-symbol"></span>
											<input type='hidden' id="id.saveTaxQueryValue" value='1'/>
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2" align="center" valign="middle" class="td-text">
										<div class="input-group">
											<span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
											<input id="id.notifyTo" class="form-control form-control-righttext" value="COM_NOTIFY_BY_EMAIL" disabled="true" style="white-space: pre-wrap; padding-right: 10px;" type="button"/>
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2"  width="100%" style="padding:3px; text-align:right;">
										<u>
											<a onclick="showReceiverList()" style="cursor:pointer; white-space:pre-wrap;">
												<span>COM_VIEW_LIST_APPROVER</span>
											</a>
										</u>
									</td>
								</tr>
								<tr>
								    <td>
								        <table width="100%" align="center" class="button-group button-group-3">
                                            <tr>
                                                <td>
                                                    <input style="margin-top: 15px;" type="button" class="btnshadow btn-primary" value="REVIEW_BTN_BACK" onClick="taxImExportCallBack()"/>
                                                </td>
                                                <td>
                                                    <input style="margin-top: 15px;" type="button" class="btnshadow btn-primary" value="REVIEW_BTN_CANCEL" onClick="taxImExportCancel()"/>
                                                </td>
                                                <td>
                                                    <input style="margin-top: 15px;" type="button" class="btnshadow btn-primary" value="REVIEW_BTN_NEXT" onClick="taxImExportExe()"/>
                                                </td>
                                            </tr>
                                        </table>
								    </td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
					<div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
					<div id="divListGroup" class="list-group dialog-list"></div>
				</div>
				<div id="selection-dialog-input" class="dialog-blacktrans" align="center" style="display:none">
					<div class="dialog-backgroundtrans" align="center" onClick="closeDialogInput(this)"></div>
					<div id="divListGroupInput" class="list-group dialog-list"></div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
