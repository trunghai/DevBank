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
											<div class="text"><span>CRE_GUA_TAB_SEARCH_INFO_TITLE</span></div>
											<div class="right"></div>
										</div>
										<div class="item" onclick="showPageFindTrans()" style="display:none">
											<div class="left"></div>
											<div class="text"><span>CRE_GUA_TAB_RELEASE_TITLE</span></div>
											<div class="right"></div>
										</div>
									</div>
								</td>
							</tr>
						 </table>
						 <br/>
						 <h5 class="Header"><span style="white-space:pre-wrap">CRE_GUA_DTL_TITLE</span></h5>
						 <br/>
						 <table width='100%' align='center' class='table-account'>
							<tr>
								<td width="50%" class="dsk-mode td-left">
									 <div><b><span>CRE_ITEM_GUARANTEE_GUA_NO</span></b></div>
								</td>
								<td width="50%" class="td-left">
								    <div class="mobile-mode"><b><span>CRE_ITEM_GUARANTEE_GUA_NO</span></b></div>
									<div class="content-detail"><span id="gua_no"></span></div>
								</td>
							</tr>
							<tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_TYPE_GUARANTEE</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_TYPE_GUARANTEE</span></b></div>
                                    <div class="content-detail"><span id="gua_type"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_ITEM_GUARANTEE_GUA_AMOUNT</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_ITEM_GUARANTEE_GUA_AMOUNT</span></b></div>
                                    <div class="content-detail"><span id="gua_amount"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_ITEM_GUARANTEE_GUA_RECEIVER</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_ITEM_GUARANTEE_GUA_RECEIVER</span></b></div>
                                    <div class="content-detail"><span id="gua_receiver"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_RELEASE_DATE</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_RELEASE_DATE</span></b></div>
                                    <div class="content-detail"><span id="release_date"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_ITEM_GUARANTEE_SERI_NO</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_ITEM_GUARANTEE_SERI_NO</span></b></div>
                                    <div class="content-detail"><span id="seri_no"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>COM_DEADLINE_DATE</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>COM_DEADLINE_DATE</span></b></div>
                                    <div class="content-detail"><span id="deadline_date"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>COM_STATUS</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>COM_STATUS</span></b></div>
                                    <div class="content-detail"><span id="status"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="dsk-mode td-left">
                                     <div><b><span>CRE_ITEM_GUARANTEE_GUA_CONTENT</span></b></div>
                                </td>
                                <td width="50%" class="td-left">
                                    <div class="mobile-mode"><b><span>CRE_ITEM_GUARANTEE_GUA_CONTENT</span></b></div>
                                    <div class="content-detail"><span id="gua_content"></span></div>
                                </td>
                            </tr>
						</table>
						<div align="right" style="margin: 5px; width:100%" class="export-print">
                            <a href="javascript:void(0)" id="acchis.exportfile" onclick="exportExcelGuarantee()">
							  <img style="margin-right:5px;" src="css/img/exportfile.png" />
							</a>
                        </div>
						<div>
						    <input type="button" class="btnshadow btn-second" onclick="creGuarantDtlBack()" value="CM_BTN_GOBACK"/>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>