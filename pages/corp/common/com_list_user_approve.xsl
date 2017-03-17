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
									<h5 class="screen-title">
										<span style="white-space:pre-wrap;">COM_LIST_USER_APPROVE_TITLE</span>
									</h5>
									<div class="line-separate" />
								</td>
							</tr>
						</table>
						<div>
							<h5 class="Header"><span style="white-space:pre-wrap"><span>COM_LIST_USER_APPROVE_ITEM_TITLE</span></span></h5>
						</div>
						<br />
						<div id="tblContent" name="tblContent" style="overflow:auto"></div>
						<br />
						<div>
							<input type="button" class="btnshadow btn-second" onclick="callBackScreen()"
								value="CM_BTN_GOBACK" />
						</div>
					</div>
				</div>
				<div id="selection-dialog" class="dialog-blacktrans" align="center"
					style="display:none">
					<div class="dialog-backgroundtrans" onClick="closeDialog(this)">
					</div>
					<div id="divListGroup" class="list-group dialog-list">
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>