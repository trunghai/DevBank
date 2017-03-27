<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/review">
        <table width='100%' align='center' class='table-account' style=" table-layout: fixed;">
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
                  <xsl:if test="position()=1">
                    <xsl:attribute name="class">tdselct td-head-color</xsl:attribute>
                  </xsl:if>
                  <div class="mobile-mode">
                    <span><xsl:value-of select="title" /></span>
                  </div>
                  <div class="content-detail" style="word-break: break-all;">
                    <xsl:value-of select="content" />
                  </div>
                </td>
              </xsl:for-each>
            </tr>
          </xsl:for-each>
        </table>
    </xsl:template>
  </xsl:stylesheet>
