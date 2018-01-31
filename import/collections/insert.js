import { Mongo } from 'meteor/mongo';
 
export const UserInfo = new Mongo.Collection('user_info');                                              
export const UserSkill = new Mongo.Collection('user_skill');                                         
export const UserProfJr = new Mongo.Collection('user_profjr');                                   
export const UserEdu = new Mongo.Collection('user_edu');                                          
export const UserAward = new Mongo.Collection('user_award');                                    
export const UserMedical = new Mongo.Collection('user_medical');                                   
                                                                                             
export const FriendRequest = new Mongo.Collection('friend');                               
export const Message = new Mongo.Collection('message');                                  
export const UserGroup = new Mongo.Collection('user_group');                              
export const GroupRequest = new Mongo.Collection('group_request');                          
export const Chatroom = new Mongo.Collection('chatroom');                                   
export const VideoSession = new Mongo.Collection('video_session');                                   
export const AudioSession = new Mongo.Collection('audio_session');                                   


