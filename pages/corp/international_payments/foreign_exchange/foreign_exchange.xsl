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
              <tr style="display: none">
                <td>
                  <div class="tab" style="margin-top: 0px;">
                    <div class="item selected">
                      <div class="left"></div>
                      <div class="text"><span>TRANS_PERIODIC_TRADE_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                    <div class="item" onclick="showMngPage()">
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
                  <h5 class="Header" style="white-space:pre-wrap"><span>FOREGIN_EXCHANGE_RATE</span></h5>
                </td>
              </tr>
            </table>
            <table align="center" class="table-exchange-rate" style="table-layout: fixed;">
              <tr>
                <!-- <th width="20%"><span style="white-space:pre-wrap; font-weight: bold; color: #5F2F85;">FOREGIN_EXCHANGE_RATE</span></th> -->
                <th width="20%"><span style="white-space:pre-wrap; color: #F60;">FOREGIN_MONEY</span></th>
                <th width="40%"><span style="white-space:pre-wrap; color: #F60;">FOREGIN_BUY_BY_TPB</span></th>
              </tr>
              <tr>
                <td><span style="white-space:pre-wrap; font-weight: bold;">USD</span></td>
                <td>
                  <input style="white-space:pre-wrap" disabled="true" id="rateUSD" class="form-control form-control-rightbutton table-exchange-organe" />
                </td>
              </tr>
              <tr>
                <td><span style="white-space:pre-wrap; font-weight: bold;">JPY</span></td>
                <td>
                  <input style="white-space:pre-wrap" disabled="true" id="rateJPY" class="form-control form-control-rightbutton table-exchange-organe" />
                </td>
              </tr>
              <tr>
                <td><span style="white-space:pre-wrap; font-weight: bold;">EUR</span></td>
                <td>
                  <input style="white-space:pre-wrap" disabled="true" id="rateEUR" class="form-control form-control-rightbutton table-exchange-organe" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td style="float: left; font-weight: bold;"><span style="white-space:pre-wrap">FOREGIN_UNIT</span></td>
              </tr>
            </table>
            <table width="100%" align="center">
              <tr>
                <td>
                  <h5 class="Header" style="white-space:pre-wrap"><span>FOREGIN_ACCOUNT_INFO</span></h5>
                </td>
              </tr>
              <!-- Tài khoản ngoại tệ -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onClick="showListAccountForeign()">
                    <span class="input-group-addon" style="width:40%;white-space:pre-wrap">FOREGIN_ACCOUNT</span>
                    <input style="white-space:pre-wrap" id="foreginAccount" type="button" class="form-control form-control-rightbutton" value="COM_TXT_INPUT_PLACEHOLDER" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Số dư khả dụng -->
              <tr>
                <td colspan="2">
                  <div id="trans.sourceaccoutbalances">
                    <div class="availblstyle">
                      <span>COM_TXT_ACC_BALANCE_TITLE</span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- Tài khoản thanh toán -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onClick="showListAccountVND()">
                    <span class="input-group-addon" style="width:40%;white-space:pre-wrap">FOREGIN_ACCOUNT_PAYMENT</span>
                    <input style="white-space:pre-wrap" id="foreginAccountVND" type="button" class="form-control form-control-rightbutton" value="COM_TXT_INPUT_PLACEHOLDER" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Số dư khả dụng -->
              <tr>
                <td colspan="2">
                  <div id="trans.sourceaccoutbalance">
                    <div class="availblstyle"><span>COM_TXT_ACC_BALANCE_TITLE</span></div>
                  </div>
                </td>
              </tr>
              <!-- Số lượng ngoại tệ bán -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">FOREGIN_SELL_NUMBER</span>
                    <input id="id.sellNumber" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="9" onkeyup="removeChar(event,this);" />
                    <span class="input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Tỷ giá -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%">FOREGIN_RATE</span>
                    <input id="id.exchangeRate" type="tel" class="form-control form-control-righttext" disabled="true" />
                    <span class="input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Tổng số tiền nhận được -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%">FOREGIN_TOTAL_RECEIVER_AMOUNT</span>
                    <input id="id.total" type="tel" class="form-control form-control-righttext" disabled="true" />
                    <span class="input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <!-- Mô tả giao dịch -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="form-textarea-title" style="padding-left: 7px"><span>FOREGIN_DESCRIPTION</span></div>
                  <div class="input-group">
                    <textarea id="trans.content" class="form-control form-control-textarea" style="padding-left: 7px; margin: 0px; width: 100%" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="162" onkeyup="controlInputText(this, 162, false)"></textarea>
                  </div>
                </td>
              </tr>
              <!-- Gửi thông báo cho người duyệt -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
                    <input id="id.notifyTo" class="form-control form-control-righttext" disabled="true" style="white-space: pre-wrap; padding-right: 10px;" type="button" />
                  </div>
                </td>
              </tr>
              <!-- Xem danh sách người nhận thông báo -->
              <tr id="trNotify">
                <td width="100%" style="padding:3px; text-align:right;"><u>
                  <a onclick="showReceiverList()" style="cursor:pointer;"><span>COM_VIEW_LIST_APPROVER</span></a></u>
                </td>
              </tr>
            </table>
            <table class="table-exchange-notice">
              <tr>
                <td>
                  <span style="font-weight: bold">FOREGIN_EXCHANGE_NOTICE_1</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>FOREGIN_EXCHANGE_NOTICE_2</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>FOREGIN_EXCHANGE_NOTICE_3</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>FOREGIN_EXCHANGE_NOTICE_4</span>
                </td>
              </tr>
            </table>
            <table width="100%" style="padding-top: 10px">
              <tr>                
                <td>
                  <input type="button" id="btnNext" class="btnshadow btn-second" value="COM_CONTINUE" onClick="sendJsonRequest()" />
                </td>
              </tr>
            </table>
            <br />
          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
          <div id="divListGroup" class="list-group dialog-list"></div>
        </div>
        <div id="selection-dialog-input" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" align="center" onClick="closeDialogInput(this)"></div>
          <div id="divListGroupInput" class="list-group dialog-list"></div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
