<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div class="panelContentCorp">
            <div><h5 class="screen-title"><span>CONST_MANAGE_TRANS_TEMPLATE</span></h5></div>
            <table width="100%">
              <tr>
                <td>
                  <h5 class="screen-title"><span style="white-space:pre-wrap;">CRE_TITLE</span></h5>
                  <div class="line-separate" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="tab" style="margin-top: 0px;">
                    <div class="item" onclick="showManageBeneficiary()">
                      <div class="left"></div>
                      <div class="text"><span>COM_SAVE_BENE</span></div>
                      <div class="right"></div>
                    </div>
                    <div class="item selected">
                      <div class="left"></div>
                      <div class="text"><span>CONST_MANAGE_TRANS_TEMPLATE</span></div>
                      <div class="right"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <br/>
            <table width="100%" align='center' style="margin-top: 15px">
              <tr>
                <td>
                  <h5 class="Header"><span>TRANSFER_REMITTANCE_FINDING</span></h5>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANSFER_REMITTANCE_NAME</span>
                    <input id="id.template.name" maxlength="60" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showTransType()">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANSFER_REMITTANCE_SELECT_TYPE</span>
                    <input id="trans.type" type="button" class="form-control form-control-righttext" placeholder="COM_ALL" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    <input type="hidden" id='id.value.trans.type' value="ALL" />
                  </div>
                </td>
              </tr>
              <tr class="trow-space"></tr>
              <tr>
                <td colspan="2">
                  <table class="button-group button-group-3" style="margin-top: 15px">
                    <tr>
                      <td>
                        <input type="button" class="btnshadow btn-primary" onclick="searchTransTemps()" value="COM_BNTN_SEARCH" />
                      </td>
                      <td>
                        <input type="button" class="btnshadow btn-primary" onclick="addTemplate()" value="TRANSFER_REMITTANCE_ADD_TEMPLATE" />
                      </td>
                      <td>
                        <input type="button" class="btnshadow btn-primary" onclick="resetInput()" value="ESAVING_CHANGEINFO_VER_BTN_CLR" />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <br/>
            <div id="tblContent" name="tblContent" style="overflow:auto"></div>
            <div id="pagination" style="text-align: right"></div>
            <br/>
            <br/>
            <div id="editBeneDetail" name="editBeneDetail" style="overflow:auto"></div>
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
