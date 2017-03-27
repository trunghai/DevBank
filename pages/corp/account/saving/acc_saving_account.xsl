<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview" ng-controller="acc-saving-account">
          <div class="">
            <div class="panelContent">
              <table width="100%" align="center">
                <tr>
                  <td colspan="2">
                    <div>
                      <h5 class="screen-title">
                        <span>ACC_SEND_MONEY_CKH</span>
                      </h5></div>
                    <div class="line-separate" />
                  </td>
                </tr>
                <!-- input, validate, final-->
                <tr>
                  <td colspan="2">
                    <div id="seqForm"></div>
                  </td>
                </tr>
                <!-- Tai khoan giao dich-->
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">TRANS_ACCOUNT_INFO_BLOCK_TITLE</span></h5></td>
                </tr>
                <!-- input so tai khoan-->
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showAccountSelection()">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_ACCOUNT_NUMBER</span>
                      <input id="id.accountno" style="white-space:pre-wrap" type="button" class="form-control form-control-righttext" value="COM_TXT_SELECTION_PLACEHOLDER" />
                      <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="trans.sourceaccoutbalance">
                      <h6 class="h6style">
                          <span>COM_TXT_ACC_BALANCE_TITLE</span>
                        </h6>
                    </div>
                  </td>
                </tr>
                <!-- title thong tin giao dich-->
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">COM_TXT_ACC_CONFIRM_TRANS_TITLE</span></h5></td>
                </tr>
                <!-- input số tiền gửi -->
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_NUM_MONEY_SAVING</span>
                      <input id="trans.amount" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="handleInputAmount(event, this);" onchange="removeSpecialCharForNumber(this.value)" />
                      <span class="input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h6 class="h6style" style="float: right">
                        <span style="font-style:italic; text-align:right;">E_LIMIT_SAVING_ACCOUNT</span>
                      </h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="trans.amounttotext">
                      <div class="txtmoneystyle">
                        <span>TRANS_LOCAL_NUM_TO_WORD</span>
                        <!-- Bang chu-->
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- Ki han gui-->
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_PERIOD</span>
                      <input style="white-space:pre-wrap" onclick="showInputMNG()" id="id.payee" type="button" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="COM_TXT_DEADLINE_SEND_SELECTION_PLACEHOLDER" />
                      <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <!-- xem bieu suat lai suat tien gui-->
                <tr>
                  <td colspan="2" width="100%" style="display: inline-block">
                    <span id="id.interest" style="font-style:italic; white-space: pre-wrap; float: right;"></span>
                    <span style="font-style:italic; white-space: pre-wrap; float: right;">COM_INTEREST_MAIN</span>
                  </td>
                </tr>
                <tr>
                  <td width="100%" style="padding:3px; text-align:right;">
                    <u>
                        <a onclick="showRate()" style="font-style:italic; cursor:pointer; padding-left:7px; white-space:pre-wrap;"><span>E_SEE_DOCUMENT</span></a></u>
                  </td>
                </tr>
                <!-- Chi thi khi dao han-->
                <tr>
                  <td colspan="2">
                    <div class="input-group">
                      <span style="white-space:pre-wrap;">COM_ANNOUNCE_DEADLINE</span>
                    </div>
                  </td>
                </tr>
                <!-- chuyen goc va lai sang ki han moi-->
                <tr>
                  <td width="100%" valign="middle" onClick="">
                    <div style="display:inline; padding-left: 5px;">
                      <div style="display:inline" onclick="checkedRadioAnno1();">
                        <input id='radio1' type="radio" value="1" name="maturityDirective" checked="checked" />
                        <span id="lblRadio1" style="white-space:pre-wrap; padding: 10px;font-weight:bold;">ESAVING_CHANGEINFO_EXI_REN</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div style="display:inline; padding-left: 5px;">
                      <div style="display:inline" onclick="checkedRadioAnno2();">
                        <input id='radio2' type="radio" value="2" name="maturityDirective" />
                        <span id="lblRadio2" style="white-space:pre-wrap; padding: 10px">ESAVING_CHANGEINFO_RD_REN</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- tat toan, chuyen ca goc va lai vao tai khoan -->
                <tr>
                  <td colspan="2" onClick="">
                    <div style="display:inline; padding-left: 5px;">
                      <div style="display:inline" onclick="checkedRadioAnno3();">
                        <input id='radio3' type="radio" value="3" name="maturityDirective" />
                        <span id="lblRadio3" style="white-space:pre-wrap; padding: 10px">ACC_TRANSFER_PRINCIPAL_TO_ACCOUNT</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- lua chon tai khoan -->
                  <td colspan="2" class="td-text" style="padding-right:5px;" onClick="">
                    <div class="input-group accToggleField" onClick="showAccountSelection2()">
                      <span class="input-group-addon accToggleField" style="white-space:pre-wrap; width:40%">ESAVING_LABLE_COMBO_REN</span>
                      <input id="id.accountno2" style="white-space:pre-wrap" type="button" class="form-control form-control-righttext accToggleField" value="ESAVING_BGN_CHOICE" />
                      <span class="icon-movenext input-group-addon input-group-symbol accToggleField"></span>
                    </div>
                  </td>
                </tr>
                <tr id="tr.list-receiver">
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
                      <input id="id.notifyTo" type="button" style="white-space: pre-wrap;" class="form-control form-control-righttext" disabled="true" />
                      <span class="input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="100%" style="padding:3px; text-align:right;"><u>
                  <a onclick="showReceiverList()" style="font-style:italic; cursor:pointer; padding-left:7px; white-space:pre-wrap;"><span>COM_VIEW_LIST_APPROVER</span></a></u>
                  </td>
                </tr>
              </table>
              <!-- huy, quay lai, tiep tuc -->
              <table width="100%" style="margin-top: 20px;">
                <tr>
                  <td>
                    <input type="button" class="btnshadow btn-second"  style="margin-left:0; float: left;" value="REVIEW_BTN_BACK" onclick="goBackClick()" />
                  </td>
                  <td>
                    <input type="button" class="btnshadow btn-second" value="ESAVING_CREATE_BTN_SENDREQUEST" ng-Click="sendJSONRequest()" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
          <div id="divListGroup" class="list-group dialog-list"></div>
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
