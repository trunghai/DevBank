<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
            <div class="panelContent">
				<div><h5 class="screen-title"><span>COM_SETUP_TRANFER</span></h5></div>
                <div class="line-separate"/>
				<div id="seqFormLocal"></div>
				<h5 class="Header"><span style="white-space:pre-wrap">SET_SEND_ITEM_TITLE</span></h5>
				<table width='100%' class='table-account' >
					<tr>
						<td style='border:0' class="td-left">
							<div onclick="displayTemplate('0');">
							     <input type="radio" value="0" id="rdbtnDisplay0" name="maturityDirective" /> 
							     <span style="padding-left: 5px;" id='send_0'>SET_SEND_CHOOSE_NO_SEND</span>
							</div>
							
						</td>
					</tr>
					<tr>
						<td style='border:0' class="td-left">
							<div onclick="displayTemplate('1');">
							     <input type="radio" value="1" id="rdbtnDisplay1" name="maturityDirective"/>
							     <span style="padding-left: 5px;" id='send_1'>SET_SEND_CHOOSE_SEND_EMAIL</span>
							</div>
						</td>
					</tr>
					<tr>
						<td style='border:0' class="td-left">
							<div onclick="displayTemplate('2');">
							     <input type="radio" value="2" id="rdbtnDisplay2" name="maturityDirective" />
							     <span style="padding-left: 5px;" id='send_2' >SET_SEND_CHOOSE_SEND_SMS</span>
							</div>
						</td>
					</tr>
					<tr>
						<td style='border:0' class="td-left">
							<div onclick="displayTemplate('3');">
							     <input type="radio" value="3" id="rdbtnDisplay3" name="maturityDirective" />
							     <span style="padding-left: 5px;" id='send_3'>SET_SEND_CHOOSE_SEND_ALL</span>
							</div>
						</td>
					</tr>
				</table>
				<input type="hidden" id="methodSendOld" value="0"/>
				<div id="templateMailTitle" style="display : none;">
				    <br/>
				    <h5 class="Header" ><span style="white-space:pre-wrap">SET_SEND_TEMPLATE_MAIL_TITLE</span></h5>
				</div>				
				<div class="input-group">
				    <div id="templateMailContent" class="form-control form-control-textarea" disabled="true" style="display : none; height: 100px; margin-left: 5px;"></div>
                    
                </div>
                <div id="templateSMSTitle" style="display : none;">
                    <br/>
                    <h5 class="Header"><span style="white-space:pre-wrap">SET_SEND_TEMPLATE_SMS_TITLE</span></h5>
                </div>
                <div class="input-group">
                    <textarea id="templateSMSContent" class="form-control form-control-textarea" disabled="true" placeholder="COM_TXT_INPUT_PLACEHOLDER" style="display : none; height: 80px;"></textarea>
                </div>
                <table width='100%'>
                    <tr>
                        <td>
                            <input type="button" class="btnshadow btn-second" style="margin-top: 15px; margin-left:0;float:left;" onclick="setupCallBack()" value="CM_BTN_GOBACK"/>
                        </td>
                        <td>
                            <input type="button" class="btnshadow btn-second" style="margin-top: 15px;" onclick="setupSendMethodExe()" value="TRANS_LOCAL_BTN_SENDREQUEST"/>
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
