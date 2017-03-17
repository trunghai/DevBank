<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
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
        <table width='100%' align='center' class='table-account' style=" table-layout: fixed;">
          <tr class="trow-title">
            <xsl:for-each select="titles/table-title">
              <th>
                <xsl:value-of select="." />
              </th>
            </xsl:for-each>
            <th><span>COM_CHOOSE</span></th>
          </tr>
          <xsl:for-each select="rows/row">
            <xsl:variable name="idx" select="idx" />
            <tr>
              <xsl:for-each select="table-content">
                <td style="word-wrap: break-word">
                  <div class="content-detail">
                    <xsl:value-of select="." />
                  </div>
                </td>
              </xsl:for-each>
              <td style="word-wrap: break-word">
                <div class="mobile-mode"><span></span></div>
                <div class="content-detail">
                  <span><input type="checkbox" onChange="selectedTaxInfo(this, '{$idx}')"/></span>
                </div>
              </td>
            </tr>
          </xsl:for-each>
        </table>
        <br/>
      </xsl:for-each>
    </xsl:template>
  </xsl:stylesheet>
