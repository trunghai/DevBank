<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/edit">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div class="">
            <div class="panelContent">
              <table width="100%" align="center">
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">TRANSFER_REMITTANCE_DETAIL</span></h5>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANSFER_REMITTANCE_NAMED</span>
                      <xsl:if test="not(tempName='')">
                        <span class="input-group-addon" style="white-space:pre-wrap;"><xsl:value-of select="tempName"/></span>
                      </xsl:if>
                      <xsl:if test="tempName=''">
                        <input id="id.value.tempName" type="text" class="form-control form-control-righttext" value="{tempName}" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="controlInputText(this,20,true)"/>
                      </xsl:if>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">COM_TXT_ACC_INFO_TITLE</span></h5>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onclick="showSourceAccount()">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_FPTS_ACC_TITLE</span>
                      <input id="id.value.srcAccount" type="button" class="form-control form-control-rightbutton" value="{srcAccount}" placeholder="COM_TXT_INPUT_PLACEHOLDER" />
                      <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <xsl:choose>
                          <xsl:when test="transType='identification'">
                            <span class="input-group-addon" style="white-space:pre-wrap; width:40%">IDENTIFICATION_BENE_NUMBER</span>
                          </xsl:when>
                           <xsl:when test="transType='card'">
                            <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_CARD_CARD_NUMBER</span>
                          </xsl:when>
                          <xsl:otherwise>                          
                          	<span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_FPTS_ACC_RECIEVE</span>
                          </xsl:otherwise>
                      </xsl:choose>    
                      <xsl:choose>
                          <xsl:when test="transType='card'">
                          	<input id="trans.destaccountnointer" type="tel" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="{descAccount}" class="form-control form-control-righttext-datepicker" onchange="{loadAccontInfo}" onkeyup="removeChar(event,this);"/>
                          </xsl:when>
                          <xsl:otherwise> 
                           	<input id="trans.destaccountnointer" type="text" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="{descAccount}" class="form-control form-control-righttext-datepicker" onchange="{loadAccontInfo}"/>    
                          </xsl:otherwise> 
                       </xsl:choose>    
                      <span onclick="showPayeePage();" id="span.trans.target" class="tooltip icon-book input-group-addon-datepicker input-group-symbol-datepicker" style="cursor:pointer;">
                        <span style="text-align:center; font-size:14px;">
                          <em id="ds_id"></em>
                          <br />
                          <em id="mau_id"></em>
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
                <xsl:if test="((transType!='account') and (transType!='card'))">
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <xsl:choose>
                          <xsl:when test="transType='identification'">
                            <span class="input-group-addon" style="white-space:pre-wrap; width:40%">IDENTIFICATION_RECEIVER_NAME</span>
                          </xsl:when>                          
                          <xsl:otherwise>
                          	<span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANSFER_REMITTANCE_NAME1</span>
                          </xsl:otherwise>
                      </xsl:choose>      
                       
                           <input id="id.value.beneName" type="text" class="form-control form-control-righttext" value="{beneName}" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="controlInputText(this, 70)">
                          <xsl:if test="disabled='disabled'">
                            <xsl:attribute name="disabled"><xsl:value-of select="disabled" /></xsl:attribute>
                          </xsl:if>
                          </input>
                       
                    
                    </div>
                  </td>
                </tr>
                </xsl:if>
                <xsl:if test="transType='identification'">
                	<tr>
                      <td colspan="2" align="center" valign="middle" class="td-text">
                        <div class="input-group">
                          <span class="input-group-addon" style="white-space:pre-wrap; width:40%">IDENTIFICATION_TIME</span>
                         <!-- <input id="id.value.issuedTime" type="text" class="form-control form-control-righttext" value="{issuedTime}" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="controlInputText(this, 70)">
                          </input>-->                          
                          <input id="id.value.issuedTime" type="tel" class="form-control form-control-righttext-datepicker" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE"   onclick="handleCalendarNav(this, event);" onkeydown="return handleCalendarNav(this, event);" onpaste="return false;" />
                        <span id="span.issuedate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker" ></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" align="center" valign="middle" class="td-text">
                        <div class="input-group">
                          <span class="input-group-addon" style="white-space:pre-wrap; width:40%">IDENTIFICATION_PLACE</span>
                          <input id="id.value.issuedPlace" type="text" class="form-control form-control-righttext" value="{issuedPlace}" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="controlInputText(this, 70)">                          
                          </input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" align="center" valign="middle" class="td-text">
                        <div class="input-group">
                          <span class="input-group-addon" style="white-space:pre-wrap; width:40%">IDENTIFICATION_PHONE_NUMBER</span>
                          <input id="id.value.phone" type="tel" class="form-control form-control-righttext" value="{phone}" placeholder="COM_TXT_INPUT_PLACEHOLDER" maxlength="15" onkeyup="removeChar(event,this);">
                          </input>
                        </div>
                      </td>
                    </tr>
                </xsl:if>
                <xsl:if test="transType='account'">
                    <tr>
                      <td colspan="2" align="center" valign="middle" class="td-text">
                        <div class="input-group" onClick="showBankSelection()">
                          <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_BANK_TITLE</span>
                          <input id="trans.branchName" type="button" class="form-control form-control-right2linetext" value="{branchName}"/>
                          <span class="icon-movenext input-group-addon input-group-symbol" style="margin-top:7px;"></span>
                        </div>
                      </td>
                    </tr>             
                </xsl:if>
                <xsl:if test="bank='domestic'">
                  <tr>
                    <td colspan="2" align="center" valign="middle" class="td-text">
                      <div class="input-group">
                        <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_BANK_TITLE</span>
                        <input id="id.value.branchName" type="button" class="form-control form-control-right2linetext" value="{branchName}" onclick="showListBankDomestic()" placeholder="COM_TXT_SELECTION_PLACEHOLDER" />
                        <span class="icon-movenext input-group-addon input-group-symbol" style="margin-top:7px;"></span>
                      </div>
                    </td>
                  </tr>
                </xsl:if>
                <tr>
                  <td colspan="2">
                    <h5 class="Header"><span style="white-space:pre-wrap">TRANS_FPTS_INFOR_TITLE</span></h5>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <span class="input-group-addon" style="white-space:pre-wrap; width:40%">TRANS_FPTS_AMOUNT</span>
                      <input id="id.value.numamount" type="tel" class="form-control form-control-rightbutton" value="{numamount}" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="handleInputAmount(event, this);" onchange="removeSpecialCharForNumber(this.value)" />
                    </div>
                  </td>
                </tr>
                <!--<tr>
                  <td colspan="2">
                    <div>
                      <div class="txtmoneystyle">
                        <span>TRANS_LOCAL_NUM_TO_WORD</span>
                        <span>: </span>
                        <span id="trans.amounttotext"></span>
                      </div>
                    </div>
                  </td>
                </tr>-->
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="form-textarea-title" style="padding-left:1.5%">
                      <span>TRANS_LOCAL_ACC_CONTENT</span>
                    </div>
                    <div class="input-group">
                      <textarea id="trans.content" class="form-control form-control-textarea" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="controlInputText(this, 160)">
                        <xsl:value-of select="beneContent" />
                      </textarea>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <table class="button-group button-group-3" style="margin-top: 15px">
                      <tr>
                        <xsl:for-each select="button">
                          <xsl:if test="type='save'">
                            <td>
                              <input type="button" class='btnshadow btn-primary' onclick='onAddClick()' value='{btnLabel}' />
                            </td>
                          </xsl:if>
                          <xsl:if test="type='reset'">
                            <td>
                              <input type="button" class='btnshadow btn-primary' onclick='onResetClick()' value='{btnLabel}' />
                            </td>
                          </xsl:if>
                          <xsl:if test="type='cancel'">
                            <td>
                              <input type="button" class='btnshadow btn-primary' onclick='onCancelClick()' value='{btnLabel}' />
                            </td>
                          </xsl:if>
                        </xsl:for-each>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
          <div id="divListGroup" class="list-group dialog-list"></div>
        </div>
        <!--ThuanTM -->
        <div id="selection-dialog-input" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" align="center" onClick="closeDialogInput(this)">
          </div>
          <div id="divListGroupInput" class="list-group dialog-list"> </div>
        </div>
      </body>

      </html>
    </xsl:template>
  </xsl:stylesheet>
