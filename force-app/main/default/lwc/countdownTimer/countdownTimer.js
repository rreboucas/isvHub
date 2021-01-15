/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, wire } from 'lwc';
import getExpirationDate from '@salesforce/apex/CountdownTimerController.getExpirationDate';

export default class CountdownTimer extends LightningElement {
    title = "Org Expiration"
    deadline;
    deadlineStr;
    timeRemainingAsString;
    
    connectedCallback(){
        this.getOrgExpiration();
        setInterval(() => this.getTimeRemaining(), 100);
    }

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
                console.log(this.deadline);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getTimeRemaining(){
        console.log('Getting time in function...');
        const total = Date.parse(this.deadline) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );
        const days = Math.floor( total/(1000*60*60*24) );
        
        

        this.timeRemainingAsString =  days + ' days ' + hours + ' hours ' +  minutes + ' minutes ' + seconds + ' seconds';
        
        var deadlineDate = new Date(this.deadline); 
        this.deadlineStr = deadlineDate.toDateString();
        
        console.log(this.timeRemainingAsString);
      }
}