<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <table width='98%' align='center' class='table-account'>
                    <tr class="trow-title">
                        <th><span>COM_NO</span></th>
                        <th><span>CRE_TYPE_GUARANTEE</span></th>
                        <th><span>CRE_ITEM_GUARANTEE_GUA_RECEIVER</span></th>
                        <th><span>CRE_ITEM_GUARANTEE_GUA_AMOUNT</span></th>
                        <th><span>COM_DEADLINE_DATE</span></th>
                        <th><span>CRE_ITEM_GUARANTEE_GUA_NO</span></th>
                    </tr>
                    <xsl:for-each select="resptable/tabletdetail">
                        <tr>
                            <td class="td-head-color">
                                <div class="mobile-mode"><span>COM_NO</span></div>
                                <div class="content-detail"><xsl:value-of select="no"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_TYPE_GUARANTEE</span></div>
                                <div class="content-detail"><xsl:value-of select="GUARANTEE_TYPE"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_ITEM_GUARANTEE_GUA_RECEIVER</span></div>
                                <div class="content-detail"><xsl:value-of select="GUARANTEE_RECEIVER"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_ITEM_GUARANTEE_GUA_AMOUNT</span></div>
                                <div class="content-detail"><xsl:value-of select="GUARANTEE_AMOUNT"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>COM_DEADLINE_DATE</span></div>
                                <div class="content-detail"><xsl:value-of select="DEADLINE_DATE"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_ITEM_GUARANTEE_GUA_NO</span></div>
                                <div class="content-detail">
                                    <a class="ref-link" onclick="detailGuarantee('{GUARANTEE_NO}', '{GUARANTEE_TYPE}', '{GUARANTEE_AMOUNT}', '{GUARANTEE_RECEIVER}', '{RELEASE_DATE}', '{DEADLINE_DATE}', '{SERI_NO}', '{STATUS}', '{GUARANTEE_CONTENT}')" href="javascript:void(0)">
                                        <xsl:value-of select="GUARANTEE_NO"/> 
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>