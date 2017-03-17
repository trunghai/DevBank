<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview" ng-controller="identification-trans-auth-src">
          <div class="panelContent">
            <table width="100%">
              <tr>
                <td colspan="2">
                  <div>
                    <h5 class="screen-title">
                        <span>MENU_IDENTIFICATION</span>
                      </h5>
                  </div>
                  <div class="line-separate" />
                </td>
              </tr>
              <tr>
                <td>
                  <h5 class="Header"><span>TRANSFER_REMITTANCE_FINDING</span></h5>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showSearchInput(1)">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_TYPE_TRANSACTION</span>
                    <input id="trans.type" type="button" class="form-control form-control-righttext" placeholder="IDENTIFICATION_TRANS_TYPE" value="IDENTIFICATION_TRANS_TYPE" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    <input type="hidden" id='id.value.trans.type' value="T20" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showSearchInput(2)">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_MAKER</span>
                    <input id="trans.maker" type="button" class="form-control form-control-righttext" placeholder="COM_ALL" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    <input type="hidden" id='id.value.trans.maker' value="ALL" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showSearchInput(3)">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_STATUS</span>
                    <input id="trans.status" type="button" class="form-control form-control-righttext" placeholder="COM_ALL" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    <input type="hidden" id='id.value.trans.status' value="ALL" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_START_DATE</span>
                    <input id="trans.begindate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_TO_DATE</span>
                    <input id="trans.enddate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <tr class="trow-space"></tr>
              <tr>
                <td>
                  <input id="btn_search" type="button" class="btnshadow btn-second" ng-click="searchDTITransfer()" value="COM_BNTN_SEARCH" />
                </td>
              </tr>
            </table>
            <br/>
            <div id="tblContent" name="tblContent" style="overflow:auto"></div>
          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"> </div>
          <div id="divListGroup" class="list-group dialog-list"> </div>
        </div>
        <!--ThuanTM -->
        <div id="selection-dialog-input" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" align="center" onClick="closeDialogInput(this)">
          </div>
          <div id="divListGroupInput" class="list-group dialog-list"> </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
