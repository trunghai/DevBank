<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <table width='98%' align='center' class='table-account'>
                    <tr class="trow-title">
                        <th><span>COM_NO</span></th>
                        <th><span>CRE_DEBT_ITEM_DEBT_NAME</span></th>
                        <th><span>CRE_DEBT_ITEM_DISBURSEMENT_MONEY</span></th>
                        <th><span>CRE_DEBT_DATE</span></th>
                        <th><span>COM_EXPIRE_DATE</span></th>
                        <th><span>CRE_DEBT_ITEM_INTEREST</span></th>
                        <th><span>CRE_DEBT_ITEM_INDENTURE_NO</span></th>
                    </tr>
                    <xsl:for-each select="resptable/tabletdetail">
                        <tr>
                            <td class="td-head-color">
                                <div class="mobile-mode"><span>COM_NO</span></div>
                                <div class="content-detail"><xsl:value-of select="no"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ITEM_DEBT_NAME</span></div>
                                <div class="content-detail"><xsl:value-of select="debt_name"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ITEM_DISBURSEMENT_MONEY</span></div>
                                <div class="content-detail"><xsl:value-of select="disbursement_money"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_DATE</span></div>
                                <div class="content-detail"><xsl:value-of select="debt_date"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>COM_EXPIRE_DATE</span></div>
                                <div class="content-detail"><xsl:value-of select="expire_date"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ITEM_INTEREST</span></div>
                                <div class="content-detail"><xsl:value-of select="interest"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ITEM_INDENTURE_NO</span></div>
                                <div class="content-detail">
                                    <a class="ref-link" onclick="detailDebt('{indenture_no}', '{debt_name}', '{disbursement_money}', '{interest}', '{debt_date}', '{expire_date}', '{expire_near_date}', '{root_money}', '{interest_money}')" href="javascript:void(0)">
                                        <xsl:value-of select="indenture_no"/> 
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