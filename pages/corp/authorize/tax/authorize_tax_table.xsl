<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='100%' align='center' class='table-account table-checkbox' style="table-layout: fixed;">
        <xsl:for-each select="result/title">
          <tr class="trow-title" onClick="selectRow(event, this, true);">
            <th width="7%">
              <xsl:value-of select="rowtitle1" />
            </th>
            <th width="13%">
              <xsl:value-of select="rowtitle2" />
            </th>
            <th width="20%">
              <xsl:value-of select="rowtitle3" />
            </th>
            <th width="15%">
              <xsl:value-of select="rowtitle4" />
            </th>
            <th width="20%">
              <xsl:value-of select="rowtitle5" />
            </th>
            <th width="20%">
              <xsl:value-of select="rowtitle6" />
            </th>
            <!-- <th width="5%">
              <xsl:value-of select="rowtitle7" />
            </th> -->
            <th width="5%">
              <input type="checkbox" name="true" />
            </th>
          </tr>
        </xsl:for-each>
        <xsl:for-each select="result/content">
          <xsl:variable name="idx" select="idx" />
          <tr onClick="selectRow(event, this, false);">
            <td width="5%" class="tdselct td-head-color">
              <div class="mobile-mode"><span>COM_NO</span></div>
              <div class="content-detail" style="word-break: break-all;">
                <xsl:value-of select="acccontent1" />
              </div>
            </td>
            <td width="15%" >
              <div class="mobile-mode"><span>COM_MAKER</span></div>
              <div class="content-detail" style="word-break: break-all;">
                <xsl:value-of select="acccontent2" />
              </div>
            </td>
            <td width="20%" >
              <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
              <div class="content-detail" style="word-break: break-all;">
                <xsl:value-of select="acccontent3" />
              </div>
            </td>
            <td width="15%" >
              <div class="mobile-mode"><span>COM_AMOUNT</span></div>
              <div class="content-detail" style="word-break: break-all;">
                <xsl:value-of select="acccontent4" />
              </div>
            </td>
            <td width="10%" >
              <div class="mobile-mode"><span>COM_CHEKER</span></div>
              <div class="content-detail" style="word-break: break-all;">
                <xsl:value-of select="acccontent5" />
              </div>
            </td>
            <td width="20%" style="word-break: break-all;">
              <div class="mobile-mode"><span>COM_TRANS_CODE</span></div>
              <div class="content-detail">
                <a style="cursor:pointer; white-space:pre-wrap;" onclick="showDetailAuthorizeTax({transId});">
                  <span class="no-check"><xsl:value-of select="transId" /></span>
                </a>
              </div>
            </td>
            <td width="5%" style="word-wrap:break-word" align="center" >
              <div class="mobile-mode" style="text-align: left;">
                <span>COM_CHOOSE</span>
              </div>
              <div class="content-detail-checkbox">
                <input class="trans.checkbox" type="checkbox" value="{$idx}" />
              </div>
            </td>
          </tr>
        </xsl:for-each>
      </table>
      <br/>
      <table width="100%" class="button-group button-group-2">
        <tr>
          <td colspan="2" align="center">
            <div align="right" style="margin: 5px;" class="export-print">
              <a href="javascript:void(0)" id="acchis.exportfile" onclick="sendRequestExportExcel()">
                <img style="margin-right:5px;" src="css/img/exportfile.png" />
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <input id="id.reason-rej" maxlength="250" class="form-control" placeholder="INTERNAL_TRANS_AUTH_ERROR_TIT_REASON" />
            <br/>
          </td>
        </tr>
        <tr>
          <td>
            <input type="button" style="background-color:#F47E2B;margin: 0;float: left;" class='btnshadow btn-primary' onclick='rejectTax()' value='COM_REJ' />
          </td>
          <td>
            <input type="button" style="background-color:#F47E2B;margin: 0;float: right;" class='btnshadow btn-primary' onclick='authorizeTax()' value='MENU_AUTHORIZE_TRANS' />
          </td>
        </tr>
      </table>
    </xsl:template>
  </xsl:stylesheet>
