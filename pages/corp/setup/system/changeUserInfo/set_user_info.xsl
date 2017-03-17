<?xml version="1.0" encoding="UTF-8"?>
   <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:template match="/">
         <html>

         <body>
            <div id="mainViewContent" class="main-layout-subview">
               <div class="panelContent">
                  <div>
                     <h5 class="screen-title"><span>COM_IDTXN_S11</span></h5></div>
                  <div class="line-separate" />
                  <div id="seqFormLocal"></div>
                  <h5 class="Header"><span style="white-space:pre-wrap">SET_USER_ITLE_GET_USER_INFO</span></h5>
                  <table width='100%'>
                     <!-- id dang nhap-->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_ID_LOGIN</span>
                              <span id="idUserLogin" class="input-group-addon" style="white-space; width:60%; white-space: pre-wrap;"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- ho va ten-->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_FULL_NAME</span>
                              <span id="idFullName" class="input-group-addon" style="white-space; width:60%; white-space: pre-wrap;"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- ten ngan -->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">COM_SHORT_NAME</span>
                              <span id="idShortName" class="input-group-addon" style="white-space; width:60%; white-space: pre-wrap;"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- so cmt-->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_NUMBER_CMT</span>
                              <span id="idNumberCMT" class="input-group-addon" style="white-space; width:60%; white-space: pre-wrap;"></span>
                           </div>
                        </td>
                     </tr>
                     <!-- ngay  cap -->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_DATE_RANGE</span>
                              <span id="idDateRange" class="input-group-addon" style="white-space; width:60%; white-space: pre-wrap;"></span>
                           </div>
                        </td>
                     </tr>
                  </table>
                  <table width="100%">           
                     <!-- chuc vu -->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_POSITION</span>
                              <input id="idPosition" type="text" class="form-control form-control-righttext" value="" onkeyup="controlInputText(this, 60, true)" style="white-space: pre-wrap;"/>
                           </div>
                        </td>
                     </tr>
                     <!-- email lien he -->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_EMAIL</span>
                              <input id="idEmail" type="text" class="form-control form-control-righttext" value="" onkeyup="controlInputText(this, 60, true)" style="white-space: pre-wrap;"/>
                           </div>
                        </td>
                     </tr>
                     <!-- dien thoai lien he -->
                     <tr style="height: 30px;">
                        <td colspan="2" align="center" valign="middle" class="td-text">
                           <div class="input-group">
                              <span class="input-group-addon" style="white-space; width:40%">SET_USER_PHONE_NUMBER</span>
                              <input id="idPhoneNumber" type="text" class="form-control form-control-righttext" value="" onkeypress="return handleInputPhoneNumber(event)" onkeyup="controlInputText(this, 11)" style="white-space: pre-wrap;"/>
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <input style="margin-top: 15px;margin-left:0;float:left;" onClick="goBack()" type="button" class="btnshadow btn-second" value="ACC_HIS_LIST_BACK_ACC" />
                        </td>
                        <td>
                           <input style="margin-top: 15px;" type="button" class="btnshadow btn-second" value="SET_USER_INFO_REALIZE" onClick="sendRequestUpdate()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
            <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
               <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
               <div id="divListGroup" class="list-group dialog-list"></div>
            </div>
         </body>

         </html>
      </xsl:template>
   </xsl:stylesheet>
