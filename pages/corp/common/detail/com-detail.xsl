<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Main Template -->
    <xsl:template match="/review">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width='100%' align='center'>
                <xsl:apply-templates select="section" />
                <tr>
                  <td colspan="2">
                    <table width='100%' align='center' style="margin-top: 15px">
                      <tr>
                        <td>
                          <input type="button" class='btnshadow btn-primary' onclick='onBackClick()' value="REVIEW_BTN_BACK" style="margin-left: 0" />
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
        <td colspan="2">
          <xsl:if test="title != ''">
            <h5 class="Header"><xsl:value-of select="title"/></h5>
          </xsl:if>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <xsl:apply-templates select="row" />
          <xsl:apply-templates select="row-one-col" />
          <xsl:apply-templates select="table" />
        </td>
      </tr>
    </xsl:template>

    <!-- section/row -->
    <xsl:template match="row">
      <table width='100%' align='center' class='background-blacktrans'>
        <tr class='trow-default'>
          <td class='td-left'>
            <xsl:value-of select="label" />
          </td>
          <td class='td-right'>
            <xsl:value-of select="value" />
          </td>
        </tr>
      </table>
    </xsl:template>

    <!-- section/row-one-col -->
    <xsl:template match="row-one-col">
      <table width='100%' align='center' class='background-blacktrans'>
        <tr class='trow-default'>
          <td style="font-weight: normal">
            <xsl:value-of select="text()" />
          </td>
        </tr>
      </table>
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
      <xsl:if test="not(tr)">
        <tr class="trow-title">
          <xsl:apply-templates select="th" />
        </tr>
      </xsl:if>
      <xsl:if test="tr">
        <xsl:apply-templates select="tr" />
      </xsl:if>
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
        <xsl:value-of select="text()" />
      </th>
    </xsl:template>

    <!-- section/table/tbody/tr/td -->
    <xsl:template match="td">
      <td style="text-align: center">
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
        <div class="mobile-mode"><xsl:value-of select="title" /></div>
        <div class="content-detail">
          <xsl:value-of select="text()" />
          <xsl:if test="onclick">
            <a onclick="{onclick}" style="cursor: pointer">
              <xsl:value-of select="value" />
            </a>
          </xsl:if>
        </div>
      </td>
    </xsl:template>
  </xsl:stylesheet>
