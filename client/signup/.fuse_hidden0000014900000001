import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Images } from './../../import/config.js';
import { UserInfo }  from './../../import/collections/insert.js';

Template.signup.destroyed = function () {
  if (this.comp)
    this.comp.stop();
}


Template.signup.onCreated(function () {
   Geolocation.currentLocation();
 });

Template.signup.onRendered(function () {

  this.comp = Tracker.autorun(function() {
  var userId  = Session.get("userId");
  if(userId!=""){
          var users =UserInfo.find({"user_id":userId}).fetch();
  console.log(users);
  // alert("tracker");
  // alert("Users" +users.length);
  if(users[0]){
    if(users[0].email_status==0){
      Router.go('/email');
      // alert("email");
    }else if(!users[0].location){
    $('ul.tabs').tabs('select_tab', 'test3');
    // alert("location");
  }else if(!users[0].phone){
    // alert("phone");
        $('ul.tabs').tabs('select_tab', 'test5');
    }else if(!users[0].disablities){
      // alert("disablities");
        $('ul.tabs').tabs('select_tab', 'test4');
    }else if(!users[0].profile_pic){
      // alert("profile_pic ");      
        $('ul.tabs').tabs('select_tab', 'test6');
    }else if(!users[0].headline ){
     // alert("headline");     / 
        $('ul.tabs').tabs('select_tab', 'test7');
    }else{ 
         Router.go('/profile');
    }
  }
}else{
  Router.go('/');
}

});





var emptyfield =   Session.get("emptyField");
  var latlong =  Geolocation.latLng();
   if(latlong){
   console.log(latlong.lat);
   reverseGeocode.getSecureLocation(latlong.lat, latlong.lng, function(location){
    $("#autocomplete10").val(reverseGeocode.getAddrStr());
  });
   }

  if(Session.get("emptyField")=="location"){
         $('ul.tabs').tabs('select_tab', 'test3');
  }else if(Session.get("emptyField")=="phone"){
        $('ul.tabs').tabs('select_tab', 'test5');    
  }else if(Session.get("emptyField")=="speech"){
        $('ul.tabs').tabs('select_tab', 'test4');
  }else if(Session.get("emptyField")=="profile_pic"){ 
        $('ul.tabs').tabs('select_tab', 'test6');
  }else if(Session.get("emptyField")=="headline"){ 
        $('ul.tabs').tabs('select_tab', 'test7');
  }

	if(Session.get("switchToFour") == "true"){
   	$('ul.tabs').tabs('select_tab', 'test6');
	}
    $('#divcrop').hide();
    $('#crop_image').hide();
    $('#crop_cancel').hide();

	Session.set("currentIndex","0");
  // $result = $('#result');
        
	
        
});

Template.dme.helpers({
  uploaded_image:function(){

  var imagePath = Session.get("imagePath");
    
  if(imagePath){
  var display_image =  imagePath;
    return display_image;
  }
  else{
   var  display_image = '/uploads/default/Default_group.png';
     Session.setPersistent("imagePath",display_image);
    return display_image;
  }
}
})


Template.dme.helpers({
	cropped_image:function(){
  // var imagePath = Session.get("imagePathcropped");
  if(imagePath){
  	var display_image =  imagePath;
    return display_image;
	}
  else{
      var display_image = '/uploads/default/Default_group.png';
    return display_image;
  }
}
})





Template.signup.events({
 'keyup input': function(event) {
      if (event.which === 13) {
        if(Session.get("currentIndex")== 0){
			validation_address_field();
        }else if(Session.get("currentIndex")==1){
			validation_contact_no();
        }else if(Session.get("currentIndex")==2){
        	validation_for_disability();
        }
         event.stopPropagation();
         return false;
      }
  },
'click #adderss_field'(event) {
	validation_address_field();
},
'click #contact_no_button'(event){
	
	validation_contact_no();	
},
'click #disability'(event){
	  validation_for_disability();
},
 'change #fileInput': function(e, template) {
  	upload_image(e, template);
},
'click #crop_image':function(){
    crop_image();
},'click #crop_cancel':function(){
  alert('Relaod');
  Session.setPersistent("switchToFour","true");
  Session.clear("imagePath");
  location.reload();
},
'click #Hearin':function(){
  if(document.getElementById("not_disabled").checked){
       document.getElementById("not_disabled").checked = false; 
  }
},'click #Speech':function(){
  if(document.getElementById("not_disabled").checked){
       document.getElementById("not_disabled").checked = false; 
  }
},'click #Visually':function(){
  if(document.getElementById("not_disabled").checked){
       document.getElementById("not_disabled").checked = false; 
  }
},'click #Physical':function(){
  if(document.getElementById("not_disabled").checked){
       document.getElementById("not_disabled").checked = false; 
  }
},
'click #not_disabled':function(){
   if(document.getElementById("not_disabled").checked){
    document.getElementById("Hearin").checked = false; 
    document.getElementById("Speech").checked = false;
    document.getElementById("Visually").checked = false;
    document.getElementById("Physical").checked = false;
  }  
},
'click #submit_image':function(){
  if(Session.get("imageCropped")=="true"){
    Meteor.call("upload_user_image",Session.get("userId"),Session.get("imagePath"),function(error,result){
        if(error){
          alert("Error");
        }else{
           Session.setPersistent("switchToFour","false");
          Session.setPersistent("imageCropped","false");
         $('ul.tabs').tabs('select_tab', 'test7'); 
        }
    });
  }else{
    alert("Select image first");
  }
},
'click #profile_headline':function(){
  var data= $('#textarea1').val();
  if(data==""){
    alert("Headline could not be empty");
  }else{
      Meteor.call("update_headline",Session.get("userId"),data,function(error,result){
        if(error){
          alert("Error");
        }else{
        Router.go('/profile');
        }
         
    });

  }
}
});

 


function validation_address_field(){
	var adderss_field = $("#autocomplete10").val();
	if(adderss_field!=""){

	Meteor.call('insert_address', Session.get("userId"), adderss_field, function(error, result){
		if(error){
			alert('Error');
		}else{
			Session.set("currentIndex","1");
			Session.setPersistent("address",adderss_field);
				if(Session.get("address") == "pak")
		      {
		      	$("#contact_no").val("92");
		      	var  address  =Session.get("address"); 
				alert(address);
		      }
			$('ul.tabs').tabs('select_tab', 'test5');			      
		}
	});	
}else{
	alert("Address could not be empty");
}
}



function validation_contact_no(){
	var contact_no = $("#contact_no").val();

  // var edu_grade = $("#education_grade").val();
      contact_no = jQuery.trim(contact_no);
    if(!contact_no.match(/^\d+$/))
  {   
    alert("number can only be integer");  
    $("#contact_no").focus().addClass('emptyfield');   
    return false;   
  }   
else{
if(contact_no=="" || contact_no==null){
	alert("Contact no could not be empty");
	}else if(contact_no.length != 10 ){
		alert("Invalid");
	}
	else{
	Meteor.call('insert_contact_no', Session.get("userId"), contact_no, function(error, result){
		if(error){
			alert('Error');
		}else{
			Session.set("currentIndex","2");
			$('ul.tabs').tabs('select_tab', 'test4');			      
		}
	});	
}
}
}

function validation_for_disability(){
	  	 
        var hearing = document.getElementById("Hearin");
        if (hearing.checked) {
			hearing = 'Yes';
		} else {
			hearing = 'No';
    }
         
		var speech = document.getElementById("Speech");
        if (speech.checked) {
        	speech = 'Yes';
        } else {
			     speech = 'No';
        }


        var visual = document.getElementById("Visually");
        if (visual.checked) {
        	visual = 'Yes';
        } else {
        	visual='No';
        } 

        var physical = document.getElementById("Physical");
          if (physical.checked) {
  			   physical  ='Yes';
           } else {
        	 physical  ='No';
        }
         var special_note = $("#special_note").val();
         

        
  Meteor.call('insert_disabilities', Session.get("userId"), hearing, speech, visual, physical, special_note, function(error, result){
		if(error){
			alert('Error');
		}else{

			Session.set("currentIndex","3");
			$('ul.tabs').tabs('select_tab', 'test6');			      
		}
	});	



}
function upload_image(e,template){
	  	 
   e.preventDefault();
    var files = e.currentTarget.files;
   
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
            var imagePath = "https://bitovn.herokuapp.com/cdn/storage/Images/" + fileObj._id+"/original/" + fileObj._id+"."+  fileObj.ext;
             Session.setPersistent("imagePath",imagePath);


            // $('#divcrop').show();
            // $('#defaultbox').hide();

            $("#my_image_profile").attr("src",imagePath);
            // $('#divcrop').addClass('cropper-example-lena');

             $('.cropper-example-lena > img').cropper({
             aspectRatio: 8 / 8,
            autoCropArea: 0.65,
            strict: true,
            guides: true,
            highlight: true,
            dragCrop: true,
            cropBoxMovable: true,
            cropBoxResizable: true
            });

    $('#crop_image').show();
    $('#crop_cancel').show();

               $("#show_cropping_options").show();

		      }
		 });

        // uploadInstance.start();
      }
    
  }

}

function crop_image(){
	 event.preventDefault();
  var croppedPhoto = $('#my_image2').cropper('getCroppedCanvas');

    croppedPhoto.toBlob(function (blob) {
          var reader = new window.FileReader();
                reader.readAsDataURL(blob); 
                reader.onloadend = function() {
 			
                base64data = reader.result; 
                console.log(base64data);  
                // alert(base64data);
                var file = blobToFile(blob,"Ankit.png");
        var uploadInstance = Images.insert({
                      file: file,
                        streams: 'dynamic',
                          chunkSize: 'dynamic'
                    });

        uploadInstance.on('start', function() {
          // template.currentUpload.set(this);
        });
        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
             alert("Error");
            window.alert('Error during upload: ' + error.reason);
          } else {
            Session.set("Cropped","true");
      			Session.setPersistent("imageUploaded","true");
            // Session.setPersistent("imagePath",fileObj._id+'.'+  fileObj.ext);

             var imagePath = "https://bitovn.herokuapp.com/cdn/storage/Images/" + fileObj._id+"/original/" + fileObj._id+"."+  fileObj.ext;
             // alert(imagePath);
             Session.setPersistent("imageCropped","true");
             Session.setPersistent("imagePath",imagePath);
                
             $("#crop_image").hide();
             $("#divcrop").hide();
             $('#divcrop').removeClass('cropper-example-lena');
             $("#defaultbox").show();

             $("#my_image").attr("src",imagePath); 
            
             $("#my_image2").attr("src","");
             $("#show_cropping_options").show();
          }
        });
}
});
}

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

