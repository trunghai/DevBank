<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
  <xsl:for-each select="seqFrom">
    <xsl:choose>
		<xsl:when test="stepNo=301">
			<table width="357" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-301'>
				<tr>
					<td width="33%" class="selected"><span>SEQ_INPUT_TITLE</span></td>
					<td width="33%"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="33%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>    
		</xsl:when>
		<xsl:when test="stepNo=302">
			<table width="357" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-302'>            
				<tr>
					<td width="33%" ><span>SEQ_INPUT_TITLE</span></td>
					<td width="33%" class="selected"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="33%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>
		</xsl:when>
		<xsl:when test="stepNo=303">
			<table width="357" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-303'>            
				<tr>
					<td width="33%" ><span>SEQ_INPUT_TITLE</span></td>
					<td width="33%"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="33%" class="selected"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>
		</xsl:when>
		<xsl:when test="stepNo=311">
			<table width="357" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-301'>
				<tr>
					<td width="33%" class="selected"><span>SEQ_CONFIRM_TITLE</span></td>
					<td width="33%"><span>SEQ_AUTHORIZE_TITLE</span></td>
					<td width="33%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>    
		</xsl:when>
		<xsl:when test="stepNo=312">
			<table width="357" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-302'>
				<tr>
					<td width="33%"><span>SEQ_CONFIRM_TITLE</span></td>
					<td width="33%" class="selected"><span>SEQ_AUTHORIZE_TITLE</span></td>
					<td width="33%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>    
		</xsl:when>
		<xsl:when test="stepNo=313">
			<table width="357" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-303'>
				<tr>
					<td width="33%"><span>SEQ_CONFIRM_TITLE</span></td>
					<td width="33%"><span>SEQ_AUTHORIZE_TITLE</span></td>
					<td width="33%" class="selected"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>    
		</xsl:when>
		<xsl:when test="stepNo=401">
			<table width="463" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-401'>
				<tr>
					<td width="25%" class="selected"><span>SEQ_INPUT_TITLE</span></td>
					<td width="25%"><span>SEQ_REVIEW_TITLE</span></td>
					<td width="25%"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="25%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>    
		</xsl:when>
		<xsl:when test="stepNo=402">
			<table width="463" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-402'>            
				<tr>
					<td width="25%" ><span>SEQ_INPUT_TITLE</span></td>
					<td width="25%" class="selected"><span>SEQ_REVIEW_TITLE</span></td>
					<td width="25%"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="25%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>
		</xsl:when>
		<xsl:when test="stepNo=403">
			<table width="463" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-403'>            
				<tr>
					<td width="25%" ><span>SEQ_INPUT_TITLE</span></td>
					<td width="25%"><span>SEQ_REVIEW_TITLE</span></td>
					<td width="25%" class="selected"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="25%"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>
			</table>
		</xsl:when>
		<xsl:when test="stepNo=404">
			<table width="463" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto"  class='sequence-form-404'>
				<tr>
					<td width="25%" ><span>SEQ_INPUT_TITLE</span></td>
					<td width="25%"><span>SEQ_REVIEW_TITLE</span></td>
					<td width="25%"><span>SEQ_AUTHEN_TITLE</span></td>
					<td width="25%" class="selected"><span>SEQ_COMPLETE_TITLE</span></td>                    
				</tr>  
			</table>
		</xsl:when>
		<xsl:otherwise>
		</xsl:otherwise>
	</xsl:choose>
	</xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
