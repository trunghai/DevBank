<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='98%' align='center' class='table-account table-checkbox'>
        <tr class="trow-title" onClick="selectRow(event, this, true);">
          <th><span>COM_NO</span></th>
          <th><span>COM_CREATED_DATE</span></th>
          <th><span>IDENTIFICATION_AUTHORIZE_ID</span></th>
          <th><span>COM_AMOUNT</span></th>
          <th><span>COM_RECEIVER</span></th>
          <th><span>COM_CHEKER</span></th>
          <th><span>COM_TRANS_CODE</span></th>
          <th><span><input type="checkbox" id="checkAllTrans" name="checkAllTrans" onclick="checkAllTrans()" /></span></th>
        </tr>
        <xsl:for-each select="resptable/tabletdetail">
          <tr onClick="selectRow(event, this, false);">
            <td class="td-head-color">
              <div class="mobile-mode"><span>COM_NO</span></div>
              <div class="content-detail"><span><xsl:value-of select="stt" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
              <div class="content-detail"><span><xsl:value-of select="datemake" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_ACCOUNT_DEST</span></div>
              <div class="content-detail"><span><xsl:value-of select="passport" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_AMOUNT</span></div>
              <div class="content-detail"><span><xsl:value-of select="amount" /> VND</span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_RECEIVE_NAME</span></div>
              <div class="content-detail"><span><xsl:value-of select="beneName" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_CHEKER</span></div>
              <div class="content-detail"><span><xsl:value-of select="approver" /></span></div>
            </td>
            <td>
              <div class="mobile-mode"><span>COM_TRANS_CODE</span></div>
              <div class="content-detail">
                <a class="no-check" onclick="showTransferDetail('{userRefId}')" style="cursor: pointer; padding-left: 7px; white-space: pre-wrap;">
                  <span><xsl:value-of select="transId" /></span>
                </a>
              </div>
            </td>
            <td>
              <div class="mobile-mode"><span></span></div>
              <div class="content-detail">
                <input type="checkbox" class="checkTransItem" name="userRefId" value="{transId}">
                <xsl:if test="userRefId=''">
                  <xsl:attribute name="checked">checked</xsl:attribute>
                </xsl:if>
                </input>
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
      
      <table width="100%">
        <tr>
          <td colspan="2" align="center" valign="middle">
            <div align="right" style="margin: 5px;" class="export-print">
              <a href="javascript:void(0)" id="acchis.exportfile" onclick="sendRequestExportExcel()">
                <img style="margin-right:5px;" src="css/img/exportfile.png" />
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" valign="middle" class="td-text">
            <div id="pagination" style="text-align: right"></div>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" valign="middle" class="td-text">
            <div class="input-group">
              <input id="trans.approve.reason" class="form-control form-control-righttext" placeholder="AUTHORIZE_TXT_REASON" value="" maxlength="250" />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <input type="button" class="btnshadow btn-primary" onclick="approveTransaction(false)" value="COM_REJ" />
          </td>
          <td>
            <input type="button" class="btnshadow btn-second" onclick="approveTransaction(true)" value="AUTHORIZE_BTN_AUTHEN" />
          </td>
        </tr>
      </table>
    </xsl:template>
  </xsl:stylesheet>
