<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div class="panelContentCorp">
            <div><h5 class="screen-title"><span>TRANS_PAYEE_TITLE</span></h5></div>
            <table width="100%">
              <tr>
                <td>
                  <div class="tab" style="margin-top: 0px;">
                    <div class="item selected">
                      <div class="left"></div>
                      <div class="text"><span>COM_SAVE_BENE</span></div>
                      <div class="right"></div>
                    </div>
                    <div class="item" onclick="showManageTempPage()">
                      <div class="left"></div>
                      <div class="text"><span>CONST_MANAGE_TRANS_TEMPLATE</span></div>
                      <div class="right"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <br/>
            <table width="100%">
              <tr>
                <td align="center" valign="middle" class="td-text">
                  <div class="input-group">
                    <input id="input.search.value" results='5' name='s' class="form-control form-control-lefttext" placeholder="COM_SEARCH_PLACEHOLDER" value="" onkeypress="searchBeneficiaries(this, event)"/>
					<span onclick="searchBeneficiariesWithButton();" id="span.trans.target" class="icon-zoom input-group-addon-datepicker input-group-symbol-datepicker" style="cursor:pointer;padding-right:4%;">
                        <span style="text-align:center; font-size:14px;">
                          <em id="ds_id"></em>
                          <br />
                          <em id="mau_id"></em>
                        </span>
                      </span>
                  </div>
                </td>
              </tr>
            </table>
            <br/>
            <div id="tblContent" name="tblContent" style="overflow:auto"></div>
            <div id="pagination" style="text-align: right"></div>
            <br/><br/>
            <div id="editBeneDetail" name="editBeneDetail" style="overflow:auto"></div>
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
