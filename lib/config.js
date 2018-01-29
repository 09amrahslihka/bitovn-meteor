

import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

Router.route('/profile', function () {
  if(Session.get("userId")!=""){
  this.render('profile');  
}else{
  Router.go('/');  
}
});

Router.route('/view_profile/:user_id', function () {
   var  params = this.params; // { _id: "5" }
  // var id = params.user_id; // "5"

    var userId = params.user_id; // "5"
    userId = Base64.decode(userId); 
      // alert("decrypt" + userId);
  // Session.set("makeUserActive","true");
  // Session.setPersistent("show_connection",head[0].user_id);
  Session.set("show_connection",userId);	
  // alert('hi');
  this.render('view_profile');
});

Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function () {
   if(Session.get("userId")!=""){
 this.render('signup');
}else{
  Router.go('/');  
}


});

Router.route('/connection', function () {
  this.render('connection');
});

Router.route('/Messaging', function () {
  this.render('messagingpage');
});

Router.route('/grplisting', function () {
  this.render('grplisting');
});

Router.route('/group_discussion', function () {
  this.render('group_discussion');
});

Router.route('/email', function () 
{  if(Session.get("userId")!=""){
  this.render('email');
}else{
  Router.go('/');  
}

});

Router.route('/activate_email/:id', function () {
  var  params = this.params; // { _id: "5" }
  var userId = params.id; // "5"
    userId = Base64.decode(userId); 
      // alert("decrypt" + userId);
  Session.set("makeUserActive","true");
  Session.setPersistent("userId",userId);
  this.render('email');


});



Router.route('/creategroup', function () {
  this.render('creategroup');
});

Router.route('/messaging_page', function () {
  this.render('messaging_page');
});

Router.route('/groupdetail/:grp_id', function () {
  var  params = this.params; // { _id: "5" }
  var encrypted = params.grp_id; // "5"
  
// decrypted = CryptoJS.AES.decrypt(encrypted, 'Passphrase');
// var id = decrypted.toString(CryptoJS.enc.Utf8);

Session.set("show_grp_id",encrypted);  
 this.render('groupdetail');
});

Router.route('/editgroup/:grp_id', function () {
  var  params = this.params; // { _id: "5" }
  var encrypted = params.grp_id; // "5"
  
// decrypted = CryptoJS.AES.decrypt(encrypted, 'Passphrase');
// var id = decrypted.toString(CryptoJS.enc.Utf8);

Session.set("show_grp_edit_id",encrypted);  
  this.render('editgroup');
});

Router.route('/logout', function () {
  this.render('login');
});

