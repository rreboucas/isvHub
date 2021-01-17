/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

<<<<<<< HEAD
<<<<<<< HEAD
import { LightningElement, track } from 'lwc';
=======
import { LightningElement, wire } from 'lwc';
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
=======
import { LightningElement, track } from 'lwc';
>>>>>>> b024a8c (UI updates and Lightning Flow added)
import getExpirationDate from '@salesforce/apex/CountdownTimerController.getExpirationDate';

export default class CountdownTimer extends LightningElement {
    title = "Org Expiration"
    deadline;
    timeRemainingAsString;
<<<<<<< HEAD
<<<<<<< HEAD
    expanded = false;
    orgActive = false;

    @track daysBeforeExpiry;
    @track buttonLabel = "Configure Expiry Notifications";
=======
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
=======
    expanded = false;

    @track daysBeforeExpiry;
    @track buttonLabel = "Configure Expiry Notifications";
>>>>>>> b024a8c (UI updates and Lightning Flow added)
    
    connectedCallback(){
        this.getOrgExpiration();
        setInterval(() => this.getTimeRemaining(), 100);
    }

<<<<<<< HEAD
    get expiresToday(){
        return this.daysBeforeExpiry < 1;
    }

=======
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
    /*
        getOrgExpiration
        Retrieves the expiry date of the trial org.
        Can't use @Wire due to the need for record ID 
        Org ID will depend on customer.
    */
    getOrgExpiration(){
        getExpirationDate()
            .then((result) => {
                this.deadline = result;
<<<<<<< HEAD
=======
                console.log(this.deadline);
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getTimeRemaining(){
<<<<<<< HEAD
<<<<<<< HEAD
        const total = Date.parse(this.deadline) - Date.parse(new Date());
        if(total){
            this.orgActive = false;
            const seconds = Math.floor( (total/1000) % 60 );
            const minutes = Math.floor( (total/1000/60) % 60 );
            const hours = Math.floor( (total/(1000*60*60)) % 24 );
            const days = Math.floor( total/(1000*60*60*24) );     

            this.timeRemainingAsString =  days + ' days ' + hours + ' hours ' +  minutes + ' minutes ' + seconds + ' seconds';
            
            var deadlineDate = new Date(this.deadline); 
            this.deadline = deadlineDate.toDateString();
            this.daysBeforeExpiry = days;
        }else{
            this.orgActive = true;
        }
    }

      invertExpanded(){
          this.expanded = !this.expanded;
          if(this.expanded){
            this.buttonLabel = "Collapse";
          }else{
            this.buttonLabel = "Configure Expiry Notifications";
          }
=======
        console.log('Getting time in function...');
=======
>>>>>>> b024a8c (UI updates and Lightning Flow added)
        const total = Date.parse(this.deadline) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );
        const days = Math.floor( total/(1000*60*60*24) );     

        this.timeRemainingAsString =  days + ' days ' + hours + ' hours ' +  minutes + ' minutes ' + seconds + ' seconds';
        
        var deadlineDate = new Date(this.deadline); 
<<<<<<< HEAD
        this.deadlineStr = deadlineDate.toDateString();
        
        console.log(this.timeRemainingAsString);
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
=======
        this.deadline = deadlineDate.toDateString();
        this.daysBeforeExpiry = days;
      }

      invertExpanded(){
          this.expanded = !this.expanded;
          if(this.expanded){
            this.buttonLabel = "Collapse";
          }else{
            this.buttonLabel = "Configure Expiry Notifications";
          }
>>>>>>> b024a8c (UI updates and Lightning Flow added)
      }
}