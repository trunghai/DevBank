/**
 * Created by NguyenTDK
 * User: 
 * Date: 19/10/15
 * Time: 5:00 PM
 */

/*** INIT VIEW ***/
function loadInitXML() {
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	// gen sequence form
	genSequenceForm();	

	// gen dữ liệu ra
	if(gTax.imExportData.ThongDiep.Body.ThongtinToKhai.length > 0){
		document.getElementById('imEx.TaxNo').innerHTML = gTax.imExportData.ThongDiep.Body.ThongtinToKhai[0].Ma_DV;
		document.getElementById('imEx.TaxName').innerHTML = gTax.imExportData.ThongDiep.Body.ThongtinToKhai[0].Ten_DV;
	}else{
		if(gTax.imExportData.ThongDiep.Body.ThongtinToKhai.Ma_DV !== undefined 
			&& gTax.imExportData.ThongDiep.Body.ThongtinToKhai.Ma_DV != null){
			document.getElementById('imEx.TaxNo').innerHTML = gTax.imExportData.ThongDiep.Body.ThongtinToKhai.Ma_DV;
			document.getElementById('imEx.TaxName').innerHTML = gTax.imExportData.ThongDiep.Body.ThongtinToKhai.Ten_DV;
		}else{
			document.getElementById('imEx.TaxNo').innerHTML = gTax.imExportData.ThongDiep.Body.ThongtinToKhai[0].Ma_DV;
			document.getElementById('imEx.TaxName').innerHTML = gTax.imExportData.ThongDiep.Body.ThongtinToKhai[0].Ten_DV;
		}
	}
	
	
	// gen dữ liệu table
	getDataTblToDiv(gTax.imExportData.ThongDiep.Body.ThongtinToKhai, "corp/payment_service/tax/pay_tax_create_imexport_tbl", "tblContent");
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	
}

//gen sequence form
function genSequenceForm() {
	//get sequence form xsl
	var tmpXslDoc = getCachePageXsl("sequenceform");
	//create xml
	var tmpStepNo = 301;
	setSequenceFormIdx(tmpStepNo);
	var docXml = createXMLDoc();	
	var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
	var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);
	//gen html string
	genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr){
		var tmpNode = document.getElementById('seqFormLocal');
		if(tmpNode != null){
			tmpNode.innerHTML = oStr;
		}
	});
}

// Gọi đến màn hình chi tiet
function imExportDetail(soTk, namTk, no){
	gTax.soTk = soTk;
	gTax.namTk = namTk;
	gTax.stt = no - 1;
	
	// Gọi đên màn hình hiển cho phần thuế xuất nhập khẩu chi tiết
	navController.pushToView("corp/payment_service/tax/pay_tax_create_imexport_dtl", true, 'xsl');
}

function backToScreenDtl(){
	navController.popView(true);
}