<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
    <body>
    <div id='mainViewContent' class='main-layout-subview'>
      <div>
        <div id='menuContent' class='panelContent'>
          <div class='div-btn-round-container' style='left:10px; position:absolute'>
            <div style='display:none' class='icon-arrowleft btnshadow btn-second btn-round-15' id='bankinfo.btn.back' onClick='goBack()'></div>
          </div>        
          <div class="mobilemode" id="dynamic-menu">
          </div> 
        </div>
      </div>
    </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
