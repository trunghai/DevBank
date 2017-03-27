<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id="mainViewContent" class="main-layout-subview" ng-controller="acc-list-account-info">
					<div class="panelContentCorp">
						 <table width="100%">
							<tr>
								<td>
									<h5 class="screen-title" ><span style="white-space:pre-wrap;">ACCOUNT_PERIOD_TITLE</span></h5>
									<div class="line-separate"/>
								</td>
							</tr>
							<tr id="tr-tab">
								<td>
									<div class="tab" style="margin-top: 0px;">
										<div class="item selected">
											<div class="left"></div>
											<div class="text"><span>ACCOUNT_PERIOD_INFO</span></div>
											<div class="right"></div>
										</div>
										<div class="item" onclick="showPageFindTrans()">
											<div class="left"></div>
											<div class="text"><span>ACCOUNT_PERIOD_TAB_SEARCH</span></div>
											<div class="right"></div>
										</div>
									</div>
								</td>
							</tr>
						 </table>
						<div><h5 class="Header"><span style="white-space:pre-wrap"><span>ACCOUNT_PERIOD_COUNTER</span></span></h5></div>
						<div id="tblContentCounter" name="tblContent" style="overflow:auto"></div>
                        <div id="pageCounter" align="right" style="width: 100%;" />
						<div id="total_amount_counter"></div>
						<br/>
						<div><h5 class="Header"><span style="white-space:pre-wrap"><span>ACCOUNT_PERIOD_ONLINE</span></span></h5></div>						
						<div id="tblContentOnline" name="tblContent" style="overflow:auto"></div>
                        <div id="pageOnline" align="right" style="width: 100%;"/>
						<div><b>
							<span>ACCOUNT_PERIOD_TOTAL_AMOUNT</span> 
							<span id="total_amount_online"></span>
						</b></div>
						<br/>
						<div>
							<input type="button" id="listInfoExe" class="btnshadow btn-second" onclick="gotoScreenCreateAccount()" value="ACC_SEND_MONEY_ONLINE"/>
						</div>
					</div>
				</div>
				<div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
					<div class="dialog-backgroundtrans" onClick="closeDialog(this)"> </div>
					<div id="divListGroup" class="list-group dialog-list"> </div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>