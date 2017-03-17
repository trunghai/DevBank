<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<table width='98%' align='center' class='table-account'>
			<tr class="trow-title">
				<th><span>COM_NO</span></th>
				<th><span>COM_LIST_USER_APPROVE_TBL_NAME</span></th>
				<th><span>COM_LIST_USER_APPROVE_TBL_CODE</span></th>
				<th><span>COM_LIST_USER_APPROVE_TBL_POSITION</span></th>
				<th><span>COM_LIST_USER_APPROVE_TBL_PHONE</span></th>
				<th><span>COM_LIST_USER_APPROVE_TBL_EMAIL</span></th>
			</tr>
			<xsl:for-each select="resptable/tabletdetail">
				<tr>
					<td class="td-head-color">
						<div class="mobile-mode"><span>COM_NO</span></div>
						<div class="content-detail"><span><xsl:value-of select="stt" /></span></div>
					</td>
					<td>
						<div class="mobile-mode"><span>COM_LIST_USER_APPROVE_TBL_NAME</span></div>
						<div class="content-detail"><span><xsl:value-of select="name" /></span></div>
					</td>
					<td>
						<div class="mobile-mode"><span>COM_LIST_USER_APPROVE_TBL_CODE</span></div>
						<div class="content-detail"><span><xsl:value-of select="code" /></span></div>
					</td>
					<td>
						<div class="mobile-mode"><span>COM_LIST_USER_APPROVE_TBL_POSITION</span></div>
						<div class="content-detail"><span><xsl:value-of select="position" /></span></div>
					</td>
					<td>
						<div class="mobile-mode"><span>COM_LIST_USER_APPROVE_TBL_PHONE</span></div>
						<div class="content-detail"><span><xsl:value-of select="phone" /></span></div>
					</td>
					<td>
						<div class="mobile-mode"><span>COM_LIST_USER_APPROVE_TBL_EMAIL</span></div>
						<div class="content-detail"><span><xsl:value-of select="email" /></span></div>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
</xsl:stylesheet>
