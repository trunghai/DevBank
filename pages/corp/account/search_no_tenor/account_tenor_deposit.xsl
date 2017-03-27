<?xml version="1.0" encoding="UTF-8"?>
   <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:template match="/">
         <html>
         <body>
            <div id='mainViewContent' class='main-layout-subview'>
               <div class="panelContent">
               <div><h5 align="left" class="screen-title" ><span>ACC_SEND_MONEY_KKH</span></h5></div>
               <div id='accInfoContent' class='panelContent'>
                  <div>
                     <h5 align="left" class="screen-title"><span>ACC_SEND_MONEY_KKH</span></h5></div>
                  <div class="line-separate" style="margin-top: 2px; display: block; display:none;"></div>
                  <div id="accinfo-table">
                     <table width="98%" align="center" class="table-account table-account-tenor" style="border-collapse:collapse;font-size:12px;">
                        <xsl:for-each select="account/acctitle">
                           <tr class="trow-title">
                              <th width="20%">
                                 <xsl:value-of select="accnotitle" />
                              </th>
                              <th width="30%">
                                 <xsl:value-of select="accnametitle" />
                              </th>
                              <th width="10%">
                                 <xsl:value-of select="acccurrencytitle" />
                              </th>
                              <th width="20%">
                                 <xsl:value-of select="accbaltitle" />
                              </th>
                              <th width="20%">
                                 <xsl:value-of select="accavbaltitle" />
                              </th>
                           </tr>
                        </xsl:for-each>
                        <xsl:for-each select="account/accinfo">
                           <xsl:variable name="accnumber" select="acconclick" />
                           <tr onclick="this.className='active';">
                              <td onclick="viewAccDetail('{$accnumber}');" class="td-head-color">
                                 <div class="mobile-mode">
                                    <xsl:value-of select="accnotitle" />
                                 </div>
                                 <div class="content-detail">
                                    <a href="javascript:void(0);" style="text-decoration:underline">
                                       <xsl:value-of select="accnocontent" /> </a>
                                 </div>
                              </td>
                              <td style="word-break: break-all;" class="td-content">
                                 <div class="mobile-mode">
                                    <xsl:value-of select="accnametitle" />
                                 </div>
                                 
                                 <div class="content-detail">
                                    <a href="javascript:void(0);" onclick="viewAccDetail('{$accnumber}');" class="ref-link-rename">
                                       <span id="displayAccName{$accnumber}"><xsl:value-of select="accnamecontent"/></span>
                                    </a>
                                    <div class="account-rename" id="divEdit{$accnumber}">
                                       <a class="link-rename" onclick="showEditPanel('{$accnumber}')" href="javascript:void(0)"><span>ACCOUNT_RENAME_DESCRIPTION</span></a>
                                    </div>
                                    <div style="display:none;margin-top: 15px;" id="divEditSave{$accnumber}">
                                       <input id="txtNewDes{$accnumber}" class="input-save" maxlength="500" type="text" placeholder="ACCOUNT_RENAME_DESCRIPTION" />
                                       <a class="link-save" onclick="saveContent('{$accnumber}')" href="javascript:void(0)"><span>ACCOUNT_RENAME_SAVE_TITLE</span></a>
                                    </div>
                                 </div>
                              </td>
                              <td onclick="viewAccDetail('{$accnumber}');">
                                 <div class="mobile-mode">
                                    <xsl:value-of select="acccurrencytitle" />
                                 </div>
                                 <div class="td-date">
                                    <xsl:value-of select="acccurrencycontent" />
                                 </div>
                              </td>
                              <td onclick="viewAccDetail('{$accnumber}');">
                                 <div class="mobile-mode">
                                    <xsl:value-of select="accbaltitle" />
                                 </div>
                                 <div class="td-vnd">
                                    <xsl:value-of select="accbalcontent" />
                                 </div>
                              </td>
                              <td onclick="viewAccDetail('{$accnumber}');">
                                 <div class="mobile-mode">
                                    <xsl:value-of select="accavbaltitle" />
                                 </div>
                                 <div class="td-vnd">
                                    <xsl:value-of select="accavbalcontent" />
                                 </div>
                              </td>
                           </tr>
                        </xsl:for-each>
                     </table>
                  </div>
                  <div align="right" id="accdetail-pagination"></div>
               </div>
            </div>
            </div>
         </body>

         </html>
      </xsl:template>
   </xsl:stylesheet>
