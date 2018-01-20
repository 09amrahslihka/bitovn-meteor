
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FriendRequest } from './../../import/collections/insert.js';
import { UserInfo } from './../../import/collections/insert.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.connection_content.onCreated(function connection_contentOnCreated() {
  this.search_conn = new ReactiveVar("");
});

// Template.connection_content.helpers({


Template.connection_content.helpers({
	request(){
		     var sent_to = Session.get("userId");
			 var count1 = FriendRequest.find({sent_to: sent_to,req_status: 0}).count();
			 return count1;
	},
     ignore(){
	 var sent_to = Session.get("userId");
	 var count2 = FriendRequest.find({sent_to: sent_to,req_status: 2}).count();
	 return count2;
	}, 

	 connection(){
	 // alert('boojj');
	 var sent_to = Session.get("userId");
	 var count3 = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to },{ req_status: 1 } ] }, { $and: [{ sent_by: sent_to },{ req_status: 1 } ] } ] }).count();
	 // alert(count3);
	 // var count3 = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to }, { sent_by: sent_by } ,{ req_status: 1 } ] }, { $and: [ { sent_to: sent_by }, { sent_by: sent_to },{ req_status: 1 } ] } ] }).fetch();
	 // var count3 = FriendRequest.find({sent_to: sent_to,req_status: 1}).count();
	 // var count3 = FriendRequest.find({sent_to: sent_to,req_status: 1}).count();
	 return count3; 	
	},

	 show_pending(){
	 var sent_to = Session.get("userId");
	 var show_pending = FriendRequest.find({sent_to: sent_to,req_status: 0}).fetch();
	 var length = show_pending.length;
	 // //alert('Length: '+length);
	 if(length > 0){
	 return show_pending;
	}
	},

	 show_pending2(){
	 var use_id = this.sent_by; 
	 // //alert(use_id);	
	 var pending_details = UserInfo.find({user_id: use_id}).fetch();
     return pending_details;
	},

	 show_ignored(){
	 var sent_to = Session.get("userId");
	 var show_pending = FriendRequest.find({sent_to: sent_to,req_status: 2}).fetch();
	 var length = show_pending.length;
	 // //alert('Length: '+length);
	 if(length > 0){
	 return show_pending;
	}
	},

	 show_ignored2(){
	 var use_id = this.sent_by; 
	 var pending_details = UserInfo.find({user_id: use_id}).fetch();
	 return pending_details;
	},
	show_connections(){
		const t = Template.instance();
	 var sent_to = Session.get("userId");
	 // //alert(sent_to); 
	 // db.friend.find({sent_to: 'user_1224544',req_status: 0}).pretty()
	 var show_pending = FriendRequest.find({ $or: [ { $and: [ { sent_to: sent_to },{ req_status: 1 } ] }, { $and: [{ sent_by: sent_to },{ req_status: 1 } ] } ] }).fetch();
	 // var show_pending = FriendRequest.find({sent_to: sent_to,req_status: 1}).fetch();
	 var length = show_pending.length;
	 //alert('Length: '+length);
	 if(length > 0){
	 return show_pending; 	
	}
	},

     show_connections_2(){
     	// alert('csss');
     var use_id = this.sent_by; 
     var logged_in = Session.get("userId");

      const t = Template.instance();
      // alert('critsmas');
     const query = new RegExp(t.search_conn.get());   
     // alert(query);

     if(t.search_conn.get() == ""){
     // alert('1');
     if(use_id == logged_in){
        use_id = this.sent_to;
        var connection_details = UserInfo.find({user_id: use_id}).fetch();
        var show_details = connection_details[0];
     console.log(connection_details);
     return connection_details; 
     }
     else{
     var connection_details = UserInfo.find({user_id: use_id}).fetch();
     var show_details = connection_details[0];
     console.log(connection_details);
     return connection_details;     
     }}else{
     	// alert('2');
if(use_id == logged_in){
        use_id = this.sent_to;
        var connection_details = UserInfo.find({user_id: use_id, name: query}).fetch();
        var show_details = connection_details[0];
     console.log(connection_details);
     return connection_details; 
     }
     else{
     var connection_details = UserInfo.find({user_id: use_id, name: query}).fetch();
     var show_details = connection_details[0];
     console.log(connection_details);
     return connection_details;     
     }
     }
     // const query = new RegExp(t.search_conn.get())   
     // if(t.search_conn.get() == ""){
     // var listing = FriendRequest.find({},{sort: {createdAt: -1}}).fetch();
     // return listing;
     // }else{
     //    return connection_details;
     // // var listing =UserGroup.find({grp_title:{$regex:query}}).fetch();
     // }
     // return listing;
 }
});

Template.connection_content.events({
	 'click .request_accept_status': function(){
	 // //alert('inside accpet request');
	 var sent_by = this.user_id;
	 var sent_to = Session.get("userId");
	 // //alert(userId);
	 var request_type = 1;
	 Meteor.call('con_req_update',sent_by,sent_to,request_type,function(error,result){
	 	if(error)
		 	{
		 	   //alert('Error');
		 	}
		 	else{
		 		//alert('sucess: '+result);
		 	}
	 });
	}
});

Template.connection_content.events({
	 'click #request_ignore_status': function(){
	 // //alert('inside ignore request');
	 var sent_by = this.user_id;
	 var sent_to = Session.get("userId");
	 // //alert(userId);
	 var request_type = 2;
	 Meteor.call('con_req_update',sent_by,sent_to,request_type,function(error,result){
	 	if(error)
		 	{
		 	   //alert('Error');
		 	}
		 	else{
		 		//alert('sucess: '+result);
		 	}
	 });
	}
});

Template.connection_content.events({
	 'click #remove_connection': function(){
	 // //alert('inside ignore request');
	 var sent_by = this.user_id;
	 var sent_to = Session.get("userId");
	 // //alert(userId);
	 var request_type = 3;
	 Meteor.call('con_req_update',sent_by,sent_to,request_type,function(error,result){
	 	if(error)
		 	{
		 	   //alert('Error');
		 	}
		 	else{
		 		//alert('sucess: '+result);
		 	}
	 });
	}
});

Template.connection_content.events({
'click #search_connection_all': function(){
	const t = Template.instance();
    // alert('sooorrr');
    // var search_text = $('#search_all_text_conn').val();
    // var result =  UserGroup.find({grp_title:{$regex:new RegExp('^' + search_text)}}).fetch();
      // alert(search_text);
      t.search_conn.set($('#search_all_text_conn').val());
      
}
});




