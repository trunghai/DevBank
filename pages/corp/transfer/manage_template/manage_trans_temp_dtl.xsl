<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Main Template -->
    <xsl:template match="/review">
      <html>

      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div>
            <div class="panelContent">
              <table width='100%' align='center'>
                <!--<tr>
                  <td>
                    <div id="step-sequence"></div>
                  </td>
                </tr>-->
                <tr>
        			<td>
                      <xsl:if test="title != ''">
                        <h5 class="Header">Chi tiết mẫu</h5>
                      </xsl:if>
                    </td>
                  </tr>
                <xsl:apply-templates select="section" />
                <xsl:apply-templates select="input" />
                <tr>
                  <td>
                    <table width='100%' align='center' style="margin-top: 15px">
                      <tr>
                        <xsl:apply-templates select="button" />
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
        <td>
          <xsl:if test="row or row-one-col">
            <table width='100%' align='center' class='background-blacktrans'>
              <xsl:apply-templates select="row" />
              <xsl:apply-templates select="row-one-col" />
            </table>
          </xsl:if>
          <xsl:apply-templates select="table" />
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
        <td style="font-weight: normal">
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
        <xsl:if test="position()=1">
          <xsl:attribute name="class">tdselct td-head-color</xsl:attribute>
        </xsl:if>
        <xsl:if test="colspan">
          <xsl:attribute name="colspan">
            <xsl:value-of select="colspan" />
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
            <a onclick="{onclick}">
              <xsl:value-of select="value" />
            </a>
          </xsl:if>
        </div>
      </td>
    </xsl:template>

    <!-- Reject Input -->
    <xsl:template match="input">
      <tr>
        <td>
          <div class="input-group" style="margin-top: 15px">
            <input id="reject-reason" type="text" class="form-control" placeholder="{.}" />
          </div>
        </td>
      </tr>
    </xsl:template>

    <!-- Control button -->
    <xsl:template match="button">
      <td>
        <!--<xsl:if test="type='cancel'">
          <input type="button" class='btnshadow btn-primary' onclick='onCancelClick()' value='{label}' />
        </xsl:if>-->
        <xsl:if test="type='back'">
          <input type="button" class='btnshadow btn-primary' onclick='onBackClick()' value='{label}' style="float: right;
    padding-right: 3%;" />
        </xsl:if>
       <!-- <xsl:if test="type='authorize'">
          <input type="button" class='btnshadow btn-primary' onclick='onAuthorizeClick()' value='{label}'>
          <xsl:if test="disabled">
            <xsl:attribute name="disabled">true</xsl:attribute>
          </xsl:if>
          </input>
        </xsl:if>
        <xsl:if test="type='reject'">
          <input type="button" class='btnshadow btn-primary' onclick='onRejectClick()' value='{label}'>
          <xsl:if test="disabled">
            <xsl:attribute name="disabled">true</xsl:attribute>
          </xsl:if>
          </input>
        </xsl:if>-->
      </td>
    </xsl:template>
  </xsl:stylesheet>
