import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Session } from 'meteor/session';
import { UserGroup } from './../../import/collections/insert.js';
import { UserInfo } from './../../import/collections/insert.js';
import { GroupRequest } from './../../import/collections/insert.js';



Template.grpdetail.helpers({
	show_group_details(){
		var g1 = Session.get("show_grp_id");
		var head = UserGroup.find({grp_id: g1}).fetch();
		// alert(head);
		return head;
	},

	Show_grp_image(){
	var img = this.grp_image;
    // alert(img);
    var default_value = 'Default_group.png';
    if(img ==  default_value)
    {
    var display_image = '/uploads/default/'+ img;
    }
    else{
	var display_image = img;
    }
    return display_image;
    },
    
	show_admin_details(){
      var user_id = this.admin;
      var head = UserInfo.find({user_id: user_id});
      return head;
	},

	Show_admin_image(){
	var img = this.profile_pic;
    var default_value = 'default-profile-pic.png';
    if(img ==  default_value)
    {
    var display_image = '/uploads/default/'+ img;
    }
    else{
	var display_image = img;
    }
    return display_image;
    },

    activity_status(){
    var activity_status  = this.activity_status;
    if(activity_status == 1){
    	return true;
    }
    else{
    	return false;
    }
    },

    current_user_admin(){
      var userId = Session.get("userId");
      var group_admin = this.admin;
      if(userId == group_admin)
      {
        return true;
      }
      else{
        return false;
      }
    },

    join_status(){
    var sent_by = Session.get("userId");
    var grp_id = Session.get("show_grp_id");
    var count = GroupRequest.find({sent_by: sent_by,grp_id: grp_id }).count();
    // alert(count);
    if(count == 0){
      return true;
    }
    else{
      return false;
    }
    },

   all_memeber(){
   // var sent_by = Session.get("userId");
   var grp_id = Session.get("show_grp_id");
   var allmember = GroupRequest.find({grp_id: grp_id }).fetch();
   var allmember_count = GroupRequest.find({grp_id: grp_id}).count();
   // alert(allmember);
   Session.setPersistent("show_member_count",allmember_count);
   console.log(allmember[0]);
   return allmember;
   },

    all_memeber_2(){
    var sent_by = this.sent_by;
    // var grp_id = this.grp_id;
    // alert(sent_by);

    var user_pic = UserInfo.find({user_id: sent_by}).fetch();
    // alert(user_pic[0]);
    console.log(user_pic[0]);
    return user_pic;
    },
    Show_members_count(){
      var get_count = Session.get("show_member_count");
      return get_count;
    }
	});

Template.grpdetail.events({
'click .redirect_click_1': function(event){
    event.preventDefault();
    var user_id = this.user_id;
    var head = UserInfo.find({user_id: user_id}).fetch();
    Session.setPersistent("show_connection",head[0].user_id);
    var show_collection = Session.get("show_connection");
    var user_id = Session.get("userId");
    var url = '/view_profile/'+head[0].user_id;
    if(show_collection == user_id)
    {
      Router.go('/profile');    
    }
    else{
    Router.go(url);
    }
},

'click .activity_status': function(){
	 var grp_id = this.grp_id;
   var activity_status = $('.activity_status').attr('newvalue');
   alert(activity_status+' & '+grp_id);
   Meteor.call("update_Group_activity",grp_id,activity_status,function(error,result){
     if(error){ 
     	alert('Failure in updating activity status');
     } 
     else{  
     	alert('activity status successfully updated');	 
     }
   });   
},

'click #edit_group_3': function(){
    var grp_id = this.grp_id;
    var url = '/editgroup/'+ grp_id;
    alert(url);
    Router.go(url);    
},

'click #Join_group': function(){
    var sent_by = Session.get("userId");
    req_id = 'grp_req_'+ Math.floor((Math.random() * 2465789) + 1);
    status = 1;

    var grp_id = Session.get("show_grp_id");
    Meteor.call('insert_group_request',req_id,sent_by,grp_id,status,function(error,result){
          if(error){
            console.log('error');
          }
          else{
            console.log('Sucess');
          }
        });  
},

'click #leave_group': function(){
    var sent_by = Session.get("userId");
    var answer = confirm("Are you sure, you want to Leave this group")
    
    if(answer){
    var grp_id = Session.get("show_grp_id");
    Meteor.call('remove_group_request',sent_by,grp_id,function(error,result){
    if(error){
            console.log('error');
    }
    else{
            console.log(' Sucessfully Removed ');
    }          
  });
}
else {
    return false;
}
},               
});


