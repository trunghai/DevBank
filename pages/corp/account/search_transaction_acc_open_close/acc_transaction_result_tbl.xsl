<?xml version="1.0" encoding="UTF-8"?>
   <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:template match="/">
         <xsl:variable name="flag" select="flag" />
         <table width='100%' align='center' class='table-account'>
            <tr class="trow-title">
               <th width="5%"><span>COM_NO</span></th>
               <xsl:if test="transTable/rows/maker">
                  <th width="10%"><span>COM_MAKER</span></th>
               </xsl:if>
               <th width="10%"><span>COM_CREATED_DATE</span></th>
               <th width="10%"><span>COM_TYPE_TRANSACTION</span></th>
               <th width="15%"><span>COM_STATUS</span></th>
               <th width="15%"><span>COM_AMOUNT</span></th>
               <th width="10%"><span>COM_CHEKER</span></th>
               <th width="15%"><span>COM_TRANS_CODE</span></th>
            </tr>
            <xsl:for-each select="transTable/rows">
               <tr>
                  <td class="tdselct td-head-color">
                     <div class="mobile-mode"><span>COM_NO</span></div>
                     <div class="content-detail"><span><xsl:value-of select="stt" /></span></div>
                  </td>
                  <xsl:if test="maker">
                     <td>
                        <div class="mobile-mode"><span>COM_MAKER</span></div>
                        <div class="content-detail"><span><xsl:value-of select="maker" /></span></div>
                     </td>
                  </xsl:if>
                  <td>
                     <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
                     <div class="content-detail"><span><xsl:value-of select="dateMaker" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_TYPE_TRANSACTION</span></div>
                     <div class="content-detail"><span><xsl:value-of select="typeTransaction" /></span></div>
                  </td>
                  <td>
                     <div class="mobile-mode"><span>COM_STATUS</span></div>
                     <div class="content-detail"><span><xsl:value-of select="status" /></span></div>
                  </td>
                  <td class="td-right">
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
                        <a onclick="showQueryTransactionHistory('{transId}')" style="cursor: pointer;">
                           <span><xsl:value-of select="transId" /></span>
                        </a>
                     </div>
                  </td>
               </tr>
            </xsl:for-each>
         </table>
         <table width="100%">
           <tr>
             <td>
               <div style="margin: 5px; text-align: right" class="export-print">
                 <a href="javascript:void(0)" id="export-excel" onclick="sendRequestExportExcel()">
                   <img style="margin-right:5px;" src="css/img/exportfile.png" />
                 </a>
               </div>
             </td>
           </tr>
         </table>
      </xsl:template>
   </xsl:stylesheet>
