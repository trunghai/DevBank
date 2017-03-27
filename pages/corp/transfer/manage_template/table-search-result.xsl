<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='98%' align='center' class='table-account'>
        <tr class="trow-title">
          <th><span>TRANS_BENE_ACC__BENEFICIARY</span></th>
          <th><span>CONST_BANK_BENEFICIARY</span></th>
          <th><span>TRANS_PERIODIC_PAYEE</span></th>
          <th><span>INPUT_ACC_BTN_SELECT</span></th>
        </tr>
        <xsl:for-each select="resptable/tabletdetail">
          <tr>
            <td class="tdselct td-head-color">
              <div class="mobile-mode" style="float: left;"><span>TRANS_BENE_ACC__BENEFICIARY</span></div>
              <div class="content-detail"><span><xsl:value-of select="idDestAcc" /></span></div>
            </td>
            <td>
              <div class="mobile-mode" style="float: left;"><span>CONST_BANK_BENEFICIARY</span></div>
              <div class="content-detail"><b><span><xsl:value-of select="bankName" /></span></b></div>
            </td>
            <td>
              <div class="mobile-mode"><span>TRANS_PERIODIC_PAYEE</span></div>
              <div class="content-detail"><span><xsl:value-of select="beneName" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>INPUT_ACC_BTN_SELECT</span></div>
              <div class="content-detail">
                <span class="icon-pencil" onclick="prepareEdit('{beneId}')" style="padding 1px; cursor : pointer;"></span>&#160;
                <span class="icon-cross" onclick="deleteBeneficiary('{beneId}')" style="padding 1px; cursor : pointer;"></span>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </xsl:template>
  </xsl:stylesheet>
