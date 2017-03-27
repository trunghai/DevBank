<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id="mainViewContent" class="main-layout-subview">
					<div class="panelContent">
						<table width="100%">
							<tr>
								<td>
									<h5 class="screen-title" ><span style="white-space:pre-wrap;">CRE_TITLE</span></h5>
									<div class="line-separate"/>
								</td>
							</tr>
							<tr>
								<td>
									<div class="tab" style="margin-top: 0px;">
										<div class="item selected">
											<div class="left"></div>
											<div class="text"><span>CRE_TAB_SEARCH_DEBT_TITLE</span></div>
											<div class="right"></div>
										</div>
										<div class="item" onclick="showPageFindTrans()" style="display:none">
											<div class="left"></div>
											<div class="text"><span>CRE_TAB_CREATE_DEBT_TITLE</span></div>
											<div class="right"></div>
										</div>
									</div>
								</td>
							</tr>
						 </table>
						 <br/>
						 <h5 class="Header"><span style="white-space:pre-wrap">CRE_DEBT_OVERDRAFT_DTL_INFO_TITLE</span></h5>
						 <br/>
						 <table width='100%' align='center' class='table-account'>
		                    <tr class="tr-two-col">
		                        <td class="td-two-col">
		                             <div class="div-two-col"><b><span>CRE_DEBT_TYPE_ACC</span></b></div>
		                             <div class="div-two-col"><span id="type_acc"></span></div>
		                        </td>
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_OPEN_ACC_DATE</span></b></div>
		                            <div class="div-two-col"><span id="open_acc_date"></span></div>
		                        </td>
		                    </tr>
		                    <tr class="tr-two-col">
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_MONEY</span></b></div>
		                            <div class="div-two-col"><span id="money"></span></div>
		                        </td>
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_BRANCH_NAME</span></b></div>
		                            <div class="div-two-col"><span id="branch_name"></span></div>
		                        </td>
		                    </tr>
		                    <tr class="tr-two-col">
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_OVERDAFT_INTEREST</span></b></div>
		                            <div class="div-two-col"><span id="overdaft_interest"></span></div>    
		                        </td>
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>COM_SURPLUS</span></b></div>
		                            <div class="div-two-col"><span id="surplus"></span></div>
		                        </td>
		                    </tr>
		                    <tr class="tr-two-col">
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_OVERDRAFT_START_DATE</span></b></div>
		                            <div class="div-two-col"><span id="overdaft_start_date"></span></div>
		                        </td>
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_OVERDRAFT_END_DATE</span></b></div>
		                            <div class="div-two-col"><span id="overdaft_end_date"></span></div>
		                        </td>
		                    </tr>
		                    <tr class="tr-two-col">
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_SURPLUS_AVAILABEL</span></b></div>
		                            <div class="div-two-col"><span id="surplus_availabel"></span></div>
		                        </td>
		                        <td class="td-two-col">
		                            <div class="div-two-col"><b><span>CRE_DEBT_LIMIT_OVERDRAFT</span></b></div>
		                            <div class="div-two-col"><span id="limit_overdaft"></span></div>
		                        </td>
		                    </tr>
		                </table>
		                <div class="export-print" align="right" style="margin: 5px; width:100%">
			                <a href="javascript:void(0)" id="acchis.exportfile" onclick="exportExcelOverDraftDetail()">
							  <img style="margin-right:5px;" src="css/img/exportfile.png" />
							</a>
			            </div>
			            <br/>
						<br/>
						<div>
							<input type="button" class="btnshadow btn-second"
									onclick="overDaftDtlCallBack()" value="CM_BTN_GOBACK"/>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>