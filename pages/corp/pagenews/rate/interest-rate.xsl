<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div class="panelContent" style="height:100%;">
						<table width="100%" align="center">
							<tr>
								<td colspan="2">
									<h5 align="left" class="screen-title"><span style="white-space: pre-wrap;">MENU_BANK_INFO_INTEREST</span></h5>
									<div class="line-separate" />
								</td>
							</tr>
							<tr>
								<td colspan="1" style="border: none; display: none;" align="right"><span>EXCHANGE_RATE_UNIT</span></td>
							</tr>
							<tr>
								<td colspan="2" align="center" valign="middle" class="td-text">
									<div class="input-group" onClick="showChooseSavingType()">
										<span class="input-group-addon" style="width: 40%; white-space: pre-wrap;">INTEREST_RATE_CHOOSE</span>
										<input id="esavingType" type="button" class="form-control form-control-righttext" style="white-space: pre-wrap; height: 58%; padding-right: 10px"
											value="COM_TXT_SELECTION_PLACEHOLDER" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="off"/>
											<span class="icon-movenext input-group-addon input-group-symbol"></span>
										<input type="hidden" id="esavingTypeValue"/>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2"></td>
							</tr>
						</table>
						<div id='id.saving.detail'></div>
						<div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
                            <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
                            <div id="divListGroup" class="list-group dialog-list"></div>
                        </div>
					</div>
                </div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>