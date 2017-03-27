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
                  <h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_FOREGIN_PAYMENT</span></h5>
                  <div class="line-separate" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="tab" style="margin-top: 0px;">
                    <div class="item" onClick="showInputPage()">
                      <div class="left"></div>
                      <div class="text"><span>TRANS_PERIODIC_TRADE_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                    <div class="item selected">
                      <div class="left"></div>
                      <div class="text"><span>TRANS_PERIODIC_MNG_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <table width="100%" align="center">
              <tr>
                <td>
                  <h5 class="Header" style="white-space:pre-wrap"><span>TRANS_PERIODIC_TITLE_SRCH</span></h5>
                </td>
              </tr>
              <!-- Loại giao dịch -->
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showTransferType()">
                    <span class="input-group-addon" style="width:40%;white-space:pre-wrap">COM_TYPE_TRANSACTION</span>
                    <input style="white-space:pre-wrap" id="id.transType" type="button" class="form-control form-control-righttext" value="TRANS_PERIODIC_BTN_SELECT_FUNC" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Trạng thái  -->
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showStatus()">
                    <span class="input-group-addon" style="width:40%">TRANS_PERIODIC_MNG_STT</span>
                    <input id="id.stt" type="button" onclick="" class="form-control form-control-righttext" value="TRANS_PERIODIC_BTN_SELECT_FUNC" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Loại tiền -->
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showMoneyUnit()">
                    <span class="input-group-addon" style="width:40%">COM_TYPE_MONEY</span>
                    <input id="id.moneyType" type="button" class="form-control form-control-righttext" value="TRANS_PERIODIC_BTN_SELECT_FUNC" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Người lập -->
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="getListMaker()">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">ACC_PERSON_ESTABLISH_TRANSACTION</span>
                    <input id="id.accountno" type="button" class="form-control form-control-righttext" value="TRANS_PERIODIC_BTN_SELECT_FUNC" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Ngày bắt đầu -->
              <tr>
                <td align="right" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_CREATED_TO_DATE</span>
                    <input id="id.begindate" type="tel" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"> </span>
                  </div>
                </td>
              </tr>
              <!-- Ngày kết thúc -->
              <tr>
                <td align="right" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_CREATED_FROM_DATE</span>
                    <input id="id.mngenddate" type="tel" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <tr class="trow-space" />
              <tr>
                <td>
                  <input type="button" onclick="searchExchangeTransfer()" class="btnshadow btn-second" value="TRANS_PERIODIC_BTN_SRCH" />
                </td>
              </tr>
            </table>
            <br />
            <div id="id.search">
            </div>
            
            <table id="tblButton" width="100%" style="display:none;">
              <tr class="trow-space" />
              <tr>
                <td>
                  <input type="button" id="id.button.cancel" onclick="sendRequestCancel()" class="btnshadow btn-second" value="BTN_CANCEL_TRANSACTION" />
                </td>
              </tr>
            </table>
            <br/><div id="tblContent" name="tblContent" style="overflow:auto"></div>
            <div id="pageIndicatorNums" style="text-align: right" />
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
