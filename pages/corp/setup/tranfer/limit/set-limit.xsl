<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width='100%' align='center'>
                <tr>
                  <td>
                    <div id="seqFormAuthen"></div>
                  </td>
                </tr>
              </table>

              <div id="resultsTable"></div>

              <table width='100%' align='center'>
                <tr>
                  <td><span>CONST_TRANS_LIMIT_TIT_INFO_1</span></td>
                </tr>
                <tr>
                  <td><span>CONST_TRANS_LIMIT_TIT_INFO_2</span></td>
                </tr>
              </table>

              <table width='100%' style="margin-top: 10px;">
                <tr>
                  <td width="50%" id="btnBack">
                    <input type="button" style="padding: 0; margin: 0; float: left;" class='btnshadow btn-primary' onclick='btnBackClick()' value='CM_BTN_GOBACK' />
                  </td>
                  <td width="50%" id="btnNext">
                    <input type="button" style="padding: 0; margin: 0; float: right;" class='btnshadow btn-primary' onclick='btnNextClick()' value='CM_BTN_SEND_REQ' />
                  </td>
                </tr>
                <tr class="trow-space"></tr>
              </table>

            </div>
          </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
