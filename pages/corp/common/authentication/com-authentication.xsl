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
                  <td style="display: none">
                    <div id="step-sequence"></div>
                  </td>
                </tr>
                <xsl:apply-templates select="section" />
                <tr>
                  <td>
                    <h5 id="auth.title" class="Header">
                      <span>AUTHEN_TXT_INPUT_KEY_TITLE</span>
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" align="center" vspace="30">
                      <tr>
                        <td colspan="3">
                          <h5 id="auth.note" style="margin-bottom: 15px;"><span>AUTHEN_TXT_NOTE_CONTENT</span></h5>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" align="center" valign="middle" class="td-text">
                          <div class="input-group">
                            <span id="authen.tokentype" class="input-group-addon" style="width:40%; white-space: pre-wrap"></span>
                            <input id="authen.tokenkey" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="" maxlength="6" />
                            <span class="input-group-addon input-group-symbol"></span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan='3'>
                          <div id='authen.progressbar' class="progress-wrapper html5-progress-bar" style='display:none'>
                            <div id="authen.progressbarotp" class="authen-progressbarotp">
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table class="button-group button-group-3">
                      <tr>
                        <td>
                          <input type="button" class="btnshadow btn-primary" onclick="onCancelClick()" value="REVIEW_BTN_CANCEL" />
                        </td>
                        <td>
                          <input type="button" id="backBtn" class="btnshadow btn-primary" onclick="onBackClick()" value="CM_BTN_GOBACK" />
                        </td>
                        <td>
                          <input type="button" class="btnshadow btn-primary" onclick="onContinueClick()" value="CM_BTN_SEND_REQ" />
                        </td>
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

    <!-- section -->
    <xsl:template match="section">
      <tr>
        <td>
          <xsl:if test="title != ''">
            <h5 class="Header"><xsl:value-of select="title"/></h5>
          </xsl:if>
        </td>
      </tr>
      <tr>
        <xsl:if test="paging">
          <xsl:attribute name="class">table-paging</xsl:attribute>
        </xsl:if>
        <td>
          <xsl:if test="row or row-one-col">
            <table width='100%' align='center' class='background-blacktrans'>
              <xsl:apply-templates select="row" />
              <xsl:apply-templates select="row-one-col" />
            </table>
          </xsl:if>
          <xsl:apply-templates select="table" />
        </td>
      </tr>
      <xsl:if test="paging">
        <tr>
          <td><div id="acc-pagination" style="text-align: right"></div></td>
        </tr>
      </xsl:if>
    </xsl:template>

    <!-- section/row -->
    <xsl:template match="row">
      <tr class='trow-default'>
        <td class='td-left'>
          <xsl:value-of select="label" />
        </td>
        <td class='td-right'>
          <xsl:if test="id">
            <xsl:attribute name="id">
              <xsl:value-of select="id" />
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="value" />
        </td>
      </tr>
    </xsl:template>

    <!-- section/row-one-col -->
    <xsl:template match="row-one-col">
      <tr class='trow-default'>
        <td style="font-weight: normal; word-break: break-all;">
          <xsl:value-of select="text()" />
        </td>
      </tr>
    </xsl:template>

    <!-- section/table -->
    <xsl:template match="table">
      <table width='100%' align='center' class='table-account'>
        <xsl:apply-templates select="thead" />
        <tbody>
          <xsl:apply-templates select="tbody/tr" />
        </tbody>
      </table>
    </xsl:template>

    <!-- section/table/thead -->
    <xsl:template match="thead">
      <thead>
        <xsl:if test="not(tr)">
          <tr class="trow-title">
            <xsl:apply-templates select="th" />
          </tr>
        </xsl:if>
        <xsl:if test="tr">
          <xsl:apply-templates select="tr" />
        </xsl:if>
      </thead>
    </xsl:template>

    <!-- section/table/tbody/tr -->
    <xsl:template match="tr">
      <tr>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="td" />
        <xsl:apply-templates select="th" />
      </tr>
    </xsl:template>

    <!-- section/table/thead/(tr)?/th -->
    <xsl:template match="th">
      <th>
        <xsl:if test="colspan">
          <xsl:attribute name="colspan">
            <xsl:value-of select="colspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="rowspan">
          <xsl:attribute name="rowspan">
            <xsl:value-of select="rowspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="text()" />
      </th>
    </xsl:template>

    <!-- section/table/tbody/tr/td -->
    <xsl:template match="td">
      <td>
        <xsl:if test="position()=1">
          <xsl:attribute name="class">tdselct td-head-color</xsl:attribute>
        </xsl:if>
        <xsl:if test="colspan">
          <xsl:attribute name="colspan">
            <xsl:value-of select="colspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="rowspan">
          <xsl:attribute name="rowspan">
            <xsl:value-of select="rowspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <div class="mobile-mode"><xsl:value-of select="title" /></div>
        <div class="content-detail">
          <xsl:value-of select="text()" />
          <xsl:if test="onclick">
            <xsl:value-of select="value" />
          </xsl:if>
        </div>
      </td>
    </xsl:template>
  </xsl:stylesheet>
