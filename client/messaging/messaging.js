import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Session } from 'meteor/session';
import { FriendRequest } from './../../import/collections/insert.js';
import { UserInfo } from './../../import/collections/insert.js';
import { Message } from './../../import/collections/insert.js';
import { Chatroom } from './../../import/collections/insert.js';
import { VideoSession } from './../../import/collections/insert.js';
import { AudioSession } from './../../import/collections/insert.js';

import { Images } from './../../import/config.js';
import { Base64 } from 'meteor/ostrio:base64';

Template.messanging.onCreated(function(){
this.message_show_limit = new ReactiveVar("");
this.search_connection_to_message = new ReactiveVar("");
Session.setPersistent("updatedStatus","false");
});

    Template.registerHelper('equals', function (a, b) {
      return a === b;
    });

 Template.messagingpage.onRendered(function(){
      

  setTimeout(function() {
      $("#message_container").animate({ scrollTop: $('#message_container').prop("scrollHeight")}, 1);
      makeGifClear();
      }, 1000);

      Session.clear("conversation_input_active");
      $("ul.tabs").tabs();
      Session.clear("msg_img_id"); 

      var sent_by = Session.get("userId");
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
           },{sort: {last_msg_time: -1}}).observe({
            added: function(newDoc) {
    },
      removed: function(oldDoc) {
    },
      changed: function(newDoc, oldDoc) {
        // case 1: both user are online
        // case 2: one user idxs online

        if(newDoc.video_session_counts!=oldDoc.video_session_counts){
                var userId = Session.get("userId");
              alert("Video Session "+ newDoc.video_session_id);
              alert("User Id :"+userId);
              if(newDoc.video_session_id.split("=")[2] == userId){
                  Session.set("mediaType","video");
                 Session.set("videoSessionId",newDoc.video_session_id);
                   // var connection_details1 = UserInfo.find({user_id: userId}).fetch();                  
                   var connection_details2 = UserInfo.find({user_id: newDoc.video_session_id.split("=")[1]}).fetch();                  
                  var message = connection_details2[0].name +" is calling you";
                  $("#call_picker_message").text(message);  

                 var notification = new Audio("https://www.zedge.net/d2w/4/1199006/128515930/view/?mp3");
                        notification.play();
                         
                  $('#call_picker_dialog').modal('open');
              }
            }
     
     else if(newDoc.audio_session_counts!=oldDoc.audio_session_counts){
             var userId = Session.get("userId");
              if(newDoc.audio_session_id.split("=")[2] == userId){
                Session.set("mediaType","audio");
                 Session.set("audioSessionId",newDoc.audio_session_id);
                   // var connection_details1 = UserInfo.find({user_id: userId}).fetch();                  
                   var connection_details2 = UserInfo.find({user_id: newDoc.audio_session_id.split("=")[1]}).fetch();                  
                  var message = connection_details2[0].name +" is calling you";
                  $("#call_picker_message").text(message);  

                 var notification = new Audio("https://www.zedge.net/d2w/4/1199006/128515930/view/?mp3");
                        notification.play();
                         
                  $('#call_picker_dialog').modal('open');
              }
            }
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
/*   var check_chatroom = Chatroom.find({ $or: [
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
*/

        if(newDoc.user1 == Session.get("userId")){
                    if(newDoc.mute_status_user1 == "Mute"){
                        var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
                        notification.play();
                      }
        }
        else if(newDoc.user2 == Session.get("userId")){
                     if(newDoc.mute_status_user2 == "Mute"){
                        var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
                        notification.play();
                      }
        }

        var chatRoomInSession  = Session.get("rightPanelChatRoomId");
        var newUser = Chatroom.find({chatroom_id: chatRoomInSession}).fetch();
        if(connection_details[0].online_status == "online" 
          && Session.get("rightPanelChatRoomId") == newDoc.chatroom_id 
          && newUser[0].last_msg_sent_by != Session.get("userId")){
          // receipient is online
            //alert("Case 1");
          /*  if(check_chatroom[0].mute_status_user1 == "Unmute" && currentUserStatus =="user1"){
              // bjegi
               var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
              notification.play();
              
            }else{
               // nhi bjegi
            }*/
             
              change_last_message_status(newDoc.last_msg_id,"read");
              increase_unread_count(newDoc.chatroom_id,"true")
            // alert("Last message read"); 
             // update msg status 
             // no need for updating count
          }else if(connection_details[0].online_status == "online" && Session.get("rightPanelChatRoomId") != newDoc.chatroom_id){
            // alert("Last message delivered, but user is chatting with someone else ");
              // update last message count
            /*  
               if(check_chatroom[0].mute_status_user1 == "Unmute" && currentUserStatus =="user1"){
              // bjegi
            var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
              notification.play();
            }else{
               // nhi bjegi
            }

*/
              if(newDoc.last_msg_sent_by != Session.get("userId")){
              change_last_message_status(newDoc.last_msg_id,"delivered");
              increase_unread_count(newDoc.chatroom_id,"false"); 
            }
              // update msg status
          }
          else{
              //var notification = new Audio("http://freesound.org/data/previews/235/235911_2391840-lq.mp3");
              // notification.play();
              if(newDoc.last_msg_sent_by != Session.get("userId")){
              change_last_message_status(newDoc.last_msg_id,"delivered");
              increase_unread_count(newDoc.chatroom_id,"false"); 
              }
              
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


Template.messanging.events({
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
/*function testing_function()
{
  alert("inside messaging js");
   
}*/

 Template.messanging.helpers({
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
  
  // var show_pending = Chatroom.find({ $or: [{ user1: user_id },{ user2: user_id } ] }).fetch();sort: {createdAt:-1}
  
  var show_pending = Chatroom.find({ $or: [{ user1: user_id },{ user2: user_id } ] },{sort: {last_msg_time: -1}}).fetch();
  
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
  // console.log(connection_details);

  // if(connection_details[0].user_id == highligh_selected){
  //   alert('right '+connection_details[0].user_id + ' && ' + highligh_selected);
  //   $('#show_right').addClass('highligh_selected');
  //   }
  // else{
  //   $('#show_right').removeClass('highligh_selected');
  //   }

  return connection_details;
},

highligh_selected(){
   var highligh_selected = Session.get("msgid_forright");
   var listed_user = this.user_id;
   
   if(listed_user == highligh_selected){
        return true;
    }
    else{
      return false;
    }
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
  // alert(user_id+' & '+logged_in);
 

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
 
  msg_rightbox(){  
   var show_session = Session.get('msgid_forright');
   var logged_in = Session.get("userId");
   // alert(show_session+' - '+logged_in);
   var connection_details = UserInfo.find({user_id: show_session}).fetch();
   var show_details = connection_details[0];                                            
   return connection_details;                                                      
  },                                                                              
                                                                            
  // message_content(){
  // var sent_by = Session.get("userId");
  //    var sent_to = Session.get('msgid_forright');
  //          const t = Template.instance();
  //     // alert('critsmas');
  //    const msg_limit = t.message_show_limit.get(); 
  //    // alert("Current limit "+msg_limit);
  //    if(msg_limit == ""){
  //              msg_limit = 1;
  //              t.message_show_limit.set(msg_limit);
  //    }  
  //    msg_limit = msg_limit * 8;
  //     // $('#all_messages').animate({scrollTop: $('#all_messages').prop('scrollHeight')}, 500);
  //    var result = Message.find({ $or: [
  //          {
  //           $and:
  //            [
  //             {
  //              sent_to: sent_by
  //             },
  //             {
  //              sent_by: sent_to
  //             }
  //            ]
  //          },
  //         { 
  //           $and:
  //             [
  //            {  
  //             sent_to: sent_to
  //            },
  //            {
  //             sent_by: sent_by
  //            }
  //           ]
  //          }
  //          ] },  {sort: {sentAt: -1}, limit: msg_limit}).fetch().reverse();
  // return result;
  // },

  sentby_other_user(){
   var sent_by = this.sent_by;
   var current_login_user = Session.get("userId");    
if( sent_by == current_login_user){
     return true;     
    }else{
      return false;
    }
   },

check_connection(){
  var logged_in_user = Session.get("userId");
  var sent_to = this.user_id;
  // if(logged_in_user == listed_user){
  //   var sent_to = this.user2;
  // }
  // else {
  //   var sent_to = this.user1;
  // }
  // alert('logged_in_user '+logged_in_user+'sent_to '+sent_to);
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

'check_mute_user_field':function(){
     var logged_in = Session.get("userId");
     // alert(chatroom_id +' & '+ logged_in);
     if(logged_in == this.user1){
            // alert(1);
            return true;
         }
         else{
          // alert(2);
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
   var First_name = result[0].name.split(' ');
   return First_name[0];
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
function popitup(url) {
    newwindow=window.open(url,'name','height=800,width=1200, location=10');
    if (window.focus) {newwindow.focus()}
    return false;
}

function lock_scroll(scrollLock) {
    var $window = $(window), previousScrollTop = 0;
    
    $window.scroll(function(event) {     
        if(scrollLock) {
            $window.scrollTop(previousScrollTop); 
        }
    
        previousScrollTop = $window.scrollTop();
    });
    
}

Template.messanging.events({
  'click #accept_the_call':function(event){
    $('#call_picker_dialog').modal('close');
    if(Session.get("mediaType")=="video"){
    var videoSessionId = Session.get("videoSessionId");
    //popitup("http://localhost:3000/video_chat/accept_call/"+videoSessionId);
    var openedChatRoomDetails = VideoSession.find({"video_session_id":videoSessionId}).fetch();
    // var url = "http://localhost:3000/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id;
    // var url = "http://localhost:3000/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id+"/"+videoSessionId;
    // var url = "http://localhost:3000/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id+"/"+videoSessionId;
    var url = "https://bitovn.herokuapp.com/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id+"/"+videoSessionId;
    }else{
    var videoSessionId = Session.get("audioSessionId");
    //popitup("http://localhost:3000/video_chat/accept_call/"+videoSessionId);
    var openedChatRoomDetails = AudioSession.find({"audio_session_id":videoSessionId}).fetch();
    // var url = "http://localhost:3000/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id;
    // var url = "http://localhost:3000/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id+"/"+videoSessionId;
    // var url = "http://localhost:3000/video_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id+"/"+videoSessionId;
    var url = "https://bitovn.herokuapp.com/audio_chat/"+ openedChatRoomDetails[0].caller_id+"/calling/"+openedChatRoomDetails[0].picker_id+"/"+openedChatRoomDetails[0].chatroom_id+"/"+videoSessionId;
      
    }
    popitup(url);  

},
'click #reject_the_call':function(event){
  $('#call_picker_dialog').modal('close');
  if(Session.get("mediaType")=="video"){
  var videoSessionId = Session.get("videoSessionId");  
   }else{
  var videoSessionId = Session.get("audioSessionId");      
   } 
  //rejects the call
  Meteor.call('rejects_the_call',videoSessionId,false,Session.get("mediaType"),function(error,result){
              if(error){
                console.log(error);
              }else{
                alert("You rejects the Call");
              }
          }); 
},
'click #call_button':function(event){
  var dialer = Session.get("userId");
  var picker = Session.get("msgid_forright");


  var check_chatroom = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: dialer
              },
              {
               user2: picker
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: picker
             },
             {
              user2: dialer
             }
            ]   
           }
           ] }).fetch();


  // popitup("http://localhost:3000/video_chat/"+ dialer+"/calling/"+picker+"/"+check_chatroom[0].chatroom_id);
  
  var randomNumberBetween0and19 = Math.floor(Math.random() * 2000000);
  randomNumberBetween0and19 = randomNumberBetween0and19 +"="+dialer+"="+picker;
  // popitup("http://localhost:3000/video_chat/"+ dialer+"/calling/"+picker+"/"+check_chatroom[0].chatroom_id+"/"+randomNumberBetween0and19);
  popitup("https://bitovn.herokuapp.com/video_chat/"+ dialer+"/calling/"+picker+"/"+check_chatroom[0].chatroom_id+"/"+randomNumberBetween0and19);

  var isSomeoneCalling = VideoSession.find({"video_session_id":randomNumberBetween0and19}).observe({
           added: function(newDoc) {
             },
        removed: function(oldDoc) {
        },
      changed: function(newDoc, oldDoc) {
            if(newDoc.is_picked== true){
               toastr.success("Please wait, connecting your call is picked by user", "Success");
            } else if(newDoc.is_rejected== true){
               toastr.success("User is Busy", "Alert");
               // toastr.success("Please wait, connecting your call is picked by user", "Success");
            } 
          }
    });  




},
  'click #audio_call':function(){
    var dialer = Session.get("userId");
  var picker = Session.get("msgid_forright");


  var check_chatroom = Chatroom.find({ $or: [
           {
            $and:
             [
              {
               user1: dialer
              },
              {
               user2: picker
              }
             ]
           } ,
          { 
            $and:
              [
             {  
              user1: picker
             },
             {
              user2: dialer
             }
            ]   
           }
           ] }).fetch();


  // popitup("http://localhost:3000/video_chat/"+ dialer+"/calling/"+picker+"/"+check_chatroom[0].chatroom_id);
  
  var randomNumberBetween0and19 = Math.floor(Math.random() * 2000000);
  randomNumberBetween0and19 = randomNumberBetween0and19 +"="+dialer+"="+picker;
  // popitup("http://localhost:3000/video_chat/"+ dialer+"/calling/"+picker+"/"+check_chatroom[0].chatroom_id+"/"+randomNumberBetween0and19);
  popitup("https://bitovn.herokuapp.com/audio_chat/"+ dialer+"/calling/"+picker+"/"+check_chatroom[0].chatroom_id+"/"+randomNumberBetween0and19);

  var isSomeoneCalling = AudioSession.find({"audio_session_id":randomNumberBetween0and19}).observe({
        added: function(newDoc) {
             },
        removed: function(oldDoc) {
        },
        changed: function(newDoc, oldDoc) {
            if(newDoc.is_picked== true){
               toastr.success("Please wait, connecting your call is picked by user", "Success");
            } else if(newDoc.is_rejected== true){
               toastr.success("User is Busy", "Alert");
               // toastr.success("Please wait, connecting your call is picked by user", "Success");
            } 
          }
    });  
  },

  'onblur #parent_panel':function(){
    console.log("BluRrrrrrrrrrrrrrrr");
    alert("blur event");

  },
  'scroll #message_container':function(e){
    var elem = $(e.currentTarget);
    
    if (elem.scrollTop() == 0)
    {
     
       const t = Template.instance();
    const msg_limit = t.message_show_limit.get();
    msg_limit = parseInt(msg_limit);
    msg_limit = msg_limit +1; 
    t.message_show_limit.set(msg_limit); 
     var offset = $( elem ).offset();
      $("#message_container").animate({ scrollTop: offset.top+500}, 1);

  }
/*
    var scrollTop = $(this).scrollTop();
    $('#message_container').each(function() {
        var topDistance = $(this).offset().top;

        if ( (topDistance+100) < scrollTop ) {
            alert( $(this).text() + ' was scrolled to the top' );
        }
    });
*/
  }
  ,
  // search_connection_to_message

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

 

'click #send_msg': function(){

  
  var msg_text = $('#msg_text').val();

        $('#display_conversation').removeClass('display_hide_conversation');
      $('#display_connection').addClass('display_hide_conversation');
      
     msg_text = jQuery.trim(msg_text);
     $('#auto_submit_upload').click();
    var msg_img_id = Session.get("msg_img_id");
    console.log(msg_img_id);
     if(msg_img_id){     
     console.log(msg_img_id);
       }
     else{
    if(msg_text == null || msg_text == "")
         {
           $('#msg_text').addClass('emptyfield').focus();
           return false;
         }
         else{
            $('#msg_text').removeClass('emptyfield');
             }
       msg_img_id = 0;       
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
           ] }).count();
  
  // alert('else '+check_chatroom);
  // var insert_chatroom_once = Session.get("insert_chatroom_once");
  if(check_chatroom == 0){
   var chatroom_id = 'chatroom_'+ Math.floor((Math.random() * 2465789) + 1);
   
   var length = msg_text.length;
   // alert(length);
   if(length > 24){
   var local_var_msg = msg_text.slice(0, 24);
   var last_msg = local_var_msg + '...';
   }else{
    var last_msg = msg_text;
   }

   
   var last_msg_sent_by = sent_by;
   var last_msg_id = msg_id;
   var connect_status = 0;

   var currently_typing = 0;

   Meteor.call('Update_Chatroom',chatroom_id,user1,user2,last_msg,last_msg_id,last_msg_sent_by,connect_status,
          currently_typing,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log(result);
                   }
          });   
    }
  
else if(check_chatroom > 0){

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
   // alert('current_chatroom id'+chatroom_id); 
   
   var length = msg_text.length;
   // alert(length);
   if(length > 24){
   var local_var_msg = msg_text.slice(0, 24);
   var last_msg = local_var_msg + '...';
   }else{
    var last_msg = msg_text;
   }
   
   var last_msg_sent_by = sent_by;
   var last_msg_id = msg_id;
   var currently_typing = 0;
   var connect_status = 0;

   var currently_typing_multi = check_chatroom[0].currently_typing;
    if(currently_typing_multi == 0 || currently_typing_multi == "" ){
       currently_typing = 0;
    }
    else{
      var new_multi_user = currently_typing_multi.includes(sent_by);
      if(new_multi_user){
     currently_typing   = currently_typing_multi.replace(sent_by,"").replace(",","");
        // var currently_typing = sent_by;   
      }else{
        currently_typing = currently_typing_multi; 
        // return true;  
      }
    }
       


   Meteor.call('Update_Chatroom',chatroom_id,user1,user2,last_msg,last_msg_id,last_msg_sent_by,connect_status,
          currently_typing,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log(result);
                   }
          });
    }


// $("#message_container").animate({ scrollTop: $('#message_container').prop("scrollHeight")}, 1);

 Meteor.call('insert_message',sent_by,sent_to,msg_text,msg_id,chatroom_id,msg_img_id,function(error,result){
             if(error){
              console.log('failed');
             }else{
              console.log('sucess');
              $("#message_container").animate({ scrollTop: $('#message_container').prop("scrollHeight")}, 1);
            }
            $(".form_reset").trigger('reset'); 
            Session.clear("msg_img_id");
            $('#submit_image').val('');
            $('#msg_text').val('');                  
            });      
},

'click .mute_button': function(){
  // alert('hit');

     var chatroom_id = this.chatroom_id;
     Session.setPersistent("active_chatroom_mute",chatroom_id);
     var logged_in = Session.get("userId");
     // alert(chatroom_id +' & '+ logged_in);
     if(logged_in == this.user1){
         if(this.mute_status_user1 == 'Mute'){
            var mute_status_user1 = 'Unmute';

         }
         else{
            var mute_status_user1 = 'Mute';
          }
         alert(mute_status_user1);
          Meteor.call('Update_Notification_satus_user1',chatroom_id,mute_status_user1,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log(result);
                   }
          });
     } 

     else if(logged_in == this.user2){
         if(this.mute_status_user2 == 'Mute'){
            var mute_status_user2 = 'Unmute';
         }
         else if(this.mute_status_user2 == 'Unmute'){
            var mute_status_user2 = 'Mute';
         }
       } 

          Meteor.call('Update_Notification_satus_user2',chatroom_id,mute_status_user2,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log(result);
                   }
          });
     },

//  'change #submit_image': function(e, template) {
//     upload_image(e, template);
// },

// 'focusout #msg_text': function(){
// var user_id = $('#hidden_conversation_user_id').val();  
// var msg_txt = $('#msg_text').val();  
// if(msg_txt){
//   alert('focus in captured');
// // alert(user_id);
// // var c2 = user_id + '-1';
//  // Session.setPersistent("conversation_input_active",c2);
//           var sent_by = Session.get("userId");
//          var sent_to = Session.get('msgid_forright');

//    var user1 = sent_by;
//    var user2 = sent_to;
//    // alert(user1+' & '+user2);
//    var check_chatroom = Chatroom.find({ $or: [
//            {
//             $and:
//              [
//               {
//                user1: user1
//               },
//               {
//                user2: user2
//               }
//              ]
//            } ,
//           { 
//             $and:
//               [
//              {  
//               user1: user2
//              },
//              {
//               user2: user1
//              }
//             ]   
//            }
//            ] }).count();
  
//   // alert('else '+check_chatroom);
//   // var insert_chatroom_once = Session.get("insert_chatroom_once");
  
//    if(check_chatroom > 0){
//    var check_chatroom = Chatroom.find({ $or: [
//            {
//             $and:
//              [
//               {
//                user1: user1
//               },
//               {
//                user2: user2
//               }
//              ]
//            } ,
//           { 
//             $and:
//               [
//              {  
//               user1: user2
//              },
//              {
//               user2: user1
//              }
//             ]   
//            }
//            ] }).fetch();

//    var chatroom_id = check_chatroom[0].chatroom_id;
//    var currently_typing_multi = check_chatroom[0].currently_typing;


// setTimeout(myTimeoutFunction(){
  
// if(currently_typing_multi == 0 || currently_typing_multi ==""){
//    return false;
// }
// else{
//       var new_multi_user = currently_typing_multi.includes(sent_by);
//       if(new_multi_user){
//      currently_typing   = currently_typing_multi.replace(sent_by,"").replace(",","");
//       }else{
//        return false;
//         // return true;  
//       }

//    Meteor.call('Update_currently_typing',chatroom_id,currently_typing,function(error,result){
//               if(error){
//                 console.log(error);
//               }else{
//                       console.log(result);
//                    }
//           });

//  }, 10000);

// if(currently_typing_multi == 0 || currently_typing_multi ==""){
//    return false;
// }
// else{
//       var new_multi_user = currently_typing_multi.includes(sent_by);
//       if(new_multi_user){
//      currently_typing   = currently_typing_multi.replace(sent_by,"").replace(",","");
//       }else{
//        return false;
//         // return true;  
//       }

//    // alert(currently_typing+' & '+chatroom_id);
//    Meteor.call('Update_currently_typing',chatroom_id,currently_typing,function(error,result){
//               if(error){
//                 console.log(error);
//               }else{
//                       console.log(result);
//                    }
//           });
// }
//     }
//   }
// },

'keyup #msg_text': function(){
  // alert('focus in captured');
var user_id = $('#hidden_conversation_user_id').val();  
// alert(user_id);
var c2 = user_id + '-1';
 // Session.setPersistent("conversation_input_active",c2);
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
           },
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
   var currently_typing_multi = check_chatroom[0].currently_typing;

if(currently_typing_multi == 0 || currently_typing_multi ==""){
   var currently_typing = sent_by;
}
else{

  var new_multi_user = currently_typing_multi.includes(sent_by);
  if(new_multi_user){
    // var currently_typing = sent_by;   
    return false;  
  }else{
    var currently_typing = currently_typing_multi + ',' +sent_by; 
    // return true;  
  }
}
   

   // alert(currently_typing+' & '+chatroom_id);
   Meteor.call('Update_currently_typing',chatroom_id,currently_typing,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log('typing set');
                   }
          });

    setTimeout(function(){  
     currently_typing   = currently_typing_multi.replace(sent_by,"").replace(",","");
     Meteor.call('Update_currently_typing',chatroom_id,currently_typing,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log('typing unset');
                   }
          });
 }, 10000);
    }
},
// // 'focusout #msg_text': function(){
// //               var sent_by = Session.get("userId");
// //          var sent_to = Session.get('msgid_forright');

// //    var user1 = sent_by;
// //    var user2 = sent_to;
// //    // alert(user1+' & '+user2);
// //    var check_chatroom = Chatroom.find({ $or: [
// //            {
// //             $and:
// //              [
// //               {
// //                user1: user1
// //               },
// //               {
// //                user2: user2
// //               }
// //              ]
// //            } ,
// //           { 
// //             $and:
// //               [
// //              {  
// //               user1: user2
// //              },
// //              {
// //               user2: user1
// //              }
// //             ]   
// //            }
// //            ] }).count();
  
// //   // alert('else '+check_chatroom);
// //   // var insert_chatroom_once = Session.get("insert_chatroom_once");
  
// //    if(check_chatroom > 0){
// //    var check_chatroom = Chatroom.find({ $or: [
// //            {
// //             $and:
// //              [
// //               {
// //                user1: user1
// //               },
// //               {
// //                user2: user2
// //               }
// //              ]
// //            } ,
// //           { 
// //             $and:
// //               [
// //              {  
// //               user1: user2
// //              },
// //              {
// //               user2: user1
// //              }
// //             ]   
// //            }
// //            ] }).fetch();

// //    var chatroom_id = check_chatroom[0].chatroom_id;
// //    var currently_typing = 0;
// //    alert(currently_typing+' & '+chatroom_id);
// //    Meteor.call('Update_currently_typing',chatroom_id,currently_typing,function(error,result){
// //               if(error){
// //                 console.log(error);
// //               }else{
// //                       console.log(result);
// //                    }
// //           });
// //     }

// // }
});

// function upload_image(e,template){
//     if (e.currentTarget.files && e.currentTarget.files[0]) {
//      var file = e.currentTarget.files[0];
//       if (file){
//         var uploadInstance = Images.insert({
//           file: file,
//           streams: 'dynamic',
//           chunkSize: 'dynamic'
//         });
   
//     uploadInstance.on('start', function() {
//           template.currentUpload.set(this);
//         });

//     uploadInstance.on('end', function(error, fileObj) {
//               if (error) {
//           // alert('not uploaded');
//                 window.alert('Error during upload: ' + error.reason);
//               } else {
//           // alert('uploaded');
//                 Session.setPersistent("imageUploaded_2","true");
//             Session.setPersistent("msg_image",fileObj._id+'.'+  fileObj.ext);
//                 // Session.setPersistent("Cropped","false");
//                    event.preventDefault();
//     // alert('image selceted');
//     var msg_img_id = "http://localhost:3000/cdn/storage/Images/" + fileObj._id+"/original/" + fileObj._id+"."+  fileObj.ext;
//             Session.setPersistent("msg_img_id",msg_img_id);
//         uploadInstance.start();
//       }   
//   }
// )};
// }} 


// Template.customUpload.created = function() {
//   Uploader.init(this);
// }

// Template.customUpload.rendered = function () {
//   Uploader.render.call(this);
// };

// Template.customUpload.events({
//   'click .start': function (e) {
//     // alert("Started");
//     Uploader.startUpload.call(Template.instance(), e);
//   }

// });

// Template.customUpload.helpers({
//   'infoLabel': function() {
//     var instance = Template.instance();
//     var info = instance.info.get()
//     if (!info) {
//       return;
//     }

//     var progress = instance.globalInfo.get();
//     return progress.running ?
//       info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
//       info.name + ' - ' + info.size + 'B';
//   },
//   'progress': function() {
//     return Template.instance().globalInfo.get().progress + '%';
//   },
      
//       myCallbacks: function () {
//       return {
//         finished: function (index, fileInfo, context){

//           // alert(fileInfo.path);
//           console.log('This function will execute after each fileupload is finished on the client');
//           console.log("index ", index);
//           console.log("fileInfo ", fileInfo);
//           console.log("context ", context);          
//           Session.setPersistent("upload_file",fileInfo.name);

//         }
//       }
//     }
// })









function makeGifClear(){
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
   // var currently_typing = check_chatroom[0].currently_typing;
   var user1 = check_chatroom[0].user1;
   var user2 = check_chatroom[0].user2;



   var currently_typing_multi = check_chatroom[0].currently_typing;

    if(currently_typing_multi == 0 || currently_typing_multi == "" ){
       currently_typing = 0;
    }
    else{
      var new_multi_user = currently_typing_multi.includes(sent_by);
      if(new_multi_user){
     currently_typing   = currently_typing_multi.replace(sent_by,"").replace(",","");
        // var currently_typing = sent_by;   
      }else{
        currently_typing = currently_typing_multi; 
        // return true;  
      }
    }


    
   // var currently_typing = "";

   Meteor.call('Update_currently_typing',chatroom_id,currently_typing,function(error,result){
              if(error){
                console.log(error);
              }else{
                      console.log(result);
                   }
          });
    
}
return false;

}


