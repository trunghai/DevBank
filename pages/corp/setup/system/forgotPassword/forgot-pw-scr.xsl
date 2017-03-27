<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<style>
				table.links a{
				color: #000000;
				text-align:justify;
				}

				table.links a:active {
				outline-color: -moz-use-text-color;
				outline-style: none;
				outline-width: 0;
				text-align:justify;
				}

				table.links a:focus {
				outline-color: -moz-use-text-color;
				outline-style: none;
				outline-width: 0;
				text-align:justify;
				}

				div.title_Q{
				font-family:Tahoma, sans-serif;
				font-size:16px;
				font-weight:bold;
				margin-bottom:25px;
				}

				div.title_KH{
				font-family:Tahoma, sans-serif;
				font-size:14px;
				font-weight:bold;
				margin-bottom:25px;
				}

				.title{
				font-family:Tahoma, sans-serif;
				font-size:13px;
				font-weight:bold;
				color:#7030A0;
				margin-bottom:20px;
				padding-right:35px;
				}

				.title_list{
				font-family:Tahoma, sans-serif;
				font-size:12px;
				font-weight:bold;
				/*color:#7030A0;*/
				margin-bottom:20px;
				/*padding-right:50px;*/
				padding-right:10px;
				text-align: left;
				}

				.content{
				font-family:Tahoma, sans-serif;
				line-height:20px;
				font-size:12px;
				margin-bottom:20px;
				/*padding-right:50px;*/
				padding-right:10px;
				text-align:justify;
				/*color:#000000;*/
				}



				div.list_content ul{
				padding:0px;
				/*padding-right:50px;*/
				padding-right:10px;
				text-align:justify;
				}

				div.list_content ul li{
				padding:0px;
				text-align:left;
				padding-right:35px;
				text-align:justify;
				}



				.stickdiv {
				position:fixed;
				top:10px;
				}
			</style>
			<body>
				<div id="mainViewContent" class="main-layout-subview" style="padding-top: 30px; float: right; width: 100%; overflow: hidden; padding-left: 150px;">
					<div>
						<table width="90%" cellpadding="0" cellspacing="0">
							<tr>
								<td>
									<div style="float:left;">
										<div class="icon-arrowleft btnshadow btn-second btn-round-15"
											onclick="goBackLogin();"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div style="text-align: center">
										<div class="title_Q">
											<span>FORGOT_PASS_TITLE</span>
										</div>
									</div>
									<!--div tieu de -->
								</td>
							</tr>
						</table>
						<div>
							<div>
								<div>
									<div class="content">
										<span>FORGOT_PASS_GUIDE_TITLE</span>
										<ul class="list_content">
											<li>
												<span>FORGOT_PASS_GUIDE_1</span>
											</li>
											<li>
												<span>FORGOT_PASS_GUIDE_2</span>
											</li>
											<li>
												<span>FORGOT_PASS_GUIDE_3</span>
												<a href="mailto:dichvu_khachhang@tpb.com.vn">dichvu_khachhang@tpb.com.vn</a>
												<span>FORGOT_PASS_GUIDE_4</span>
											</li>
										</ul>
										<span>FORGOT_PASS_THANK</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>