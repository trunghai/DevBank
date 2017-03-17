<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
            <div class="panelContent">
                <div><h5 class="screen-title"><span>SET_SYSTEM_TITLE</span></h5></div>
                
              <table width="90%">
                    <tr>
                        <td class="td-text">
                             <div class="input-group" onClick="setShowPopupChangeLang()">
	                             <span class="input-group-addon" style="white-space:pre-wrap;">SET_LANG_TITLE</span>
	                             <input id="id.lang" type="button" class="form-control form-control-rightbutton" value="COM_TXT_SELECTION_PLACEHOLDER" />
	                             <span class="icon-movenext input-group-addon input-group-symbol"></span>
	                         </div>
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
