<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
	          <div class="panelContentCorp">
	               <table width="100%" >
	                  <tr>
	                      <td>
	                          <h5 class="screen-title" ><span style="white-space:pre-wrap;">CRE_TITLE</span></h5>
	                          <div class="line-separate"/>
	                      </td>
	                  </tr>
	                  <tr>
	                      <td>
	                          <div class="tab" style="margin-top: 0px;">
	                              <div class="item selected">
	                                  <div class="left"></div>
	                                  <div class="text"><span>CRE_TAB_SEARCH_DEBT_TITLE</span></div>
	                                  <div class="right"></div>
	                              </div>
	                              <div class="item" onclick="showPageFindTrans()" style="display:none">
	                                  <div class="left"></div>
	                                  <div class="text"><span>CRE_TAB_CREATE_DEBT_TITLE</span></div>
	                                  <div class="right"></div>
	                              </div>
	                          </div>
	                      </td>
	                  </tr>
	               </table>
	              <br/>    
	              <table width='100%' align="center">
	                  <tr class="tr-two-col">
	                      <td class="td-two-col">
	                          <div class="div-two-col"><b><span>CRE_DEBT_DATE_FROM</span></b></div>
	                          <div class="div-two-col">
                                   <div class="input-group">
                                      <input id="trans.debtStartdate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                                      <span id="span.debtStartdate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                                   </div>
                              </div>
	                      </td>
	                      <td class="td-two-col">
                              <div class="div-two-col"><b><span>COM_TO</span></b></div>
                              <div class="div-two-col">
                                  <div class="input-group">
                                       <input id="trans.debtEnddate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;"/>
                                       <span id="span.debtEnddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                                  </div>
                              </div>
                          </td>
	                  </tr>
	                  <tr class="tr-two-col">
	                      <td class="td-two-col">
	                         <div class="div-two-col"><b><span>CRE_EXPIRE_DATE_FROM</span></b></div>
	                         <div class="div-two-col">
                                   <div class="input-group">
                                      <input id="trans.expireStartdate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />             
                                      <span id="span.expireStartdate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                                   </div>
                             </div>
	                      </td>
	                      <td class="td-two-col">
                              <div class="div-two-col"><b><span>COM_TO</span></b></div>
                              <div class="div-two-col">
                                  <div class="input-group">
                                      <input id="trans.expireEnddate" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;"/>
                                      <span id="span.expireEnddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                                  </div>
                              </div>
                          </td>
	                  </tr>
	                  <tr class="tr-two-col">
	                      <td class="td-two-col">
	                          <div class="div-two-col"><b><span>COM_TYPE_MONEY</span></b></div>
	                          <div class="div-two-col">
	                               <div class="input-group">
		                               <input style="white-space:pre-wrap" onclick="showTypeMoney()" id="cre_type_money" type="button" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="COM_ALL" />
		                               <span class="icon-movenext input-group-addon input-group-symbol"></span>
	                                   <input type="hidden" id="cre_type_money_value" value = '0'/>
                                   </div>
	                          </div>
	                      </td>
	                      <td class="td-two-col">
                              <div class="div-two-col"><b><span>CRE_ITEM_DEADLINE</span></b></div>
                              <div class="div-two-col">
                                   <div class="input-group">
                                       <input style="white-space:pre-wrap" onclick="showTypeDeadline()" id="cre_type_deadline" type="button" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="COM_ALL" />
                                       <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                       <input type="hidden" id="cre_type_deadline_value" value = '0'/>
                                   </div>
                              </div>
                          </td>
	                      
	                  </tr>
	                  <tr class="tr-two-col">
	                      <td class="td-two-col">
                               <div class="div-two-col"><b><span>CRE_ITEM_TYPE_DEBT</span></b></div>
                               <div class="div-two-col">
                                   <div class="input-group">
                                       <input style="white-space:pre-wrap;" onclick="showTypeDebt()" id="cre_debt_type" type="button" class="form-control form-control-righttext" placeholder="BENEFIC_LIST_NORMAL" value="CRE_ITEM_DEBT_DEFAULT" />
                                       <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                       <input type="hidden" id="cre_debt_type_value"/>
                                   </div>
                               </div>
                          </td>
	                      <td></td>
	                  </tr>
	                  <tr class="tr-two-col">
	                       <td class="td-two-col"></td>
	                       <td class="td-two-col">
	                           <div class="div-two-col"></div>
	                           <div class="div-two-col">
	                               <div class="input-group">
	                               <input type="button" class="btnshadow btn-second" onclick="creDebtSearchInfo()" value="COM_BNTN_SEARCH"/>
	                               </div>
	                           </div>
	                       </td>
	                  </tr>
	              </table>
	              <br/>
	              <div id="tblContent" name="tblContent" style="overflow:auto"></div>
	              <br/>
	              <div id="pageIndicatorNums" style="text-align: right" />
	          </div>
	      </div>
	      <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
	          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"> </div>
	          <div id="divListGroup" class="list-group dialog-list"> </div>
	      </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
