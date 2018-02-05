import { Meteor } from 'meteor/meteor';
import { UserInfo }  from './../import/collections/insert.js';
import { UserSkill } from './../import/collections/insert.js';

import { UserProfJr } from './../import/collections/insert.js';
import { UserEdu } from './../import/collections/insert.js';

import { UserAward } from './../import/collections/insert.js';
import { UserMedical } from './../import/collections/insert.js';
import { FriendRequest } from './../import/collections/insert.js';

import { Message } from './../import/collections/insert.js';
import { UserGroup } from './../import/collections/insert.js';
import { Email } from 'meteor/email';
import { GroupRequest } from './../import/collections/insert.js';
import { Chatroom } from './../import/collections/insert.js';
import { VideoSession } from './../import/collections/insert.js';
import { AudioSession } from './../import/collections/insert.js';

import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/uploaded/'
  })
});




//    var t1 = Presence.configure({
//   state: function() {
//     return {
//       online: false
//     }
//     userId: cool;
//   }
// });

//     if(t1 == 0){
//     	alert('i am active');
//     	console.log('active');
//     }

//     else if( t1 == 1 || t1 == 2){
//        alert('i am inactive');
//        console.log('In-active');
//        Session.setPersistent("login_status",0);              
//     }

//     else{
//     	console.log('In-active');
//     }


ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "448932643096-qqt9pqi7c3ag0rcq1v6e9q2a8rfe65ap.apps.googleusercontent.com",
  secret: "0bTZibxwUduW_NEqf4W0Ngmb",
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "facebook"
});

ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "784566848397487",
  secret: "678712697eae8bdc3cff25938136e2b9"
});

ServiceConfiguration.configurations.remove({
  service: "linkedin"
});

ServiceConfiguration.configurations.insert({
  service: "linkedin",
  clientId: "78eqh4qk0yx7y7",
  secret: "ixPAnSBiCtBq6WPJ"
});
// // first, remove configuration entry in case service is already configured
// Accounts.loginServiceConfiguration.remove({
//   service: "facebook"
// });
// Accounts.loginServiceConfiguration.insert({
//   service: "facebook",
//   appId: "784566848397487",
//   secret: "678712697eae8bdc3cff25938136e2b9"
// });

 smtp = {
    username: 'ankit.vayuz@gmail.com',
    password: 'rsklxjzhbthcowko',
    server: 'smtp.gmail.com',
    port: 587
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

Meteor.methods({
  
logout_google: function(name){
var result = Meteor.users.update({
   _id: name
}, {
   $set: {
       "services.resume.loginTokens": []
   }
}, {
   multi: true
});
return result;
},

  insert_address: function (userId,address) {
  	var newUser = UserInfo.find({"user_id":userId}).fetch();
  	if(newUser[0]){
		var result =	UserInfo.update({
			  _id: newUser[0]._id,
			}, {
			  $set: {"location": address}
			});
  	}else{
			var result =UserInfo.insert({
					location:address,
			        user_id:userId,
			        createdAt: new Date()// no comma needed here
			   });
  	}
    return result;
  },
	  	
  insert_contact_no: function (userId,contactno) {
  	var newUser = UserInfo.find({"user_id":userId}).fetch();
  	if(newUser[0]){
		var result =	UserInfo.update({
			  _id: newUser[0]._id,
			}, {
			  $set: {"phone": contactno}
			});
  	}else{
			var result =UserInfo.insert({
					phone:contactno,
			        user_id:userId,
			        createdAt:new Date() // no comma needed here
			   });
  	}
    return result;
  },
   insert_disabilities: function (userId,hearing, speech, visual, physical, special_note) {
  	var newUser = UserMedical.find({"user_id":userId}).fetch();
  	if(newUser[0]){
		var result =UserMedical.update({
			  user_id: userId,
			}, {
			  $set: {
			  	"hearing": hearing,
			  	"speech": speech,
			  	"visual": visual,
			  	"physical": physical,
			  	"special_note": special_note,
			  }
			});

  	}else{

		var result =UserMedical.insert({
			        user_id: userId,
			        hearing: hearing,
			  		speech: speech,
			  		visual: visual,
			  		physical: physical,
			  		special_note: special_note,
			        createdAt: new Date() // no comma needed here
			   });


		var newUser = UserInfo.find({"user_id":userId}).fetch();
		  	if(newUser[0]){
				var result =	UserInfo.update({
					  _id: newUser[0]._id,
					}, {
					  $set: {"disablities": "true"}
					});
		  	}



  	}

    return result;
  },
  upload_user_image:function(userId,profile_pic){
  var newUser = UserInfo.find({"user_id":userId}).fetch();
  	if(newUser[0]){
		var result =	UserInfo.update({
			  _id: newUser[0]._id,
			}, {
			  $set: {"profile_pic": profile_pic}
			});
  	}else{

			var result =UserInfo.insert({
					profile_pic:profile_pic,
			        user_id:userId,
			        createdAt:new Date() // no comma needed here
			   });

  	}
  	return result;	
  }, 

  update_headline:function(userId,headline){
  var newUser = UserInfo.find({"user_id":userId}).fetch();
  	if(newUser[0]){
		var result =	UserInfo.update({
			  _id: newUser[0]._id,
			}, {
			  $set: {"headline": headline}
			});
  	}else{
			var result =UserInfo.insert({
					headline:headline,
			        user_id:userId,
			        login_status: 1,
			        createdAt:new Date() // no comma needed here
			   });

  	}
  	return result;	
  },

  update_summary:function(userId,summary){
  var newUser = UserInfo.find({"user_id":userId}).fetch();
  	if(newUser[0]){
		var result = UserInfo.update({
			  _id: newUser[0]._id,
			}, {
			  $set: {"summary": summary}
			});
  	}else{
			var result =UserInfo.insert({
					summary:summary,
			        user_id:userId,
			        createdAt:new Date() // no comma needed here
			   });
  	}
  	return result;	
  },

  create_user:function(userID,source,name,email){
			var result =UserInfo.insert({
					name: name,
			        email: email,
			        user_id: userID,
			        source: source,
			        email_status: 0,
			        createdAt:new Date() // no comma needed here
			   });

  	return result;	
  },

        con_req_insert: function(sent_to,sent_by,reqID){
  		var result = FriendRequest.insert({
  			req_id: reqID,
  			sent_to: sent_to,
  			sent_by: sent_by,
  			req_status: 0,
  			requestedAt: new Date(),
  			updatedAt: new Date()
  		  });
  		  return result;
  	    },

  	    con_req_update: function(sent_by,sent_to,request_type){
  		var result = FriendRequest.update({
			  sent_by: sent_by,
			  sent_to: sent_to,
			}, {
			  $set: {"req_status": request_type,"updatedAt": new Date()}
			});
		  return result;
			},
        
	    pers_info_update: function(name,gender,marital_status,phone,datepicker,autocomplete,user_id)
	    {
  		var result = UserInfo.update({'user_id': user_id},{$set: {'name': name,'gender': gender,
          'marital_status': marital_status,'phone': phone,'dob': datepicker,
          'location': autocomplete}});
		return result;
		},
      
	    insert_education: function(user_id,course,board,school,score,edu_start_month,edu_start_year,edu_end_month,edu_end_year,edu_location)
	    {
  		var result = UserEdu.insert({'user_id': user_id,'course': course,'board': board,
          'school': school,'score': score,'edu_start_month': edu_start_month,
          'edu_start_year': edu_start_year,'edu_end_month': edu_end_month,'edu_end_year': edu_end_year,'edu_location': edu_location });
		return result;
		},
      
	    insert_profjr: function(company_name,job_title,start_month,start_year,end_month,end_year,Job_location,skill_used,key_responsibilities,job_type,user_id)
	    {
  		var result = UserProfJr.insert({
         user_id: user_id,
         company: company_name,
         title: job_title,
         start_month: start_month,   
         start_year: start_year,   
         end_month: end_month,   
         end_year: end_year, 
         location: Job_location,
         skill: skill_used,
         key_responsibilities: key_responsibilities,
         job_type: job_type,
         createdAt: new Date(),  
        });
		return result;
		},
      
	  insert_awd: function(userId,awd_type ,description,awd_month,awd_year,awd_location)
	    {
  		var result = UserAward.insert({
         user_id: userId,
         type: awd_type,
         description: description,
         awd_month: awd_month,   
         awd_year: awd_year,   
         location: awd_location,
         createdAt: new Date(),  
        });
		return result;
		},
      
	  update_awd: function(userId,edit_id,awd_type ,description,awd_month,awd_year,awd_location)
	    {
		var result = UserAward.update({
			  _id: edit_id,
			}, {
			  $set: {
			  	     "type": awd_type,
			         "description": description,
			         "awd_month": awd_month,   
			         "awd_year": awd_year,   
			         "location": awd_location,
			         "createdAt": new Date(),  	
			  }
			});
		return result;
		},
      
	  	insert_skill: function(userId,awd_expert,last_used,skill_name)
	    {
		var result = UserSkill.insert({
         user_id: userId,
         awd_expert: awd_expert,
         last_used: last_used,
         skill_name: skill_name, 
         createdAt: new Date(),  
        });
		return true;
		},
      
	  	update_skill: function(edit_id,awd_expert,last_used,skill_name)
	    {
		var result = UserSkill.update({
			  _id: edit_id,
			}, {
			  $set: {
	         awd_expert: awd_expert,
	         last_used: last_used,
	         skill_name: skill_name, 
	         createdAt: new Date(),   	
			  }
			});
		return true;
		},
		update_profjr: function(edit_id,company_name,job_title,start_month,start_year,end_month,end_year,Job_location,
          skill_used,key_responsibilities,job_type)
	    {
		var result = UserProfJr.update({
            _id: edit_id
          },
            {
        $set: {
         company: company_name,
         title: job_title,
         start_month: start_month,   
         start_year: start_year,   
           
         end_month: end_month,   
         end_year: end_year, 
         location: Job_location,
         skill: skill_used,
         job_type: job_type,
         key_responsibilities: key_responsibilities,
         updatedAt: new Date() ,
         }});
		return true;
		},

		update_profjr_2: function(edit_id,company_name,job_title,start_month,end_month,Job_location,
          skill_used,key_responsibilities,job_type)
	    {
		var result = UserProfJr.update({
            _id: edit_id
          },
            {
        $set: {
         company: company_name,
         title: job_title,
         start_month: start_month,   
         start_year: start_year,   
           
         location: Job_location,
         skill: skill_used,
         job_type: job_type,
         key_responsibilities: key_responsibilities,
         updatedAt: new Date() ,
         }});
		return true;
		},


		update_education: function(edit_id,course,board,school,score,edu_start_month,edu_start_year,edu_end_month,edu_end_year,edu_location)
	    {
		
		var result = UserEdu.update({
            _id: edit_id
        
          },
            {
        $set: {'course': course,'board': board,
          'school': school,'score': score,'edu_start_month': edu_start_month,
          'edu_start_year': edu_start_year,'edu_end_month': edu_end_month,'edu_end_year': edu_end_year,'edu_location': edu_location }
     });
		return true;
		},
        upload_cover_image: function(user_id,imagePath)
	    {
		var result = UserInfo.update({
			  user_id: user_id,
			}, {
			  $set: {
			  	     "cover_image": imagePath,
			         "lastUpdateAt": new Date()
			  }
			});
		return result;
		},

		upload_profile_image: function(user_id,imagePath)
	    {
		var result = UserInfo.update({
			  user_id: user_id,
			}, {
			  $set: {
			  	     "profile_pic": imagePath,
			         "lastUpdateAt": new Date()
			  }
			});
		return result;
		},

        insert_message: function(sent_by,sent_to,msg_text,msg_id,chatroom_id,msg_img_id)
	    {
		var result = Message.insert({	
		 msg_id: msg_id,
         sent_by: sent_by,
         sent_to: sent_to,
         chatroom_id:chatroom_id,
         msg_text: msg_text,
         image_attach: msg_img_id,
         sentAt: new Date(),  
        });
		return true;
		}, 

        
        insert_message_With_img: function(sent_by,sent_to,msg_img_id,msg_id)
	    {
		var result = Message.insert({
		 msg_id: msg_id,
         sent_by: sent_by,
         sent_to: sent_to,
         msg_text: 0,
         image_attach: msg_img_id,
         sentAt: new Date(),  
        });
		return true;
		}, 

		insert_message_With_attachment: function(msg_id,sent_to,sent_by,attach_name,attach_path,format)
	    {
		var result = Message.insert({
		 msg_id: msg_id,
         sent_by: sent_by,
         sent_to: sent_to,
         msg_text: 0,
         image_attach: 0,
         attachment_name: attach_name,
         attachment_path: attach_path,
         format: format,
         sentAt: new Date(),  
        });
		return true;
		}, 

		insert_Group_details: function(user_id,grp_image,grp_title,grp_type,grp_discription,grp_visibility,grp_id)
	    {
		var result = UserGroup.insert({
		 grp_id: grp_id,
		 grp_title: grp_title,
		 admin: user_id,
         grp_type: grp_type,
         grp_discription: grp_discription,
         grp_visibility: grp_visibility,
         grp_image: grp_image,
         activity_status: 1,
         createdAt: new Date() 
        });
		return true;
		},

		update_Group_details: function(user_id,grp_image,grp_title,grp_type,grp_discription,
			grp_visibility,grp_id,activity_status)
	    {
		var result = UserGroup.update({
			  grp_id: grp_id,
			}, {
			  $set: {
		             grp_title: grp_title,
					 admin: user_id,
			         grp_type: grp_type,
			         grp_discription: grp_discription,
			         grp_visibility: grp_visibility,
			         grp_image: grp_image,
			         activity_status: activity_status,
			         UpdatedAt: new Date(), 
			  }
			});
		return true;
		},
   
   	 	sendEmail: function (userId, email) {
            Email.send(email);
        },

        update_Group_activity: function(grp_id,activity_status)
	    {
		var result = UserGroup.update({
			  grp_id: grp_id,
			}, {
			  $set: {
			  	     "activity_status": activity_status,
			         "lastUpdateAt": new Date()
			  }
			});
		return result;
		},      
		update_email_status:function(userId,email_status){
        		var newUser = UserInfo.find({"user_id":userId}).fetch();
			  	if(newUser[0]){
					var result =	UserInfo.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {"email_status": 1}
						});
			  	}
			    return result;
        },      
		set_default_cover:function(userId,set_default){
        		var newUser = UserInfo.find({"user_id":userId}).fetch();
			  	if(newUser[0]){
					var result =	UserInfo.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {"cover_image": set_default}
						});
			  	}
			    return result;
        },      
		set_default_profile_pic:function(userId,set_default){
        		var newUser = UserInfo.find({"user_id":userId}).fetch();
			  	if(newUser[0]){
					var result =	UserInfo.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {"profile_pic": set_default}
						});
			  	}
			    return result;
        },

		update_login_status:function(login_status,userId){
        		var newUser = UserInfo.find({"user_id":userId}).fetch();
			  	if(newUser[0]){
					var result =	UserInfo.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {"login_status": login_status}
						});
			  	}
			    return result;
        },

		update_passion:function(userId,passion){
        		var newUser = UserInfo.find({"user_id":userId}).fetch();
			  	if(newUser[0]){
					var result =	UserInfo.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {"passion": passion}
						});
			  	}
			    return result;
        },
        
        remove_skill:function(skill_id){
        	    var result =	UserSkill.remove({_id: skill_id });
			    return result;
        },
        remove_award:function(awd_id){
        	    var result =	UserAward.remove({_id: awd_id });
			    return result;
        },
        remove_profjr:function(profjr_id){
        	    var result =	UserProfJr.remove({_id: profjr_id });
			    return result;
        },
        remove_education:function(edu_id){
        	    var result =	UserEdu.remove({_id: edu_id });
			    return result;
        },

        remove_group_request:function(sent_by,grp_id){
        	    var result =	GroupRequest.remove({sent_by: sent_by, grp_id: grp_id});
			    return result;
        },

        insert_group_request:function(req_id,sent_by,grp_id,status){
        		var result = GroupRequest.insert({
			         req_id: req_id,
			         sent_by: sent_by,
			         grp_id: grp_id,
			         status: status,
			         sentAt: new Date(),  
			        });
			    return result;
        },

        Update_Chatroom:function(chatroom_id,user1,user2,last_msg,last_msg_id,last_msg_sent_by,connect_status,
currently_typing){
        		var newUser = Chatroom.find({chatroom_id: chatroom_id}).fetch();
			  	var total_messages = Message.find({"chatroom_id":chatroom_id}).count();
			  	// var total_messages = Message.find({"chatroom_id":chatroom_id}).count();
			  	if(newUser[0]){
					var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  				total_messages:total_messages+1,
						                last_msg: last_msg,
						                last_msg_id:last_msg_id,
						                last_msg_time: Date.now(),
				        				last_msg_sent_by: last_msg_sent_by, 
				        				connect_status: connect_status, 
				        				currently_typing: currently_typing

						  }
						});
			  	}
			  	else{
			  		var result =	Chatroom.insert({
				        				chatroom_id: chatroom_id, 
				        				user1:        user1 , 
				        				user2:        user2 , 
				        				last_msg_id: last_msg_id,
				        				last_msg: last_msg, 
				        				mute_status_user2: 'Mute',
				        				mute_status_user1: 'Mute',
				        				last_msg_time: Date.now(),
				        				last_msg_sent_by: last_msg_sent_by, 
				        				connect_status: connect_status, 
				        				currently_typing: currently_typing 
										});
							  	}
			    return result;
        },

        Update_currently_typing:function(chatroom_id,currently_typing){        	
        		var newUser = Chatroom.find({chatroom_id: chatroom_id}).fetch();
			  	if(newUser[0]){
					var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
                      				currently_typing: currently_typing
                       		  }
						});
			  	}
			    return result;
        },
        change_user_online_status:function(userId,status){
        	var newUser = UserInfo.find({"user_id":userId}).fetch();
				  	if(newUser[0]){
						var result = UserInfo.update({
							  _id: newUser[0]._id,
							}, {
							  $set: {"online_status": status}
							});
				  	}
				  	return result;	
        },
        update_chatroom_count:function(chatroom_id,count){
        	var newUser = Chatroom.find({chatroom_id: chatroom_id}).fetch();
        		var updatedCount=0;
        	if(newUser[0].unread_msg_count){
				updatedCount  = newUser[0].unread_msg_count+1;
        	}else{
				updatedCount  =1; 
        	}
        	if(count == 0){
			updatedCount = 0;
        	}
			  	if(newUser[0]){
			  		if(updatedCount !=0 ){
			  			var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  			 last_msg_time: Date.now(),
                      				unread_msg_count: updatedCount
                       		  }
						});
			  		}else{
			  			var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  			unread_msg_count: updatedCount
                       		  }
						});
			  		}	
			  	}
			  	return result;
        },
        update_last_msg_status:function(message_id,status){

        	var newUser = Message.find({"msg_id":message_id}).fetch();
        	if(status == "read"){
				var newUser = Message.find({"chatroom_id":newUser[0].chatroom_id}).fetch();
				for(var i=0;i<newUser.length;i++){
				var result = Message.update({
					_id: newUser[i]._id,
				 	}, {
					$set: {"delivery_status": "read"}
				});
				}
				
			
        	}else{
        	if(newUser[0]){
			var result = Message.update({
					_id: newUser[0]._id,
				}, {
					$set: {"delivery_status": status}
				});
			}	
        	}
			
				  	return result;	
        },
        Update_Notification_satus_user1:function(chatroom_id,mute_status_user1){
var newUser = Chatroom.find({chatroom_id: chatroom_id}).fetch();
			  	//var total_messages = Message.find({"chatroom_id":chatroom_id}).count();
			  	if(newUser[0]){
					var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		mute_status_user1: mute_status_user1,
						  }
						});
			  	}
},
        Update_Notification_satus_user2:function(chatroom_id,mute_status_user2){
var newUser = Chatroom.find({chatroom_id: chatroom_id}).fetch();
			  	// var total_messages = Message.find({"chatroom_id":chatroom_id}).count();
			  	if(newUser[0]){
					var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		mute_status_user2: mute_status_user2,
						  }
						});
			  	}
},
			maintain_video_session:function(videoSessionId, callerId,pickerId,chatRoom){
			// var newUser = VideoSession.find({$and: [{"caller_id":callerId},{"picker_id":pickerId},{"is_picked":true}]}).fetch();
			var newUser = VideoSession.find({"video_session_id":videoSessionId}).fetch();
				  	if(!newUser[0]){
						/*	var result = VideoSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		is_picked: false,
						  }
						});*/
				  	var result =VideoSession.insert({
								video_session_id:videoSessionId,
								chatroom_id:chatRoom,
								caller_id:callerId,
						        picker_id:pickerId,
						        createdAt: new Date()// no comma needed here
			   			});
				  	var newUser = Chatroom.find({chatroom_id: chatRoom}).fetch();
					if(newUser[0]){
						if(!newUser[0].video_session_counts){
						var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  			 video_session_counts: 1,
						  			 video_session_id: videoSessionId,
                      			}
						});

						}else{
						var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  			 video_session_counts: newUser[0].video_session_counts+1,
                      					video_session_id: videoSessionId,
                      		}
						});
						}

			  		}
					return "Inserted";
					}else{
						var result = VideoSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		is_picked: true,
						  }
						});
						return "Updated";
					}
				  					  

			},
			rejects_the_call:function(videoSessionId,status,type){
						if(type=="video"){
						var newUser = VideoSession.find({"video_session_id":videoSessionId}).fetch();
						var result = VideoSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		is_rejected: true,
						  }
						});	
					}else{
						var newUser = AudioSession.find({"audio_session_id":videoSessionId}).fetch();
						var result = AudioSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		is_rejected: true,
						  }
						});
					}	
							return result;
				},
			change_video_chat_user_availability:function(videoSessionId,current_user,status){
				var newUser = VideoSession.find({"video_session_id":videoSessionId}).fetch();
				var type = "";
				if(newUser[0].is_picked){
					if(newUser[0].caller_id == current_user){
					
				var result = VideoSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		caller: status,
						  }
						});

				}else{
				var result = VideoSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		picker: status,
						  }
						});
				}
				}
				
				return status +" changed user "+current_user ;
			},
			maintain_audio_session:function(videoSessionId, callerId,pickerId,chatRoom){
			// var newUser = VideoSession.find({$and: [{"caller_id":callerId},{"picker_id":pickerId},{"is_picked":true}]}).fetch();
			var newUser = AudioSession.find({"audio_session_id":videoSessionId}).fetch();
				  	if(!newUser[0]){
						/*	var result = VideoSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		is_picked: false,
						  }
						});*/
				  	var result =AudioSession.insert({
								audio_session_id:videoSessionId,
								chatroom_id:chatRoom,
								caller_id:callerId,
						        picker_id:pickerId,
						        createdAt: new Date()// no comma needed here
			   			});
				  	var newUser = Chatroom.find({chatroom_id: chatRoom}).fetch();
					if(newUser[0]){
						if(!newUser[0].audio_session_counts){
						var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  			 audio_session_counts: 1,
						  			 audio_session_id: videoSessionId,
                      			}
						});

						}else{
						var result = Chatroom.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  			 audio_session_counts: newUser[0].audio_session_counts+1,
                      					audio_session_id: videoSessionId,
                      		}
						});
						}

			  		}
					return "Inserted";
					}else{
						var result = AudioSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		is_picked: true,
						  }
						});
						return "Updated";
					}
				  					  

			},
			change_audio_chat_user_availability:function(videoSessionId,current_user,status){
				var newUser = AudioSession.find({"audio_session_id":videoSessionId}).fetch();
				var type = "";
				if(newUser[0].is_picked){
					if(newUser[0].caller_id == current_user){
					
				var result = AudioSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		caller: status,
						  }
						});

				}else{
				var result = AudioSession.update({
						  _id: newUser[0]._id,
						}, {
						  $set: {
						  		picker: status,
						  }
						});
				}
				}
				
				return status +" changed user "+current_user ;
			},

});







