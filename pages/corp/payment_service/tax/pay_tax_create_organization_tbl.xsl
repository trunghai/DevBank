<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<xsl:for-each select="review/transtables/table">
			<xsl:if test="transtitle != ''">
				<table width='100%' align='center'>
					<tr>
						<td><h5 class="Header"><xsl:value-of select="transtitle" /></h5></td>
					</tr>
				</table>
			</xsl:if>
			<table width='100%' align='center' class='table-account'
				style=" table-layout: fixed;">
				<tr class="trow-title">
					<xsl:for-each select="titles/table-title">
						<th><xsl:value-of select="." /></th>
					</xsl:for-each>
					<!--<th><span>COM_CHOOSE</span></th>-->
				</tr>
				<xsl:for-each select="rows/row">
					<tr>
						<xsl:for-each select="cotent">
							<td style="word-wrap:break-word">
								<xsl:if test="class">
									<xsl:attribute name="class">
										<xsl:value-of select="class" />
									</xsl:attribute>
								</xsl:if>
							    <div class="mobile-mode"><span><xsl:value-of select="table-content-title" /></span></div>
								<div class="content-detail"><xsl:value-of select="table-content" /></div>
							</td>
						</xsl:for-each>
						<!--<td style="word-wrap:break-word">
							<div class="mobile-mode"><span>COM_CHOOSE</span></div>
							<div class="content-detail"><span><input type="checkbox" name="userRefId" value="{idx}" /></span></div>
						</td>-->
					</tr>
				</xsl:for-each>
			</table>
			<br />
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
