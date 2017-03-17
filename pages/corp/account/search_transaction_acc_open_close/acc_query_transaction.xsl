<?xml version="1.0" encoding="UTF-8"?>
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:template match="/">
            <html>

            <body>
                <div id="mainViewContent" class="main-layout-subview">
                    <div class="panelContentCorp">
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
                                            <div class="text"><span>ACCOUNT_PERIOD_INFO</span></div>
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
                        <table width="100%" align="center">
                            <tr>
                                <td colspan="2">
                                    <h5 class="Header" style="white-space:pre-wrap"><span>TRANS_PERIODIC_TITLE_SRCH</span></h5>
                                </td>
                            </tr>
                            <!-- Loại giao dịch -->
                            <tr>
                                <td colspan="2" align="center" valign="middle" class="td-text">
                                    <div class="input-group" onclick="showTypeTransaction()">
                                        <span class="input-group-addon" style="width:40%;white-space:pre-wrap">TOPUP_TRANS_TYPE_TITLE</span>
                                        <input style="white-space:pre-wrap" id="idTypeTransaction" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                                        <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                    </div>
                                </td>
                            </tr>
                            <!-- Người lập giao dcih-->
                            <tr>
                                <td colspan="2" align="center" valign="middle" class="td-text">
                                    <div class="input-group" onclick="getUserWhoCreatedTransaction()">
                                        <span class="input-group-addon" style="width:40%; white-space:pre-wrap">COM_MAKER</span>
                                        <input id="id.accountno" type="button" class="form-control form-control-righttext" value="COM_ALL" />
                                        <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                    </div>
                                </td>
                            </tr>
                            <!-- Trạng trhái  -->
                            <tr>
                                <td colspan="2" align="center" valign="middle" class="td-text">
                                    <div class="input-group" onclick="showStatus()">
                                        <span class="input-group-addon" style="width:40%">TRANS_PERIODIC_MNG_STT</span>
                                        <input id="idStatus" type="button" onclick="" class="form-control form-control-righttext" value="COM_ALL" />
                                        <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                    </div>
                                </td>
                            </tr>
                            <!-- Ngày bắt đầu -->
                            <tr>
                                <td colspan="2" align="right" valign="middle" class="td-text">
                                    <div class="input-group">
                                        <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_MNG_FIND_SDATE</span>
                                        <input id="id.begindate" type="tel" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                                        <span id="span.begindate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"> </span>
                                    </div>
                                </td>
                            </tr>
                            <!-- Ngày kết thúc -->
                            <tr>
                                <td colspan="2" align="right" valign="middle" class="td-text">
                                    <div class="input-group">
                                        <span class="input-group-addon" style="width:40%; white-space:pre-wrap">TRANS_PERIODIC_MNG_FIND_EDATE</span>
                                        <input id="id.enddate" type="tel" class="form-control form-control-righttext-datepicker" onkeydown="return handleCalendarNav(this, event);" placeholder="COM_TXT_SELECTION_PLACEHOLDER_DATE" value="" onclick="handleCalendarNav(this, event);" onpaste="return false;" />
                                        <span id="span.enddate" class="icon-calendar input-group-addon-datepicker input-group-symbol-datepicker"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr class="trow-space" />
                            <tr>
                                <td width="50%">
                                    <input type="button" id="id.button.reset" onclick="resetView()" class="btnshadow btn-second" value="COM_REINPUT" style="margin: 0px; padding: 0px; float: left;"/>
                                </td>
                                <td width="50%">
                                    <input type="button" onclick="sendJSONRequest()" class="btnshadow btn-second" value="TRANS_PERIODIC_BTN_SRCH" style="margin: 0px; padding: 0px; float: right;"/>
                                </td>
                            </tr>
                        </table>
                        <br />
                        <div id="tblContent" name="tblContent" style="overflow:auto"></div>
                        <div id="id.search" style="text-align: right;">
                        </div>
                    <!--     <div id="pageIndicatorNums" /> -->
                        <table id="tblButton" width="100%" style="display:none;">
                            <tr class="trow-space" />
                            <tr>
                                <td>
                                    <input type="button" id="id.button.cancel" onclick="sendRequestCancel()" class="btnshadow btn-second" value="BTN_CANCEL_TRANSACTION" />
                                </td>
                            </tr>
                        </table>
                        <br/>
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
