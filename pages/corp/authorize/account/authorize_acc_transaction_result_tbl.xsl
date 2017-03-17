<?xml version="1.0" encoding="UTF-8"?>
   <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:template match="/">
         <table width='98%' align='center' class='table-account table-checkbox'>
            <tr class="trow-title" onClick="selectRow(event, this, true);">
               <th><span>COM_NO</span></th>
               <th><span>COM_MAKER</span></th>
               <th><span>COM_CREATED_DATE</span></th>
               <th><span>COM_AMOUNT</span></th>
               <th><span>COM_CHEKER</span></th>
               <th><span>COM_TRANS_CODE</span></th>
               <th><input type="checkbox" value="true"/></th>
            </tr>
            <xsl:for-each select="transTable/rows">
               <xsl:variable name="idx" select="idx"/>
               <tr onClick="selectRow(event, this, false);">
                  <td class="tdselct td-head-color">
                     <div class="mobile-mode"><span>COM_NO</span></div>
                     <div class="content-detail"><span><xsl:value-of select="stt" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_MAKER</span></div>
                     <div class="content-detail"><span><xsl:value-of select="establishment" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
                     <div class="content-detail"><span><xsl:value-of select="dateMake" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_AMOUNT</span></div>
                     <div class="content-detail"><span><xsl:value-of select="amount" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_CHEKER</span></div>
                     <div class="content-detail"><span><xsl:value-of select="approveBy" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_TRANS_CODE</span></div>
                   <div class="content-detail">
                        <!--  <xsl:variable name="transId" select="transId" /></span> -->
                        <a onclick="showQueryTransactionHistory('{transId}')" style="cursor: pointer; white-space: pre-wrap;">
                           <span class="no-check"><xsl:value-of select="transId" /></span>
                        </a>
                     </div>
                  </td>
                  <td style="word-wrap:break-word" align="center">
                     <div class="mobile-mode" style="text-align: left;"><span>COM_CHOOSE</span></div>
                     <div class="content-detail-checkbox">
                        <input class="trans.checkbox" type="checkbox" value="{$idx}"/>
                     </div>
                  </td>
               </tr>
            </xsl:for-each>
         </table>
         <div align="right" style="margin: 5px;" class="export-print">
           <a href="javascript:void(0)" id="acchis.exportfile" onclick="sendRequestExportExcel()">
             <img style="margin-right:5px;" src="css/img/exportfile.png" />
           </a>
         </div>
       
      </xsl:template>
   </xsl:stylesheet>
