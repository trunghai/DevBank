<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<table width='98%' align='center' class='table-account'>
					<tr class="trow-title">
						<th width="12.5%"><span>COM_ACCOUNT_NUMBER</span></th>
						<th width="18.75%"><span>ACCOUNT_PERIOD_TYPE</span></th>
						<th width="18.75%"><span>COM_AMOUNT</span></th>
						<th width="6.25%"><span>ACC_INTEREST_YEAR</span></th>
						<th width="12.5%"><span>ACCOUNT_PERIOD_DATESTART</span></th>
						<th width="12.5%"><span>ACCOUNT_PERIOD_DATEEND</span></th>
						<th width="6.25%"><span>COM_TYPE_MONEY</span></th>
						<th width="12.5%"><span>ACC_PROFITS_INTERIM</span></th>
					</tr>
					<xsl:for-each select="resptable/tabletdetail">
						<tr>
							<td class="td-head-color" style="word-wrap:break-word">
								<div class="mobile-mode"><span>COM_ACCOUNT_NUMBER</span></div>
								<div class="content-detail">
									<a id="lnk_{idtxn}" class="ref-link" onclick="clickDetail('{tbl_number}', '{tbl_is_type}', '{tbl_typemoney}', '{tbl_amount}', '{tbl_tenor_days}', '{tbl_tenor_months}', '{tbl_tenor_years}', '{tbl_interest_rate}', '{tbl_profits_interim}', '{tbl_datestart}', '{tbl_dateend}', '{tbl_so_phong_toa}', '{tbl_ly_do_phong_toa}')" href="javascript:void(0)">
										<xsl:value-of select="tbl_number"/>	
									</a>
								</div>    
							</td>
							<td style="word-wrap:break-word">
								<div class="mobile-mode"><span>ACCOUNT_PERIOD_TYPE</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_type"/></div>
							</td>
							<td class="td-right-query-ipad" style="word-wrap:break-word">
								<div class="mobile-mode"><span>COM_AMOUNT</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_amount"/></div>
							</td>
							<td class="td-right-query-ipad" style="word-wrap:break-word">
								<div class="mobile-mode"><span>ACC_INTEREST_YEAR</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_interest_rate"/></div>
							</td>
							<td style="word-wrap:break-word">
								<div class="mobile-mode"><span>ACCOUNT_PERIOD_DATESTART</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_datestart"/></div>
							</td>
							<td style="word-wrap:break-word">
								<div class="mobile-mode"><span>ACCOUNT_PERIOD_DATEEND</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_dateend"/></div>
							</td>
							<td style="word-wrap:break-word">
								<div class="mobile-mode"><span>COM_TYPE_MONEY</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_typemoney"/></div>
							</td>
							<td class="td-right td-right-balance-ipad" style="word-wrap:break-word;">
								<div class="mobile-mode"><span>ACC_PROFITS_INTERIM</span></div>
								<div class="content-detail"><xsl:value-of select="tbl_profits_interim"/></div>
							</td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>