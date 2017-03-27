<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview" ng-controller="account-history">
          <div class="">
            <div class="panelContent">
              <h5 align="left" class="screen-title">
                       <span>ACC_SEND_MONEY_KKH</span>
                     </h5>
              <div class='line-separate'></div>
            </div>
            <table style="width: 98%; margin: auto">
              <tr>
                <td colspan="1" class="td-text">
                  <div class="input-group" onClick="showAccountSelection()">
                    <span class="input-group-addon">ACCOUNT_ACC_NO_TITLE</span>
                    <input id="acchis_accountno" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
                <td class="td-btninside">
                  <div>
                    <input type="button" class="btnshadow btn-second" onclick="goBack()" value="ACC_HIS_LIST_BACK_ACC" style="width: 90px;" />
                  </div>
                </td>
              </tr>
            </table>
            <div id="id.accInfo"></div>
            <table style="width: 98%; margin: auto">
              <tr>
                <td colspan="2">
                  <h5 class='Header'><span>ACC_PERIOD_HISTORY_TITLE</span></h5>
                </td>
              </tr>
              <tr>
                <td class="td-text50">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap">ACC_PERIOD_START_DATE_TITLE</span>
                    <input id="id.begindate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" style="opacity: 1" />
                    <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
                <td width="30%">
                  <input id="searchBtn" type="button" class="btnshadow btn-second btn-morefunc" ng-click="sendJSONRequest()" value="ACC_HIS_NOR_SEARCH_BTN" />
                </td>
              </tr>
              <tr>
                <td class="td-text50">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap">ACC_PERIOD_END_DATE_TITLE</span>
                    <input id="id.enddate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" style="opacity: 1" />
                    <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
                <td width="30%" style="text-align:right;">
                  <u>
                     <a href="#" onclick="showAdvandSearch()" id="acchis.btnAdvSearch"><span>ACC_HIS_ADV_SEARCH_BTN</span></a></u>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table id="adv-search-controls" class="table-account" style="display: none; width: 100%">
                    <!-- luong tien, loai giao dich-->
                    <tr class="nohover" style="background: none">
                      <td class="td-input50">
                        <div class="input-group" onClick="showMoneyFlowSelection()">
                          <span class="input-group-addon" style="white-space:pre-wrap">ACC_HIS_MONEY_FLOW_TITLE</span>
                          <input id="idMonneyFlow" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                          <span class="icon-movenext input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                      <td class="td-input50">
                        <div class="input-group" onClick="showTransTypeSelection()">
                          <span class="input-group-addon" style="white-space:pre-wrap">COM_TYPE_TRANSACTION</span>
                          <input id="idTransaction" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
                          <span class="icon-movenext input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                    </tr>
                    <!-- So tai khoan gui nhan-->
                    <tr class="nohover" style="background: none">
                      <td class="td-input50">
                        <div class="input-group" onClick="">
                          <span class="input-group-addon" style="white-space:pre-wrap">ACC_HIS_ACC_NO_TITLE</span>
                          <input id="idAccountSendReceive" type="text" class="form-control form-control-rightbutton" maxlength="11" onkeyup="onChangeAccountNumber(event, this)" />
                          <span class="input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                      <td class="td-input50">
                        <div class="input-group" onClick="">
                          <span class="input-group-addon" style="white-space:pre-wrap">ACC_HIS_ACC_NAME_TITLE</span>
                          <input id="idNameAccountSendReceive" type="text" class="form-control form-control-rightbutton" maxlength="255" onkeyup="onChangeAccountNumber(event, this)" />
                          <span class="input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                    </tr>
                    <!-- tu so tien den so tien -->
                    <tr class="nohover" style="background: none">
                      <td class="td-input50">
                        <div class="input-group" onClick="">
                          <span class="input-group-addon" style="white-space:pre-wrap">ACC_FROM_AMOUNT</span>
                          <input id="idFromMoney" type="text" class="form-control form-control-rightbutton" onkeyup="handleInputAmount(event, this);" />
                          <span class="input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                      <td class="td-input50">
                        <div class="input-group" onClick="">
                          <span class="input-group-addon" style="white-space:pre-wrap">ACC_TO_AMOUNT</span>
                          <input id="idToMoney" type="text" class="form-control form-control-rightbutton" onkeyup="handleInputAmount(event, this);" />
                          <span class="input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                    </tr>
                    <!-- So giao dich, mo ta -->
                    <tr class="nohover" style="background: none">
                      <td class="td-input50">
                        <div class="input-group" onClick="">
                          <span class="input-group-addon" style="white-space:pre-wrap">ACC_TRANSACTION_NUM</span>
                          <input id="idNumTransaction" type="text" class="form-control form-control-rightbutton" onkeyup="onChangeAccountNumber(event, this)" />
                          <span class="input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                      <td class="td-input50">
                        <div class="input-group" onClick="">
                          <span class="input-group-addon" style="white-space:pre-wrap">TRANS_LIST_DESC_TITLE</span>
                          <input id="idDescription" type="text" class="form-control form-control-rightbutton" />
                          <span class="input-group-addon input-group-symbol"></span>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- show bang hien ket qua liet ke giao dich -->
            <div id="tblContent" name="tblContent"></div>
            <div id="idHistoryInfo" style="display:none; padding: 15px"><span>CREDIT_HIS_NO_DATA</span></div>

            <table style="width: 98%">
              <tr>
                <td>
                  <!-- Bang sau tong ket -->
                  <table id="tblSummary" style="display: none">
                    <!-- so du dau ki-->
                    <tr style="height:30px;" id="trBeginBalance">
                      <td>
                        <div>
                          <span style="width:40%; font-weight:bold;">ACC_QUERY_NUM_BEGIN_BALANCE</span>
                          <span id="idBeginBalance"></span>
                        </div>
                      </td>
                    </tr>
                    <!-- Tong ghi co-->
                    <tr style="height:30px;">
                      <td>
                        <div>
                          <span style="width:40%; font-weight:bold;">ACC_QUERY_NUM_SUM_CREDIT</span>
                          <span id="idCredit"></span>
                        </div>
                      </td>
                    </tr>
                    <!-- Tong ghi no-->
                    <tr style="height:30px;">
                      <td>
                        <div>
                          <span style="width:40%; font-weight:bold;">ACC_QUERY_NUM_SUM_DEBIT</span>
                          <span id="idDebit"></span>
                        </div>
                      </td>
                    </tr>
                    <!-- So du cuoi ki-->
                    <tr style="height:30px;" id="trEndBalance">
                      <td>
                        <div>
                          <span style="width:40%; font-weight:bold;">ACC_QUERY_NUM_END_BALANCE</span>
                          <span id="idEndBalance"></span>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="text-align: right">
                  <div id="idSearchFun" style="display: none">
                    <!--in giao dich -->
                    <div class="export-print">
                      <a href="javascript:void(0)" id="acchis.exportfile" onclick="sendRequestExportExcel()"><img src="css/img/exportfile.png" /></a>
                      <a style="margin-left: 10px;" href="javascript:void(0)" onclick="printAccHistory();"><img src="css/img/print.png" /></a>
                    </div>
                    <div id="id.search">
                    </div>
                  </div>
                </td>
              </tr>
            </table>

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
