<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width="100%">
                <tr>
                  <td>
                    <h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_CHILD_PAY_TAX</span></h5>
                    <div class="line-separate" />
                    <div id="seqFormLocal"></div>
                  </td>
                </tr>
              </table>
              <table width='100%' align='center' class='background-blacktrans'>
                <xsl:for-each select="review/transinfo">
                  <tr>
                    <td colspan="2">
                      <h5 class="Header"><xsl:value-of select="transtitle"/></h5>
                    </td>
                  </tr>
                  <xsl:for-each select="transcontent">
                    <tr class='trow-default'>
                      <td>
                        <xsl:value-of select="key" />
                      </td>
                      <xsl:choose>
                        <xsl:when test="combobox = 'true'">
                          <td class='td-right'>
                            <div class="input-group" onclick="getValueTKNSNN();">
                              <input style="white-space:pre-wrap" id="id.valueTKNSNN" type="button" class="form-control form-control-righttext" />
                              <span class="icon-movenext input-group-addon input-group-symbol"></span>
                            </div>
                          </td>
                        </xsl:when>
                        <xsl:otherwise>
                          <td class='td-right'>
                            <xsl:value-of select="value" />
                          </td>
                        </xsl:otherwise>
                      </xsl:choose>
                    </tr>
                  </xsl:for-each>
                </xsl:for-each>
              </table>
              <br/>
              <div id="divTable"></div>
              <table width="100%">
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="getTreasuryNumber()"> <span class="input-group-addon" style="width:40%;white-space:pre-wrap">TAX_TREASURY_CODE_1</span>
                      <input style="white-space:pre-wrap" id="id.treasuryName" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                      <input type="hidden" id="id.treasuryNum" />
                      <span class="icon-movenext input-group-addon input-group-symbol"></span> </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="saveQueryInfo()"> <span class="input-group-addon" style="width:40%;white-space:pre-wrap">TAX_SAVE_TAX_QUERY</span>
                      <input style="white-space:pre-wrap" id="id.saveTaxQuery" type="button" class="form-control form-control-rightbutton" value="TAX_SAVE_CODE" />
                      <span class="icon-movenext input-group-addon input-group-symbol"></span> </div>
                    <input type='hidden' id="id.saveTaxQueryValue" value='1' />
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
                      <input id="id.notifyTo" class="form-control form-control-righttext" disabled="true" style="white-space: pre-wrap; padding-right: 10px;" type="button" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="100%" style="text-align:right;"><u>
                  <a onclick="showReceiverList()" style="cursor:pointer; white-space:pre-wrap;"><span>COM_VIEW_LIST_APPROVER</span></a></u>
                  </td>
                </tr>
                <tr class="trow-space"></tr>
                <tr>
                  <td>
                    <table width="100%" align="center" class="button-group button-group-3">
                      <tr>
                        <td>
                          <input style="margin-top: 15px;" type="button" class="btnshadow btn-primary" value="REVIEW_BTN_BACK" onClick="domesticCallBack()" />
                        </td>
                        <td>
                          <input style="margin-top: 15px;" type="button" class="btnshadow btn-primary" value="REVIEW_BTN_CANCEL" onClick="domesticCancel()" />
                        </td>
                        <td>
                          <input style="margin-top: 15px;" type="button" class="btnshadow btn-primary" value="TRANS_LOCAL_BTN_SENDREQUEST" onClick="sendJsonRequest()" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"> </div>
          <div id="divListGroup" class="list-group dialog-list"> </div>
        </div>
        <div id="selection-dialog-input" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" align="center" onClick="closeDialogInput(this)">
          </div>
          <div id="divListGroupInput" class="list-group dialog-list"> </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
