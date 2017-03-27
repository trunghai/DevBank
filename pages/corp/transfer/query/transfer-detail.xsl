<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/review">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width='100%' align='center'>
                <tr>
                  <td colspan="2">
                    <div id="step-sequence"></div>
                  </td>
                </tr>
                <xsl:for-each select="section">
                  <tr>
                    <td colspan="2">
                      <xsl:if test="title!=''">
                        <h5 class="Header"><xsl:value-of select="title"/></h5>
                      </xsl:if>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <xsl:if test="row">
                        <table width='100%' align='center' class='background-blacktrans'>
                          <xsl:for-each select="row">
                            <tr class='trow-default'>
                              <td class='td-left'>
                                <xsl:value-of select="label" />
                              </td>
                              <td class='td-right'>
                                <xsl:value-of select="value" />
                              </td>
                            </tr>
                          </xsl:for-each>
                        </table>
                      </xsl:if>
                      <xsl:if test="table">
                        <table width='100%' align='center' class='table-account'>
                          <xsl:for-each select="table">
                            <xsl:if test="thead">
                              <tr class="trow-title">
                                <xsl:for-each select="thead/th">
                                  <th>
                                    <xsl:value-of select="." />
                                  </th>
                                </xsl:for-each>
                              </tr>
                            </xsl:if>
                            <tbody>
                              <xsl:for-each select="tbody/tr">
                                <tr>
                                  <xsl:for-each select="td">
                                    <td>
                                      <xsl:if test="onclick">
                                        <a onclick="{onclick}">
                                          <xsl:value-of select="value" />
                                        </a>
                                      </xsl:if>
                                      <xsl:if test="not(onclick)">
                                        <xsl:value-of select="." />
                                      </xsl:if>
                                    </td>
                                  </xsl:for-each>
                                </tr>
                              </xsl:for-each>
                            </tbody>
                          </xsl:for-each>
                        </table>
                      </xsl:if>
                    </td>
                  </tr>
                  <tr>
                </tr>
                </xsl:for-each>
                <tr>
                  <td colspan="2">
                    <div class="export-print" id="acchis-exportFunc" align="right" style="padding-right: 5px; margin-top: 10px; float:right;">
                      <a href="javascript:void(0)" onclick="printComHistory();"><img style="margin-right:5px;" src="css/img/print.png" /></a>
                    </div>
                  </td>
                </tr>
                <xsl:if test="input">
                  <tr>
                    <td colspan="2">
                      <div class="input-group" style="margin-top: 15px">
                        <input id="reject-reason" type="text" class="form-control" placeholder="{input}" />
                      </div>
                    </td>
                  </tr>
                </xsl:if>
                <tr>
                  <td colspan="2">
                    <table width='100%' align='center' style="margin-top: 15px" class="button-group button-group-2">
                      <tr>
                        <td>
                          <input type="button" class='btnshadow btn-primary' onclick='goBack()' value="CM_BTN_GOBACK" />
                        </td>
                        <xsl:if test="cancelButton!=''">
                          <td>
                            <input type="button" class='btnshadow btn-primary' onclick='cancelTransaction()' value="TRANS_PERIODIC_CANC_TRANS">
                            </input>
                          </td>
                        </xsl:if>
                      </tr>
                    </table>
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
