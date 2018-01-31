

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

Router.route('/test/:status', function () {
  var status = this.params.status;
  Session.set("joinSession",status);
  this.render('test');
});

Router.route('/test1', function () {
  this.render('test1');
});


Router.route('/video_chat/:callerId/calling/:pickerId/:chat_room_id', function () {
  var callerId = this.params.callerId; // "5"
  var pickerId = this.params.pickerId; // "100"
  var chat_room_id = this.params.chat_room_id; // "100"
  Session.set("videoSessionCallerId",callerId);
  Session.set("videoSessionPickerId",pickerId);
  Session.set("videoSessionChatRoomId",chat_room_id)
  this.render('video_chat');
});
Router.route('/video_chat_accept/accept_call/:video_chat_roomId', function () {
  var video_session_id = this.params.video_chat_roomId; 
  // alert(video_session_id);
  Session.set("video_session_id",video_session_id);
  this.render('video_chat_accept');
});
