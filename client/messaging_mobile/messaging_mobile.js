import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Session } from 'meteor/session';
import { FriendRequest } from './../../import/collections/insert.js';
import { UserInfo } from './../../import/collections/insert.js';
import { Message } from './../../import/collections/insert.js';
import { Chatroom } from './../../import/collections/insert.js';

import { Images } from './../../import/config.js';
import { Base64 } from 'meteor/ostrio:base64';

Template.messanging_mobile.onCreated(function(){
this.message_show_limit = new ReactiveVar("");
this.search_connection_to_message = new ReactiveVar("");
Session.setPersistent("updatedStatus","false");
});

Template.messagingpage_mobile.onDestroyed({

});

Template.messanging_mobile.onDestroyed({

});

    Template.registerHelper('equals', function (a, b) {
      return a === b;
    });


 Template.messagingpage_mobile.onRendered(function(){
  if(Session.get("relaodPage")=="true"){
    setTimeout(function(){
    Session.set("relaodPage","false");
    // alert("Reloading page");
    window.location.reload(true);
    },1000);
    }


      setTimeout(function() {
      $("#message_container").animate({ scrollTop: $('#message_container').prop("scrollHeight")}, 1);
      makeGifClear();
      }, 1000);

      Session.clear("conversation_input_active");
      $("ul.tabs").tabs();
      Session.clear("msg_img_id"); 

      var sent_by = Session.get("userId");
  var userOnlineOffline =   UserInfo.find({"user_id":sent_by}).observe({
    added: function(newDoc) {
    
    },
      removed: function(oldDoc) {
    },
      changed: function(newDoc, oldDoc) {
      if(newDoc.online_status=="online" && newDoc.online_status != oldDoc.online_status){
      


      setTimeout(function() {
            $("#message_container").animate({ scrollTop: $('#message_container').prop("scrollHeight")}, 1);
      }, 10); 

        var connection_details;
        if(Session.get("userId") == newDoc.user1){
           connection_details = UserInfo.find({user_id: newDoc.user2}).fetch();
        }else{
           connection_details = UserInfo.find({user_id: newDoc.user1}).fetch();
        }
  var rightPanelChatRoomId = Session.get("rightPanelChatRoomId");
  // alert(rightPanelChatRoomId);
        var openedChatRoomDetails = Chatroom.find({"chatroom_id":rightPanelChatRoomId}).fetch();

        // alert("ChatRoom " +openedChatRoomDetails[0].chatroom_id);
        if(openedChatRoomDetails[0].last_msg_sent_by != Session.get("userId")){
          // receipient is online
           change_last_message_status(openedChatRoomDetails[0].last_msg_id,"read");
            increase_unread_count(openedChatRoomDetails[0].chatroom_id,"true")
            // alert("Last message read"); 
             // update msg status 
             // no need for updating count
          }


      }
    }
  });
    var userHandle =  Chatroom.find({ 
            $or:
             [
              {
               user1: sent_by
              },
              {
               user2: sent_by
              }
             ]
           },{last_msg_sent_by:1, user1:1,user2:1,chatroom_id:1,last_msg_time:1}).observe({
            added: function(newDoc) {
    },
      removed: function(oldDoc) {
    },
      changed: function(newDoc, oldDoc) {
        // case 1: both user are online
        // case 2: one user is online
      if(newDoc.total_messages != oldDoc.total_messages){


        var connection_details;
        var currentUserStatus;       
        if(Session.get("userId") == newDoc.user1){
           currentUserStatus = "user1";
           connection_details = UserInfo.find({user_id: newDoc.user2}).fetch();
        }else{
          currentUserStatus ="user2";
           connection_details = UserInfo.find({user_id: newDoc.user1}).fetch();
        }
        
              var sent_by = Session.get("userId");
      var sent_to = Session.get('msgid_forright');

   var msg_id = 'msg_'+ Math.floor((Math.random() * 2465789) + 1);
   var user1 = sent_by;
   var user2 = sent_to;
   // alert(user1+' & '+user2);
   var check_chatroom = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: user1
              },
              {
               user2: user2
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: user2
             },
             {
              user2: user1
             }
            ]   
           }
           ] }).fetch();

        // alert('user2: '+check_chatroom[0].user1+'user1: '+check_chatroom[0].user2 +'Logged_in user: '+Session.get("userId"));
      // user2: user_1572248 || user1: user_1989999 || Logged_in user: user_1572248
        // alert('mute_status_user1: ' + check_chatroom[0].mute_status_user1 + 'mute_status_user2 : ' + check_chatroom[0].mute_status_user2);
         // mute_status_user1: Unmute || mute_status_user2 : Unmute
         // mute_status_user1: Mute mute_status_user2 : Unmute
        if(check_chatroom[0].user1 == Session.get("userId")){
                    if(check_chatroom[0].mute_status_user1 == "Mute"){
                        var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
                        notification.play();
                      }
        }
        else if(check_chatroom[0].user2 == Session.get("userId")){
                     if(check_chatroom[0].mute_status_user2 == "Mute"){
                        var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
                        notification.play();
                      }
        }



        if(connection_details[0].online_status == "online" 
          && Session.get("rightPanelChatRoomId") == newDoc.chatroom_id 
          && connection_details[0].last_msg_sent_by != Session.get("userId")){
          // receipient is online
            //alert("Case 1");
            if(connection_details[0].mute_status_user1 == "Unmute" && currentUserStatus =="user1"){
              // bjegi
               var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
              notification.play();
              
            }else{
               // nhi bjegi
            }
             
              change_last_message_status(newDoc.last_msg_id,"read");
              increase_unread_count(newDoc.chatroom_id,"true")
            // alert("Last message read"); 
             // update msg status 
             // no need for updating count
          }else if(connection_details[0].online_status == "online" && Session.get("rightPanelChatRoomId") != newDoc.chatroom_id){
            // alert("Last message delivered, but user is chatting with someone else ");
              // update last message count
              //alert("Case 11");
               if(connection_details[0].mute_status_user1 == "Unmute" && currentUserStatus =="user1"){
              // bjegi
            var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
              notification.play();
            }else{
               // nhi bjegi
            }


              change_last_message_status(newDoc.last_msg_id,"delivered");
              increase_unread_count(newDoc.chatroom_id,"false"); 
              // update msg status
          }
          else{
              //var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
              // notification.play();
              //alert("case 111");
              change_last_message_status(newDoc.last_msg_id,"delivered");
              increase_unread_count(newDoc.chatroom_id,"false"); 
               // alert("Last message delivered but user is offline");
               // update last message count 
               // update msg status
          }
          // receipient is offline
    }
    }
    });
});

        function increase_unread_count(chatroom_id,reset){
      if(reset == "true"){
        count=0;
      }else{  
        count= 1;
      }

      Meteor.call('update_chatroom_count',chatroom_id,count,function(error,result){
              if(error){
                console.log(error);
              } else{
                console.log(result);
              }
          });   

    }

    function change_last_message_status(last_msg_id,status){
         Meteor.call('update_last_msg_status',last_msg_id,status,function(error,result){
              if(error){
                console.log(error);
              }else{
                console.log(result);
              }
          });   
    }

  /*  Meteor.startup(function() {
    Uploader.finished = function(index, fileInfo, templateContext) {
    
    console.log(fileInfo);
    var attach_name = fileInfo.name;
    var new_array = attach_name.split('.');
    var format = new_array[new_array.length-1];
    var attach_path = fileInfo.url;
    var msg_id = 'msg_'+ Math.floor((Math.random() * 2465789) + 1);
    var sent_by = Session.get("userId");
    var sent_to = Session.get('msgid_forright');
    Meteor.call('insert_message_With_attachment',msg_id,sent_to,sent_by,attach_name,attach_path,format,function(error,result){
          if(error){
            console.log('error');
          }
          else{
            console.log('Sucess');
          }
        });

    console.log(fileInfo);

  }

  
})*/

Template.messanging_mobile.events({
  'click .send_person_to_msg_page': function(){
   alert(this.user_id);
    user_id= Base64.encode(this.user_id);
    var url = '/messaging_right/'+user_id;
   Router.go(url);
},

'click .redirect_click_1': function(event){
    // alert(1);
    event.preventDefault();
    // var name = $('.redirect_click_1').attr('valu');
    var user_id = this.user_id;
    var head = UserInfo.find({user_id: user_id}).fetch();
    // alert(head[0].email+ ' and '+head[0].user_id);
    Session.setPersistent("show_connection2",head[0].user_id);
    
    var show_collection = Session.get("show_connection2");
    var user_id = Session.get("userId");
    user_id= Base64.encode(head[0].user_id);
    var url = '/view_profile/'+user_id;
    // alert(url);
    if(show_collection == user_id)
    {
      Router.go('/profile');    
    }
    else{
    Router.go(url);
    }
}
});

 Template.messanging_mobile.helpers({
  calculate_time_difference(a){
    var dt = new Date(a);
   var millis =    new Date().getTime() - dt.getTime() ;
      var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);

   var hours = (millis / (1000 * 60 * 60)).toFixed(1);

 var days = (millis / (1000 * 60 * 60 * 24)).toFixed(1);

   if(minutes<1 && seconds<10){
    return 'now';
  }else if(minutes <1 && seconds<59 ){
    return seconds + 's';
   } else if(minutes>= 1 && minutes<=59) {
    return minutes + 'm';
  }else if(minutes>=60 && hours<24){
        if(Math.floor(hours)==1 || minutes==60){
        return Math.floor(hours) + 'h';
        }else{ 
        return Math.floor(hours) + 'h';
        }
  }else if(hours>24){
    if(Math.floor(days) == 1){
    return Math.floor(days) +"d";
    }else{
    return Math.floor(days) +"d";
    }
  }
  else{    
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds  + "  [" + a.toString('YYYY-MM-dd').slice(0,25) + "] ";
  }

  },
 show_connections(){
  var sent_to = Session.get("userId");
  var show_pending = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to },{ req_status: 1 } ] }, { $and: [{ sent_by: sent_to },{ req_status: 1 } ] } ] }).fetch();
  var length = show_pending.length;
  console.log(show_pending);
  if(length > 0){
  return show_pending;  
 }
 },

  show_connections_2(){
  var use_id = this.sent_by;
  var logged_in = Session.get("userId");
  
     const t1 = Template.instance();
     var query = new RegExp(t1.search_connection_to_message.get(),'i');
  // alert('Query : '+query);

if(query == "" || query == undefined ){
      $('#display_conversation').removeClass('display_hide_conversation');
      $('#display_connection').addClass('display_hide_conversation');

  var connection_details = UserInfo.find({user_id: use_id}).fetch();
  var show_details = connection_details[0];
  console.log(connection_details);
  return connection_details; 
}

  if(use_id == logged_in){
   use_id = this.sent_to;
   var connection_details = UserInfo.find({user_id: use_id ,name: query}).fetch();

   var show_details = connection_details[0];
  console.log(connection_details);

  return connection_details;
  }
  else{
  var connection_details = UserInfo.find({user_id: use_id,name: query}).fetch();
  var show_details = connection_details[0];
  console.log(connection_details);
  return connection_details;  
  }
},

  typing_gif(){
         var sent_by = Session.get("userId");
         var sent_to = Session.get('msgid_forright');

   var user1 = sent_by;
   var user2 = sent_to;
   // alert(user1+' & '+user2);
   var check_chatroom = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: user1
              },
              {
               user2: user2
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: user2
             },
             {
              user2: user1
             }
            ]   
           }
           ] }).count();
  
  // alert('else '+check_chatroom);
  // var insert_chatroom_once = Session.get("insert_chatroom_once");
  
   if(check_chatroom > 0){
   var check_chatroom = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: user1
              },
              {
               user2: user2
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: user2
             },
             {
              user2: user1
             }
            ]   
           }
           ] }).fetch();

   var chatroom_id = check_chatroom[0].chatroom_id;
   var currently_typing = check_chatroom[0].currently_typing;
   var user1 = check_chatroom[0].user1;
   var user2 = check_chatroom[0].user2;

   var log_in_user = Session.get("userId");
  
   if(currently_typing.includes(user1) && currently_typing.includes(user2)){
    return true;
   }
   else if(currently_typing.includes(log_in_user)){
          return false;
    }else if(currently_typing == 0 || currently_typing== ""){
          return false;
    }
    else{
      return true;
    }
  }

},

  // show_connections_2(){
  // var use_id = this.sent_by;
  // var logged_in = Session.get("userId");
  // if(use_id == logged_in){
  //  use_id = this.sent_to;
  //  var connection_details = UserInfo.find({user_id: use_id}).fetch();
  //  var show_details = connection_details[0];
  // console.log(connection_details);
  // return connection_details;
  // }
  // else{
  // var connection_details = UserInfo.find({user_id: use_id}).fetch();
  // var show_details = connection_details[0];
  // console.log(connection_details);
  // return connection_details;  
  // }},

  online_status(){
    var connection_id = this.user_id;
    var show_online = UserInfo.find({user_id: connection_id}).fetch();
    console.log(show_online[0].online_status);

    if(show_online[0].online_status == "online"){
    // "online_status" : "online"
    return true;
  }
    else{
      return false;
    }
  },

 conversation_count(){
    var conversation_count = Session.get("conversation_count");
    if(conversation_count){     
      return conversation_count;
    }
    else{
      return 0;
    }
 },
  connection_list(){
  var sent_to = Session.get("userId");
  var show_pending = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to },{ req_status: 1 } ] }, { $and: [{ sent_by: sent_to },{ req_status: 1 } ] } ] }).fetch();
  var length = show_pending.length;
  show_pending = show_pending.slice(0, 5);
  if(length > 0){
  return show_pending;  
 }
 },

  recent_list(){
    // alert('list helper');
  var user_id = Session.get("userId");
  // var show_pending = FriendRequest.find({ $or: [ { $and: [ { sent_to: user_id },{ req_status: 1 } ] }, { $and: [{ sent_by: user_id },{ req_status: 1 } ] } ] }).fetch();
  // alert(user_id);
  // var show_pending = Chatroom.find({}).fetch();
  
  // var show_pending = Chatroom.find({ $or: [{ user1: user_id },{ user2: user_id } ] }).fetch();
  var show_pending = Chatroom.find({ $or: [{ user1: user_id },{ user2: user_id } ] }).fetch();
  
  console.log("sss - ");
  console.log(show_pending);
  var length = show_pending.length;
  Session.setPersistent("conversation_count",length);
  // show_pending = show_pending.slice(0, 5);
  // return false;
  return show_pending;  

 },

recent_list_2(){
  
  var use_id = Session.get("userId");
  if(use_id == this.user1 ){
    use_id = this.user2;  
  }else{
    use_id = this.user1;
  }
  var connection_details = UserInfo.find({user_id: use_id}).fetch();
  return connection_details;
},

show_message_details(){
  var user_id = this.user_id;
  var logged_in = Session.get("userId");
  var result = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: user_id
              },
              {
               user2: logged_in
              }
             ]
           },
          { 
            $and:
              [
             {  
              user1: logged_in
             },
             {
              user2: user_id
             }
            ]
           }
           ] },  {sort: {last_msg_time: -1}}).fetch();
  console.log(result);
  return result;
},


show_message_array(){
  var user_id = this.user_id;
  var logged_in = Session.get("userId");
  var sent_by = Session.get("userId");
     var sent_to = Session.get('msgid_forright');
    const t = Template.instance();
    const msg_limit = t.message_show_limit.get(); 
     if(msg_limit == ""){
      msg_limit = 1;
      t.message_show_limit.set(msg_limit);
     }  
  msg_limit = msg_limit * 8;
  var result = Message.find({ $or: [
           {
            $and:
             [
              {
               sent_to: user_id
              },
              {
               sent_by: logged_in
              }
             ]
           },
          { 
            $and:
              [
             {  
              sent_to: logged_in
             },
             {
              sent_by: user_id
             }
            ]
           }
           ] },  {sort: {sentAt: -1},limit: msg_limit}).fetch().reverse();
  return result;
},

check_unread(){
  var unread_msg_count = this.unread_msg_count;
  var last_msg_sent_by = this.last_msg_sent_by;
  var current_logged_in_user_id = Session.get("userId");

  if(unread_msg_count && last_msg_sent_by != current_logged_in_user_id){
    return true;
  }else{
    return false;
  }
},

check_connection(){
  var logged_in_user = Session.get("userId");
  var sent_to = this.user_id;
  var show_pending = FriendRequest.find({ $or: [{ sent_to: sent_to },{ sent_by: sent_to }] }).fetch();
  console.log(show_pending);

  var length = show_pending.length;
  if(length > 0){
  return true;  
 }
 else{
  return false;
 }

},

check_lastmsg_sender(){
    var logged_in = Session.get("userId");
    var sender = this.last_msg_sent_by;
    if(logged_in == sender){
      // alert('me');
      return true;
    }
    else{
      // alert('you');
      return false;
    }
},

sender(){
   var sent_by = this.last_msg_sent_by;
   var result = UserInfo.find({"user_id":sent_by}).fetch();
   return result[0].name;
},
chatroom_around(){
 var show_id = this.user_id;
 // Session.get("msgid_forright");
 // alert(show_id);
 var result = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: Session.get("userId")
              },
              {
               user2: Session.get("msgid_forright")
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: Session.get("msgid_forright")
             },
             {
              user2: Session.get("userId")
             }
            ]   
           }
           ] }).fetch();
 return result;
}
});

Template.messanging_mobile.events({

'keyup #search_connection_msg': function(){
  // alert($('#search_connection_msg').val());
  const t1 = Template.instance();
    // alert('sooorrr');
    // var search_text = $('#search_all_text_conn').val();
    // var result =  UserGroup.find({grp_title:{$regex:new RegExp('^' + search_text)}}).fetch();
      // alert(search_text);
      $('#display_connection').removeClass('display_hide_conversation');
      $('#display_conversation').addClass('display_hide_conversation');
      t1.search_connection_to_message.set($('#search_connection_msg').val());
      
},

'click .change_msg_onright': function(){
// alert('ccs');
 setTimeout(function() {
      $("#message_container").animate({ scrollTop: $('#message_container').prop("scrollHeight")}, 1);
}, 10); 
var show_id = this.user_id;
// alert(show_id);
Session.setPersistent("msgid_forright",show_id);
// alert('22');
// alert(Session.get("msgid_forright"));
 var check_chatroom = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: Session.get("userId")
              },
              {
               user2: Session.get("msgid_forright")
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: Session.get("msgid_forright")
             },
             {
              user2: Session.get("userId")
             }
            ]   
           }
           ] }).fetch();
 if(check_chatroom[0]){
    Session.setPersistent("rightPanelChatRoomId",check_chatroom[0].chatroom_id);
    var openedChatRoomDetails = Chatroom.find({"chatroom_id":check_chatroom[0].chatroom_id}).fetch();
    if(openedChatRoomDetails[0].last_msg_sent_by != Session.get("userId")){
            change_last_message_status(openedChatRoomDetails[0].last_msg_id,"read");
            increase_unread_count(openedChatRoomDetails[0].chatroom_id,"true")
  }
}
},   
});



