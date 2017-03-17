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
                    <h5 class="screen-title"><span style="white-space:pre-wrap;">COM_FOUND_TRANFER</span></h5>
                    <div class="line-separate" />
                  </td>
                </tr>
              </table>

              <table width='100%' align='center' class='background-blacktrans'>
                <xsl:for-each select="review/transinfo">
                  <xsl:variable name="isCombobox" select="isCombobox" />
                  <xsl:if test="transtitle != ''">
                    <tr>
                      <td colspan="2">
                        <h5 class="Header"><xsl:value-of select="transtitle"/></h5>
                      </td>
                    </tr>
                  </xsl:if>
                  <xsl:for-each select="transcontent">
                    <tr class='trow-default'>
                      <td class='td-left'>
                        <xsl:value-of select="key" />
                      </td>
                      <xsl:choose>
                        <xsl:when test="isCombobox = 'true'">
                          <td class='td-right'>
                            <xsl:variable name="value" select="value" />
                            <input style="white-space:pre-wrap" class="form-control form-control-righttext" value="{$value}" disabled="true" />
                          </td>
                        </xsl:when>
                        <xsl:otherwise>
                          <td class='td-right'>
                            <xsl:value-of select="value" />
                          </td>
                        </xsl:otherwise>
                      </xsl:choose>
                    </tr>
                  </xsl:for-each>
                </xsl:for-each>
              </table>

             <table width='100%' align='center' class='background-blacktrans'>
                <xsl:for-each select="review/sendMethod">
                  <tr>
                    <td colspan="2">
                      <h5 class="Header"><xsl:value-of select="transtitle"/></h5>
                    </td>
                  </tr>
                  <xsl:for-each select="transcontent">
                    <tr class='trow-default'>
                      <xsl:choose>
                        <xsl:when test="isSelected = 'true'">
                          <td width="1%">
                            <input type="radio" checked="checked" disabled="true"/>
                          </td>
                        </xsl:when>
                        <xsl:otherwise>
                          <td width="1%">
                            <input type="radio" disabled="true"/>
                          </td>
                        </xsl:otherwise>
                      </xsl:choose>
                      <td width="99%" class='td-right' style="text-align:left;">
                        <xsl:value-of select="value" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </xsl:for-each>
              </table>

              <table width='100%' align='center' class='background-blacktrans'>
                <xsl:for-each select="review/transinfo2">
                  <tr>
                    <td colspan="2">
                      <h5 class="Header"><xsl:value-of select="transtitle"/></h5>
                    </td>
                  </tr>
                  <xsl:for-each select="transcontent">
                    <tr>
                      <td colspan="2" style="font-weight: normal !important;">
                        <span><xsl:value-of select="value" /></span>
                      </td>
                    </tr>
                  </xsl:for-each>
                </xsl:for-each>
              </table>

              <table width='100%' align='center' class='table-account' style=" table-layout: fixed;">
                <xsl:if test="review/services != ''">
                  <tr class="trow-space"></tr>
                  <tr class="trow-title">
                    <th rowspan="2">
                      <span>CONST_TRANS_LIMIT_TIT_SERVICE</span>
                    </th>
                    <th colspan="2">
                      <span>CONST_TRANS_LIMIT_TIT_MAX_LIMIT</span>
                    </th>
                    <th colspan="2">
                      <span>CONST_TRANS_LIMIT_TIT_SELECTED_LIMIT</span>
                    </th>
                  </tr>
                  <tr class="trow-title">
                    <th>
                      <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME</span>
                    </th>
                    <th>
                      <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY</span>
                    </th>
                    <th>
                      <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME</span>
                    </th>
                    <th>
                      <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY</span>
                    </th>
                  </tr>
                </xsl:if>
                <xsl:for-each select="review/services/service">
                  <tr>
                    <td class="tdselct td-head-color">
                      <div class="mobile-mode">
                        <span>CONST_TRANS_LIMIT_TIT_SERVICE</span>
                      </div>
                      <div class="content-detail">
                        <xsl:value-of select="name"/>
                      </div>
                    </td>
                    <td>
                      <div class="mobile-mode">
                        <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX</span>
                      </div>
                      <div class="content-detail">
                        <xsl:value-of select="old-limit-time"/>
                      </div>
                    </td>
                    <td>
                      <div class="mobile-mode">
                        <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX</span>
                      </div>
                      <div class="content-detail">
                        <xsl:value-of select="old-limit-day"/>
                      </div>
                    </td>
                    <td>
                      <div class="mobile-mode">
                        <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME</span>
                      </div>
                      <div class="content-detail">
                        <xsl:value-of select="new-limit-time"/>
                      </div>
                    </td>
                    <td>
                      <div class="mobile-mode">
                        <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY</span>
                      </div>
                      <div class="content-detail">
                        <xsl:value-of select="new-limit-day"/>
                      </div>
                    </td>
                  </tr>
              </xsl:for-each>
              </table>

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
