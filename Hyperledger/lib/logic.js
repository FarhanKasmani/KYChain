/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.kychain.co.grantAccess} grantAccess
 * @transaction
 */
async function grantAccess(grantAccess) {

    ns='org.kychain.co'
    
    const attribute = grantAccess.attribute;
    const companyName = grantAccess.companyName;
    const user = grantAccess.user;
  	switch(attribute)
    {

      case 'name':{
        			if(user.name) {
                      if(user.name.includes(companyName)){
                      throw new Error('Already Granted');
                      }
                      else{
                      user.name.push(companyName);  
                    	}
                    }
                  	else user.name=[companyName];
                  }break;
       case 'dob':{
        			if(user.dob){
                      if(user.dob.includes(companyName)){
                      throw new Error('Already Granted');
                      }
                      else{
                      user.dob.push(companyName);  
                    	}
                    }
                  	else user.dob=[companyName];
                  }break;
        case 'address':{
        			if(user.address){
                      if(user.address.includes(companyName)){
                      throw new Error('Already Granted');
                      }
                      else{
                      user.address.push(companyName);  
                    	}
                    }
                  	else user.address=[companyName];
                  }break;
        case 'phone':{
        			if(user.phone){
                      if(user.phone.includes(companyName)){
                      throw new Error('Already Granted');
                      }
                      else{
                      user.phone.push(companyName);  
                    	}
                    }
                  	else user.phone=[companyName];
                  }break;
        case 'gender':{
        			if(user.gender) {
                      if(user.gender.includes(companyName)){
                      throw new Error('Already Granted');
                      }
                      else{
                      user.gender.push(companyName);  
                    	}
                    }
                  	else user.gender=[companyName];
                  }break;
      default:break;
    }
    const userRegistry = await getParticipantRegistry(ns+'.User');

    await userRegistry.update(user);
  let event=getFactory().newEvent(ns,'grantEvent');
  event.user=user
  event.attribute=attribute
  event.companyName=companyName
  emit(event)
}
/**
 * Sample transaction
 * @param {org.kychain.co.revokeAccess} revokeAccess
 * @transaction
 */

async function revokeAccess(revokeAccess) {

    ns='org.kychain.co';
    
    const attribute = revokeAccess.attribute;
    const companyName = revokeAccess.companyName;
    const user = revokeAccess.user;
    
  
  	switch(attribute)
    {
      case 'name':{
        var i;
        	if(!user.name.includes(companyName)){
            	throw new Error('Not granted');
            }
        for(i = user.name.length - 1; i >= 0; i--) {
                  	if(user.name[i] === companyName) {
                     	user.name.splice(i, 1);
                     	break;
                    	}
                  	}
        		  }
        			break;
       case 'dob':{
         	var i;
                	if(!user.dob.includes(companyName)){
            	throw new Error('Not granted');
            }	
         for(i = user.dob.length - 1; i >= 0; i--) {
                  	if(user.dob[i] === companyName) {
                     	user.dob.splice(i, 1);
                     	break;
                    	}
                  	}
         			
                  }
        			break;
        case 'address':{
                  	if(!user.address.includes(companyName)){
            	throw new Error('Not granted');
            }
          var i;
        			for(i = user.address.length - 1; i >= 0; i--) {
                  	if(user.address[i] === companyName) {
                     	user.address.splice(i, 1);
                     	break;
                    	}
                  	}
                  }
        			break;
        case 'phone':{
          if(!user.phone.includes(companyName)){
            	throw new Error('Not granted');
            }
          var i;
          				for(i = user.phone.length - 1; i >= 0; i--) {
                  	if(user.phone[i] === companyName) {
                     	user.phone.splice(i, 1);
                     	break;
                    	}
                  	}
                  }
        			break;
        case 'gender':{
          if(!user.gender.includes(companyName)){
            	throw new Error('Not granted');
            }
          var i;
          				for(i = user.gender.length - 1; i >= 0; i--) {
                  	if(user.gender[i] === companyName) {
                     	user.gender.splice(i, 1);
                     	break;
                    	}
                  	}
                  }
        			break;
      default:break;
    }

    const userRegistry = await getParticipantRegistry(ns+'.User');

    await userRegistry.update(user);
  let event=getFactory().newEvent(ns,'grantEvent');
  event.user=user
  event.attribute=attribute
  event.companyName=companyName
  emit(event)
}


