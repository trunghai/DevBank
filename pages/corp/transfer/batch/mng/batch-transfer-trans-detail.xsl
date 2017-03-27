<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width="100%">
                <tr>
                  <td>
                    <h5 class="screen-title"><span style="white-space:pre-wrap;">MENU_TRANS_BATCH_SALARY</span></h5>
                    <div class="line-separate" />
                  </td>
                </tr>
                <tr id="tr.tab">
                  <td>
                    <div class="tab" style="margin-top: 0px;">
                      <div class="item" onclick="returnInputPage()">
                        <div class="left"></div>
                        <div class="text"><span>TRANS_PERIODIC_TRADE_TITLE</span></div>
                        <div class="right"></div>
                      </div>
                      <div class="item selected">
                        <div class="left"></div>
                        <div class="text"><span>TRANS_BATCH_CHECKER</span></div>
                        <div class="right"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="trow-space" />
              </table>
              <table width='100%' align='center' class='background-blacktrans'>
                <xsl:for-each select="review/transinfo">
                  <tr>
                    <td colspan="2">
                      <h5 class="Header"><xsl:value-of select="transtitle"/></h5>
                    </td>
                  </tr>
                  <xsl:for-each select="transcontent">
                    <tr class='trow-default'>
                      <td class='td-left'>
                        <xsl:value-of select="key" />
                      </td>
                      <td class='td-right'>
                        <xsl:value-of select="value" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </xsl:for-each>
              </table>
              <br/>
              <div id="table-detail"/>
              <div id="pageIndicatorNums" style="text-align: right;"/>
              <table width='100%' style="margin-top: 10px;">
                <tr>
                  <td width="50%" id="btnBack">
                    <input type="button" style="padding: 0; margin: 0; float: left;" class='btnshadow btn-primary' onclick='btnBackClick()' value='CM_BTN_GOBACK' />
                  </td>
                  <td width="50%" id="btnNext" style="display:none;">
                    <input type="button" style="padding: 0; margin: 0; float: right;" class='btnshadow btn-primary' onclick='btnNextClick()' value='TRANS_PERIODIC_CANC_TRANS' />
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
