<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <table width='98%' align='center' class='table-account'>
                    <tr class="trow-title">
                        <th><span>COM_NO</span></th>
                        <th><span>CRE_DEBT_ITEM_DEBT_NAME</span></th>
                        <th><span>CRE_DEBT_LIMIT_OVERDRAFT</span></th>
                        <th><span>CRE_DEBT_OVERDRAFT_START_DATE</span></th>
                        <th><span>CRE_DEBT_OVERDRAFT_END_DATE</span></th>
                        <th><span>CRE_DEBT_ITEM_INTEREST</span></th>
                        <th><span>CRE_DEBT_OVERDRAFT_ACC</span></th>
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
                                <div class="mobile-mode"><span>CRE_DEBT_LIMIT_OVERDRAFT</span></div>
                                <div class="content-detail"><xsl:value-of select="limit_overdaft"/> <xsl:value-of select="money"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_OVERDRAFT_START_DATE</span></div>
                                <div class="content-detail"><xsl:value-of select="overdaft_start_date"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_OVERDRAFT_END_DATE</span></div>
                                <div class="content-detail"><xsl:value-of select="overdaft_end_date"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ITEM_INTEREST</span></div>
                                <div class="content-detail"><xsl:value-of select="overdaft_interest"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_OVERDRAFT_ACC</span></div>
                                <a class="content-detail" onclick="clickOverDaftDetail('{debt_no}', '{debt_name}', '{open_acc_date}', '{money}', '{branch_name}', '{overdaft_interest}', '{surplus}', '{overdaft_start_date}', '{overdaft_end_date}', '{surplus_availabel}', '{limit_overdaft}')" href="javascript:void(0)">
                                    <xsl:value-of select="debt_no"/> 
                                </a>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>