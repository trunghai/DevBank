<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <table width='100%' align='center' class='table-account table-checkbox'>
        <xsl:for-each select="result/title">
          <tr class="trow-title" onClick="selectRow(event, this, true);">
            <th width="6%">
              <xsl:value-of select="rowtitle1" />
            </th>
            <th width="15%">
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
            <th width="10%">
              <xsl:value-of select="rowtitle6" />
            </th>
            <th width="10%">
              <xsl:value-of select="rowtitle7" />
            </th>
            <th width="9%">
              <xsl:value-of select="rowtitle8" />
            </th>
            <th width="5%">
              <input type="checkbox" name="true" onclick="checkAllTrans()" />
            </th>
          </tr>
        </xsl:for-each>
        <tbody>
          <xsl:for-each select="result/content">
            <xsl:variable name="idx" select="idx" />
            <tr onClick="selectRow(event, this, false);">
              <td width="6%" class="tdselct td-head-color">
                <div class="mobile-mode">
                  <xsl:value-of select="title1" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <xsl:value-of select="acccontent1" />
                </div>
              </td>
              <td width="15%">
                <div class="mobile-mode">
                  <xsl:value-of select="title2" />
                </div>
                <div class="content-detail" style="white-space: pre-wrap;">
                  <xsl:value-of select="acccontent2" />
                </div>
              </td>
              <td width="15%">
                <div class="mobile-mode">
                  <xsl:value-of select="title3" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <xsl:value-of select="acccontent3" />
                </div>
              </td>
              <td width="15%">
                <div class="mobile-mode">
                  <xsl:value-of select="title4" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <xsl:value-of select="acccontent4" />
                </div>
              </td>
              <td width="15%">
                <div class="mobile-mode">
                  <xsl:value-of select="title5" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <xsl:value-of select="acccontent5" />
                </div>
              </td>
              <td width="10%">
                <div class="mobile-mode">
                  <xsl:value-of select="title6" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <xsl:value-of select="acccontent6" />
                </div>
              </td>
              <td width="10%">
                <div class="mobile-mode">
                  <xsl:value-of select="title7" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <xsl:value-of select="acccontent7" />
                </div>
              </td>
              <td width="9%">
                <div class="mobile-mode">
                  <xsl:value-of select="title8" />
                </div>
                <div class="content-detail" style="word-break: break-all;">
                  <a style="cursor:pointer;" onclick="showDetailTransaction({$idx});">
                    <span class="no-check"><xsl:value-of select="transId" /></span>
                  </a>
                </div>
              </td>
              <td width="5%">
                <div class="mobile-mode">
                  <span>COM_CHOOSE</span>
                </div>
                <div class="content-detail">
                  <input class="trans.checkbox" type="checkbox" name="{$idx}" />
                </div>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
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
          <td colspan="2" align="center">
            <br/>
            <input id="id.reason-rej" class="form-control" placeholder="INTERNAL_TRANS_AUTH_ERROR_TIT_REASON" />
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <div id="pageIndicatorNums" style="text-align: right"></div>
          </td>
        </tr>
      </table>
      <table class="button-group button-group-2">
        <tr>
          <td>
            <input type="button" class='btnshadow btn-primary' onclick='rejectTransaction()' value='COM_REJ' />
          </td>
          <td>
            <input type="button" class='btnshadow btn-primary' onclick='authorizeTransaction()' value='AUTHORIZE_BTN_AUTHEN' />
          </td>
        </tr>
      </table>
    </xsl:template>
  </xsl:stylesheet>
