<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='100%' align='center' class='table-account' style=" table-layout: fixed;">
        <xsl:for-each select="result/title">
          <tr class="trow-title">
            <th width="7%">
              <xsl:value-of select="rowtitle1" />
            </th>
            <th width="13%">
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
          <xsl:variable name="transId" select="transId" />
          <tr>
            <td width="5%" class="td-head-color">
              <div class="mobile-mode"><span>COM_NO</span></div>
              <div class="content-detail">
                <xsl:value-of select="acccontent1" />
              </div>
            </td>
            <td width="15%" >
              <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
              <div class="content-detail">
                <xsl:value-of select="acccontent2" />
              </div>
            </td>
            <td width="15%" >
              <div class="mobile-mode"><span>COM_TAX_TYPE</span></div>
              <div class="content-detail">
                <xsl:value-of select="acccontent3" />
              </div>
            </td>
            <td width="15%">
              <div class="mobile-mode"><span>COM_STATUS</span></div>
              <div class="content-detail">
                <xsl:value-of select="acccontent4" />
              </div>
            </td>
            <td width="15%"  class="td-right">
              <div class="mobile-mode"><span>COM_AMOUNT</span></div>
              <div class="content-detail">
                <xsl:value-of select="acccontent5" />
              </div>
            </td>
            <td width="15%" >
              <div class="mobile-mode"><span>COM_CHEKER</span></div>
              <div class="content-detail">
                <xsl:value-of select="acccontent6" />
              </div>
            </td>
            <td width="15%" style="word-break: break-all;">
              <div class="mobile-mode"><span>COM_TRANS_CODE</span></div>
              <div class="content-detail">
                <a style="cursor:pointer; white-space:pre-wrap;" onclick="showDetailPayTax({$transId});">
                  <xsl:value-of select="transId" />
                </a>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
      <div align="right" style="margin: 5px;" class="export-print">
        <a href="javascript:void(0)" id="acchis.exportfile" onclick="sendRequestExportExcel()">
          <img style="margin-right:5px;" src="css/img/exportfile.png" />
        </a>
      </div>
    </xsl:template>
  </xsl:stylesheet>
