<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div id="reviewInfo" class="panelContent">
              <table width='100%' align='center'>
                <tr>
                  <td colspan="2">
                    <div id="seqFormReview"></div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 align='left' class='screen-title'><xsl:value-of select="review/reviewtitle"/></h5>
                    <div class="line-separate"></div>
                  </td>
                </tr>
                <xsl:for-each select="review/reviewinfo">
                  <xsl:variable name="reviewtitledisplay" select="reviewtranstitledisplay" />
                  <xsl:if test="reviewtranstitle != ''" >
                  <tr scrinfo='{$reviewtitledisplay}'>
                    <td colspan="2">
                      <h5 class="Header"><xsl:value-of select="reviewtranstitle"/> </h5>
                    </td>
                  </tr>
                  </xsl:if>
                  <tr>
                    <td colspan="2">
                      <table width='100%' align='center' class='background-blacktrans'>
                        <xsl:for-each select="transinfo">
                          <xsl:variable name="reviewdisplay" select="transinfodisplay" />
                          <xsl:if test="transinfodisplay='result'">
                            <tr class='trow-default' scrinfo='{$reviewdisplay}' style="display:none;">
                              <td class='td-left'>
                                <xsl:value-of select="transinfotitle" />
                              </td>
                              <td class='td-right'>
                                <xsl:value-of select="transinfocontent" />
                              </td>
                            </tr>
                          </xsl:if>
                          <xsl:if test="not(transinfodisplay='result')">
                            <tr class='trow-default' scrinfo='{$reviewdisplay}'>
                              <td class='td-left'>
                                <xsl:value-of select="transinfotitle" />
                              </td>
                              <td class='td-right'>
                                <xsl:value-of select="transinfocontent" />
                              </td>
                            </tr>
                          </xsl:if>
                        </xsl:for-each>
                      </table>
                    </td>
                  </tr>
                </xsl:for-each>
                <tr>
                  <td colspan="2">
                    <div id="show-info"></div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div id='pageIndicatorNums' style="float:right"></div>
                  </td>
                </tr>
                <tr class="desktopmode" id="result-export-print" style="display:none;">
                  <td colspan="2">
                    <div align="right" style="padding-right: 5px;" class="export-print">
                      <a href="javascript:void(0)" onclick="printResultHistory();">
					    <img style="margin-right:5px;" src="css/img/print.png" />
					  </a>
                    </div>
                  </td>
                </tr>
              </table>
              <table width='100%' class="button-group button-group-3">
                <tr>
                  <td >
                    <input type='submit' class='btnshadow btn-primary' onClick='goBack()' value='INPUT_ACC_BTN_GOBACK' />
                  </td>
                  <td id="trCancel">
                    <input type="submit" id="btnCancel" style="display: none" class='btnshadow btn-primary' onclick='btnCancelClick()' value='REVIEW_BTN_CANCEL' />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
