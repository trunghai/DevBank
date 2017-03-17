function goBackLogin(){
	document.getElementById('mainview').style.cssFloat = 'none';
	document.getElementById('box_lienhe').style.display = 'none';
	navController.initWithRootView('login-scr', true, 'html');
}

function viewDidLoadSuccess(){
	document.getElementById('box_lienhe').style.display = 'block';
}