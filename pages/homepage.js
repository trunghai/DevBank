/**
 * Created by HuyNT2
 * User: 
 * Date: 12/17/13
 * Time: 5:35 PM
 */


function openAutoSlideMenu(inMenuID) {
	if (!content.isOpen && !contentPromotion.isOpen) {
		openMenuContent();
		
		var nodeEGoldMenu = document.getElementById(inMenuID);
		if((nodeEGoldMenu != undefined) && (nodeEGoldMenu != null) && (currentDisplayMenu != nodeEGoldMenu)) {
			applyScrollForMe(nodeEGoldMenu);
		}
	}
}