<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <table style="width: 98%; margin: auto" class='table-account'>
      <xsl:for-each select="account/accinfo">
        <tr class="tr-two-col">
          <td class="td-two-col"><div class="div-two-col"><xsl:value-of select="acctitle1"/></div>
            <div class="div-two-col"><xsl:value-of select="acccontent1"/></div></td>
          <td class="td-two-col"><div class="div-two-col"><xsl:value-of select="acctitle2"/></div>
            <div class="div-two-col"><xsl:value-of select="acccontent2"/></div></td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>
</xsl:stylesheet>
