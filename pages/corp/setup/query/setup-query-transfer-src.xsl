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
                  <h5 class="screen-title"><span style="white-space:pre-wrap;">COM_FOUND_TRANFER</span></h5>
                  <div class="line-separate" />
                </td>
              </tr>
            </table>
            <table width="100%" align="center">
              <tr>
                <td>
                  <h5 class="Header" style="white-space:pre-wrap"><span>COM_SEARCH_CRITERIAS</span></h5>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showTransTypeSelection()">
                    <span class="input-group-addon" style="width:40%;white-space:pre-wrap">COM_TYPE_TRANSACTION</span>
                    <input style="white-space:pre-wrap" id="id.trans-type" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showTransTypeDetailSelection()">
                    <span class="input-group-addon" style="width:40%;white-space:pre-wrap">CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL</span>
                    <input style="white-space:pre-wrap" id="id.trans-type-dtl" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showTransStatusSelection()">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_MNG_STT</span>
                    <input id="id.status" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group" onclick="showMakers()">
                    <span class="input-group-addon" style="width:40%">COM_MAKER</span>
                    <input id="id.maker" type="button" onclick="" class="form-control form-control-righttext" value="COM_ALL" />
                    <span class="icon-movenext input-group-addon input-group-symbol"></span>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="white-space:pre-wrap; width:40%">COM_TRANS_CODE</span>
                    <input id="id.trans-id" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" />
                  </div>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">EVN_BILL_FROM_DATE</span>
                    <input id="id.begindate" type="tel" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"> </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle" class="td-text">
                  <div class="input-group">
                    <span class="input-group-addon" style="width:40%; white-space:pre-wrap">EVN_BILL_TO_DATE</span>
                    <input id="id.enddate" type="tel" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                    <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="button" onclick="searchTransaction(1)" class="btnshadow btn-second" value="TRANS_PERIODIC_BTN_SRCH" />
                </td>
              </tr>
            </table>
            <br />
            <div id="id.searchResult">
            </div>
            <div id="pageIndicatorNums" style="text-align: right"></div>
            <div style="margin-bottom: 40px;"></div>
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
