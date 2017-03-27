<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <table width='98%' align='center' class='table-account'>
                    <tr class="trow-title">
                        <th><span>COM_DEADLINE_DATE</span></th>
                        <th><span>CRE_DEBT_ROOT_MONEY_PAY</span></th>
                        <th><span>CRE_DEBT_INTEREST_MONEY_PAY</span></th>
                        <th><span>CRE_DEBT_TOTAL_MONEY_PAY</span></th>
                        <th><span>CRE_DEBT_ROOT_MONEY_ACTUALLY_PAY</span></th>
                        <th><span>CRE_DEBT_INTEREST_MONEY_ACTUALLY_PAY</span></th>
                    </tr>
                    <xsl:for-each select="resptable/tabletdetail">
                        <tr>
                            <td class="td-head-color">
                                <div class="mobile-mode"><span>COM_DEADLINE_DATE</span></div>
                                <div class="content-detail"><xsl:value-of select="ngay_den_han"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ROOT_MONEY_PAY</span></div>
                                <div class="content-detail"><xsl:value-of select="root_money_pay"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_INTEREST_MONEY_PAY</span></div>
                                <div class="content-detail"><xsl:value-of select="interest_money_pay"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_TOTAL_MONEY_PAY</span></div>
                                <div class="content-detail"><xsl:value-of select="total_money_pay"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_ROOT_MONEY_ACTUALLY_PAY</span></div>
                                <div class="content-detail"><xsl:value-of select="root_money_actually_pay"/></div>
                            </td>
                            <td>
                                <div class="mobile-mode"><span>CRE_DEBT_INTEREST_MONEY_ACTUALLY_PAY</span></div>
                                <div class="content-detail"><xsl:value-of select="interest_money_actually_pay"/></div>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>