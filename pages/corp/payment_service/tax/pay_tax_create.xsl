<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>

			<body>
				<div id="mainViewContent" class="main-layout-subview" style="top:8px;">
					<div class="panelContent">
						<table width="100%">
							<tr>
								<td>
									<h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_CHILD_PAY_TAX</span></h5>
									<div class="line-separate" />
								</td>
							</tr>
					
							<tr>
								<td>
									<span style="white-space:pre-wrap;line-height: 1.5;" id="suspendMessage"></span>
								</td>
							</tr>

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

              <!--Thông tin nộp phí, lệ phí của bộ ngành -->
              <tr id="tr.taxInfoOrg">
                <td>
                  <h5 class="Header" style="white-space:pre-wrap">
                    <span>K_TAX_INFO_ORGANIZATION</span>
                  </h5>
                </td>
              </tr>
              
              <!--Số hồ sơ-->
              <tr id="tr.taxNumberBrief">
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">K_TAX_TAX_NUMBER</span>
                    <input id="id.taxNumberBrief" type="tel" placeholder="COM_TXT_INPUT_PLACEHOLDER" class="form-control form-control-righttext-datepicker" maxlength="30" />
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

              <!--Ký hiệu chứng từ-->
              <tr id="tr.taxSingnal">
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">K_TAX_SIGNAL_FILE</span>
                    <input id="id.taxSingnal" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="20"/>
                    <span class="input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>

              <!--Số chứng từ-->
              <tr id="tr.taxNumFiles">
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%">K_TAX_NUMBER_FILE</span>
                    <input id="id.taxNumFiles" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="10" onkeypress="return taxYearDeclarNumberKey(event);"/>
                    <span class="input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              
              <!--Mã đơn vị quản lý-->
              <tr id="tr.taxOrgCode">
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">K_TAX_ORGANIZATION_CODE</span>
                    <input id="id.taxOrgCode" type="tel" class="form-control form-control-righttext" placeholder="TRANS_TAX_INPUT_OR_EMPTY" maxlength="20"/>
                    <span class="input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>

              <!--Năm chứng từ-->
              <tr id="tr.taxOrgYear">
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%">K_TAX_ORGANIZATION_YEAR</span>
                    <input id="id.taxOrgYear" type="tel" class="form-control form-control-righttext" placeholder="TRANS_TAX_INPUT_OR_EMPTY" maxlength="4" onkeypress="return taxYearDeclarNumberKey(event);"/>
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
