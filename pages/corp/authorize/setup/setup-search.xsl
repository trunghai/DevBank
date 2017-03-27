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
                  <h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_AUTHORIZE_TRANS</span></h5>
                  <div class="line-separate" />
                </td>
              </tr>
            </table>
            <table width="100%" align="center">
              <tr>
                <td>
                  <h5 class="Header" style="white-space:pre-wrap"><span>AUTHORIZE_SETUP_WAITING_FOR_AUTH</span></h5>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="chooseTransType()">
                    <span class="input-group-addon" style="width:40%;white-space:pre-wrap">TRANS_TYPE</span>
                    <input style="white-space:pre-wrap" id="id.trans-type" type="button" class="form-control form-control-righttext" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="chooseMaker()">
                    <span class="input-group-addon" style="width:40%">COM_MAKER</span>
                    <input id="id.maker" type="button" onclick="" class="form-control form-control-righttext" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="chooseStatus()">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_STATUS</span>
                    <input id="id.status" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">ACC_PERIOD_START_DATE_TITLE</span>
                    <input id="id.begindate" type="tel" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"> </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">ACC_PERIOD_END_DATE_TITLE</span>
                    <input id="id.enddate" type="tel" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <tr class="trow-space" />
              <tr>
                <td>
                  <input id="btn_search" type="button" onclick="searchTransaction()" class="btnshadow btn-second" value="COM_BNTN_SEARCH" />
                </td>
              </tr>
            </table>
            <br />
            <div id="id.searchResult"></div>
            <div id="pagination" style="text-align: right"></div>
            <table width="100%" id="tblApproveInput" style="display: none">
              <tr>
                <tr class="trow-space" />
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <input id="reject-reason" class="form-control" placeholder="AUTHORIZE_TXT_REASON" value=""/>
                </td>
              </tr>
              <tr>
                <td style="padding-top: 15px">
                  <input type="button" class="btnshadow btn-primary" onclick="rejectTrans()" value="COM_REJ" style="margin-left: 0"/>
                </td>
                <td style="padding-top: 15px">
                  <input type="button" class="btnshadow btn-second" onclick="authorizeTrans()" value="AUTHORIZE_BTN_AUTHEN"/>
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