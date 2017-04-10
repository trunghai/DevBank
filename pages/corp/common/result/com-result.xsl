<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Main Template -->
    <xsl:template match="/result">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width='100%' align='center'>
                <tr>
                  <td style="display: none">
                    <div id="step-sequence"></div>
                  </td>
                </tr>
                <xsl:apply-templates select="status" />
                <xsl:apply-templates select="section" />
                <tr>
                  <td>
                    <div class="export-print" id="acchis-exportFunc" align="right" style="padding-right: 5px; margin-top: 10px; float:right;">
                      <a href="javascript:void(0)" onclick="printComHistory();"><img style="margin-right:5px;" src="css/img/print.png" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" class="btnshadow btn-primary" style="float:right; margin-top: 10px" onclick="goToOtherTrans()" value="{buttonLabel}" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </body>

      </html>
    </xsl:template>

    <!-- status -->
    <xsl:template match="status">
      <tr>
        <td style="text-align: center">
          <xsl:if test="respCode = '0'">
            <div class="icon-correct" style="display: inline; color: #FAA60D; font-size: 24px; vertical-align: middle; padding: 5px 0px 5px 0px;"></div>
          </xsl:if>
          <xsl:if test="respCode != '0'">
            <div class="icon-cross" style="display: inline; color: #FAA60D; font-size: 24px; vertical-align: middle; padding: 5px 0px 5px 0px;"></div>
          </xsl:if>
          <span style="font-size:16px; vertical-align:middle"><xsl:value-of select="message"/></span>
        </td>
      </tr>
    </xsl:template>

    <!-- section -->
    <xsl:template match="section">
      <tr>
        <td>
          <xsl:if test="title != ''">
            <h5 class="Header"><xsl:value-of select="title"/></h5>
          </xsl:if>
        </td>
      </tr>
      <tr>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <td>
          <xsl:if test="row or row-one-col">
            <table width='100%' align='center' class='background-blacktrans'>
              <xsl:apply-templates select="row" />
              <xsl:apply-templates select="row-one-col" />
            </table>
          </xsl:if>
          <xsl:apply-templates select="table" />
          <xsl:apply-templates select="authorize-table" />
        </td>
      </tr>
    </xsl:template>

    <!-- section/row -->
    <xsl:template match="row">
      <tr class='trow-default'>
        <td class='td-left'>
          <xsl:value-of select="label" />
        </td>
        <td class='td-right'>
          <xsl:value-of select="value" />
        </td>
      </tr>
    </xsl:template>

    <!-- section/row-one-col -->
    <xsl:template match="row-one-col">
      <tr class='trow-default'>
        <td style="font-weight: normal; word-break: break-all;">
          <xsl:value-of select="text()" />
        </td>
      </tr>
    </xsl:template>

    <!-- section/table -->
    <xsl:template match="table">
      <table width='100%' align='center' class='table-account'>
        <xsl:apply-templates select="thead" />
        <tbody>
          <xsl:apply-templates select="tbody/tr" />
        </tbody>
      </table>
    </xsl:template>

    <!-- section/table/thead -->
    <xsl:template match="thead">
      <thead>
        <xsl:if test="not(tr)">
          <tr class="trow-title">
            <xsl:apply-templates select="th" />
          </tr>
        </xsl:if>
        <xsl:if test="tr">
          <xsl:apply-templates select="tr" />
        </xsl:if>
      </thead>
    </xsl:template>

    <!-- section/table/tbody/tr -->
    <xsl:template match="tr">
      <tr>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="td" />
        <xsl:apply-templates select="th" />
      </tr>
    </xsl:template>

    <!-- section/table/thead/(tr)?/th -->
    <xsl:template match="th">
      <th>
        <xsl:if test="colspan">
          <xsl:attribute name="colspan">
            <xsl:value-of select="colspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="rowspan">
          <xsl:attribute name="rowspan">
            <xsl:value-of select="rowspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="text()" />
      </th>
    </xsl:template>

    <!-- section/table/tbody/tr/td -->
    <xsl:template match="td">
      <td>
        <xsl:if test="colspan">
          <xsl:attribute name="colspan">
            <xsl:value-of select="colspan" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="class">
          <xsl:attribute name="class">
            <xsl:value-of select="class" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="rowspan">
          <xsl:attribute name="rowspan">
            <xsl:value-of select="rowspan" />
          </xsl:attribute>
        </xsl:if>
        <div class="mobile-mode">
          <xsl:value-of select="title" />
        </div>
        <div class="content-detail">
          <xsl:value-of select="text()" />
          <xsl:if test="onclick">
            <xsl:value-of select="value" />
          </xsl:if>
        </div>
      </td>
    </xsl:template>

    <!-- table trong man hinh duyet -->
    <xsl:template match="authorize-table">
      <table width='100%' align="center" class="table-account com-result">
        <thead>
          <tr class="trow-title">
            <xsl:if test="tr/maker">
              <th><span>COM_MAKER</span></th>
            </xsl:if>
            <xsl:if test="tr/dateMake">
              <th><span>COM_CREATED_DATE</span></th>
            </xsl:if>
            <xsl:if test="tr/transType">
              <th><span>COM_TYPE_TRANSACTION</span></th>
            </xsl:if>
            <xsl:if test="tr/status">
              <th><span>COM_STATUS</span></th>
            </xsl:if>
            <xsl:if test="tr/amount">
              <th><span>COM_AMOUNT</span></th>
            </xsl:if>
            <xsl:if test="tr/checker">
              <th><span>COM_CHEKER</span></th>
            </xsl:if>
            <xsl:if test="tr/transId">
              <th><span>COM_TRANS_CODE</span></th>
            </xsl:if>
            <xsl:if test="tr/dateCheck">
              <th class="second-row"><span>COM_CHECK_DATE</span></th>
            </xsl:if>
            <xsl:if test="tr/errorCode">
              <th class="second-row"><span>COM_ERROR_CODE</span></th>
            </xsl:if>
            <xsl:if test="tr/errorDesc">
              <th class="second-row"><span>COM_ERROR_DESC</span></th>
            </xsl:if>
          </tr>
        </thead>
        <xsl:for-each select="tr">
          <tr>
            <xsl:if test="maker">
              <td>
                <div class="mobile-mode"><span>COM_MAKER</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="maker"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="dateMake">
              <td>
                <div class="mobile-mode"><span>COM_CREATED_DATE</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="dateMake"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="transType">
              <td>
                <div class="mobile-mode"><span>COM_TYPE_TRANSACTION</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="transType"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="status">
              <td>
                <div class="mobile-mode"><span>COM_STATUS</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="status"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="amount">
              <td>
                <div class="mobile-mode"><span>COM_AMOUNT</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="amount"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="checker">
              <td>
                <div class="mobile-mode"><span>COM_CHEKER</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="checker"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="transId">
              <td>
                <div class="mobile-mode"><span>COM_TRANS_CODE</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="transId"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="dateCheck">
              <td class="second-row">
                <div class="mobile-mode"><span>COM_CHECK_DATE</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="dateCheck"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="errorCode">
              <td class="second-row">
                <div class="mobile-mode"><span>COM_ERROR_CODE</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="errorCode"/>
                </span></div>
              </td>
            </xsl:if>
            <xsl:if test="errorDesc">
              <td class="second-row">
                <div class="mobile-mode"><span>COM_ERROR_DESC</span></div>
                <div class="content-detail"><span>
                  <xsl:value-of select="errorDesc"/>
                </span></div>
              </td>
            </xsl:if>
          </tr>
          <tr class="second-row">
            <td class="td-left">
              <xsl:attribute name="colspan">
                <xsl:value-of select="../colspan" />
              </xsl:attribute>
              <xsl:if test="dateCheck">
                <span>COM_CHECK_DATE</span>&#160;
                <xsl:value-of select="dateCheck" />
                <br/>
              </xsl:if>
              <xsl:if test="errorCode">
                <span>COM_ERROR_CODE</span>&#160;
                <xsl:value-of select="errorCode" />
                <br/>
              </xsl:if>
              <xsl:if test="errorDesc">
                <span>COM_ERROR_DESC</span>&#160;
                <xsl:value-of select="errorDesc" />
                <br/>
              </xsl:if>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </xsl:template>

  </xsl:stylesheet>
