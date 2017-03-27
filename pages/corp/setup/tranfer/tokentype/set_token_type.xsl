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
				<h5 class="Header"><span style="white-space:pre-wrap">COM_METHOD_ARE_USED</span></h5>
				<table width='100%'>
                    <tr>
                        <td>
                            <div><span id="nowUse">COM_TOKEN_OTP_VAS</span></div>
                            <input type="hidden" id="nowUseValue"/>
                        </td>
                    </tr>
                </table>
				<h5 class="Header"><span style="white-space:pre-wrap">COM_METHOD_CHOOSE</span></h5>
				<table width='100%' class='table-account' id='needUse'>
					
				</table>
				<div>
					<input style="margin-top: 15px;" type="button" class="btnshadow btn-second" onclick="setupChangeTypeTokenExe()" value="TRANS_LOCAL_BTN_SENDREQUEST"/>
					<input style="margin-top: 15px;" type="button" class="btnshadow btn-second" onclick="setupChangeTypeTokenCallBack()" value="CM_BTN_GOBACK"/>
				</div>
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
