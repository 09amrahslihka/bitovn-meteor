import { Template } from 'meteor/templating';
import { Base64 } from 'meteor/ostrio:base64';
import { UserInfo }  from './../../import/collections/insert.js';
import { Session } from 'meteor/session';
Template.email.helpers({
  'email_checker' : function(){
var x1 = Session.get("userId");

  if(Session.get("makeUserActive")=="true"){
    alert("Checking Current Status");
    // alert(x1);
      console.log(x1);  
      Session.setPersistent("switchToFour","false");

       var c1 = UserInfo.find({"user_id": x1}).fetch();
      console.log(c1);

      
  if(c1[0].email_status ==1){
          alert("active already");
            if(c1[0].headline){
            Router.go('/profile');
            }else{
            Router.go('/signup');
            }
        }else{
            alert("not active ");
            Meteor.call('update_email_status', Session.get("userId"), 1, function(error, result){
              if(error){
                alert('Error');
              }else{
                Router.go('/signup');
              }
            }); 
      }
  }  
}});

Template.email_template.events({
  'click #send_mail':function(event){
      var userId= Session.get("userId");
      var h1 = "hidden";
      // userId  =CryptoJS.SHA1("user_1985791").toString();

      userId= Base64.encode(userId);
      // alert(userId);  
      var userEmail = Session.get("userEmail");;
            
      var htmlCode = "<p><strong> Please click on Confirm email to continue</strong></p> <input type="+h1+" id="+userId+"  ank="+userId+"/><a id="+userId+"  ank="+userId +" href=http://localhost:3000/activate_email/"+userId + " xtarget=_blank>Confirm email</a>"
      var email = {
            to: userEmail,
            from: 'ankit.vayuz@gmail.com',
            subject: "test email",
            html: htmlCode,
        };

        Meteor.call('sendEmail', "", email,function(error,result){
        if(error){
          alert("Error");
        }else{
          alert("Send");
        }
    });


    }
  });