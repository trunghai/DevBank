<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div>
						<div class="panelContent" style="padding-top:20px">
							<table width="100%" align="center">
								<tr>
									<td colspan="2">
										<h5 align="left" class="screen-title"><span>BANK_INFO_TPB_ATM_SCR_TITLE</span></h5>
										<div class="line-separate"></div>
									</td>
								</tr>
								<tr>
									<td colspan="1" align="left" valign="middle" class="td-text" width="50%">
										<div onClick="showCitySelection()" class="input-group">
											<span class="input-group-addon" style="white-space:pre-wrap">BANK_INFO_SELECTION_CITY</span>
											<input id="id.city" type="button" style="width:50%" class="form-control form-control-righttext" placeholder="COM_TXT_SELECTION_PLACEHOLDER" value="ALL" />
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="1" align="left" valign="middle" class="td-text"
										width="50%">
										<div onClick="showAreaSelection()" class="input-group">
											<span class="input-group-addon" style="white-space:pre-wrap">BANK_INFO_SELECTION_AREA</span>
											<input id="id.area" type="button" style="width:50%" class="form-control form-control-righttext" placeholder="COM_TXT_SELECTION_PLACEHOLDER" value="ALL" />
										</div>
									</td>
								</tr>

								<tr class="trow-space"></tr>
								<tr>
									<td colspan="2">
										<div id="divListGroup1" class="list-group" style="position:relative"></div>
									</td>
								</tr>
								<tr>
									<td colspan="2" id='bankinfo.btn.back'>
										<div class="btnshadow btn-primary" onclick="navController.popView(true);">
											<span>CM_BTN_GOBACK</span>
										</div>
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
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>