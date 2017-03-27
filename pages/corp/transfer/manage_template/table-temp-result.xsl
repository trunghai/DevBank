<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/table">
      <table width='98%' align='center' class='table-account'>
        <tr class="trow-title">
          <th><span>TRANSFER_REMITTANCE_NAME</span></th>
          <th><span>TRANSFER_REMITTANCE_MODIFY</span></th>
          <th><span>TRANSFER_REMITTANCE_DELETE</span></th>
          <th><span>TRANSFER_REMITTANCE_USE</span></th>
        </tr>
        <xsl:for-each select="row">
          <tr>
            <td class="tdselct td-head-color">
              <div class="mobile-mode"><span>TRANSFER_REMITTANCE_NAME</span></div>
              <div class="content-detail" style="cursor:pointer">
                <a onclick="detailTemplate({beneId}, {transType})">
                  <xsl:value-of select="tempName" />
                </a>
              </div>
            </td>
            <td>
              <div class="mobile-mode"><span>TRANSFER_REMITTANCE_MODIFY</span></div>
              <div class="content-detail" style="cursor:pointer">
                <a onclick="modifyTemplate({beneId},{transType})">
                  <xsl:value-of select="modify" />
                </a>
              </div>
            </td>
            <td>
              <div class="mobile-mode"><span>TRANSFER_REMITTANCE_DELETE</span></div>
              <div class="content-detail" style="cursor:pointer">
                <a onclick="removeTemplate({beneId})">
                  <xsl:value-of select="remove" />
                </a>
              </div>
            </td>
            <td>
              <div class="mobile-mode"><span>TRANSFER_REMITTANCE_USE</span></div>
              <div class="content-detail" style="cursor:pointer">
                <a onclick="useTemplate({beneId},{transType})">
                  <xsl:value-of select="use" />
                </a>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </xsl:template>
  </xsl:stylesheet>
