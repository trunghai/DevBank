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
								<div style='display:none' class='icon-arrowleft btnshadow btn-second btn-round-15' id='bankinfo.btn.back' onClick='goBack()'></div>
							</div>
							<div style='margin-top:0px; color:#333;'>
								<h5 class='screen-title'><span>MENU_BRANCH_ATM</span></h5>
							</div>
							<div class="line-separate"></div>
							<div class="desktopmode">
								<table width="100%" style="margin-top:15px">
									<tr>
										<td>
											<table width='100%' style="padding-left:5px">
												<tr>
													<td class="desktopmode" style="border:none; width:30%; padding-left:50px;">
														<div>
															<img src="./pages/corp/pagenews/atm/img/Chi nhanh_detail.PNG" style="width:330px; height:155px; padding-right:35px" onclick="viewbranch()" />
														</div>
													</td>
													<td colspan="2">
														<table>
															<tr>
																<td align="center">
																	<span style="text-transform:uppercase; font-weight:bold; padding-left:40px; font-size:14px">MENU_BANK_INFO_BRANCH</span>
																</td>
															</tr>
															<tr class="trow-space" />
															<tr>
																<td>
																	<img src="./pages/corp/pagenews/atm/img/BackDrop_DN-6x3m.png" style="width:17px" />
																	<span style="padding-left:5px">MENU_BRANCH_SEARCH</span>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td>
											<input type="button" class="btnshadow btn-second" onclick="viewbranch()" value="VIEW_DETAIL_BUTTON" />
										</td>
									</tr>
									<tr class="trow-space" />
									<tr>
										<td colspan="2" align="center" style="border-bottom:#8B53A2 dashed 1px"></td>
									</tr>
								</table>
								<table width="100%" style="margin-top:15px">

									<tr>
										<td>
											<table width='100%' style="padding-left:5px">
												<tr>
													<td class="desktopmode" style="border:none; width:30%; padding-left:50px;">
														<div>
															<img src="./pages/corp/pagenews/atm/img/ATM_detail.PNG" style="width:330px; height:165px; padding-right:35px" onclick="viewatm()" />
														</div>
													</td>
													<td colspan="2">
														<table>
															<tr>
																<td align="center">
																	<span style="text-transform:uppercase; font-weight:bold; padding-left:120px; font-size:14px">MENU_BANK_INFO_TPB_ATM</span>
																</td>
															</tr>
															<tr class="trow-space" />
															<tr>
																<td>
																	<img src="./pages/corp/pagenews/atm/img/BackDrop_DN-6x3m.png" style="width:17px" />
																	<span style="padding-left:5px">MENU_ATM_SEARCH</span>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td>
											<input type="button" class="btnshadow btn-second" onclick="viewatm()" value="VIEW_DETAIL_BUTTON" />
										</td>
									</tr>
								</table>
							</div>
							<div class="mobilemode">
								<table>
									<tr>
										<td>
											<h5 class="Header">
												<span style="white-space:pre-wrap" onClick="viewbranch()">MENU_BANK_INFO_BRANCH</span>
											</h5>
										</td>
									</tr>
									<tr>
										<td>
											<h5 class="Header">
												<span style="white-space:pre-wrap" onClick="viewatm()">MENU_BANK_INFO_TPB_ATM</span>
											</h5>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
