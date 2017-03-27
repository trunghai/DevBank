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
                        <h5 class="screen-title"><span style="white-space:pre-wrap;">AUTHORIZE_SAVING_ACCOUNT_OPEN_CLOSE</span></h5>
                        <div class="line-separate" />
                      </td>
                    </tr>
                  </table>
                  <table width="100%" align="center">
                     <tr>
                        <td>
                           <h5 class="Header" style="white-space:pre-wrap"><span>ACC_TRANSACTION_AUTHORIZE_DETAIL</span></h5>
                        </td>
                     </tr>
                     <!-- Loại giao dịch -->
                     <tr>
                        <td align="center" valign="middle" class="td-text">
                           <div class="input-group" onclick="showTypeTransaction();">
                              <span class="input-group-addon" style="width:40%;white-space:pre-wrap">COM_TYPE_TRANSACTION</span>
                              <input style="white-space:pre-wrap" id="idTypeTransaction" type="button" class="form-control form-control-righttext" value="ACC_SEND_MONEY" />
                              <span class="icon-movenext input-group-addon input-group-symbol"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- Người lập -->
                     <tr>
                        <td align="center" valign="middle" class="td-text">
                           <div class="input-group" onclick="getUserWhoCreatedTransaction()">
                              <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_MAKER</span>
                              <input id="id.accountno" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                              <span class="icon-movenext input-group-addon input-group-symbol"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- Trạng trhái  -->
                     <tr>
                        <td align="center" valign="middle" class="td-text">
                           <div class="input-group" onclick="showStatus()">
                              <span class="input-group-addon" style="width:40%">TRANS_PERIODIC_MNG_STT</span>
                              <input id="idStatus" type="button" onclick="" class="form-control form-control-righttext" value="COM_ALL" />
                              <span class="icon-movenext input-group-addon input-group-symbol"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- Ngày bắt đầu -->
                     <tr>
                        <td align="right" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_START_DATE</span>
                              <input id="id.begindate" type="tel" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                              <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"> </span>
                           </div>
                        </td>
                     </tr>
                     <!-- Ngày kết thúc -->
                     <tr>
                        <td align="right" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_TO_DATE</span>
                              <input id="id.enddate" type="tel" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                              <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                           </div>
                        </td>
                     </tr>
                     <tr class="trow-space" />
                     <tr>
                        <td>
                           <input id="btn_search" type="button" onclick="sendJSONRequest()" class="btnshadow btn-second" value="TRANS_PERIODIC_BTN_SRCH" />
                        </td>
                     </tr>
                  </table>
                  <br />
                  <div id="tblContent" name="tblContent" style="overflow:auto"></div>
                  <div id="id.search" style="text-align: right;">
                  </div>
                  <div id="pageIndicatorNums" />
                  <br/>
                  <table width="100%" style="display:none;" id="idTblAuthorize">
                     <tr>
                        <td colspan="2" align="center">
                           <input style="text-align: left" maxlength="250" id="idTxtReason" class="form-control" placeholder="INTERNAL_TRANS_AUTH_ERROR_TIT_REASON" />
                           <br/>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <input type="button" style="background-color:#F47E2B;margin: 0;float: left;" class='btnshadow btn-primary' onclick='rejectTransaction()' value='COM_REJ' />
                        </td>
                        <td>
						   <input type="button" style="background-color:#F47E2B;margin: 0;float: right;" class='btnshadow btn-primary' onclick='authorizeTransaction()' value='AUTHORIZE_BTN_AUTHEN' />
                        </td>
                     </tr>
                  </table>
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
