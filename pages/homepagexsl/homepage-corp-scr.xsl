<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id='mainViewContent' class='main-layout-subview'>
					<div>
						<div id='homePageContent' class='panelContent'>
							<div class='div-btn-round-container' style='left:10px; position:absolute'>
								<div style='display:none'
									class='icon-arrowleft btnshadow btn-second btn-round-15' id='bankinfo.btn.back' onClick='goBack()'></div>
							</div>
							<div class="desktopmode" style='margin-top:0px; color:#333;'>
								<h5 class='screen-title'>
									<span>HOME_PAGE_TITLE</span>
								</h5>
							</div>
							<div class="desktopmode">
								<table width="100%" border="0" cellpadding="0"
									cellspacing="0">
									<tbody>
										<tr>
											<td style="font-family:Tahoma, Geneva, sans-serif;font-size:12.5px;font-weight:normal;text-align:left;padding-bottom:10px;padding-top:0px">
												<span style="color:#1d2129">HOME_PAGE_WELLCOME_TITLE</span>
											</td>
										</tr>
										<tr>
											<td style="font-family:Tahoma, Geneva, sans-serif;font-size:12.5px;font-weight:normal;text-align:left;">
												<span style="color:#1d2129">HOME_PAGE_COMPANY</span>
												<span id="company_name" style="color:#1d2129"></span>
											</td>
										</tr>
										<tr>
											<td style="font-family:Tahoma, Geneva, sans-serif;font-size:12.5px;font-weight:normal;text-align:left;padding-bottom:10px;">
												<span style="color:#1d2129" id="staff_position">HOME_PAGE_OFFICER</span>
												<span id="account_name" style="color:#1d2129"></span>
											</td>
										</tr>
										<tr>
											<td style="font-family:Tahoma, Geneva, sans-serif;font-size:11px;font-weight:normal;text-align:left;">
												<span style="color:#1d2129">HOME_PAGE_LAST_LOGIN</span>
												<span id="last_login" style="color:#1d2129"></span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="mobilemode" style="padding-top:15px;">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:8px;">
									<tbody id="home-dynamic"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
