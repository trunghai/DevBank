<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <xsl:if test="listTrans/row">
        <xsl:apply-templates select="listTrans" />
      </xsl:if>
      <xsl:if test="not(listTrans/row)">
        <table width='98%' align='center'>
          <tr>
            <td><span>TRAN_HIS_NO_DATA_TITLE</span></td>
          </tr>
        </table>
      </xsl:if>
    </xsl:template>

    <xsl:template match="listTrans">
      <table width='98%' align='center' class='table-account table-checkbox'>
        <tr class="trow-title" onClick="selectRow(event, this, true);">
          <th><span>TRANSFER_LIST_STT</span></th>
          <th><span>COM_CREATED_DATE</span></th>
          <th><span>COM_MAKER</span></th>
          <th><span>TRANS_TYPE</span></th>
          <th><span>COM_STATUS</span></th>
          <th><span>COM_CHEKER</span></th>
          <th><span>COM_TRANS_CODE</span></th>
          <th><span><input type="checkbox" id="checkAllTrans" name="checkAllTrans"/></span></th>
        </tr>
        <xsl:for-each select="row">
          <tr onClick="selectRow(event, this, false);">
            <td class="tdselct td-head-color">
              <div class="mobile-mode"><span>TRANSFER_LIST_STT</span></div>
              <div class="content-detail"><span><xsl:value-of select="stt" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
              <div class="content-detail"><span><xsl:value-of select="datemake" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_MAKER</span></div>
              <div class="content-detail"><span><xsl:value-of select="maker" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>TRANS_TYPE</span></div>
              <div class="content-detail"><span><xsl:value-of select="type" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_STATUS</span></div>
              <div class="content-detail"><span><xsl:value-of select="status" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_CHEKER</span></div>
              <div class="content-detail"><span><xsl:value-of select="approver" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_TRANS_CODE</span></div>
              <div class="content-detail">
                <a onclick="showTransferDetail('{transId}', '{idtxn}')" style="cursor: pointer">
                  <span class="no-check"><xsl:value-of select="transId"/></span>
                </a>
              </div>
            </td>
            <td>
              <div class="mobile-mode"><span>INPUT_ACC_BTN_SELECT</span></div>
              <div class="content-detail">
                <input type="checkbox" class="checkTransItem" name="{position()}">
                </input>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </xsl:template>
  </xsl:stylesheet>
