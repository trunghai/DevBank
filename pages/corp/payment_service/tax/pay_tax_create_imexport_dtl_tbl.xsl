<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<table width='98%' align='center' class='table-account'>
					<tr class="trow-title">
						<th with="5%"><span>COM_NO</span></th>
						<th with="5%"><span>TAX_CHAPTER</span></th>
						<th with="40%"><span>TAX_CONTENT</span></th>
						<th with="45%"><span>COM_AMOUNT</span></th>
						<th with="5%"><span>COM_CHOOSE</span></th>
					</tr>
					<xsl:for-each select="resptable/tabletdetail">
						<tr>
						    <xsl:variable name="Amount" select="Amount"/>
							<td class="td-head-color text-center">
								<div class="mobile-mode"><span>COM_NO</span></div>
								<div class="content-detail"><xsl:value-of select="no"/></div>
							</td>
							<td class="text-center">
								<div class="mobile-mode"><span>TAX_CHAPTER</span></div>
								<div class="content-detail" ><xsl:value-of select="Khoan"/></div>
							</td>
							<td class="text-center">
                                <div class="mobile-mode"><span>TAX_CONTENT</span></div>
                                <div class="content-detail" ><xsl:value-of select="TenTieuMuc"/></div>
                            </td>
							<td class="td-right">
                                <div class="mobile-mode"><span>COM_AMOUNT</span></div>
                                <div class="content-detail" ><xsl:value-of select="format-number(DuNo, '##,###,###,###,###,###,###,###.##')"/> VND</div>
                                <!--<div class="content-detail" ><xsl:value-of select="format-number($Amount, '##,###,###,###,###,###,###,###')"/> VND</div>-->
                            </td>
                            <td class="text-center">
                                <div class="mobile-mode"><span>COM_CHOOSE</span></div>
                                <div class="content-detail"><input type="checkbox" class="checkTransItem" name="userRefId"></input></div>
                            </td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>