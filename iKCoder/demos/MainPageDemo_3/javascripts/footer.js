﻿'use strict';

function buildFooter() {
    var _footerHTMLStrArray = [];
    _footerHTMLStrArray.push('<table>');
    _footerHTMLStrArray.push('      <tr>');
    _footerHTMLStrArray.push('            <td style="width:50%">');
    _footerHTMLStrArray.push('                <div class="text foot-title">iKCoder Edu Tech|专注儿童逻辑教育</div>');
    _footerHTMLStrArray.push('            </td>');
    _footerHTMLStrArray.push('            <td>');
    _footerHTMLStrArray.push('                <div class="text foot-company">深圳市IKCODER技术有限公司 IKCODER.CO (SHENZHEN)</div>');
    _footerHTMLStrArray.push('            </td>');
    _footerHTMLStrArray.push('        </tr>');
    _footerHTMLStrArray.push('        <tr>');
    _footerHTMLStrArray.push('           <td>');
    _footerHTMLStrArray.push('               <div class="foot-images">');
    _footerHTMLStrArray.push('                    <table>');
    _footerHTMLStrArray.push('                       <tr>');
    _footerHTMLStrArray.push('                           <td colspan="4" class="foot-images space"></td>');
    _footerHTMLStrArray.push('                       </tr>');
    _footerHTMLStrArray.push('                       <tr>');
    _footerHTMLStrArray.push('                            <td></td>');
    _footerHTMLStrArray.push('                            <td class="foot-images item"><div class="foot-images image kid-safe"></div></td>');
    _footerHTMLStrArray.push('                            <td class="foot-images item"><div class="foot-images image playstore"></div></td>');
    _footerHTMLStrArray.push('                            <td class="foot-images item" style="width: 245px;"><div class="foot-images image themestore"></div></td>');
    _footerHTMLStrArray.push('                        </tr>');
    _footerHTMLStrArray.push('                        <tr>');
    _footerHTMLStrArray.push('                            <td colspan="4" class="foot-images space"></td>');
    _footerHTMLStrArray.push('                       </tr>');
    _footerHTMLStrArray.push('                   </table>');
    _footerHTMLStrArray.push('               </div>');
    _footerHTMLStrArray.push('           </td>');
    _footerHTMLStrArray.push('           <td>');
    _footerHTMLStrArray.push('                <div class="text foot-links">');
    _footerHTMLStrArray.push('                   <table>');
    _footerHTMLStrArray.push('                       <tr>');
    _footerHTMLStrArray.push('                            <td style="width:20px;"></td>');
    _footerHTMLStrArray.push('                            <td class="foot-links item"><div class="text foot-link-item r01c01"></div></td>');
    _footerHTMLStrArray.push('                            <td class="foot-links item"><div class="text foot-link-item r01c02"></div></td>');
    _footerHTMLStrArray.push('                            <td class="foot-links item"><div class="text foot-link-item r01c03"></div></td>');
    _footerHTMLStrArray.push('                            <td class="foot-links item"><div class="text foot-link-item r01c04"></div></td>');
    _footerHTMLStrArray.push('                        </tr>');
    _footerHTMLStrArray.push('                        <tr>');
    _footerHTMLStrArray.push('                            <td></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r02c01"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r02c02"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r02c03"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r02c04"></div></td>');
    _footerHTMLStrArray.push('                        </tr>');
    _footerHTMLStrArray.push('                        <tr>');
    _footerHTMLStrArray.push('                            <td></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r03c01"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r03c02"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r03c03"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r03c04"></div></td>');
    _footerHTMLStrArray.push('                        </tr>');
    _footerHTMLStrArray.push('                        <tr>');
    _footerHTMLStrArray.push('                            <td></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r04c01"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r04c02"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r04c03"></div></td>');
    _footerHTMLStrArray.push('                            <td><div class="text foot-link-item r04c04"></div></td>');
    _footerHTMLStrArray.push('                        </tr>');
    _footerHTMLStrArray.push('                    </table>');
    _footerHTMLStrArray.push('                </div>');
    _footerHTMLStrArray.push('            </td>');
    _footerHTMLStrArray.push('        </tr>');
    _footerHTMLStrArray.push('        <tr>');
    _footerHTMLStrArray.push('            <td>');
    _footerHTMLStrArray.push('                <div class="foot-bottom-space"></div>');
    _footerHTMLStrArray.push('            </td>');
    _footerHTMLStrArray.push('        </tr>');
    _footerHTMLStrArray.push('    </table>');
    var footerHTMLStr = _footerHTMLStrArray.join("");
    var footerContainer = document.getElementsByClassName("page-footer")[0];
    if (footerContainer) {
        footerContainer.innerHTML = footerHTMLStr;
    }
}