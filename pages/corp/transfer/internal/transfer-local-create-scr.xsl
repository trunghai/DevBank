<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview" >
          <div class="">
            <div class="panelContent">
              <table width="100%" align="center">
                <tr>
                  <td colspan="2">
                    <div>
                      <h5 class="screen-title">
                      <span>TRANS_BATCH_TYPE_TPB</span>
                    </h5></div>
                    <div class="line-separate" />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div id="seqFormLocal"></div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">COM_TYPE_TRANSACTION</span></h5></td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showTransTypeSelection()">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_BATCH_TYPE_LABEL</span>
                      <input id="id-trans-local" type="button" class="form-control form-control-righttext" style="white-space: pre-wrap;" align="left" value="TRANS_INTERNAL_TYPE_T12" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">TRANS_ACCOUNT_INFO_BLOCK_TITLE</span></h5></td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showAccountSelection()">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_LOCAL_ACC_TITLE</span>
                      <input id="id.accountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div>
                      <h6 class="h6style">
                        <span id="trans.sourceaccoutbalance"></span>
                      </h6>
                    </div>
                  </td>
                </tr>

                <tr id="tr.trans-other-acc">
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group"> <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_LOCAL_ACC_DESTINATION</span>
                      <input id="trans.targetaccount" type="tel" placeholder="COM_TXT_INPUT_PLACEHOLDER" class="form-control form-control-righttext-datepicker" onchange="loadInfoFromIdAccount(this);" maxlength="30"/>
                      <span onclick="showPayeePage();" id="span.trans.target" class="tooltip icon-book input-group-addon-datepicker input-group-symbol-datepicker" style="cursor:pointer; display: none">
                        <span style="text-align:center; font-size:14px;">
                        <em id="ds_id"></em><br />
                        <em id="mau_id"></em>
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr id="tr.trans-local-acc">
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showDesAccountSelection()">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_LOCAL_ACC_DESTINATION</span>
                      <input id="trans.desaccountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" maxlength="30"/>
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td colspan="2">
                    <div>
                      <h6 class="h6style">
                        <span>TRANS_LOCAL_ACC_DESTINATION_TITLE</span>
                        <span>: </span>
                        <b><span id="trans.targetaccountname"></span></b>
                      </h6>
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">TRANS_DETAIL_BLOCK_TITLE</span></h5></td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_LOCAL_AMOUNT_TITLE</span>
                      <input id="trans.amount" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="handleInputAmount(event, this);" onchange="removeSpecialCharForNumber(this.value)" />
                      <span class="input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div>
                      <div class="txtmoneystyle">
                        <span>TRANS_LOCAL_NUM_TO_WORD</span>
                        <span>: </span>
                        <span id="trans.amounttotext"></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="form-textarea-title">
                      <span>TRANS_LOCAL_ACC_CONTENT</span>
                    </div>
                    <div class="input-group">
                      <textarea id="trans.content" class="form-control form-control-textarea" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="100" onkeyup="controlInputText(this, 140)"></textarea>
                    </div>
                  </td>
                </tr>
                <tr id="tr.mng-selection">
                  <td colspan="2" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="font-family:Tahoma, Helvetica, sans-serif;white-space:pre-wrap; width:40%">COM_SAVE_BENE</span>
                      <input style="white-space:pre-wrap" onclick="showInputMNG()" id="id.payee" type="button" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="TRANS_INTERNAL_SAVE_TEMPLATE_N" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr id="id.sample" style="display:none;">
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANSFER_REMITTANCE_NAMED</span>
                      <input id="id.sample.name" type="text" class="form-control form-control-righttext" placeholder="TRANSFER_REMITTANCE_NAMED" maxlength="20" style="white-space:pre-wrap"/>
                      <span class="input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
                      <input style="white-space:pre-wrap;" id="id.notifyTo" type="button" class="form-control form-control-righttext" disabled="true" />
                    </div>
                  </td>
                </tr>
                <tr id="tr.list-receiver">
                  <td colspan="2" align="center" valign="middle">
                  <div style="text-align: right;">
                    <u><a onclick="showReceiverList()"><span style="cursor:pointer;">COM_VIEW_LIST_APPROVER</span></a></u>
                  </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" class="btnshadow btn-second" onclick="sendJSONRequest()" value="TRANS_LOCAL_BTN_SENDREQUEST" />
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
        <div id="selection-dialog-input" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" align="center" onClick="closeDialogInput(this)">
          </div>
          <div id="divListGroupInput" class="list-group dialog-list"> </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
