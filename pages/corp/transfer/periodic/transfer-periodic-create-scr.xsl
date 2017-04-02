<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview" ng-controller='transfer-periodic'>
          <div class="panelContent">
            <table width="100%">
              <tr>
                <td>
                  <h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_PERIODIC_TRANS</span></h5>
                  <div class="line-separate" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="tab" style="margin-top: 0px;">
                    <div class="item selected">
                      <div class="left"></div>
                      <div class="text"><span>TRANS_PERIODIC_TRADE_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                    <div class="item" onclick="showmngpage()">
                      <div class="left"></div>
                      <div class="text"><span>TRANS_PERIODIC_MNG_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div id="seqFormPeriodic"></div>
                </td>
              </tr>
            </table>
            <table width="100%" align="center">
              <tr>
                <td>
                  <h5 class="Header"><span>TRANS_TYPE</span></h5></td>
              </tr>
              <!-- Tài khoản nhận tiền -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showInputTransferTypeAccount();"> <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_BATCH_TYPE_LABEL</span>
                    <input style="white-space:pre-wrap" id="trans.type.trans" type="button" class="form-control form-control-righttext" value="COM_TXT_SELECTION_PLACEHOLDER" />
                    <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    <input type="hidden" id='id.value.trans.type.trans' />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h5 class="Header"><span>TRANS_ACCOUNT_INFO_BLOCK_TITLE</span></h5></td>
              </tr>
              <!-- Tài khoản giao dịch -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onClick="showAccountSelection()"> <span class="input-group-addon" style="width:40%;white-space:pre-wrap">TRANS_PERIODIC_SOURCE_ACC_NO</span>
                    <input style="white-space:pre-wrap" id="id.accountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                    <span class="lnr-chevron-right input-group-addon input-group-symbol"></span> </div>
                </td>
              </tr>
              <!-- Số dư khả dụng -->
              <tr>
                <td>
                  <div>
                    <h6 class="h6style">
                        <span id="trans.sourceaccoutbalance"></span>
                      </h6>
                  </div>
                </td>
              </tr>
              <!-- Số tài khoản nhận tiền -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showAccOfCustomer()"> <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_ACC_NO</span>
                    <input id="trans.desaccount" type="button" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="COM_TXT_SELECTION_PLACEHOLDER" onchange="loadInfoFromIdAccount(this)" maxlength="30"/>
                    <span id="id.next.icon" class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    <span onclick="showPayeePage();" id="span.trans.target" class="tooltip icon-book input-group-addon-datepicker input-group-symbol-datepicker" style="cursor:pointer;display:none;"> <span style="text-align:center; font-size:14px;">TRANSFER_REMITTANCE_SAVE_BENEFIC1</span></span>
                  </div>
                </td>
              </tr>
              <!-- Người nhận -->
              <tr>
                <td>
                  <!-- <div>
                    <h6 class="blstyle"><span>TRANS_LOCAL_ACC_DESTINATION_TITLE</span>
                    <span>: </span>              
                    <span id="trans.targetaccountname"></span></h6>
                  </div> -->
                  <div>
                    <h6 class="h6style">
                        <span>TRANS_LOCAL_ACC_DESTINATION_TITLE</span>
                        <span>: </span>
                        <b><span id="trans.targetaccountname"></span></b>
                      </h6>
                  </div>
                </td>
              </tr>
              <!-- Thông tin giao dịch -->
              <tr>
                <td>
                  <h5 class="Header"><span>TRANS_DETAIL_BLOCK_TITLE</span></h5></td>
              </tr>
              <!-- Số tiền -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group"> <span class="input-group-addon" style="width:40%">TRANS_PERIODIC_AMOUNT</span>
                    <input id="trans.amount" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="handleInputAmount(event, this);" onchange="removeSpecialCharForNumber(this.value)" />
                    <span class="input-group-addon input-group-symbol"></span> </div>
                </td>
              </tr>
              <!-- Chuyển tiền thành chữ -->
              <tr>
                <td>
                  <div id="trans.amounttotext">
                    <div class="txtmoneystyle"> <span>TRANS_LOCAL_NUM_TO_WORD</span></div>
                  </div>
                </td>
              </tr>
              <!-- Nội dung chuyển tiền -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="form-textarea-title" style="padding-left: 7px"><span>TRANS_PERIODIC_CONTENT</span></div>
                  <div class="input-group" >
                    <textarea id="trans.content" class="form-control form-control-textarea" style="padding-left: 7px; margin: 0px; width: 100%" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="140" onkeyup="controlInputText(this, 140)"></textarea>
                  </div>
                </td>
              </tr>
            </table>
            <table width="100%">
              <!-- Lịch chuyển định kì -->
              <tr>
                <td>
                  <h5 class="Header"><span>TRANS_PERIODIC_BOOK_TITLE</span></h5>
                </td>
              </tr>
              <!-- Tần suất chuyển tiền -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showInputFrequency()"> <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_FREQUENCY</span>
                    <input id="trans.frequency" type="button" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="COM_TXT_SELECTION_PLACEHOLDER" />
                    <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    <input type="hidden" id='id.value.trans.frequency' />
                  </div>
                </td>
              </tr>
              <!-- Ngày bắt đầu -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_BEGINNING_DATE</span>
                    <input id="trans.begindate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <!-- Ngày kết thúc -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_ENDING_DATE</span>
                    <input id="trans.enddate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <!-- Quản lý người thụ hưởng -->
              <tr id="trans_mng_payee" style="display: none">
                <td colspan="2" class="td-text" align="center" valign="middle">
                  <div class="input-group"> <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_SAVE_BENE</span>
                    <input style="white-space:pre-wrap" id="mng.payee" type="button" onclick="showInputMNG()" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="BENEFIC_LIST_NORMAL" />
                    <span class="lnr-chevron-right input-group-addon input-group-symbol"></span> </div>
                </td>
              </tr>
              <!-- Gửi thông báo cho người duyệt -->
              <tr>
                <td colspan="2" align="center" valign="middle" class="td-text">
                  <div class="input-group" >
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
                    <input id="id.notifyTo"  class="form-control form-control-righttext" disabled="true" style="white-space: pre-wrap; padding-right: 10px;" type="button"/>
                  </div>
                </td>
              </tr>
              <!-- Xem danh sách người nhận thông báo -->
              <tr id="trNotify">
                <td width="100%" style="padding:3px; text-align:right;"><u>
                  <a onclick="showReceiverList()" style="cursor:pointer;"><span>COM_VIEW_LIST_APPROVER</span></a></u>
                </td>
              </tr>
              <tr class="trow-space"></tr>
              <tr>
                <td>
                  <input type="button" class="btnshadow btn-second" ng-click= "sendJSONRequest()" value="TRANS_LOCAL_BTN_SENDREQUEST" />
                </td>
              </tr>
            </table>
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
