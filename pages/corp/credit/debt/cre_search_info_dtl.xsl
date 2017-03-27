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
						 <h5 class="Header"><span style="white-space:pre-wrap">CRE_DEBT_DTL_INFO_TITLE</span></h5>
						 <br/>
						 <table width='100%' align='center' class='table-account' id='detailDebt'>
							<tr>
								<td width="50%" class="dsk-mode td-left">
									 <div><b><span>CRE_DEBT_ITEM_INDENTURE_NO</span></b></div>
								</td>
								<td width="50%" class="td-left">
								    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_INDENTURE_NO</span></b></div>
									<div class="content-detail"><span id="indentute_no"></span></div>
								</td>
							</tr>
							<tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_ITEM_DEBT_NAME</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_DEBT_NAME</span></b></div>
                                    <div class="content-detail"><span id="debt_name"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_ITEM_DISBURSEMENT_MONEY</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_DISBURSEMENT_MONEY</span></b></div>
                                    <div class="content-detail"><span id="disbursement_money"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_ITEM_INTEREST</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_INTEREST</span></b></div>
                                    <div class="content-detail"><span id="interest"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_DATE</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_DATE</span></b></div>
                                    <div class="content-detail"><span id="debt_date"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>COM_EXPIRE_DATE</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>COM_EXPIRE_DATE</span></b></div>
                                    <div class="content-detail"><span id="expire_date"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_ITEM_EXPIRE_NEAR_DATE</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_EXPIRE_NEAR_DATE</span></b></div>
                                    <div class="content-detail"><span id="expire_near_date"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_ITEM_ROOT_MONEY</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_ROOT_MONEY</span></b></div>
                                    <div class="content-detail"><span id="root_money"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_DEBT_ITEM_INTEREST_MONEY</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_DEBT_ITEM_INTEREST_MONEY</span></b></div>
                                    <div class="content-detail"><span id="interest_money"></span></div>
                                </td>
                            </tr>
						</table>
						<div align="right" style="margin: 5px; width:100%" class="export-print">
					        <a href="javascript:void(0)" id="acchis.exportfile" onclick="exportExcelDebt()"><img style="margin-right:5px;" src="css/img/exportfile.png" /></a>
					    </div>
						<br/>
						<div>
						    <input type="button" style="margin-top: 15px;" class="btnshadow btn-second" onclick="creDebtDtlBack()" value="CM_BTN_GOBACK"/>
							<input type="button" style="margin-top: 15px;" class="btnshadow btn-second" onclick="creHistoryDebtPay()" value="CRE_BTN_HISTORY_DEBT"/>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>