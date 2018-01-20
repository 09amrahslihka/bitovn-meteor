import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { UserGroup } from './../../import/collections/insert.js';
import { GroupRequest } from './../../import/collections/insert.js';

Template.messagingpage.onRendered(function(){
      $("ul.tabs").tabs();
    });

  Template.grouplisting.onRendered(function() {
  if (!localStorage.getItem("reload")) {
    /* set reload locally and then reload the page */
    localStorage.setItem("reload", "true");
    location.reload();
}
/* after reload clear the localStorage */
else {
    localStorage.removeItem("reload");
 }
})
    
Template.grouplisting.onCreated(function grouplistingOnCreated() {
  this.search = new ReactiveVar("");
  this.search_admin = new ReactiveVar("");
  this.search_pending = new ReactiveVar("");
});


Template.grouplisting.helpers({
grp_list(){
    const t = Template.instance();
     const query = new RegExp(t.search.get())   
     if(t.search.get() == ""){
     var listing = UserGroup.find({},{sort: {createdAt: -1}}).fetch();
     }else{
	 var listing =UserGroup.find({grp_title:{$regex:query}}).fetch();
     }
     return listing;
},

pending_list(){
    const t3 = Template.instance();
     // alert(t[0]);
     const query = new RegExp(t3.search_pending.get())   
     // const query = new RegExp('^' + t.search.get())
     if(t3.search_pending.get() == ""){
     var listing = UserGroup.find({},{sort: {createdAt: -1}}).fetch();
     }else{
        // query = query + '^/';
        // alert(query);
   var listing =UserGroup.find({grp_title:{$regex:query}}).fetch();
     // alert(listing.le)
     }
     return listing;
},
check_join_status(){
   var grp_id = this.grp_id;
   var userId = Session.get("userId");
   var admin = this.admin;
   // return true;
   if(userId == admin){
      return false;
   }
   var count = GroupRequest.find({grp_id: grp_id,sent_by: userId}).count();
   if(count == 0)
   {
    return true;
   }
   else{
    return false;
   }
},


grp_list_allcount(){
     var listing = UserGroup.find({},{sort: {createdAt: -1}}).count();
     return listing;
},

Show_grp_image(){
	var img = this.grp_image;
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

show_whereadmin_count(){
   var user_id = Session.get("userId");
   var listing = UserGroup.find({'admin': user_id}).count();
     return listing;      
},

show_whereadmin(){
  const t2 = Template.instance();
  var user_id = Session.get("userId");
     // alert(t[0]);
     const query = new RegExp(t2.search_admin.get())   
     // const query = new RegExp('^' + t.search.get())
     if(t2.search_admin.get() == ""){
     var listing = UserGroup.find({'admin': user_id},{sort: {createdAt: -1}}).fetch();
     }else{
        // query = query + '^/';
        // alert(query);
   var listing =UserGroup.find({grp_title:{$regex:query},'admin': user_id}).fetch();
     // alert(listing.le)
     }
     return listing;
     // var user_id = Session.get("userId");
     // var listing = UserGroup.find({'admin': user_id}).fetch();
     // return listing;  
},
group_join_status(){
   var grp_id = this.grp_id;
   var userId = Session.get("userId");
   var admin = this.admin;
   if(userId == admin){
      return 'admin';
   }
   // alert(grp_id+' '+userId);
   var count = GroupRequest.find({grp_id: grp_id,sent_by: userId,status: '1'}).count();
   // alert(count);
   if(count == 1)
   {
    return 'Member';
   }
   else{
    return 'Pending';
   }
}

});

Template.grouplisting.events({
'click #search_grp_all': function(e,t){
      t.search.set($('#search_all_text').val());
},

'click #search_grp_admin': function(e,t2){
      t2.search_admin.set($('#search_all_admin_text').val());
},

'click #search_grp_pending': function(e,t3){
      t3.search_pending.set($('#search_all_pending_text').val());
}

});
        
Template.grouplisting.events({
'click #show_group_details': function(){
var id = this.grp_id;
// alert(id);
// toastr.success(id, id);
// var encrypted = CryptoJS.AES.encrypt('id', 'Passphrase');
// alert(encrypted);
var url = '/groupdetail/'+ id;  

  Router.go(url);       

return false;  
},
'click #show_pending_details': function(){
var id = this.grp_id;
// alert(id);
// toastr.success(id, id);
// var encrypted = CryptoJS.AES.encrypt('id', 'Passphrase');
// alert(encrypted);
var url = '/groupdetail/'+ id;  

  Router.go(url);       

return false;  
},
'click #show_whereadmin': function(){
var id = this.grp_id;
// alert(id);
// toastr.success(id, id);
// var encrypted = CryptoJS.AES.encrypt('id', 'Passphrase');
// alert(encrypted);
var url = '/groupdetail/'+ id;  

  Router.go(url);       

return false;  
}

});         
         
















