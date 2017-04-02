<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div class="">
            <div class="panelContent">
              <table width="100%" align="center">
                <tr>
                  <td colspan="2">
                    <div>
                      <h5 class="screen-title">
                        <span>MENU_TRANS_INTER</span>
                      </h5>
                    </div>
                    <div class="line-separate" />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div id="seqFormInterBank"></div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div style="text-align:center">                      
                        <span>COM_INFOR_TAX</span><a style="cursor: pointer;" onclick="clickLinkTax()"><span>COM_INFOR_TAX_1</span></a>              
                    </div>
                  </td>
                </tr>              

                <tr>
                  <td colspan="2">
                    <h5 class="Header">
                      <span style="white-space:pre-wrap">TRANS_ACCOUNT_INFO_BLOCK_TITLE</span>
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showInputSelection(1)">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_LOCAL_ACC_TITLE</span>
                      <input id="id.accountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div id="trans.sourceaccoutbalance">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 class="Header">
                      <span style="white-space:pre-wrap">TRANS_DES_ACC_BLOCK_TITLE</span>
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_LOCAL_ACC_DESTINATION</span>
                      <input id="trans.destaccountnointer" type="tel" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="" class="form-control form-control-righttext-datepicker" onkeyup="controlInputText(this,33)" />
                      <span onclick="showPayeePage();" id="span.trans.target" class="tooltip icon-book input-group-addon-datepicker input-group-symbol-datepicker" style="cursor:pointer;">
                        <span style="text-align:center; font-size:14px;">
                          <em id="ds_id"></em>
                          <br />
                          <em id="mau_id"></em>
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_DEST_ACCOUNT_NAME_TITLE</span>
                      <input id="trans.destaccountname" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="" class="form-control form-control-righttext" onkeyup="controlInputText(this, 70)" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showBankSelection()">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_BANK_TITLE</span>
                      <input id="trans.branchName" type="button" class="form-control form-control-right2linetext" value="COM_TXT_SELECTION_PLACEHOLDER" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol" style="margin-top:7px;"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" width="100%">
                    <h5 class="Header">
                      <span style="white-space:pre-wrap">TRANS_DETAIL_BLOCK_TITLE</span>
                    </h5>
                  </td>
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
                    <div id="trans.amounttotext">
                      <div class="txtmoneystyle">
                        <span>TRANS_LOCAL_NUM_TO_WORD</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick='showInputSelection(2)'>
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_FEE_TITLE</span>
                      <input id="trans.fee" type="button" class="form-control form-control-righttext" value="COM_TXT_SELECTION_PLACEHOLDER" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="form-textarea-title">
                      <span>TRANS_LOCAL_ACC_CONTENT</span>
                    </div>
                    <div class="input-group">
                      <textarea id="trans.content" class="form-control form-control-textarea" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="controlInputText(this, 160)"></textarea>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="font-family:Tahoma, Helvetica, sans-serif;white-space:pre-wrap; width:40%">COM_SAVE_BENE</span>
                      <input style="white-space:pre-wrap" onclick="showInputSelection(3)" id="manage.bene" type="button" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="TRANSFER_REMITTANCE_NON_SAVE" />
                      <span class="lnr-chevron-right input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr id="id.sample" style="display:none;">
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANSFER_REMITTANCE_NAMED</span>
                      <input id="id.sample.name" type="text" class="form-control form-control-righttext" placeholder="TRANSFER_REMITTANCE_NAMED" maxlength="20" />
                      <span class="input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="font-family:Tahoma, Helvetica, sans-serif;white-space:pre-wrap; width:40%">COM_SEND_MSG_APPROVER</span>
                      <input style="white-space:pre-wrap" id="id.approver" type="button" class="form-control form-control-righttext" value="" disabled="true" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                      <a onclick="showReceiverList()" style="cursor: pointer; float: right" id="link.view.listAuth">
                        <span>COM_VIEW_LIST_APPROVER</span>
                      </a>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
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
