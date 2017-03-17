<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div class="panelContent" id="panelContent" style="margin-top:0px;">
						<table width="100%" align="center">
							<tr>
								<td colspan="2">
									<h5 align="left" class="screen-title"><span style="white-space:pre-wrap;">MENU_BANK_INFO_EXCHANGE</span></h5>
									<div class="line-separate" />
								</td>
							</tr>
							<tr>
								<td colspan="4" style="border:none;" align="right"><span style="display:none">EXCHANGE_RATE_UNIT</span></td>
							</tr>
						</table>
						<div id='id.exchange.detail'></div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>