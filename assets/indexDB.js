/**
 * Created by HaiDT1 on 3/27/2017.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const userData = [
    { id: "8888999801", pass: "123456", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
    { id: "8888999802", pass: "123456", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
];
var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
    console.log("error: ");
};

request.onsuccess = function(event) {
    db = request.result;
    console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("user", {keyPath: "id"});

    for (var i in userData) {
        objectStore.add(userData[i]);
    }
}

function read() {
    var transaction = db.transaction(["user"]);
    var objectStore = transaction.objectStore("user");
    var request = objectStore.get("00-03");

    request.onerror = function(event) {
        alert("Unable to retrieve daa from database!");
    };

    request.onsuccess = function(event) {
        // Do something with the request.result!
        if(request.result) {
            alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
        }

        else {
            alert("Kenny couldn't be found in your database!");
        }
    };
}

function readAll() {
    var objectStore = db.transaction("user").objectStore("user");

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
            alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
            cursor.continue();
        }

        else {
            alert("No more entries!");
        }
    };
}

function add() {
    var request = db.transaction(["user"], "readwrite")
        .objectStore("user")
        .add({ id: "8888999803", pass: "123456", name: "Kenny", age: 19, email: "kenny@planet.org" });

    request.onsuccess = function(event) {
        alert("Kenny has been added to your database.");
    };

    request.onerror = function(event) {
        alert("Unable to add data\r\nKenny is aready exist in your database! ");
    }
}

function remove() {
    var request = db.transaction(["user"], "readwrite")
        .objectStore("user")
        .delete("00-03");

    request.onsuccess = function(event) {
        alert("Kenny's entry has been removed from your database.");
    };
}

var jsonData = {
  "responseType": "100",
  "respCode": "1014",
  "respContent": "Mật khẩu của Quý khách đã quá hạn. Để đảm bảo an toàn, Quý khách nên đổi mật khẩu mới trước khi giao dịch. ",
  "respRaw": "",
  "arguments": [
    "c24fda9bd03c68b61744f45814ab6f07",
    "{customerName : \"DUONG TRUNG HAI\", companyName : \"FULL_NAME_98888888\", position : \"\", lastLogin : \"27/03/2017 03:51:28\"}",
    "OTP",
    null,
    null,
    null,
    "CorpInput",
    "6",
    "98888888001#ACDESC_98888888001#100019620370#100019620370#VND##0#CVCDBB# # #N#N",
    "98888888002#ACDESC_98888888002#4271.54#4271.54#USD##0#CFCDBD# # #N#N",
    "98888888003#ACDESC_98888888003#0#0#JPY##0#CFCDBD# # #N#N",
    "98888888004#ACDESC_98888888004#2901143806#2901143806#VND##0#CVCDBB# # #N#N",
    "98888888005#ACDESC_98888888005#25881.43#25881.43#USD##0#CFCDBD# # #N#N",
    "98888888006#ACDESC_98888888006#0#0#JPY##0#CFCDBD# # #N#N",
    null,
    "MENU",
    "MENU_HOME_PAGE#ID30##icon-home##updateAccountListInfo(); gotoHomePage();##Y",
    "ACC_MENU_ACCOUNT#ID1##icon-account##applyScrollForMe(this.parentNode);##Y",
    "MENU_TRANS_CATEGORY#ID2##icon-transfer##applyScrollForMe(this.parentNode);##Y",
    "MENU_PAY_INTERNATIONAL#ID34##icon-globe##applyScrollForMe(this.parentNode);##Y",
    "MENU_SETUP#ID5##icon-setting##applyScrollForMe(this.parentNode);##Y",
    "MENU_TRANS_LOCAL_TPBANK#ID9#ID2#icon-arrowright##navController.initWithRootView('corp/transfer/internal/transfer-local-create-scr', true, 'xsl');##Y",
    "MENU_TRANS_INTER#ID10#ID2#icon-arrowright##navController.initWithRootView('corp/transfer/domestic/transfer-inter-create-scr', true, 'xsl');##Y",
    "MENU_PAY_BILL#ID33#ID3#icon-arrowright##navController.initWithRootView('corp/payment_service/bill/pay_bill_create', true, 'html');##Y",
    "MENU_GUARANTEE_QUERY#ID49#ID4#icon-arrowright##navController.initWithRootView('corp/credit/guarantee/cre_guarantee_info', true, 'xsl');##Y",
    "MENU_SETUP_SYSTEM#ID18#ID5#icon-arrowright##navController.initWithRootView('corp/setup/system/set_system', true, 'xsl');##Y",
    "MENU_SETUP_TRANFER#ID19#ID5#icon-arrowright##navController.initWithRootView('corp/setup/tranfer/set_tranfer', true, 'xsl');##Y",
    "MENU_FOREGIN_CURRENCY_CONVERT#ID35#ID34#icon-arrowright##navController.initWithRootView('corp/international_payments/foreign_exchange/foreign_exchange', true, 'xsl');##Y",
    "MENU_END",
    null,
    "MENU_USER_END"
  ],
  "respJson": "",
  "respJsonObj": {}
};