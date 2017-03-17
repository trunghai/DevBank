<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Main Template -->
    <xsl:template match="/review">
      <table width="100%" align="center" class="background-blacktrans">
        <tr>
          <td colspan="2">
            <h5 class="Header" style="white-space:pre-wrap"><span>AUTHORIZE_TRANS_TIT_LIST_PENDING</span></h5>
          </td>
        </tr>
        <tbody>
          <tr class='trow-default'>
            <td class='td-left'>
              <span>COM_TYPE_TRANSACTION</span>
            </td>
            <td class='td-right'>
              <b><span>AUTHORIZE_TRANS_TIT_COUNT_PENDING</span></b>
            </td>
          </tr>
          <xsl:for-each select="rows/row">
            <tr class='trow-default'>
              <td class='td-left'>
                <a onclick="goToAuthorizeScreen('{idtxn}')">
                  <span style="cursor:pointer; white-space:pre-wrap;"><xsl:value-of select="title" /></span>
                </a>
              </td>
              <td class='td-right'>
                <span>
                  <xsl:value-of select="count" />
                </span>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </xsl:template>
  </xsl:stylesheet>
