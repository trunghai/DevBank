<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/review">
      <table width='100%' align='center' class='table-account' style=" table-layout: fixed;">
        <tr class="trow-space"></tr>
        <tr class="trow-title">
          <th rowspan="2">
            <span>CONST_TRANS_LIMIT_TIT_SERVICE</span>
          </th>
          <th colspan="2">
            <span>CONST_TRANS_LIMIT_TIT_MAX_LIMIT</span>
          </th>
          <xsl:if test="isInput='true'">
            <th colspan="2">
              <span>CONST_TRANS_LIMIT_TIT_SELECTED_LIMIT</span>
            </th>
          </xsl:if>
        </tr>
        <tr class="trow-title">
          <th>
            <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME</span>
          </th>
          <th>
            <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY</span>
          </th>
          <xsl:if test="isInput='true'">
            <th>
              <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME</span>
            </th>
          </xsl:if>
          <xsl:if test="isInput='true'">
            <th>
              <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY</span>
            </th>
          </xsl:if>
        </tr>
        <xsl:for-each select="services/service">
          <xsl:variable name="id" select="id" />
          <tr>
            <td class="tdselct td-head-color">
              <div class="mobile-mode">
                <span>CONST_TRANS_LIMIT_TIT_SERVICE</span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="name"/>
              </div>
            </td>
            <td id="{$id}-time-old">
              <div class="mobile-mode">
                <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX</span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="max-limit-time"/>
              </div>
            </td>
            <td id="{$id}-day-old">
              <div class="mobile-mode">
                <span>CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX</span>
              </div>
              <div class="content-detail">
                <xsl:value-of select="max-limit-day"/>
              </div>
              </td>
            <xsl:if test="isInput='true'">
              <td>
                  <input width="50%" id="{$id}-time-new" type="text" class="form-control form-control-righttext" placeholder="CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME" onkeyup="handleInputAmount(event, this);" onchange="removeSpecialCharForNumber(this.value)" value="{valueTime}" style="margin: 4px 0px 4px 0px;"/>
              </td>
            </xsl:if>
            <xsl:if test="isInput='true'">
              <td>
                  <input id="{$id}-day-new" type="text" class="form-control form-control-righttext" placeholder="CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY" onkeyup="handleInputAmount(event, this);" onchange="removeSpecialCharForNumber(this.value)" value="{valueDay}" style="margin: 4px 0px 4px 0px;"/>
              </td>
            </xsl:if>
          </tr>
      </xsl:for-each>
      </table>
    </xsl:template>
  </xsl:stylesheet>
