<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div id="reviewInfo" class="panelContent">
              <table width='100%' align='center'>
                <!--  <tr>
                  <td colspan="2">
                    <div id="seqFormReview"></div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 align='left' class='screen-title'><xsl:value-of select="review/reviewtitle"/></h5>
                    <div class="line-separate"></div>
                  </td>
                </tr> -->
                <xsl:for-each select="review/reviewinfo">
                  <xsl:variable name="reviewtitledisplay" select="reviewtranstitledisplay" />
                  <xsl:if test="reviewtranstitle != ''">
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
                <xsl:for-each select="review/transtables/table">
                  <xsl:if test="transtitle != ''">
                    <table width='100%' align='center'>
                      <tr>
                        <td>
                          <h5 class="Header"><xsl:value-of select="transtitle"/></h5>
                        </td>
                      </tr>
                    </table>
                  </xsl:if>
                  <table width='100%' align='center' class='table-account'>
                    <tr class="trow-title">
                      <xsl:for-each select="titles/table-title">
                        <th>
                          <xsl:value-of select="." />
                        </th>
                      </xsl:for-each>
                    </tr>
                    <xsl:for-each select="rows/row">
                      <tr>
                        <xsl:for-each select="table-content">
                          <td style="word-wrap:break-word">
                            <xsl:if test="position() = 1">
                              <xsl:attribute name="class">tdselct td-head-color</xsl:attribute>
                            </xsl:if>
                            <xsl:if test="class">
                              <xsl:attribute name="class">
                                <xsl:value-of select="class" />
                              </xsl:attribute>
                            </xsl:if>
                            <div class="mobile-mode">
                              <xsl:value-of select="title" />
                            </div>
                            <div class="content-detail">
                              <xsl:value-of select="text()" />
                            </div>
                          </td>
                        </xsl:for-each>
                      </tr>
                    </xsl:for-each>
                  </table>
                  <br/>
                </xsl:for-each>
                <xsl:for-each select="review/reviewinfo2">
                  <xsl:variable name="reviewtitledisplay" select="reviewtranstitledisplay" />
                  <xsl:if test="reviewtranstitle != ''">
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
              </table>
              <table class="button-group button-group-2" style="width: 100%">
                <tr>
                  <td>
                    <input type='submit' class='btnshadow btn-primary' style="float: left" onClick='goBack()' value='INPUT_ACC_BTN_GOBACK' />
                  </td>
                  <xsl:if test="review/cancel">
                    <td id="trCancel">
                      <input type="submit" id="btnCancel" class='btnshadow btn-primary' onclick='cancelPayTax()' value='REVIEW_BTN_CANCEL' />
                    </td>
                  </xsl:if>
                  <xsl:if test="review/print">
                    <td id="trPrint">
                      <input type="submit" id="btnPrint"  style="width: auto" class='btnshadow btn-primary' onclick='createReport();' value='TAX_PRINT_REPORT' />
                    </td>
                  </xsl:if>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
