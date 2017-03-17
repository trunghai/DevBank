<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<table width='98%' align='center' class='table-account' style=" table-layout: fixed;">
					<tr class="trow-title">
						<th style="width: 10%"><span>COM_NO</span></th>
						<th style="width: 25%"><span>COM_DECLAR</span></th>
						<th style="width: 20%"><span>TAX_IM_EX_TBL_YEAR_DECLAR</span></th>
						<th style="width: 45%"><span>TAX_IM_EX_TBL_HAI_QUAN_PHAT_HANH</span></th>
					</tr>
					<xsl:for-each select="resptable/tabletdetail">
						<tr>
							<td class="td-head-color text-center">
								<div class="mobile-mode"><span>COM_NO</span></div>
								<div class="content-detail"><xsl:value-of select="no"/></div>
							</td>
							<td class="text-center">
								<div class="mobile-mode text-center"><span>COM_DECLAR</span></div>
								<div class="content-detail"><xsl:value-of select="So_TK"/></div>
							</td>
							<td class="text-center">
                                <div class="mobile-mode text-center"><span>TAX_IM_EX_TBL_YEAR_DECLAR</span></div>
                                <div class="content-detail"><xsl:value-of select="Nam_DK"/></div>
                            </td>
							<td class="text-center">
                                <div class="mobile-mode"><span>TAX_IM_EX_TBL_HAI_QUAN_PHAT_HANH</span></div>
                                <div class="content-detail">
                                    <a id="lnk_{idtxn}" style="white-space:pre-wrap;"  class="ref-link" onclick="imExportDetail('{So_TK}', '{Nam_DK}', {no})" href="javascript:void(0)">
                                        <xsl:value-of select="Ten_HQ_PH"/> 
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