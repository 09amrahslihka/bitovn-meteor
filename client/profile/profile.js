
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Base64 } from 'meteor/ostrio:base64';

import { UserInfo } from './../../import/collections/insert.js';
import { UserSkill } from './../../import/collections/insert.js';

import { UserProfJr } from './../../import/collections/insert.js';
import { UserEdu } from './../../import/collections/insert.js';

import { UserAward } from './../../import/collections/insert.js';
import { UserMedical } from './../../import/collections/insert.js';

import { Images } from './../../import/config.js';
import { Group } from './../../import/collections/insert.js';

// Template.hello.onRendered(function() {
//   var user_id = Session.get("userId");
//   $("#show_modal_body").fadeOut("slow");
// })

Template.profile.onRendered(function() {
Tracker.autorun(function () {
        var user_id = Session.get("userId");    
        UserSkill.find({user_id: user_id}).observe({
            // added: function(document) {
            //     console.log('a new document has been added');
            // },
            changed: function(newDocument) {
                alert('a document has been changed -autorun alert');
                console.log('a document has been changed');
            },
            removed: function(document) {
                alert('a document has been removed autorun alert');
                console.log('a document has been removed');
            }
        });

        var login_status = Session.get("login_status");     
        if(login_status == 0){
          alert(" user Inactive ");
            var login_status = 0;
            var userId = Session.get("userId");
            Meteor.call("update_login_status",login_status,userId,function(error,result){
              if(error){
                alert('user login status updation error');
                console.log('error');
              }
              else{
                alert('user is now offline');
                 console.log('result');
              }
            Session.clear("login_status");     

            });
        }
    })
});
                                            
Template.summary.events({
  'click .save_summary': function(event){
        // alert('hello');
        event.preventDefault();
        // alert('hello');
        var summary = $('#summary').val();
        //alert(summary_text);
        if(summary == null || summary == "")
        {
          $('#summary').addClass('emptyfield').focus();
          return false; 
        }
        else{
          $('#summary').removeClass('emptyfield');
        }
        var userId = Session.get("userId");
        Meteor.call('update_summary',userId,summary,function(error,result){
          if(error){

            console.log('error');
          }
          else{
            console.log('Sucess');
          }
        });

        $(".form_reset").trigger('reset');
        $('.modal').modal('close');
  }
});

Template.heading.events({
  'click .save_heading': function(event){
        // alert('hello');
        event.preventDefault();
        // alert('hello');
        var heading = $('#heading').val();
        // alert(heading);
        if(heading == null || heading == "")
        {
          $('#heading').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#heading').removeClass('emptyfield');
        // }
        var userId = Session.get("userId");
        Meteor.call('update_headline',userId,heading,function(error,result){
            if(error){
              // alert('Error');
              console.log('error');
            }else{
              // alert('Sucess');
              console.log('Sucess');
            }
        });
        // UserInfo.update({'_id': user_id},{$set: {'heading': heading_text}});
        //alert('inserted');
        $(".form_reset").trigger('reset');
        $('.modal').modal('close');
  }
}
});

Template.heading.helpers({
  display_heading: function(){
    var user_id = Session.get("userId");
    var head = UserInfo.find({user_id: user_id});
    // postCreatorName[0].name
    return head;
  }
});

Template.passion.helpers({
  passion_list: function(){
    var user_id = Session.get("userId");
    var head = UserInfo.find({user_id: user_id});
    // postCreatorName[0].name
    return head;
  }
});

Template.summary.helpers({
 display_summary: function(){
  var user_id = Session.get("userId");
    var summary_1 = UserInfo.find({user_id: user_id});
    // postCreatorName[0].name
    return summary_1;
  },
  summery_helper_2(summary){
    var summary_text = summary;
    var count = summary_text.length;
    // $('#read_more_summary').addClass('hide_redmore');
    // alert('Added');
    if(count > 460){
          var summary_text = summary_text.slice(0,460);
           // $('#read_less_summary').removeClass('hide_redmore');
           // $('#read_more_summary').removeClass('hide_redmore');
    }
    // alert(summary_text);
    // $('#read_more_summary').addClass(hide_redmore);
    return summary_text;
  },
  show_Readless(){
    var summ = this.summary;
    // alert(summ);
    var count = summ.length;
    // $('#read_more_summary').addClass('hide_redmore');
    // alert('Added');
    if(count > 460){
          return true;
    }
  }
});                          

Template.summary.events({
 'click #edit_2': function(){
      //alert('tron');{
            var summary = this.summary;
            $('#summary').val(summary);
            // $('#summary').val(con);
        },
        'click #read_more_summary': function(){
          var ww = this.summary;
          // alert("sum: "+ww);
          $('#summary_display_3').text(ww);

          $('#read_more_summary').addClass('hide_redmore');
          $('#read_less_summary').removeClass('hide_redmore');
        },

       'click #read_less_summary': function(){
          // var ww = this.summary;
     var summary_text = this.summary;
    var count = summary_text.length;
    if(count > 440){
          var summary_text = summary_text.slice(0,440);
    }
              $('#summary_display_3').text(summary_text);

          $('#read_less_summary').addClass('hide_redmore');
          // $('#read_more_summary').addClass('hide_redmore');
          $('#read_more_summary').removeClass('hide_redmore');
        },

      });  

Template.skill.events({
 'click #edit_8': function(){
      //alert('tron');{
            var awd_expert = this.awd_expert;
            var last_used = this.last_used;
            var skill_name = this.skill_name;
            var skill_id = this._id;

            $("#edit_awd_expert").dropdown("set selected", awd_expert);
            $("#edit_last_used").dropdown("set selected", last_used);
            // $("#edit_skill_name").dropdown("set selected", skill_name);
            $('#edit_skill_name').val(skill_name);
            $('#hidden_edit_skill_name').val(skill_id);
        },

      });

Template.heading.events({
 'click #edit_1': function(){
            var headline = this.headline;
            $('#heading').val(headline);
        }
      }); 

Template.passion.events({
 'click #load_passion': function(){
            var passion = this.passion;
            // $('#heading').val(headline);
            // $('#my_passion').dropdown('set selected', passion);
           // $('.ui.fluid.dropdown').dropdown('set selected',passion);
            // $('#my_passion').dropdown('set selected',['design','css']);
            $('#my_passion').dropdown({   
              allowAdditions: true   
            });    

              
            var dummy_variable = passion.split(',');   
            var hobbies = new Array();   
            var length = dummy_variable.length;   
            // console.log(dummy_variable+'and length is '+length); 
           // alert(dummy_variable);
          for(var i = 0; i < length ; i++){   
          // if(hobbies == 0){
            // hobbies = "'" +dummy_variable[i] +"'";
            // console.log(hobbies);
          // }  
          // else{
          // hobbies = hobbies+','+"'"+dummy_variable[i]+"'";   
                   
          // }
          hobbies.push(dummy_variable[i]);
        }
        // console.log(hobbies);

        // console.log(tassion);
        // alert(hobbies);  
        console.log(hobbies);
        $('#my_passion').dropdown('set selected', hobbies);
        }
      });  

Template.personalinfo.events({
 'click #edit_peronal_info': function(){
             var user_id = Session.get("userId");
            var perinfo =UserInfo.find({user_id: user_id}).fetch();
            // console.log(perinfo);
            var name = perinfo[0].name;
            var dob = perinfo[0].dob;
            var phone = perinfo[0].phone;
            var location = perinfo[0].location;          
            var gender = perinfo[0].gender;
            var marital_status = perinfo[0].marital_status;
            // alert(name+dob+phone+location+gender+marital_status);
            if(name)
            {
              var name2 = name.split(' ');
              // alert(name2[0]);
              // alert(name2[1]);
              // alert(name2[2]);
              
              if(name2.length == 3)
              {
                var fname = name2[0];
                var mname = name2[1];
                var lname = name2[2];
              }
              
              else if(name2.length == 2)
              {
                var fname = name2[0];
                var lname = name2[1];
              }
              
              else if(name2.length == 1)
              {
                var fname = name2[0];
                
              }
            }

            // alert(fname+' '+mname+' '+lname)
            // alert('start inertion');
            $('#info_first_name').val(fname);
            $('#info_middle_name').val(mname);
            $('#info_last_name').val(lname);
          
            $('#datepicker').val(dob);
            $('#phone').val(phone);
            
            // $('#gender').val(gender);
            // $('#marital_status').val(marital_status);
            $("#gender").dropdown("set selected", gender);
            $("#marital_status").dropdown("set selected", marital_status);

            $('#autocomplete').val(location);
        }
      });  
      
Template.personalinfo.events({
'click #save_pers_info': function(event){
        event.preventDefault();
        // alert('Personal Info');
        var info_first_name = $('#info_first_name').val();
            info_first_name = info_first_name.trim();
        
        var info_middle_name = $('#info_middle_name').val();
            info_middle_name = info_middle_name.trim();
        
        var info_last_name = $('#info_last_name').val();
            info_last_name = info_last_name.trim();

        // var marital_status = $('#marital_status').val();
        // var gender = $('#gender').val();
        var marital_status = $('#marital_status').dropdown('get value');
        var gender = $('#gender').dropdown('get value');
 

        var datepicker = $('#datepicker').val();
        var phone = $('#phone').val();
        var autocomplete = $('#autocomplete').val();
        // alert('check1');
        // alert(location_text);
        if(info_first_name == null || info_first_name == "")
        {
          $('#info_first_name').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#info_first_name').removeClass('emptyfield');
        }

        // alert('check2');
        if(info_last_name == null || info_last_name == "")  
        {
          $('#info_last_name').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#info_last_name').removeClass('emptyfield');
        }
        // alert('check3');
        if(info_middle_name == null || info_middle_name == "")
        {
        var name= info_first_name +' '+ info_last_name;
        }
        else{
        var name = info_first_name +' '+ info_middle_name +' '+ info_last_name;
        }
        // alert('check4');
        if(datepicker == null || datepicker == "")
        {
          $('#datepicker').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#datepicker').removeClass('emptyfield');
        }
        // alert('check5');
        if(phone == null || phone == "")
        {
          $('#phone').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#phone').removeClass('emptyfield');
        }
        // alert('check6');
        if(autocomplete == null || autocomplete == "")
        {
          $('#autocomplete').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete').removeClass('emptyfield');
        }
        // alert('check7');
        if ( !(phone+"").match(/^\d+$/) ) {
           alert('phone number can only have digits');
           return false;
        }
        // alert('above update');

        var check_len = phone.length;
        var phone = parseFloat(phone);
        //alert(check_len);  
        if(check_len != 10 )
        {
          alert('Phone number should be of 10 degits only');
          return false;   
        }
        var user_id = Session.get("userId");
        // alert(name+gender+marital_status+phone+datepicker+autocomplete+user_id);
        Meteor.call('pers_info_update',name,gender,marital_status,phone,datepicker,autocomplete,user_id,function(){
          if(result){
             // alert('Sucessfully insert');
             console.log('error');
          }else{
             // alert('failure');
             console.log('failure');
          }
        });
        alert('User Info Updated');
        var user_id = Session.get("userId");
        $('#modal3').modal('close');

        // var first_name_text = $('#first_name').val();
        // var middle_name_text = $('#middle_name').val();
        // var last_name_text = $('#last_name').val();
        // var marital_status_text = $('#marital_status').val();
        // var gender_text = $('#gender').val();
        // $('#datepicker').val();
        // $('#phone').val();
        // $('#autocomplete').val();

        $(".form_reset").trigger('reset');
    }
});



window.onload = function(){
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete2')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete3')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete4')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete5')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete6')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete7')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete8')),{types: ['geocode'] }
  );
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete9')),{types: ['geocode'] }
  );
    var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete10')),{types: ['geocode'] }
  );
};

Template.personalinfo.rendered=function() {
  $('#datepicker').datepicker();
}

Template.personalinfo.helpers({
  display_info(){
    var user_id = Session.get("userId");
    return UserInfo.find({user_id: user_id});
  }
});

Template.personalinfo.helpers({
  set_hidden_info(){
    var user_id = Session.get("userId");
    return UserInfo.find({_id: user_id});
  }
  // noha(e){
  //   var c = Session.get("gender");
  //   if(c == e){
  //     return 'selected';
  //   }
  // },
  // nohad(e){
  //   var c = Session.get("gender");
  //   if(c == e){
  //     return 'selected';
  //   }
  // },
  // noha3(e){
  //   var c = Session.get("m_status");
  //   if(c == e){
  //     return 'selected';
  //   }
  // },
  // noha4(e){
  //   var c = Session.get("m_status");
  //   if(c == e){
  //     return 'selected';
  //   }
  // },
  // noha5(e){
  //   var c = Session.get("m_status");
  //   if(c == e){
  //     return 'selected';
  //   }
  // }
});

Template.profile.events({
 'click .close_modal': function(){
        $('.modal').modal('close');
 } 
});

Template.professional.events({

  'click .add_profjr': function(event){
        event.preventDefault();
        var company_name = $('#company_name').val();
        var job_title = $('#job_title').val();

        var start_month = $('#start_month').val();
        var start_year = $('#start_year').val();
        var end_month = $('#end_month').val();
        var end_year = $('#end_year').val();
       
        var Job_location = $('#autocomplete6').val();
        var skill_used = $('#skill_used').val();
        var key_responsibilities = $('#key_responsibilities').val();
        var job_type = $('#job_type').val();
        
        // alert(start_year);

        if(company_name == null || company_name == "")
        {
          $('#company_name').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#company_name').removeClass('emptyfield');
        }
                if(job_title == null || job_title == "")
        {
          $('#job_title').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#job_title').removeClass('emptyfield');
        }

        if(start_month == null || start_month == "")
        {
          $('#start_month').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#start_month').removeClass('emptyfield');
        }
        if(start_year == null || start_year == "")
        {
          $('#start_year').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#start_year').removeClass('emptyfield');
        }
        if(Job_location == null || Job_location == "")
        {
          $('#autocomplete6').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete6').removeClass('emptyfield');
        }
        if(skill_used == null || skill_used == "")
        {
          $('#skill_used').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#skill_used').removeClass('emptyfield');
        }
        if(key_responsibilities == null || key_responsibilities == "")
        {
          $('#key_responsibilities').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#key_responsibilities').removeClass('emptyfield');
        }    
//for checkbox validation
    if(document.getElementById('check_experience').checked){
  $("#end_month").removeClass('emptyfield'); 
  $("#end_year").removeClass('emptyfield'); 
  } 
  else
{
  // alert('way2');
      if (end_month ==null || end_month =="" )
    {
    $("#end_month").focus().addClass('emptyfield');
      return false;
      }
    else{
    $("#end_month").removeClass('emptyfield');  
    }
      if (end_year==null || end_year=="" )
    {
    $("#end_year").focus().addClass('emptyfield');
      return false;
      }
    else{
    $("#end_year").removeClass('emptyfield');  
    } 
  
   if(start_year > end_year || start_year == end_year)
  {
    alert("End Year cant be greater than Start Year");
    $("#end_year").focus().addClass('emptyfield');
      return false;
  } 
}
        // alert('above profjr');
        var user_id = Session.get("userId");

        // alert(company_name,job_title,start_month,start_year,end_month,end_year,Job_location,skill_used,key_responsibilities,job_type,user_id);
        Meteor.call('insert_profjr',company_name,job_title,start_month,start_year,end_month,end_year,Job_location,skill_used,key_responsibilities,job_type,user_id);
        // alert('inserted');
        $('.modal').modal('close');

        // $('#company_name').val();
        // $('#job_title').val();

        // $('#start_month').val();
        // $('#start_year').val();
        // $('#end_month').val();
        // $('#end_year').val();
       
        // $('#autocomplete6').val();
        // $('#skill_used').val();
        // $('#key_responsibilities').val();
        // $('#job_type').val();

        $(".form_reset").trigger('reset');

  },
      'change #check_experience' :function () { 
      // alert('chekced');
      if(document.getElementById('check_experience').checked){
      
      $("#onchecked_profjr_end_date").addClass('display_hide');
      $("#onchecked_profjr_end_date").removeClass('display_show');

      $("#onchecked_profjr_end_date_show").addClass('display_show');
      $("#onchecked_profjr_end_date_show").removeClass('display_hide');
      
      $("#end_year").val('');
      $("#end_month").val('');
}
    else{
      $("#onchecked_profjr_end_date").addClass('display_show');
      $("#onchecked_profjr_end_date").removeClass('display_hide');

      $("#onchecked_profjr_end_date_show").addClass('display_hide');
      $("#onchecked_profjr_end_date_show").removeClass('display_show');

              
     }
},
    'change #edit_check_experience' :function () { 
      // alert('chekced');
      if(document.getElementById('edit_check_experience').checked){
        
      $("#onchecked_edit_profjr_end_date").addClass('display_hide');
      $("#onchecked_edit_profjr_end_date").removeClass('display_show');

      $("#onchecked_edit_profjr_end_date_show").addClass('display_show');
      $("#onchecked_edit_profjr_end_date_show").removeClass('display_hide');
      
      $("#edit_end_year").val('');
      $("#edit_end_month").val('');
}
    else{
      $("#onchecked_edit_profjr_end_date").addClass('display_show');
      $("#onchecked_edit_profjr_end_date").removeClass('display_hide');

      $("#onchecked_edit_profjr_end_date_show").addClass('display_hide');
      $("#onchecked_edit_profjr_end_date_show").removeClass('display_show');

              
     }
}
});

Template.professional.helpers({
    show_profjr(){
      // alert('coolz');
      var user_id = Session.get("userId");
       var result =  UserProfJr.find({user_id: user_id});
       console.log(result);
       // alert(result);
       return result;
    }
});

Template.edudetails.events({
'click #delete_education': function(){
    var edu_id = $('#hidden_edit_edu_id').val();
    // alert(skill_id);

    Meteor.call("remove_education",edu_id,function(error,result){
                 if(result){
                     alert('education Removed');
                     // console.log('Skill Removed');
                  }else{
                     alert('failure');
                     // console.log('error');
                  }
         });
    $('.modal').modal('close');
  },

  'click .save_edu': function(event){
        event.preventDefault();
        var course = $('#course').val();
        var board = $('#board').val();
        var school = $('#school').val();
        
        var edu_format = $('#education_format').val();

        var edu_start_month = $('#edu_start_month').val();
        var edu_start_year = $('#edu_start_year').val();
        var edu_end_month = $('#edu_end_month').val();
        var edu_end_year = $('#edu_end_year').val();
       
        var edu_location = $('#autocomplete7').val();
        // alert(start_year);
        if(course == null || course == "")
        {
          $('#course').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#course').removeClass('emptyfield');
        }
                if(board == null || board == "")
        {
          $('#board').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#board').removeClass('emptyfield');
        }

        if(school == null || school == "")
        {
          $('#school').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#school').removeClass('emptyfield');
        }
        if(edu_start_year == null || edu_start_year == "")
        {
          $('#edu_start_year').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edu_start_year').removeClass('emptyfield');
        }
        if(edu_location == null || edu_location == "")
        {
          $('#autocomplete7').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete7').removeClass('emptyfield');
        }
        if(skill_used == null || skill_used == "")
        {
          $('#skill_used').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#skill_used').removeClass('emptyfield');
        }
        if(key_responsibilities == null || key_responsibilities == "")
        {
          $('#key_responsibilities').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#key_responsibilities').removeClass('emptyfield');
        }

//Start script for percentage and cgpa


if(document.getElementById('check_education_edu_2').checked){
  $("#edu_end_month").removeClass('red-border'); 
  $("#edu_end_year").removeClass('red-border'); 
  } 
  else
{
      if (edu_end_month ==null || edu_end_month =="" )
    {
    $("#edu_end_month").focus().addClass('red-border');
      return false;
      }
    else{
    $("#edu_end_month").removeClass('red-border');  
    }
      if (edu_end_year ==null ||  edu_end_year =="" )
    {
    $("#edu_end_year").focus().addClass('red-border');
      return false;
      }
    else{
    $("#edu_end_year").removeClass('red-border');  
    } 
  
   if(edu_start_year > edu_end_year || edu_start_year == edu_end_year)
  {
    alert("Start Year cant be greater than End Year");
    $("#edu_start_year").focus().addClass('red-border');
      return false;
  }   
}
//End script for percentage and cgpa

//start script for percentage and cgpa
   if(edu_format =="percentage")
   {
     
  var edu_grade = $("#education_grade").val();
      edu_grade = jQuery.trim(edu_grade);
    if(!edu_grade.match(/^\d+$/))
  {
    alert("number can only be integer");  
    $("#education_grade").focus().addClass('emptyfield');
    return false;   
  }
  else if(edu_grade > 100)
  {
    alert("% cant be greater then 100");
    $("#education_grade").focus().addClass('emptyfield');
    return false;
  }
  var msg6 = edu_grade;
   }
  else if(edu_format == "cgpa")
  {     
  var edu_grade =  parseInt($("#education_grade").val());
  edu_grade = jQuery.trim(edu_grade);
  

  var cgpa_out_of =  parseInt($("#cgpa_out_of").val());
  
        if(cgpa_out_of == null || cgpa_out_of == "")
        {
          $('#cgpa_out_of').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#cgpa_out_of').removeClass('emptyfield');
        }

  //if(!tm1.match(/^\d+$/) && !tm1.val().indexOf('.') != -1)
  if(!edu_grade.match(/^\d+$/))
  {
    alert("number can only be integer");  
    $("#education_grade").focus().addClass('emptyfield');
    return false;
  }
  //alert(tm1+tm2);
  if(edu_grade > cgpa_out_of)
  {
    alert("Cgpa cant be greater then "+ cgpa_out_of);
    //alert(tm2 +tm1);
    $("#education_grade").focus().addClass('emptyfield');
    return false;
  }
  $("#education_grade").removeClass('emptyfield');
  var msg6 = edu_grade+'/'+cgpa_out_of;
  //alert(msg6);
  }

  var score = msg6;
//end script for cgpa and percentage  
                var course = $('#course').val();
        var board = $('#board').val();
        var school = $('#school').val();

        $('#edu_start_month').val('');
        $('#edu_start_year').val('');
        $('#edu_end_month').val('');
        $('#edu_end_year').val('');
        $('#autocomplete7').val('');

        var user_id = Session.get("userId");
        alert(board,school,score,edu_start_month,edu_start_year,edu_end_month,edu_end_year,edu_location);
        Meteor.call('insert_education',user_id,course,board,school,score,edu_start_month,edu_start_year,edu_end_month,edu_end_year,edu_location,function(error,result){
          if(error){
              // alert('error');
              console.log('error in updating education');
          }else{
              // alert('result');
              window.location.reload();
              console.log('error in updating education');
          }
        });
        // alert('education inserted');
        window.location.reload();
        $('.modal').modal('close');
        $(".form_reset").trigger('reset');
  }
});

Template.edudetails.helpers({
    show_education(){
      // alert('coolz');
      var user_id = Session.get("userId");

       var result =  UserEdu.find({user_id: user_id});
       // console.log(result);
       // alert(result);
       return result;
    },
    // per_or_cgpa(){
    //   var result =  UserEdu.db.user_edu.find({"user_id": 100},{"score": 1});
    //   db.name.find({ "_id": 100 },{"score": 1 });
    // }
    show_score(score){
      var score = score;
    if (isValid(score)) {
       // if ( !(phone+"").match(/^\d+$/) ) {
        return 'Score(%):';
       }
       else{
       return 'Score(CGPA):';
       }
    }
});

Template.skill.events({
  'click #save_skill': function(event){
    
        // alert('hello');
        event.preventDefault();
        // alert('hello');
        var awd_expert = $('#awd_expert').val();
        var last_used = $('#last_used').val();
        var skill_name = $('#skill_name').val();

        if(awd_expert == null || awd_expert == "")
        {
          $('#awd_expert').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#awd_expert').removeClass('emptyfield');
        }
                if(last_used == null || last_used == "")
        {
          $('#last_used').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#last_used').removeClass('emptyfield');
        }

        if(skill_name == null || skill_name == "")
        {
          $('#skill_name').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#skill_name').removeClass('emptyfield');
        }
        var userId = Session.get("userId");
        Meteor.call('insert_skill',userId,awd_expert,last_used,skill_name,function(error,result){
                 if(error){
                     // alert('Skill Sucessfully insert');
                     console.log('error');
                  }else{
                     // alert('failure');
                     console.log('Skill Sucessfully insert');
                  }          
        });

        //  UserSkill.insert({
        //  user_id: user_id,
        //  awd_expert: awd_expert,
        //  last_used: last_used,
        //  skill_name: skill_name,
        //  createdAt: new Date(),  
        // });
        
        // alert('skill inserted');
        $('.modal').modal('close');
        $(".form_reset").trigger('reset');
  },
  'click #edit_save_skill': function(event){
    
        // alert('update skill');
        event.preventDefault();
        // alert('hello');
        // var awd_expert = $('#edit_awd_expert').val();
        // var last_used = $('#edit_last_used').val();
        var awd_expert = $('#edit_awd_expert').dropdown('get value');
        var last_used = $('#edit_last_used').dropdown('get value');

        var skill_name = $('#edit_skill_name').val();

        if(awd_expert == null || awd_expert == "")
        {
          $('#edit_awd_expert').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_awd_expert').removeClass('emptyfield');
        }
                if(last_used == null || last_used == "")
        {
          $('#edit_last_used').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_last_used').removeClass('emptyfield');
        }

        if(skill_name == null || skill_name == "")
        {
          $('#edit_skill_name').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_skill_name').removeClass('emptyfield');
        }
        var user_id = Session.get("userId");

        var userId = Session.get("userId");
        var edit_id = $('#hidden_edit_skill_name').val();
        // alert('update skill 2');
        alert(edit_id+awd_expert+last_used+skill_name);
        Meteor.call('update_skill',edit_id,awd_expert,last_used,skill_name,function(error,result){
                 if(result){
                     // alert('Skill Sucessfully insert');
                     console.log('Skill Sucessfully insert');
                  }else{
                     // alert('failure');
                     console.log('error');
                  }
         });
        $('.modal').modal('close');
        $(".form_reset").trigger('reset');
  },

  'click #delete_skill': function(){
    var skill_id = $('#hidden_edit_id_forskill').val();
    // alert(skill_id);
    Meteor.call("remove_skill",skill_id,function(error,result){
                 if(result){
                     alert('Skill Removed');
                     // console.log('Skill Removed');
                  }else{
                     alert('failure');
                     // console.log('error');
                  }
         });
    $('.modal').modal('close');
  }
});

Template.achievement.events({
  'click #save_award': function(event){
        // alert('award');
        event.preventDefault();
        // alert('hello');
        var awd_type = $('#awd_type').val();
        var description = $('#description').val();
        var awd_month = $('#awd_month').val();
        var awd_year = $('#awd_year').val();
        var awd_location = $('#autocomplete4').val();

        if(awd_type == null || awd_type == "")
        {
          $('#awd_type').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#awd_type').removeClass('emptyfield');
        }
        
        if(description == null || description == "")
        {
          $('#description').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#description').removeClass('emptyfield');
        }

        if(awd_month == null || awd_month == "")
        {
          $('#awd_month').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#awd_month').removeClass('emptyfield');
        }

        if(awd_year == null || awd_year == "")
        {
          $('#awd_year').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#awd_year').removeClass('emptyfield');
        }

        if(awd_location == null || awd_location == "")
        {
          $('#autocomplete4').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete4').removeClass('emptyfield');
        }
        
          var userId = Session.get("userId");
   
          Meteor.call('insert_awd',userId,awd_type ,description,awd_month,awd_year,awd_location, function(error,result){
          if(error){
            // alert('error');
            console.log('error');
          }else{
            console.log('Suceesfully inserted');
          }
          });  
        $('.modal').modal('close');  
        $(".form_reset").trigger('reset');
  },

  'click #edit_save_award': function(event){
        // alert('award');
        event.preventDefault();
        // alert('hello');
        // var awd_type = $('#edit_awd_type').val();
        var awd_type = $('#edit_awd_type').dropdown('get value');
        var description = $('#edit_description').val();

        var awd_month = $('#edit_awd_month').dropdown('get value');
        var awd_year = $('#edit_awd_year').dropdown('get value');

        // var awd_month = $('#edit_awd_month').val();
        // var awd_year = $('#edit_awd_year').val();

        var awd_location = $('#autocomplete2').val();

        if(awd_type == null || awd_type == "")
        {
          $('#edit_awd_type').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_awd_type').removeClass('emptyfield');
        }
        
        if(description == null || description == "")
        {
          $('#edit_description').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_description').removeClass('emptyfield');
        }

        if(awd_month == null || awd_month == "")
        {
          $('#edit_awd_month').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_awd_month').removeClass('emptyfield');
        }

        if(awd_year == null || awd_year == "")
        {
          $('#edit_awd_year').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_awd_year').removeClass('emptyfield');
        }

        if(awd_location == null || awd_location == "")
        {
          $('#autocomplete2').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete2').removeClass('emptyfield');
        }
        
          var userId = Session.get("userId");
          var edit_id = $('#hidden_edit_awd_id').val();
          // alert(edit_id);
          Meteor.call('update_awd',userId,edit_id,awd_type ,description,awd_month,awd_year,awd_location, function(error,result){
          if(error){
            // alert('error');
            console.log('error');
          }else{
            // alert('Suceesfully updated');
            console.log('Suceesfully updated');
          }
          });  
        $('.modal').modal('close');  
        $(".form_reset").trigger('reset');
  },
          'click #delete_award': function(){
          alert('ddd');
    var awd_id = $('#hidden_edit_awd_id').val();
    alert(awd_id);

    Meteor.call("remove_award",awd_id,function(error,result){
                 if(result){
                     alert('award Removed');
                     // console.log('Skill Removed');
                  }else{
                     alert('failure');
                     // console.log('error');
                  }
         });
    $('.modal').modal('close');
  }
});


  
Template.achievement.events({
 'click #edit_4': function(){
            // alert('achievement');
            var awd_type = this.type;
            var description = this.description;
            var awd_month = this.awd_month;
            var awd_year = this.awd_year;
            


            var awd_location = this.location;
            var hidden_id = this._id;
            
            // alert(awd_type+description+awd_month+awd_year+awd_location);
            
            // $('#edit_awd_type').val(awd_type);
            $('#edit_description').val(description);

            $("#edit_awd_type").dropdown("set selected", awd_type);  
            $("#edit_awd_month").dropdown("set selected", awd_month);
            $("#edit_awd_year").dropdown("set selected", awd_year);

            // $('#edit_awd_month').val(awd_month);
            // $('#edit_awd_year').val(awd_year);

            $('#autocomplete2').val(awd_location);
            $('#hidden_edit_awd_id').val(hidden_id);


        }
      });  

Template.achievement.helpers({
    display_award(){
      var user_id = Session.get("userId");
       var result =  UserAward.find({user_id: user_id});
       return result;
    }
});

Template.skill.helpers({
    show_skills(){
      var user_id = Session.get("userId");
       var result =  UserSkill.find({user_id: user_id});
       return result;
    },
    skill_gif(awd_expert){
   var awd_expert = awd_expert;
      if(awd_expert == 'Beginner'){
         return '/uploads/skill/beginner.gif';
      }
      else if(awd_expert == 'Middle'){
        return '/uploads/skill/middle.gif';
      }
      else if(awd_expert == 'Expert'){
        return '/uploads/skill/expert.gif';
      }
    }
});

Template.health.helpers({
    display_health(){

      var user_id = Session.get("userId");
       var result =  UserMedical.find({user_id: user_id});
       return result;
    }
});

Template.health.events({
'click #save_medical': function(){
        // alert('medical');
        event.preventDefault();

        if (document.getElementById('speech_yes').checked) {
           var speech = 'Yes';
        }
        else{
           var speech = 'No';
        }
        
        if (document.getElementById('visual_yes').checked) {
           var visual = 'Yes';
        }
        else{
           var visual = 'No';
        }


        if (document.getElementById('handicap_yes').checked) {
           var physical = 'Yes';
        }
        else{
           var physical = 'No';
        }

        if (document.getElementById('hearing_yes').checked) {
           var hearing = 'Yes';
        }
        else{
           var hearing = 'No';
        }
        // // alert(speech );
        var special_note = $('#special_note').val();
        // if(special_note == null || special_note == "")
        // {
        //   $('#special_note').addClass('emptyfield').focus();
        //   return false;
        // }
        // else{
        //   $('#special_note').removeClass('emptyfield');
        // }
        // alert(special_note);
          // UserInfo.update({'_id': 100},{$set: {'heading': heading_text}});
        var userId = Session.get("userId");
        Meteor.call('insert_disabilities',userId,hearing, speech, visual, physical, special_note,function(error,result){
          if(error){
            // alert('error');
            console.log('error');
          }else{
            // alert('Sucees');
            console.log('Sucees');
          }  
        });
      

      // medical_update: function(hearing,speech,handicap,visual,special_note,user_id){
      // var result = UserMedical.update({'user_id': user_id},{$set: {
      //    hearing: hearing,
      //    speech: speech,
      //    handicap: handicap,
      //    visual: visual,
      //    special_note: special_note,
      //    updatedAt: new Date()  
      //   }});
      // return result;
      // },

        //  UserMedical.update({'user_id': user_id},{$set: {
        //  hearing: hearing,
        //  speech: speech,
        //  handicap: handicap,
        //  visual: visual,
        //  special_note: special_note,
        //  updatedAt: new Date()  
        // }});        
        // alert('Medical Updated');
        $(".form_reset").trigger('reset');
        $('.modal').modal('close');
},
'click #edit_7':function(event){
  // alert('hi');
event.preventDefault();
  var user_id = Session.get("userId");
var result =UserMedical.find({user_id: user_id}).fetch();
var hearing = result[0].hearing;
var visual = result[0].visual;
var speech = result[0].speech;
var physical = result[0].physical;
var special_note =result[0].special_note;

if(visual == 'Yes'){
$("#visual_yes").attr("checked", true);
}
else if(visual == 'No'){
  $("#visual_no").attr("checked", true);
}
if(hearing == 'Yes'){
$("#hearing_yes").attr("checked", true);
}
else if(hearing == 'No'){
  $("#hearing_no").attr("checked", true);
}
if(speech == 'Yes'){
$("#speech_yes").attr("checked", true);
}
else if(speech == 'No'){
  $("#speech_no").attr("checked", true);
}
if(physical == 'Yes'){
$("#handicap_yes").attr("checked", true);
}
else if(physical == 'No'){
  $("#handicap_no").attr("checked", true);
}

$("#special_note").text(special_note);
},

});

Template.professional.events({
    // 'click #edit_profjr': function(){
    //   alert('inside edit');
    //       Session.setPersistent("edit_profjr_id",this._id);      
    //      alert(Session.get(edit_profjr_id)); 
    // },
  'click .update_professional_details':function(event){          
          // var postId= Session.get("current_prof_dialog");
          // alert(postId);

      event.preventDefault();
        // alert('hello');
        var company_name = $('#edit_company_name').val();
        var job_title = $('#edit_job_title').val();
        var start_month = $('#edit_start_month').dropdown('get value');
        var start_year  = $('#edit_start_year').dropdown('get value');
        var end_month   = $('#edit_end_month').dropdown('get value');
        var end_year    = $('#edit_end_year').dropdown('get value');

        var Job_location = $('#autocomplete5').val();
        var skill_used = $('#edit_skill_used').val();
        var key_responsibilities = $('#edit_key_responsibilities').val();
        var job_type = $('#edit_job_type').val();
        // alert(start_year);

        if(company_name == null || company_name == "")
        {
          $('#edit_company_name').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_company_name').removeClass('emptyfield');
        }
                if(job_title == null || job_title == "")
        {
          $('#edit_job_title').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_job_title').removeClass('emptyfield');
        }

        if(start_month == null || start_month == "")
        {
          $('#edit_start_month').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_start_month').removeClass('emptyfield');
        }
        if(start_year == null || start_year == "")
        {
          $('#edit_start_year').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_start_year').removeClass('emptyfield');
        }
        if(Job_location == null || Job_location == "")
        {
          $('#autocomplete5').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete5').removeClass('emptyfield');
        }
        if(skill_used == null || skill_used == "")
        {
          $('#edit_skill_used').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_skill_used').removeClass('emptyfield');
        }
        if(key_responsibilities == null || key_responsibilities == "")
        {
          $('#edit_key_responsibilities').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_key_responsibilities').removeClass('emptyfield');
        }
 
//for checkbox validation

    if(document.getElementById('edit_check_experience').checked){
         
  $("#edit_end_month").removeClass('emptyfield'); 
  $("#edit_end_year").removeClass('emptyfield'); 
      end_month = "";
      end_year = "";
  } 
  else
{
      if (end_month ==null || end_month =="" )
    {
    $("#edit_end_month").focus().addClass('emptyfield');
      return false;
      }
    else{
    $("#edit_end_month").removeClass('emptyfield');  
    }
      if (end_year==null || end_year=="" )
    {
    $("#edit_end_year").focus().addClass('emptyfield');
      return false;
      }
    else{
    $("#edit_end_year").removeClass('emptyfield');  
    } 
  
   if(start_year > end_year || start_year == end_year)
  {
    alert("End Year cant be greater than Start Year");
    $("#edit_end_year").focus().addClass('emptyfield');
      return false;
  } 
}



    var edit_id = $('#hidden_profjr_id').val();
    // alert(edit_id);
  
    // if(record_change == 0){
    // alert(edit_id+company_name+job_title+start_month+start_year+Job_location+skill_used+key_responsibilities+job_type);
    // Meteor.call('update_profjr_2',edit_id,company_name,job_title,start_month+start_year,Job_location,
    //       skill_used,key_responsibilities,job_type,function(error,result){
    //             if(error){
    //               // alert('Error at 1');
    //               console.log('error');
    //             }else{
    //               // alert('update professional jr');
    //               console.log('update professional jr');
    //             }
    //       });
  // }
  // else if(record_change == 1){
  //   alert('way2');


    // alert(edit_id+company_name+job_title+start_month+start_year+end_month+end_year+Job_location+skill_used+key_responsibilities+job_type);
    
     Meteor.call('update_profjr',edit_id,company_name,job_title,start_month,start_year,end_month,end_year,Job_location,
          skill_used,key_responsibilities,job_type,function(error,result){
                if(error){
                  // alert('Error at 2');
                  console.log('error');
                  alert('error');
                }else{
                  // alert('update professional jr');
                  console.log('update professional jr');
         // alert('Done bro');
         window.location.reload();
         // alert('update professional jr');
         $('#modal_edit_prof').modal('close');
         (".form_reset").trigger('reset');       
  }
          });
  // }  
         $('#modal_edit_prof').modal('close');
         (".form_reset").trigger('reset');
         location.reload();
  }
});

Template.professional.events({
 'click #edit_5': function(){
      //alert('tron');{
        

            var company_name = this.company;
            var job_title = this.title;
            var autocomplete5 = this.location;
            var hidden_profjr_id = this._id;
            var skill_used = this.skill;
            var key_responsibilities = this.key_responsibilities;

            var start_month = this.start_month;
            var start_year = this.start_year;
            var end_month = this.end_month;
            var end_year = this.end_year;
            var job_type = this.job_type;

            // alert(company_name+job_title+autocomplete5+hidden_profjr_id+skill_used+key_responsibilities+
              // start_month+start_year+end_month+end_year+job_type);

            $("#edit_start_month").dropdown("set selected", start_month);
            $("#edit_start_year").dropdown("set selected", start_year);
            $("#edit_end_month").dropdown("set selected", end_month);
            $("#edit_end_year").dropdown("set selected", end_year);
            $("#edit_job_type").dropdown("set selected", job_type);
            // $("#edit_skill_name").dropdown("set selected", skill_name);
            $('#edit_company_name').val(company_name);
            $('#edit_job_title').val(job_title);
            $('#autocomplete5').val(autocomplete5);
            $('#hidden_profjr_id').val(hidden_profjr_id);
            $('#edit_skill_used').val(skill_used);
// $("#edit_check_experience").attr("checked",true);
// alert('end month = '+end_month+' and end years = '+end_year);
            $('#edit_key_responsibilities').val(key_responsibilities);
            if(end_year == "" || end_year == null || end_year == undefined){
            // $('#edit_end_year').addClass('display_hide');
            // $('#edit_end_month').addClass('display_hide');
            alert('inside');
              $("#edit_check_experience").attr("checked",true);
              // collw();
                                  if(document.getElementById('edit_check_experience').checked){
                        // onchecked_edit_profjr_end_date
                        $('#onchecked_edit_profjr_end_date').addClass('display_hide');
                        $('#edit_end_month').removeClass('display_show');
            }
        }else{
              $("#edit_check_experience").attr("checked",false);
              $('#onchecked_edit_profjr_end_date').removeClass('display_hide');
          $('#edit_end_month').addClass('display_show');              
            }
            
         
        },
        'click #delete_profjr': function(){
    var profjr_id = $('#hidden_profjr_id').val();
    // alert(skill_id);

    Meteor.call("remove_profjr",profjr_id,function(error,result){
                 if(result){
                     alert('professional Removed');
                     // console.log('Skill Removed');
                  }else{
                     alert('failure');
                     // console.log('error');
                  }
         });
    $('.modal').modal('close');
  }
      });

Template.edudetails.events({
 'click #edit_6': function(){
            var edit_course = this.course;
            var edit_school = this.school;
            var edit_board = this.board;
            var score = this.score;
            var edu_start_month = this.edu_start_month;
            var edu_start_year = this.edu_start_year;
            var edu_end_month = this.edu_end_month;
            var edu_end_year = this.edu_end_year;
            var edu_location = this.edu_location;
            var hidden_edit_edu_id = this._id;
            // alert(edit_course+edit_school+score+edu_start_month+edu_start_year+edu_end_month+edu_end_year+edu_location+hidden_edit_edu_id);
        
        if (isValid(score)) {
          // isValid
           // alert('phone number can only have digits');
          // alert("Percentage");
          // alert(score);
          var edit_education_format = 'percentage';
          var edit_score = score;
           // return false;
        }else{
          // alert("CGPA");
           var edit_education_format = 'cgpa';
           // alert(score);
          var edit_score = score[0];
          $('#edit_cgpa_out_of').removeClass('emptyfield');
          var edit_cgpa_out_of = score[2] ;
          // alert("naya alert yahi hai: "+edit_cgpa_out_of);
          if(edit_cgpa_out_of==1){
            $("#edit_cgpa_out_of").dropdown("set selected", "10");
          }else{
            $("#edit_cgpa_out_of").dropdown("set selected", "5");
          }
        }
        // alert('above update');

      //   var check_len = phone.length;

      //   if(score){
      //   score = score.split('/');
      //   var length = score.length;
      // }
      //   if(length == 2)
      //   {
      //     var edit_education_format = 'cgpa';
      //     var edit_score = score[0];
      //     var edit_cgpa_out_of = score[1];
      //   }
      //   else if(length == 1)
      //   {
      //     var edit_education_format = 'percentage';
      //     var edit_score = score[0];
        // }
            $('#autocomplete8').val(edu_location);
            $("#edit_edu_start_month").dropdown("set selected", edu_start_month);
            $("#edit_edu_start_year").dropdown("set selected", edu_start_year);
            $("#edit_edu_end_month").dropdown("set selected", edu_end_month);
            $("#edit_edu_end_year").dropdown("set selected", edu_end_year);

            $('#edit_score').val(edit_score);
            $("#edit_education_format").dropdown("set selected", edit_education_format);

            
            // $('#edit_course').val(edit_course);
            $('#edit_course').val(edit_course);
            $('#hidden_edit_edu_id').val(hidden_edit_edu_id);

            $('#edit_school').val(edit_school);
            $('#edit_board').val(edit_board);
            $('#edit_job_title').val(job_title);
   
      if(edu_end_year == "" || edu_end_year == null || edu_end_year == undefined){
            // $('#edit_end_year').addClass('display_hide');
            // $('#edit_end_month').addClass('display_hide');
              $("#onchecked_edit_edu_end_date_show").attr("checked",true);
              // collw();
                                  if(document.getElementById('onchecked_edit_edu_end_date_show').checked){
                        // onchecked_edit_profjr_end_date
                        $('#onchecked_edit_du_end_date').addClass('display_hide');
                        // $('#onchecked_edit_du_end_date').removeClass('display_show');
                        // $('#edit_end_month').addClass('display_hide');
            }
        }else{
              $("#onchecked_edit_edu_end_date_show").attr("checked",false);
              $('#onchecked_edit_du_end_date').removeClass('display_hide');
              // $('#onchecked_edit_du_end_date').addClass('display_show');
            }
 

        },
    'change #check_education_edu_2' :function () { 
      // alert('chekced');
      if(document.getElementById('check_education_edu_2').checked){
      
      $("#onchecked_edu_end_date").addClass('display_hide');
      $("#onchecked_edu_end_date").removeClass('display_show');

      $("#onchecked_edu_end_date_show").addClass('display_show');
      $("#onchecked_edu_end_date_show").removeClass('display_hide');
      
      $("#edu_end_year").val('');
      $("#edu_end_month").val('');
}
    else{
      $("#onchecked_edu_end_date").addClass('display_show');
      $("#onchecked_edu_end_date").removeClass('display_hide');

      $("#onchecked_edu_end_date_show").addClass('display_hide');
      $("#onchecked_edu_end_date_show").removeClass('display_show');

              
     }
},
    'change #edit_check_education_edu_2' :function () { 
      // alert('chekced edit');
      if(document.getElementById('edit_check_education_edu_2').checked){
      
      $("#onchecked_edit_du_end_date").addClass('display_hide');
      $("#onchecked_edit_du_end_date").removeClass('display_show');

      $("#onchecked_edit_edu_end_date_show").addClass('display_show');
      $("#onchecked_edit_edu_end_date_show").removeClass('display_hide');
      
      $("#edit_edu_end_year").val('');
      $("#edit_edu_end_month").val('');
}
    else{
      $("#onchecked_edit_du_end_date").addClass('display_show');
      $("#onchecked_edit_du_end_date").removeClass('display_hide');

      $("#onchecked_edit_edu_end_date_show").addClass('display_hide');
      $("#onchecked_edit_edu_end_date_show").removeClass('display_show');

              
     }
}
      });

Template.profile.helpers({
    display_leftpanel_info(){
    var user_id = Session.get("userId");
    var head = UserInfo.find({user_id: user_id}).fetch();
    // postCreatorName[0].name
    return head; 
}
});

Template.user_list.events({
'click .redirect_click_1': function(event){
    // alert(1);
    event.preventDefault();
    // var name = $('.redirect_click_1').attr('valu');
    var user_id = this.user_id;
    var head = UserInfo.find({user_id: user_id}).fetch();
    // alert(head[0].email+ ' and '+head[0].user_id);
    Session.setPersistent("show_connection",head[0].user_id);
    
    var show_collection = Session.get("show_connection");
    var user_id = Session.get("userId");
    user_id= Base64.encode(head[0].user_id);
    var url = '/view_profile/'+user_id;

    if(show_collection == user_id)
    {
      Router.go('/profile');    
    }
    else{
    Router.go(url);
    }
}
});

Template.recentblog.events({
'click #redirect_click_2': function(event){
    // alert(2);    
    event.preventDefault();
    var name = $('#redirect_click_2').attr('valu');
    var head = UserInfo.find({name: name}).fetch();
    // alert(head[0].email+ ' and '+head[0].user_id);
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
}
});

Template.recentblog.events({
'click #redirect_click_3': function(event){
 event.preventDefault();
 // alert(3);
    var name = $('#redirect_click_3').attr('valu');
    var head = UserInfo.find({name: name}).fetch();
    // Session.setPersistent("show_connection",head[0].user_id);
    // alert(head[0].email+ ' and '+head[0].user_id);
    // alert('sss');
    
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
}
});

Template.edudetails.events({
  'click .edit_save_edu': function(event){
        event.preventDefault();
        // alert('edit_award');
        var course = $('#edit_course').val();
        var board = $('#edit_board').val();
        var school = $('#edit_school').val();
        
        var edu_format = $('#edit_education_format').val();

        var edu_start_month = $('#edit_edu_start_month').dropdown('get value');
        var edu_start_year = $('#edit_edu_start_year').dropdown('get value');
        var edu_end_month = $('#edit_edu_end_month').dropdown('get value');
        var edu_end_year = $('#edit_edu_end_year').dropdown('get value');
        
        var education_format = $('#edit_education_format').dropdown('get value');
        

       
        var edu_location = $('#autocomplete8').val();
         // alert(edu_start_month+edu_start_year+edu_end_month+edu_end_year+edu_location);
        if(course == null || course == "")
        {
          $('#edit_course').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_course').removeClass('emptyfield');
        }
                if(board == null || board == "")
        {
          $('#edit_board').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_board').removeClass('emptyfield');
        }

        if(school == null || school == "")
        {
          $('#edit_school').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_school').removeClass('emptyfield');
        }

        if(edu_start_year == null || edu_start_year == "")
        {
          $('#edit_edu_start_year').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_edu_start_year').removeClass('emptyfield');
        }
        
        if(edu_location == null || edu_location == "")
        {
          $('#autocomplete8').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#autocomplete8').removeClass('emptyfield');
        }
        
        if(skill_used == null || skill_used == "")
        {
          $('#edit_skill_used').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_skill_used').removeClass('emptyfield');
        }
        
        if(key_responsibilities == null || key_responsibilities == "")
        {
          $('#edit_key_responsibilities').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_key_responsibilities').removeClass('emptyfield');
        }
//Start script for percentage and cgpa

if(document.getElementById('edit_check_education_edu_2').checked){
  $("#edit_edu_end_month").removeClass('red-border'); 
  $("#edit_edu_end_year").removeClass('red-border'); 
  edu_end_month = "";
  edu_end_year = "";
  } 
  else
{
      if (edu_end_month ==null || edu_end_month =="" )
    {
    $("#edit_edu_end_month").focus().addClass('red-border');
      return false;
      }
    else{
    $("#edit_edu_end_month").removeClass('red-border');  
    }
      if (edu_end_year ==null ||  edu_end_year =="" )
    {
    $("#edit_edu_end_year").focus().addClass('red-border');
      return false;
      }
    else{
    $("#edit_edu_end_year").removeClass('red-border');  
    } 
  
   if(edu_start_year > edu_end_year || edu_start_year == edu_end_year)
  {
    alert("Start Year cant be greater than End Year");
    $("#edit_edu_start_year").focus().addClass('red-border');
      return false;
  }   
}
// End script for percentage and cgpa

// start script for percentage and cgpa
   if(education_format =="percentage")
   {
     
  var edu_grade = $("#edit_score").val();
      edu_grade = jQuery.trim(edu_grade);
    if(!edu_grade.match(/^\d+$/))
  {
    alert("number can only be integer");  
    $("#edit_score").focus().addClass('emptyfield');
    return false;   
  }
  else if(edu_grade > 100)
  {
    alert("% cant be greater then 100");
    $("#edit_score").focus().addClass('emptyfield');
    return false;
  }
  var msg6 = edu_grade;
   }
  else if(education_format == "cgpa")
  {     
  var edu_grade =  parseInt($("#edit_score").val());
  edu_grade = jQuery.trim(edu_grade);  
  
  // var cgpa_out_of =  $('#edit_cgpa_out_of').dropdown('get value');
var edit_cgpa_out_of = $('#edit_cgpa_out_of').dropdown('get value');
  cgpa_out_of =  parseInt(edit_cgpa_out_of);
  // alert('cgpa out of : '+ cgpa_out_of);
        if(cgpa_out_of == null || cgpa_out_of == "")
        {
          $('#edit_cgpa_out_of').addClass('emptyfield').focus();
          return false;
        }
        else{
          $('#edit_cgpa_out_of').removeClass('emptyfield');
        }
  //if(!tm1.match(/^\d+$/) && !tm1.val().indexOf('.') != -1)
  if(!edu_grade.match(/^\d+$/))
  {
    alert("number can only be integer");  
    $("#edit_score").focus().addClass('emptyfield');
    return false;
  }
  //alert(tm1+tm2);
  if(edu_grade > cgpa_out_of)
  {
    alert("Cgpa cant be greater then "+ cgpa_out_of);
    //alert(tm2 +tm1);
    $("#edit_score").focus().addClass('emptyfield');
    return false;
  }
  $("#edit_score").removeClass('emptyfield');
  var msg6 = edu_grade+'/'+cgpa_out_of;
  //alert(msg6);
  }

  var score = msg6;
  // alert("scored :"+score);
//end script for cgpa and percentage        
        var edit_id = $("#hidden_edit_edu_id").val();    
        var user_id = Session.get("userId");
        // alert(edit_id+course+board+school+score+edu_start_month+edu_start_year+edu_end_month+edu_end_year+edu_location);
        Meteor.call('update_education',edit_id,course,board,school,score,
          edu_start_month,edu_start_year,edu_end_month,edu_end_year,edu_location,function(error,result){
          if(error){
            // alert('error');
            console.log('error');
          }else{
            alert('sucessfully updated education');
             window.location.reload();
            console.log(result + 'sucessfully updated education');
          }
        });
        
        // alert('education inserted');
        $('.modal').modal('close');
        // var course = $('#course').val();
        // var board = $('#board').val();
        // var school = $('#school').val();

        // $('#edu_start_month').val('');
        // $('#edu_start_year').val('');
        // $('#edu_end_month').val('');
        // $('#edu_end_year').val('');
        // $('#autocomplete7').val('');
        $(".form_reset").trigger('reset');
        location.reload();
  }
});
//----------------------------------------cropcover--------------------------------------------->

/*Template.profile.onRendered(function () {
  if(Session.get("imageUploaded_2") == "true"){
    $('ul.tabs').tabs('select_tab', 'test6');
  }
  Session.set("currentIndex","0");

  if(Session.get("Cropped_2") != "true"){
    $result = $('#result');
        $('.cropper-example-lena > img').cropper({
            aspectRatio: 16 / 9,
            autoCropArea: 0.65,
            strict: true,
            guides: true,
            highlight: true,
            dragCrop: true,
            cropBoxMovable: true,
            cropBoxResizable: true
        });  
  }
});*/

Template.profile.helpers({
  uploaded_image:function(){
  // alert('user cover');
  // var display_image = '/uploads/'+uploaded_image;

  var user_id = Session.get("userId");
  // alert(user_id);
  var head = UserInfo.find({user_id: user_id}).fetch();
  // alert(head[0].cover_image);
  var image_Name = head[0].cover_image;
  if(image_Name){
  var display_image = image_Name;
  // alert(display_image);
    return display_image;
  }
  else{
           var display_image = '/uploads/default/cover.jpg';
           // alert(display_image);
           return display_image;
     }
  }
})

Template.profile.helpers({
  profilepic_image:function(){

  var user_id = Session.get("userId");
  // alert(user_id);
  var head = UserInfo.find({user_id: user_id}).fetch();
  // alert(head[0].cover_image);
  var image_Name = head[0].profile_pic;
  if(image_Name){
  var display_image = image_Name;
  // alert(display_image);
    return display_image;
  }
  },

    profilepic_crop_modal:function(){

  var user_id = Session.get("userId");
  var profilepic_imagePath = Session.get("profilepic_imagePath");
  // alert(user_id);
  // var head = UserInfo.find({user_id: user_id}).fetch();
  // alert(head[0].cover_image);
  // var image_Name = head[0].profile_pic;
  if(profilepic_imagePath){
  var display_image = profilepic_imagePath;
  // alert(display_image);
    return display_image;
  }
  }

})

Template.profile.events({
 'change #upload_cover': function(e, template) {
    upload_cover_image(e, template);
    
},
// 'click #crop_image':function(){
//   crop_image();
// },

 'change #upload_profile': function(e, template) {
  // alert('upload PPlicked');
  // Session.clear("profilepic_imagePath");
    // upload_cover_image(e, template);
    upload_profile_pic(e, template);
    $('#profile_pic_modal').click();
    // $('#crop_profile_image').modal('show');
},

'change #profile_pic_modal': function() {
            $('#divcrop_profile').addClass('cropper-example-lena');
             $('.cropper-example-lena > img').cropper({
             aspectRatio: 8 / 8,
            autoCropArea: 0.65,
            strict: true,
            guides: true,
            highlight: true,
            dragCrop: true,
            cropBoxMovable: true,
            cropBoxResizable: false
            });
},             

'click #crop_profile_image_selection':function(){
  // alert('1');
  crop_image();
},

'click #remove_cover': function(){
    alert('Remove clicked');
    var userId = Session.get("userId");
    // var UserInfo.find({user_id: userId });
    var set_default = "/uploads/default/cover.jpg";
        Meteor.call('set_default_cover',userId,set_default,function(error,result){
            if(error){
              console.log('error');
            }else{
              console.log('Sucess');
            }
  });
  },

'click #remove_profile': function(){
    alert('Remove clicked');

    var userId = Session.get("userId");
    // var UserInfo.find({user_id: userId });
    var set_default = "/uploads/default/default-profile-pic.png";

        Meteor.call('set_default_profile_pic',userId,set_default,function(error,result){
            if(error){
              // alert('Error');
              console.log('error');
            }else{
              // alert('Sucess');
              console.log('Sucess');
            }
  });
  },


// ,
// 'click #submit_image':function(event){
//   // if(Session.get("Cropped")=="true"){
//     event.preventDefault();
//     var user_id = Session.get("userId");
//     var imagePath = Session.get("imagePath");
//     // alert(1);

//     alert(user_id+' '+imagePath);
//     Meteor.call("upload_userimages",user_id,imagePath,function(error,result){
//         if(error){
//           alert("Error");
//         }else{
//          $('ul.tabs').tabs('select_tab', 'test7'); 
//         }
//     });
// }
});

function getBase64(file) {
 
}

function upload_cover_image(e,template){
    // e.preventDefault();
    // var files = e.currentTarget.files;
   
    if (e.currentTarget.files && e.currentTarget.files[0]) {
     var file = e.currentTarget.files[0];
      if (file) {
   
        var reader = new FileReader();
   var base64data="";
   reader.readAsDataURL(file);
   reader.onload = function () {
   console.log(reader.result);
   base64data = reader.result;

        var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://www.vayuz.com/testing/image_upload.php",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "image": base64data,
  }
}
// alert(base64data);
$.ajax(settings).done(function (response) {
  console.log(response);
  var new_image_url = 'https://www.vayuz.com/testing' + response.substr(1, response.length);
  console.log(new_image_url);
  Session.setPersistent("new_image_url",new_image_url);


    var imagePath = Session.get("new_image_url");

    // alert(imagePath);
        var user_id = Session.get("userId");
        Meteor.call("upload_cover_image",user_id,new_image_url,function(error,result){
        if(error){
          alert("Error");
        }else{
         $('ul.tabs').tabs('select_tab', 'test7'); 
        }
        //template.currentUpload.set(false);
    });

});
};
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };

      /*  var uploadInstance = Images.insert({
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
            // Session.setPersistent("imagePath",fileObj._id+'.'+  fileObj.ext);
                // Session.setPersistent("Cropped","false");
                   event.preventDefault();
    var user_id = Session.get("userId");
    // var imagePath = Session.get("imagePath");
    // alert(1);
    var imagePath = "http://localhost:3000/cdn/storage/Images/" + fileObj._id+"/original/" + fileObj._id+"."+  fileObj.ext;
    Session.setPersistent("imagePath",imagePath);

    // alert(user_id+' '+imagePath);
    Meteor.call("upload_cover_image",user_id,imagePath,function(error,result){
        if(error){
          alert("Error");
        }else{
         $('ul.tabs').tabs('select_tab', 'test7'); 
        }
        template.currentUpload.set(false);
    });
              
          }
     });

        uploadInstance.start();*/
      }   
  }
}

Template.user_list.helpers({
    display_user_list(){
    // var user_id = Session.get("userId");
    return UserInfo.find({email_status: 1});
    },
    display_user_list_2(){
      var user_id = this.user_id;
      var user_id2 = Session.get("userId");
      if(user_id == user_id2){
        return false;
      }else{
        return true;
      }
    }
});

function isValid(str)
{
 return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }


Template.header.events({
// alert('');
'click #logout': function(){


// cookieMaster.clear();
// window.location.replace('https://accounts.google.com/Logout');

// cookieMaster.clear();

// Meteor.logout();
// cookieMaster.clear();
            var login_status = 0;
              var userId = Session.get("userId");
              Meteor.call("update_login_status",login_status,userId,function(error,result){
              if(error){
                 alert('user login status updation error');
                 console.log('error');
              }
              else{
                 alert('user is now offline');
                 console.log('result');
              }
            });

Meteor.logout();
var t1 = Session.get("check_onlyonce");
// alert(t1);
if(t1 == 0){
  Session.setPersistent("check_onlyonce",1);
     document.getElementById("logout").click();
}

Session.clear("userId");
Meteor.logout(function() {
    // if (Meteor.isClient) {
        cookieMaster.clear();
    // }
});
Session.clear("check_source");
Router.go('/logout');
}


});


function collw(){
        if(document.getElementById('edit_check_education_edu_2').checked){
      
      $("#onchecked_edit_du_end_date").addClass('display_hide');
      $("#onchecked_edit_du_end_date").removeClass('display_show');

      $("#onchecked_edit_edu_end_date_show").addClass('display_show');
      $("#onchecked_edit_edu_end_date_show").removeClass('display_hide');
      
      $("#edit_edu_end_year").val('');
      $("#edit_edu_end_month").val('');
}
    else{
      $("#onchecked_edit_du_end_date").addClass('display_show');
      $("#onchecked_edit_du_end_date").removeClass('display_hide');

      $("#onchecked_edit_edu_end_date_show").addClass('display_hide');
      $("#onchecked_edit_edu_end_date_show").removeClass('display_show');

              
     }
}


function upload_profile_pic(e,template){
    // e.preventDefault();
    // var files = e.currentTarget.files;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
     var file = e.currentTarget.files[0];
      if (file) {
   
        var reader = new FileReader();
   var base64data="";
   reader.readAsDataURL(file);
   reader.onload = function () {
   console.log(reader.result);
   base64data = reader.result;

        var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://www.vayuz.com/testing/image_upload.php",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "image": base64data,
  }
}
// alert(base64data);
// $.ajax(settings).done(function (response) {
//   console.log(response);
//   var imagePath = 'http://beta.bitovn.com/testing' + response.substr(1, response.length);
//   console.log(imagePath);
//   Session.setPersistent("new_image_url",imagePath);

var imagePath = base64data;
    $("#my_image_profile").attr("src",imagePath);             
            $("#my_image_profile").attr("srcset",imagePath);             
            
            $("#crop_profile_modal").attr("src",imagePath);
            $('#divcrop_profile').addClass('cropper-example-lena');
           // $('#crop_profile_modal').addClass('cropper-example-lena');
             $('.cropper-example-lena > img').cropper({
            aspectRatio: 8 / 8,
            autoCropArea: 0.65,
            strict: false,
            guides: false,
            highlight: true,
            dragCrop: false,
            cropBoxMovable: true,
            cropBoxResizable: false,
            allowSelect : true,
            imageSmoothingEnabled : false,
            aspectRatio: 1 / 1,
            
            minCropBoxWidth:200,
            minCropBoxHeight:200,
            strict: false,
            guides: false,
            highlight: false,
            dragCrop: false,
            zoomable: false,
            scalable: false,
            rotatable: true,
            cropBoxMovable: false,
            cropBoxResizable: false,
            responsive: true,
            viewMode: 3,
            });
          $('#my_image_profile').cropper('destroy').cropper('replace', imagePath);

    //var imagePath = Session.get("new_image_url");

};
    
     }  }} 

function crop_image(){
  // alert('12345');
   event.preventDefault();
   // alert('vlll');
  var croppedPhoto = $('#my_image_profile').cropper('getCroppedCanvas');
    console.log(croppedPhoto);
    // croppedPhoto.toBlob(function (blob) {
var dataURL = croppedPhoto.toDataURL('image/jpeg', 0.5);
var blob = dataURItoBlob(dataURL);
console.log(blob);
var file = new FormData(document.forms[0]);
file.append("canvasImage", blob);
alert(dataURL);
base64data = dataURL;
console.log(base64data);

       var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://www.vayuz.com/testing/image_upload.php",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "image": base64data,
  }
}
// alert(base64data);
$.ajax(settings).done(function (response) {
  console.log(response);
  alert(response);
  var imagePath = 'https://www.vayuz.com/testing' + response.substr(1, response.length);
  console.log(imagePath);
  Session.setPersistent("new_profile_image_url",imagePath);

     var user_id = Session.get("userId");
     // var user_id = Session.get("userId");
     alert(user_id +' & ' +imagePath);

   Meteor.call("upload_profile_image",user_id,imagePath,function(error,result){
        if(error){
          alert("Error");
        }else{
            alert("Profile Pic Changed");
             // toastr.success(Sucess, Profile Pic Changed);
           $('#divcrop_profile').removeClass('cropper-example-lena');
        }
        template.currentUpload.set(false);
    });

});
        var uploadInstance = Images.insert({
                      file: file,
                        streams: 'dynamic',
                          chunkSize: 'dynamic'
                    });
        // alert(file);

        uploadInstance.on('start', function() {
          // template.currentUpload.set(this);
        });
        uploadInstance.on('end', function(error, fileObj) {
          // alert('3');
          if (error) {
             alert("Error");
            window.alert('Error during upload: ' + error.reason);
          } else {
            var new_profile_image_url = Session.get("new_profile_image_url");
             var imagePath = new_profile_image_url;

             $("#crop_image").hide();
             $("#divcrop").hide();
             $('#divcrop').removeClass('cropper-example-lena');
             $("#defaultbox").show();
             $("#my_image").attr("src",imagePath);             
            $("#my_image_profile").attr("src","");  
            $("#my_image_profile").attr("srcset","");  
             $("#my_image2").attr("src","");
   
          }
        });
}


function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}


function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

Template.passion.events({
   'click .save_passion': function(){
    // var passion = $('#my_passion').val();

    var passion = $('#my_passion').dropdown('get value');
    // alert(passion);
    var userId = Session.get("userId");
    Meteor.call('update_passion',userId,passion,function(error,result){
          if(error){
            console.log('error');
          }
          else{
            console.log('Sucess');
          }
        });
        
        $(".form_reset").trigger('reset');
        $('#my_passion').val('');
        $('.modal').modal('close');

   // }
}
});









































