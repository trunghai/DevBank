<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='98%' align='center' class='table-account'>
        <tr class="trow-title">
          <th><span>COM_NO</span></th>
          <th><span>COM_CREATED_DATE</span></th>
          <th><span>FOREGIN_SELL_NUMBER</span></th>
          <th><span>FOREGIN_MONEY</span></th>
          <th><span>FOREGIN_RATE</span></th>
          <th><span>FOREGIN_TOTAL_RECEIVER_AMOUNT</span></th>
          <th><span>COM_STATUS</span></th>
          <th><span>TRANS_ACCNO_ID</span></th>
        </tr>
        <xsl:for-each select="transTable/rows">
          <tr>
            <td class="tdselct td-head-color">
              <div class="mobile-mode"><span>COM_NO</span></div>
              <div class="content-detail word-break-mb"><span><xsl:value-of select="stt" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
              <div class="content-detail word-pre-wrap-mb"><span><xsl:value-of select="dateMaker" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>FOREGIN_SELL_NUMBER</span></div>
              <div class="content-detail word-pre-wrap-mb"><span><xsl:value-of select="sellNumber" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>FOREGIN_MONEY</span></div>
              <div class="content-detail word-pre-wrap-mb"><span><xsl:value-of select="sellUnit" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>FOREGIN_RATE</span></div>
              <div class="content-detail word-pre-wrap-mb"><span><xsl:value-of select="sellRate" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>FOREGIN_TOTAL_RECEIVER_AMOUNT</span></div>
              <div class="content-detail word-break-mb"><span><xsl:value-of select="amount" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_STATUS</span></div>
              <div class="content-detail word-pre-wrap-mb"><span><xsl:value-of select="status" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>TRANS_ACCNO_ID</span></div>
              <div class="content-detail">
                <a onclick="showTransferDetail('{idx}')" style="cursor: pointer; word-break: break-all;">
                  <span><xsl:value-of select="transId" /></span>
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
