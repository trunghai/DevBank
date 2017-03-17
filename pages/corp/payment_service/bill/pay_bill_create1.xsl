<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>

			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div class="panelContent">
						<table width="100%">
							<tr>
								<td>
									<h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_CHILD_PAY_TAX</span></h5>
									<div class="line-separate" />
								</td>
							</tr>
						</table>

						<table width="100%" align="center">
							<tr>
								<td>
									<h5 class="Header" style="white-space:pre-wrap"><span>TRANS_PERIODIC_TITLE_SRCH</span></h5>
								</td>
							</tr>

							<!-- Tài khoản chuyển -->
							<tr>
								<td colspan="2" align="center" valign="middle" class="td-text">
									<div class="input-group" onClick="showAccountSelection()">
										<span class="input-group-addon" style="width:40%;white-space:pre-wrap">TRANS_PERIODIC_SOURCE_ACC_NO</span>
										<input style="white-space:pre-wrap" id="id.accountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
										<span class="icon-movenext input-group-addon input-group-symbol"></span>
									</div>
								</td>
							</tr>
							<!-- Số dư khả dụng -->
							<tr>
								<td>
									<div id="trans.sourceaccoutbalance">
										<div class="availblstyle"><span>COM_TXT_ACC_BALANCE_TITLE</span></div>
									</div>
								</td>
							</tr>

							<tr>
								<td>
									<h5 class="Header" style="white-space:pre-wrap"><span>TRANS_TYPE_PAY_TAX_TITLE</span></h5>
								</td>
							</tr>

							<!-- loại thuế -->
							<tr>
								<td align="center" valign="middle" class="td-text">
									<div class="input-group" onclick="ShowTaxType()">
										<span class="input-group-addon" style="width:40%">COM_TAX_TYPE</span>
										<input id="id.taxType" type="button" onclick="" class="form-control form-control-righttext" value="TRANS_PERIODIC_BTN_SELECT_FUNC" />
										<span class="icon-movenext input-group-addon input-group-symbol"></span>
										<input type="hidden" id="id.taxTypeValue" />
									</div>
								</td>
							</tr>

							<!-- Mã số thuế -->
							<tr id="tr.trans-other-acc">
								<td align="center" valign="middle" class="td-text">
									<div class="input-group">
										<span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_TAX_NUMBER</span>
										<input id="trans.taxNum" type="tel" placeholder="COM_TXT_INPUT_PLACEHOLDER" class="form-control form-control-righttext-datepicker" maxlength="30" />
										<span onclick="getTemplateTax();" id="span.trans.target" class="tooltip icon-book input-group-addon-datepicker input-group-symbol-datepicker" style="cursor:pointer;">
											<span style="text-align:center; font-size:14px;">
												<em id="ds_id"></em>
												<br />
												<em id="mau_id"></em>
											</span>
										</span>
									</div>
								</td>
							</tr>

							<tr id="tr.externalTax">
								<td>
									<h5 class="Header" style="white-space:pre-wrap"><span>TRANS_TYPE_INFO_EXTERNAL_TAX</span></h5>
								</td>
							</tr>

							<!-- Số tờ khai -->
							<tr id="tr.taxNumDeclar">
								<td align="center" valign="middle" class="td-text">
									<div class="input-group">
										<span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_DECLAR</span>
										<input id="id.taxNumDeclar" type="tel" class="form-control form-control-righttext" placeholder="TRANS_TAX_INPUT_OR_EMPTY" maxlength="20"/>
										<span class="input-group-addon input-group-symbol"></span>
									</div>
								</td>
							</tr>

							<!-- Năm tờ khai -->
							<tr id="tr.taxYearDeclar">
								<td align="center" valign="middle" class="td-text">
									<div class="input-group">
										<span class="input-group-addon" style="width:40%">TRANS_TYPE_INFO_YEAR_OF_DECLAR</span>
										<input id="id.taxYearDeclar" type="tel" class="form-control form-control-righttext" placeholder="TRANS_TAX_INPUT_OR_EMPTY" maxlength="4" onkeypress="return taxYearDeclarNumberKey(event);"/>
										<span class="input-group-addon input-group-symbol"></span>
									</div>
								</td>
							</tr>
							<br />
							<tr>
								<td>
									<input type="button" id="id.button.query" onclick="sendRequestToCustomer();" class="btnshadow btn-second" value="BTN_TAX_QUERY" />
								</td>
							</tr>
						</table>
						<br />
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
