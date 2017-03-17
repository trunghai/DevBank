<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
            <div class="panelContent">
                <div><h5 class="screen-title"><span>SET_SYSTEM_TITLE</span></h5></div>
                <div class="line-separate"/>
                <div id="seqFormLocal"></div>
                <h5 class="Header"><span style="white-space:pre-wrap">SET_PAS_ITEM_NOTE</span></h5>
                <table width='100%'>
                    <tr><td><div><u><b><span>SET_PAS_ITEM_RULE</span></b></u></div><br/></td></tr>
                    <tr><td><div><span>SET_PAS_ITEM_RULE_1</span></div></td></tr>
                    <tr><td><div><span>SET_PAS_ITEM_RULE_2</span></div></td></tr>
                    <tr><td><div><span>SET_PAS_ITEM_RULE_3</span></div></td></tr>
                    <tr><td><div><span>SET_PAS_ITEM_RULE_4</span></div></td></tr>
                    <tr><td><div><span>SET_PAS_ITEM_RULE_5</span></div></td></tr>
              </table> 
              <br/>
              <table width="100%">
                    <tr>
                        <td class="td-text" colspan="2">
                            <div class="input-group">
                                <span class="input-group-addon" style="white-space; width:40%">SET_PAS_ITEM_PASSWORD_NOW</span>
                                <input id="passwordCurrent" type="password" class="form-control form-control-righttext" value="" placeholder="SEQ_INPUT_TITLE"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-text" colspan="2">
                            <div class="input-group">
                                <span class="input-group-addon" style="white-space; width:40%">SET_PAS_ITEM_PASSWORD_NEW</span>
                                <input id="newPassword" type="password" class="form-control form-control-righttext" value="" placeholder="SEQ_INPUT_TITLE"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-text" colspan="2">
                            <div class="input-group">
                                <span class="input-group-addon" style="white-space; width:40%">SET_PAS_ITEM_PASSWORD_RENEW</span>
                                <input id="reNewPassword" type="password" class="form-control form-control-righttext" value="" placeholder="SEQ_INPUT_TITLE"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
	                        <input style="margin-top: 15px;margin-left:0;float:left;" type="button" class="btnshadow btn-second" value="CM_BTN_GOBACK" onClick="setupChangePasswordCallBack()"/>
                        </td>
                        <td>
                            <input style="margin-top: 15px;" type="button" class="btnshadow btn-second" value="CM_BTN_SEND_REQ" onClick="setupChangePasswordExe()"/>
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
