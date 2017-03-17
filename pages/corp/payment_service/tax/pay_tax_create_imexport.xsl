<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
            <div class="panelContent">
                <div><h5 class="screen-title"><span>MENU_CHILD_PAY_TAX</span></h5></div>
                <div class="line-separate"/>
                <div id="seqFormLocal"></div>
                <h5 class="Header"><span style="white-space:pre-wrap">TAX_PAY_TAX_CUST_INFO</span></h5>
                <table width='100%' align='center' class='background-blacktrans'>
                    <tr >
                        <td >
                             <div><b><span>COM_TAX_NUMBER</span></b></div>
                        </td>
                        <td >
                            <div><span style="float: right" id="imEx.TaxNo"></span></div>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <div><b><span>TAX_CUST_PAY_TAX</span></b></div>
                        </td>
                        <td >
                            <div><span style="float: right" id="imEx.TaxName"></span></div>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <div><b><span>TAX_CUST_PAY_TAX_ADDRESS</span></b></div>
                        </td>
                        <td >
                            <div><span style="float: right;" id="imEx.TaxAddress" ></span></div>
                        </td>
                    </tr>
                </table>
                <br/>
                <h5 class="Header"><span style="white-space:pre-wrap">COM_DECLAR</span></h5>
                <br/>    
                <div id="tblContent" name="tblContent"></div>
                <br/>
                <div>
                    <input type="button" class="btnshadow btn-second" onclick="backToScreenDtl()" value="CM_BTN_GOBACK"/>
                </div>
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
