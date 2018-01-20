
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { UserInfo } from './../../import/collections/insert.js';
import { UserSkill } from './../../import/collections/insert.js';
import { UserProfJr } from './../../import/collections/insert.js';
import { UserEdu } from './../../import/collections/insert.js';
import { UserAward } from './../../import/collections/insert.js';
import { UserMedical } from './../../import/collections/insert.js';
import { FriendRequest } from './../../import/collections/insert.js';

Template.con_heading.helpers({
  show_display_heading: function(){ 
      var show_connection = Session.get("show_connection");  
      // //alert(show_connection);  
    var head = UserInfo.find({user_id: show_connection});  
    // console.log(head);  
    // postCreatorName[0].name  
    // hea'd = JSON.stringify(head);  
    // //alert(head);  
    // //alert("A"+);  
    // //alert(head);  
    return head;  
  }  
});  


Template.view_profile.helpers({
 show_display_name(){
    var show_connection = Session.get("show_connection");
  var head = UserInfo.find({user_id: show_connection}).fetch();
  // //alert(head[0].name);
    Session.setPersistent('show_con_id',show_connection);
  return head;
 }  
});

Template.view_profile.helpers({
 show_display_summary: function(){
    var show_connection = Session.get("show_connection");
    var summary_1 = UserInfo.find({user_id: show_connection}).fetch();
    // postCreatorName[0].name
    return summary_1;
  }
});  


Template.con_personalinfo.helpers({
  show_display_info(){
      var show_connection = Session.get("show_connection");
    return UserInfo.find({user_id: show_connection}).fetch();
  }
});

Template.con_professional.helpers({
    show_show_profjr(){
      // //alert('coolz');
        var show_connection = Session.get("show_connection");
       var result =  UserProfJr.find({user_id: show_connection}).fetch();
       console.log(result);
       // //alert(result);
       return result;
    }
});

Template.con_edudetails.helpers({
    show_show_education(){
      // //alert('coolz');
        var show_connection = Session.get("show_connection");
       var result =  UserEdu.find({user_id: show_connection}).fetch();
       // console.log(result);
       // //alert(result);
       return result;
    },
    // per_or_cgpa(){
    //   var result =  UserEdu.db.user_edu.find({"user_id": 100},{"score": 1});
    //   db.name.find({ "_id": 100 },{"score": 1 });
    // }
    show_score(score){
        var score = score.split('/');

        var length = score.length;
        if(length == 2)
        {
          return 'Score(CGPA):';
        }
        else if(length == 1)
        {
          return 'Score(%):';
        }
    }
});


Template.con_achievement.helpers({
    show_display_award(){
        var show_connection = Session.get("show_connection");
       var result =  UserAward.find({user_id: show_connection});
       return result;
    }
});

Template.con_skill.helpers({
    show_show_skills(){
        var show_connection = Session.get("show_connection");
       var result =  UserSkill.find({user_id: show_connection});
       return result;
    }
});

Template.con_health.helpers({
    show_display_health(){
        var show_connection = Session.get("show_connection");
       var result =  UserMedical.find({user_id:show_connection}).fetch();
       // //alert(result);
       return result;
    }
});

Template.connectionstatus.events({
    'click #connect_now':function(event){
      var sent_to = Session.get("show_connection");
      var sent_by = Session.get("userId");
      var reqID = 'req_'+Math.floor((Math.random() * 2465789) + 1);

      Meteor.call('con_req_insert',sent_to,sent_by,reqID,function(error,result){
      if(error){
        //alert('Error in sending request !!!');
      }else{
        //alert('Request Successfully Sent.');
      }
      });
    }
});
Template.connectionstatus.helpers({
    connected_status(){
     // //alert('holla');
      var sent_to = Session.get("show_connection");
      var sent_by = Session.get("userId");
      // //alert('sent_to:'+sent_to+' sent_by:'+sent_by);
      var reqID = 'req_'+Math.floor((Math.random() * 2465789) + 1);
      // db.friend.find({sent_to: 'user_931176',sent_by: 'user_1224544',req_status: 0});  
      // var show_button = FriendRequest.find({sent_to: sent_to,sent_by: sent_by}).fetch();
      var show_button = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to }, { sent_by: sent_by } ] }, { $and: [ { sent_to: sent_by }, { sent_by: sent_to } ] } ] }).fetch();
      console.log(show_button);
      var length = show_button.length;
      //alert(length);  
      if(length > 0 )  
      {   
        //alert('length > 0 ');   
       var status = show_button[0].req_status;   
       //alert('status is : '+status);
      if(status == 0) {  
      $('#connect_now').attr("disabled", "disabled");  
       $('#connect_now').prop('disabled', false);
      return 'Pending';  
      }   
      else if(status == 1){   
      $('#connect_now').attr("disabled", "disabled");  
       $('#connect_now').prop('disabled', false);
      return 'connected';  
      }
    }
      else{        
        return 'Connect';
      }
    },
    connected_status_1(){
     // //alert('holla');
      var sent_to = Session.get("show_connection");
      var sent_by = Session.get("userId");
      // //alert('sent_to:'+sent_to+' sent_by:'+sent_by);
      var reqID = 'req_'+Math.floor((Math.random() * 2465789) + 1);
      // db.friend.find({sent_to: 'user_931176',sent_by: 'user_1224544',req_status: 0});  
      // var show_button = FriendRequest.find({sent_to: sent_to,sent_by: sent_by}).fetch();
      var show_button = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to }, { sent_by: sent_by } ] }, { $and: [ { sent_to: sent_by }, { sent_by: sent_to } ] } ] }).fetch();
      console.log(show_button);
      var length = show_button.length;
      //alert(length);  
      if(length > 0 )  
      {   
        //alert('length > 0 ');   
       var status = show_button[0].req_status;   
       //alert('status is : '+status);
      if(status == 0) {  

      // return 'Pending';  
      return true;  
      }   
      else if(status == 1){   
      $('#connect_now').attr("disabled", "disabled");  
       $('#connect_now').prop('disabled', false);
      // return 'connected';  
      return false;  
      }
    }
      else{        
        // return 'Connect';
        return false;
      }
    }
});

Template.view_profile.onRendered(function(){
  // in here, the router has already determined the current route and everything

      var sent_to = Session.get("show_connection");
      alert(" Sent to "+sent_to );
      var sent_by = Session.get("userId");
      // //alert('sent_to:'+sent_to+' sent_by:'+sent_by);
      var reqID = 'req_'+Math.floor((Math.random() * 2465789) + 1);
      // db.friend.find({sent_to: 'user_931176',sent_by: 'user_1224544',req_status: 0});  
      var show_button = FriendRequest.find({sent_to: sent_to,sent_by: sent_by}).fetch();
      // //alert(show_button);
      var length = show_button.length;
      // //alert(length);
      // if(length == 1)
      // {

      // $('#connect_now').attr("disabled", "disabled");  
      // return 'Pending';  
      // }
      // else{        
      //   return 'Connect';
      // }
        if(length > 0 )  
      {   
        //alert('length > 0 ');   
       var status = show_button[0].req_status;   
       //alert('status is : '+status);
      if(status == 0) {  
      $('#connect_now').attr("disabled", "disabled");  
      $('#connect_now').prop('disabled', false);
        }
      // return 'Pending';  
      }   
      else if(status == 1){   
      $('#connect_now').attr("disabled", "disabled"); 
       $('#connect_now').prop('disabled', false); 
      return 'connected';  
      }

});

