<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='100%' align='center' class='table-account' style=" table-layout: fixed;">
        <xsl:for-each select="result/title">
          <tr class="trow-title">
            <th width="5%">
              <xsl:value-of select="rowtitle1" />
            </th>
            <th width="20%">
              <xsl:value-of select="rowtitle2" />
            </th>
            <th width="25%">
              <xsl:value-of select="rowtitle3" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle4" />
            </th>
            <th width="20%">
              <xsl:value-of select="rowtitle5" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle6" />
            </th>
          </tr>
        </xsl:for-each>
        <xsl:for-each select="result/content">
          <xsl:variable name="transId" select="transId" />
          <xsl:variable name="idx" select="idx" />
          <tr>
            <td width="5%" style="word-wrap:break-word" class="tdselct td-head-color">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle1" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent1" />
              </div>
            </td>
            <td width="20%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle2" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent2" />
              </div>
            </td>
            <td width="25%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle3" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent3" />
              </div>
            </td>
            <td width="15%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle4" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent4" />
              </div>
            </td>
            <td width="20%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle5" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent5" />
              </div>
            </td>
            <td width="15%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle6" /></span>
              </div>
              <div class="content-detail">
                <a style="cursor:pointer; white-space:pre-wrap;word-break: break-all;" 
                  onclick="showDetailTransaction({$idx}, {$transId});">
                  <xsl:value-of select="transId" />
                </a>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </xsl:template>
  </xsl:stylesheet>
