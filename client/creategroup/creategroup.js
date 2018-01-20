import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from './../../import/config.js';

    Template.messagingpage.onRendered(function(){
      $("ul.tabs").tabs();
    });

    Template.messagingpage.destroyed = function() {
      Session.unset("imagePath_gp");
      };
    
    Template.groupcreate.events({
    	'click #save_group': function(event){
    		event.preventDefault(); 
    		var grp_title = $('#grp_title').val();	
    		var grp_type = $('#grp_type').val();	
    		var grp_discription = $('#grp_discription').val();	
			 if (document.getElementById('grp_visibility_1').checked) {
			           var grp_visibility = 'Public';
			        }
			        else{
			           var grp_visibility = 'Private';
			        }  	
if(grp_title == null || grp_title == "")
        {
          $('#grp_title').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#grp_title').removeClass('emptyfield');
        }
        if(grp_type == null || grp_type == "")
        {
          $('#grp_type').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#grp_type').removeClass('emptyfield');
        }
        if(grp_discription == null || grp_discription == "")
        {
          $('#grp_discription').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#grp_discription').removeClass('emptyfield');
        }
    		var image_Name = Session.get("imagePath_gp");
        if(image_Name){
          var grp_image = image_Name;      
        }    
        else{
        var grp_image = 'Default_group.png';
    }
        var user_id = Session.get("userId");
        grp_id = 'grp_'+ Math.floor((Math.random() * 2465789) + 1);
    		Meteor.call('insert_Group_details',user_id,grp_image,grp_title,grp_type,grp_discription,grp_visibility,grp_id,function(error,result){
    			if(error){
    				alert('Error');
    			}else{
    				alert('sucessfull');
    			}
    		});
    var sent_by = Session.get("userId");
    req_id = 'grp_req_'+ Math.floor((Math.random() * 2465789) + 1);
    status = 1;
    Meteor.call('insert_group_request',req_id,sent_by,grp_id,status,function(error,result){
          if(error){
            console.log('error');
          }
          else{
            console.log('Sucess');
          }
        });

        Session.clear("imagePath_gp");
        Router.go('/grplisting');    
    }
    });

  Template.groupcreate.helpers({
  uploaded_image:function(){
  var user_id = Session.get("userId");
    var image_Name = Session.get("imagePath_gp");
  if(image_Name){ 
  var display_image = image_Name;
    return display_image;
  }
  else{
           var display_image = '/uploads/default/Default_group.png';
           return display_image;
     }
  }
})

Template.groupcreate.events({
 'change #fileInput': function(e, template) {
    upload_image(e, template);
},
'click #crop_image':function(){
  crop_image();
}
});

function upload_image(e,template){
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
    uploadInstance.on('end', function(error, fileObj) {
              if (error) {
          alert('uploaded');
                window.alert('Error during upload: ' + error.reason);
              } else {
                Session.setPersistent("imageUploaded_2","true");
                event.preventDefault();
    var imagePath_gp = "http://localhost:3000/cdn/storage/Images/" + fileObj._id+"/original/" + fileObj._id+"."+  fileObj.ext;
    Session.setPersistent("imagePath_gp",imagePath_gp);
          }
     });

        uploadInstance.start();
      }   
  }
}
