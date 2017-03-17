<?xml version="1.0" encoding="UTF-8"?>
   <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:template match="/">
         <html>

         <body>
            <div id='mainViewContent' class='main-layout-subview'>
               <div>
                  <div class='panelContent'>
                     <div style='margin-top:0px; color:#333;'>
                        <h5 class='screen-title'><span>MENU_UTILITIES_PERSONAL_INFO_VIEW</span></h5>
                     </div>
                     <div style="width:100%">
                        <table width="100%" class="table-account">
                           <tr class="nohover">
                              <td class="td-prop-info" style="border:none; width:30%;">
                                 <div id="cus-profile-img-avatar" align="center" onclick="rotateImageIntroCus(90);">
                                 </div>
                                 <div align="center" style="display:inline; position:absolute; top:0px;">
                                    <input type="file" onchange="fnChange(this)" class="form-control form-control-rightbutton input-file" value="COM_TXT_INPUT_PLACEHOLDER" id="id.fileUpload01" accept="image/png;image/jpg" style="width:320px; height:330px; display:none" />
                                    <input id="btnFile" type="button" class="form-control form-control-rightbutton" style="width:320px; height:330px; border: none;" onclick="" />
                                    <span id="take-picture-icon" class="input-group-addon input-group-symbol btn-take-picture mobilemode" style="margin-top: -50px; margin-right: 0px; background-color:transparent;" onclick="document.getElementById('id.fileUpload01').click()"></span>
                                 </div>
                                 <div>
                                    <input id="avatar-btn-upload" type="button" class="btnshadow btn-second" style="margin-top: 15px;" onclick="requestChangeAvatar();" value="CUS_PROFILE_UPLOAD_AVATAR" />
                                 </div>
                              </td>
                              <td class="td-prop-info" style="border:none;">
                                 <table width='100%' style="text-align:left;">
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_FULLNAME</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-fullname"></span>
                                       </td>
                                    </tr>
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_BIRTHDAY</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-birthday" style="white-space:pre-wrap;"></span>
                                       </td>
                                    </tr>
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_USERID</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-userid" style="white-space:pre-wrap;"></span>
                                       </td>
                                    </tr>
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_ADDRESS</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-address" style="white-space:pre-wrap;"></span>
                                       </td>
                                    </tr>
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_MOBILE</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-mobile"></span>
                                       </td>
                                    </tr>
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_EMAIL</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-email" style="white-space:pre-wrap;"></span>
                                       </td>
                                    </tr>
                                    <tr class="nohover">
                                       <td style="border:none; width:150px; display:table-cell; font-weight:bold;">
                                          <span>CUS_PROFILE_CIF</span>
                                       </td>
                                       <td style="border:none; width:60%; display:table-cell;">
                                          <span id="cus-profile-cif"></span>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                           <tr class="nohover" style="background-color:transparent">
                              <td colspan="2" style="border:none;">
                                 <input type="button" class="btnshadow btn-second" onclick="gotoSetUserInfo()" value="CUS_PROFILE_EDIT_BTN" />
                              </td>
                           </tr>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </body>

         </html>
      </xsl:template>
   </xsl:stylesheet>
