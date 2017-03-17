<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div class="panelContentCorp">
            <table width="100%">
              <tr>
                <td>
                  <h5 class="screen-title"><span style="white-space:pre-wrap;">CRE_TITLE</span></h5>
                  <div class="line-separate" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="tab" style="margin-top: 0px;">
                    <div class="item selected">
                      <div class="left"></div>
                      <div class="text"><span>CRE_TAB_SEARCH_DEBT_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                    <div class="item" onclick="showPageFindTrans()" style="display:none">
                      <div class="left"></div>
                      <div class="text"><span>CRE_TAB_CREATE_DEBT_TITLE</span></div>
                      <div class="right"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <br/>
            <h5 class="Header"><span style="white-space:pre-wrap">CRE_DEBT_ITEM_HISTORY_TITLE</span></h5>
            <table width="100%" align="center">
              <tr>
                <td>
                  <div><span style="font-family:Tahoma, Helvetica, sans-serif;white-space:pre-wrap;">CRE_DEBT_ITEM_HISTORY_NOTE</span></div>
                </td>
              </tr>
            </table>
            <br/>
            <div id="tblContent" name="tblContent" style="overflow:auto"></div>
            <br/>
            <div align="right" style="float: right; width:100%">
                <div class="export-print" id="acchis.exportfile" onclick="exportExcelDebtHistory()" style="display: inline-block;">
				  <img style="margin-top: 20px; margin-right:10px; margin-bottom: 20px;" src="css/img/exportfile.png" />
				</div>
                <div id="pageIndicatorNums" style="text-aling: right; display: inline-block;" />
            </div>
            <table>
              <tr>
                <td>
                  <div>
                    <input type="button" class="btnshadow btn-second" onclick="creHistoryCallBack()" value="CM_BTN_GOBACK" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"> </div>
          <div id="divListGroup" class="list-group dialog-list"> </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
