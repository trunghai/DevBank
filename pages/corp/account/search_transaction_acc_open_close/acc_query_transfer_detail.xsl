<?xml version="1.0" encoding="UTF-8"?>
   <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:template match="/review">
         <html>

         <body>
            <div id="mainViewContent" class="main-layout-subview">
               <div>
                  <div class="panelContent">
                     <table width="100%">
                        <tr>
                           <td>
                              <h5 class="screen-title"><span style="white-space:pre-wrap;">ACCOUNT_PERIOD_TITLE</span></h5>
                              <div class="line-separate" />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <div class="tab" style="margin-top: 0px;">
                                 <div class="item" onClick="onClickPageAccClose()">
                                    <div class="left"></div>
                                    <div class="text"><span>ACCOUNT_PERIOD_TAB_INFO</span></div>
                                    <div class="right"></div>
                                 </div>
                                 <div class="item selected">
                                    <div class="left"></div>
                                    <div class="text"><span>ACCOUNT_PERIOD_TAB_SEARCH</span></div>
                                    <div class="right"></div>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     </table>
                     <table width='100%' align='center'>
                        <tr>
                           <td colspan="2">
                              <div id="step-sequence"></div>
                           </td>
                        </tr>
                        <xsl:for-each select="section">
                           <tr>
                              <td colspan="2">
                                 <xsl:if test="title!=''">
                                    <h5 class="Header"><xsl:value-of select="title"/></h5>
                                 </xsl:if>
                              </td>
                           </tr>
                           <tr>
                              <td colspan="2">
                                 <xsl:if test="row">
                                    <table width='100%' align='center' class='background-blacktrans'>
                                       <xsl:for-each select="row">
                                          <tr class='trow-default'>
                                             <td class='td-left'>
                                                <xsl:value-of select="label" />
                                             </td>
                                             <td class='td-right'>
                                                <xsl:value-of select="value" />
                                             </td>
                                          </tr>
                                       </xsl:for-each>
                                    </table>
                                 </xsl:if>
                                 <xsl:if test="table">
                                    <table width='100%' align='center' class='table-account'>
                                       <xsl:for-each select="table">
                                          <xsl:if test="thead">
                                             <tr class="trow-title">
                                                <xsl:for-each select="thead/th">
                                                   <th>
                                                      <xsl:value-of select="." />
                                                   </th>
                                                </xsl:for-each>
                                             </tr>
                                          </xsl:if>
                                          <tbody>
                                             <xsl:for-each select="tbody/tr">
                                                <tr>
                                                   <xsl:for-each select="td">
                                                      <td>
                                                         <xsl:if test="onclick">
                                                            <a onclick="{onclick}">
                                                               <xsl:value-of select="value" />
                                                            </a>
                                                         </xsl:if>
                                                         <xsl:if test="not(onclick)">
                                                            <xsl:value-of select="." />
                                                         </xsl:if>
                                                      </td>
                                                   </xsl:for-each>
                                                </tr>
                                             </xsl:for-each>
                                          </tbody>
                                       </xsl:for-each>
                                    </table>
                                 </xsl:if>
                              </td>
                           </tr>
                        </xsl:for-each>
                        <xsl:if test="input">
                           <tr>
                              <td colspan="2">
                                 <div class="input-group" style="margin-top: 15px">
                                    <input id="reject-reason" type="text" class="form-control" placeholder="{input}" />
                                 </div>
                              </td>
                           </tr>
                        </xsl:if>
                        <tr>
                           <td colspan="2">
                              <table class="button-group button-group-2">
                                 <tr>
                                    <xsl:for-each select="button">
                                       <td>
                                          <xsl:if test="type='cancel'">
                                             <input type="button" class='btnshadow btn-primary' onclick='onCancelClick()' value='{label}' />
                                          </xsl:if>
                                          <xsl:if test="type='back'">
                                             <input type="button" style="float:left;margin:0px;" class='btnshadow btn-primary' onclick='goBack()' value='{label}' />
                                          </xsl:if>
                                          <xsl:if test="type='authorize'">
                                             <input type="button" class='btnshadow btn-primary' onclick='onAuthorizeClick()' value='{label}'>
                                             <xsl:if test="disabled">
                                                <xsl:attribute name="disabled">true</xsl:attribute>
                                             </xsl:if>
                                             </input>
                                          </xsl:if>
                                          <xsl:if test="type='reject'">
                                             <input type="button" style="float:right;margin:0px;" class='btnshadow btn-primary' onclick='cancelTransaction()' value='{label}'>
                                             <xsl:if test="disabled">
                                                <xsl:attribute name="disabled">true</xsl:attribute>
                                             </xsl:if>
                                             </input>
                                          </xsl:if>
                                       </td>
                                    </xsl:for-each>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                     </table>
                  </div>
               </div>
            </div>
         </body>

         </html>
      </xsl:template>
   </xsl:stylesheet>
