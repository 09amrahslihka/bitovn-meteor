import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from './../../import/config.js';
import { UserGroup } from './../../import/collections/insert.js';
import { Session } from 'meteor/session';

    Template.messagingpage.onRendered(function(){
      $("ul.tabs").tabs();
    });

    Template.messagingpage.destroyed = function() {
      Session.unset("edit_imagePath_gp");
      };

    Template.groupedit.events({
      'click #edit_save_group': function(event){
        event.preventDefault(); 
        var grp_title = $('#edit_grp_title').val(); 
        var grp_image = $('#fileInput_hidden').val();  
        var grp_type = $('#edit_grp_type').val(); 
        var grp_discription = $('#edit_grp_discription').val(); 
        var grp_visibility = $('#grp_visibility').val();  

       if (document.getElementById('edit_grp_visibility_1').checked) {
                 var grp_visibility = 'Public';
              }
              else{
                 var grp_visibility = 'Private';
              }
            
if(grp_title == null || grp_title == "")
        {
          $('#edit_grp_title').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_grp_title').removeClass('emptyfield');
        }
        if(grp_type == null || grp_type == "")
        {
          $('#edit_grp_type').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_grp_type').removeClass('emptyfield');
        }
        if(grp_discription == null || grp_discription == "")
        {
          $('#edit_grp_discription').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_grp_discription').removeClass('emptyfield');
        }
        alert(grp_title + grp_type + grp_discription + grp_visibility);
        // var image_Name = Session.get("edit_imagePath_gp");        

    var image_Name_2 = Session.get("edit_imagePath_gp");
    alert(image_Name_2);
    if(image_Name_2 == "" || image_Name_2 == null || image_Name_2 == 'undefined') {
      // if(grp_image != 'undefined' && grp_image != '' ){
      //       var image_Name = this.grp_image;    
      //     }
      console.log(image_Name_2);
      var image_Name = grp_image;
    }
    else{
      var image_Name = image_Name_2;
    }

        var activity_status = this.activity_status;
        var user_id = Session.get("userId");
        // grp_id = 'grp_'+ Math.floor((Math.random() * 2465789) + 1);
        var grp_id = this.grp_id;
        alert(user_id+' '+grp_image+' '+grp_title+' '+grp_type+' '+grp_discription+' '
          +grp_visibility+' '+grp_id+' '+activity_status);
        
          Meteor.call("update_Group_details",user_id,grp_image,grp_title,grp_type,grp_discription,grp_visibility,grp_id,activity_status,function(error,result){
          if(error){
            alert('Error');
          }else{
            alert('sucessfull');
          }
        });
        Session.clear("edit_imagePath_gp");
        var url = '/groupdetail/'+ this.grp_id;
        Router.go(url);
    }
    });

    Template.groupedit.helpers({
load_edit_form(){
  // alert('ttt');
    var grp_id = Session.get("show_grp_edit_id");
    // alert(grp_id);
    var listing = UserGroup.find({grp_id: grp_id}).fetch();
    // alert(listing);
    console.log(listing);
    return listing;
},
  uploaded_image:function(){
  // alert('user cover');
  // var display_image = '/uploads/'+uploaded_image;
  var user_id = Session.get("userId");
  // alert(user_id);
  // var head = .find({user_id: user_id}).fetch();
  // 

    var image_Name_2 = Session.get("edit_imagePath_gp");
    if(image_Name_2 == "" || image_Name_2 == null || image_Name_2 == 'undefined') {
    var image_Name = this.grp_image;    
    }
    else{
      image_Name = image_Name_2;
    }
    // alert(image_Name);
  // alert(head[0].cover_image);
  // var image_Name = head[0].cover_image;
  if(image_Name){ 
  var display_image = image_Name;
  // alert(display_image);
    return display_image;
  }
  else{
           var display_image = '/uploads/default/Default_group.png';
           // alert(display_image);
           return display_image;
     }
  }
})

Template.groupedit.events({
 'change #fileInput': function(e, template) {
    upload_image(e, template);
},
'click #crop_image':function(){
    crop_image();
}
});

function upload_image(e,template){
    // e.preventDefault();
    // var files = e.currentTarget.files;
   
    if (e.currentTarget.files && e.currentTarget.files[0]) {
     var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        });

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });
        
        // Session.setPersistent("Cropped","true");

    uploadInstance.on('end', function(error, fileObj) {
              if (error) {
          alert('uploaded');
                window.alert('Error during upload: ' + error.reason);
              } else {
                Session.setPersistent("imageUploaded_2","true");
            // Session.setPersistent("edit_imagePath_gp",fileObj._id+'.'+  fileObj.ext);
                // Session.setPersistent("Cropped","false");
                   event.preventDefault();
    // alert('image selceted');

    var imagePath_gp = "http://localhost:3000/cdn/storage/Images/" + fileObj._id+"/original/" + fileObj._id+"."+  fileObj.ext;
    Session.setPersistent("edit_imagePath_gp",imagePath_gp);

          }
     });
        uploadInstance.start();
      }   
  }
}


