<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
            <div class="panelContent">
                <div><h5 class="screen-title"><span>ACCOUNT_FINALIZE_TITLE</span></h5></div>
                <div class="line-separate"/>
                <div id="seqFormLocal"></div>
                <h5 class="Header"><span style="white-space:pre-wrap">ACCOUNT_PERIOD_INFO</span></h5>
                <table width='100%' align='center' class='table-account'>
				    <tr class="tr-two-col">
				        <td class="td-two-col">
				             <div class="div-two-col"><b><span>ACCOUNT_PERIOD_TYPE</span></b></div>
				             <div class="div-two-col"><span id="dtlType"></span></div>
				        </td>
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>COM_ACCOUNT_NUMBER</span></b></div>
				            <div class="div-two-col"><span id="dtlTypeMoney"></span></div>
				        </td>
				    </tr>
				    <tr class="tr-two-col">
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>COM_AMOUNT</span></b></div>
				            <div class="div-two-col"><span id="dtlAmount"></span></div>
				        </td>
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>COM_PERIOD</span></b></div>
				            <div class="div-two-col">
				                <span id="dtlPeriod"></span>
				                <span id="dtlPeriodDay" style="display : none;">ACCOUNT_PERIOD_DAY</span>
				                <span id="dtlPeriodMonth" style="display : none;">ACCOUNT_PERIOD_MONTH</span>
				                <span id="dtlPeriodYear" style="display : none;">ACCOUNT_PERIOD_YEAR</span>
				            </div>
				        </td>
				    </tr>
				    <tr class="tr-two-col">
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>ACC_INTEREST_YEAR</span></b></div>
				            <div class="div-two-col"><span id="dtlInterestRate"></span></div>    
				        </td>
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>ACC_PROFITS_INTERIM</span></b></div>
				            <div class="div-two-col"><span id="dtlProfitsInterim"></span></div>
				        </td>
				    </tr>
				    <tr class="tr-two-col">
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>ACCOUNT_PERIOD_DATESTART</span></b></div>
				            <div class="div-two-col"><span id="dtlDateStart"></span></div>
				        </td>
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>ACCOUNT_AMOUNT_BLOCK</span></b></div>
				            <div class="div-two-col"><span id="dtlAmountBlock"></span></div>
				        </td>
				    </tr>
				    <tr class="tr-two-col">
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>ACCOUNT_PERIOD_DATEEND</span></b></div>
				            <div class="div-two-col"><span id="dtlDateEnd"></span></div>
				        </td>
				        <td class="td-two-col">
				            <div class="div-two-col"><b><span>ACCOUNT_REASON_BLOCK</span></b></div>
				            <div class="div-two-col"><span id="dtlReasonBlock"></span></div>
				        </td>
				    </tr>
				</table>
				<br/>
				<h5 class="Header"><span style="white-space:pre-wrap">COM_ACC_TRANS</span></h5>
				<table width="100%" align="center">
				    <tr>
	                  <td colspan="2" align="center" valign="middle" class="td-text">
	                    <div class="input-group" onClick="showAccountSelection()">
	                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">ACCOUNT_FINALIZE_DTL_GOAL_ACC</span>
	                      <input id="id.accountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
	                      <span class="icon-movenext input-group-addon input-group-symbol"></span>
	                    </div>
	                  </td>
	                </tr>
	                <tr>
	                  <td colspan="2" align="center" valign="middle" class="td-text">
	                    <div class="input-group">
	                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
	                      <input id="id-trans-local" type="button" style="white-space:pre-wrap;" class="form-control form-control-righttext" disabled="true" />
	                      <span class="input-group-addon input-group-symbol"></span>
	                    </div>
	                  </td>
	                </tr>
	                <tr>
	                  <td class="td-text" width="100%" style="padding:3px; text-align:right;"><u>
	                    <a onclick="showBankName()" id='listUserApprove' style="font-style:italic; cursor:pointer; padding-left:7px; white-space:pre-wrap;"><span>COM_VIEW_LIST_APPROVER</span></a></u>
	                  </td>
	                </tr>
				</table>
				<br/>
				<table width='100%' align='center'>
                    <tr>
                        <td>
                             <input type="button" style="margin-left:0;float:left;" class="btnshadow btn-second" onclick="backToScreenDtl()" value="CM_BTN_GOBACK"/>
                        </td>
                        <td>
                             <input type="button" id='exeTrans' class="btnshadow btn-second" onclick="exeTrans()" value="CM_BTN_SEND_REQ"/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
          <div id="divListGroup" class="list-group dialog-list"></div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
