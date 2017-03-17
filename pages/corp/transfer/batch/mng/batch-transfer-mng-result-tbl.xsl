<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width="98%" align="center" class="table-account" style="border-collapse:collapse;font-size:12px;">
        <xsl:for-each select="result/title">
          <tr class="trow-title">
            <th width="8%">
              <xsl:value-of select="rowtitle1" />
            </th>
            <th width="17%">
              <xsl:value-of select="rowtitle2" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle3" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle4" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle5" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle6" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle7" />
            </th>
          </tr>
        </xsl:for-each>
        <xsl:for-each select="result/content">
          <tr>
            <td width="8%" style="word-wrap:break-word" class="tdselct td-head-color">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle1" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent1" />
              </div>
            </td>
            <td width="17%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle2" /></span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="acccontent2" />
              </div>
            </td>
            <td width="15%" style="word-wrap:break-word">
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
            <td width="15%" style="word-wrap:break-word">
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
                <xsl:value-of select="acccontent6" />
              </div>
            </td>
            <td width="15%" style="word-wrap:break-word">
              <div class="mobile-mode">
                <span><xsl:value-of select="acctitle7" /></span>
              </div>
              <div class="content-detail">
                <xsl:variable name="clickHandle" select="clickHandle"/>
                <a style="cursor:pointer; white-space:pre-wrap;" 
                  onclick="{$clickHandle}">
                  <xsl:value-of select="transId" />
                </a>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
      <table width="100%">
        <tr>
          <td>
            <div style="margin: 5px; text-align: right" class="export-print">
              <a href="javascript:void(0)" id="export-excel" onclick="sendRequestExportExcel()">
                <img style="margin-right:5px;" src="css/img/exportfile.png" />
              </a>
            </div>
          </td>
        </tr>
      </table>
    </xsl:template>
  </xsl:stylesheet>
