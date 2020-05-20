/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, api} from 'lwc';
import apexSendEmail from '@salesforce/apex/emailServerController.sendEmail';

export default class EmailSender extends LightningElement {
    @api email;
    @api attachtoentityid;
    @api expirationdate;
    @api emailType;

    showEmailForm = false;
    showResults = false;
    sendResult;
    error;
    defaultSubject ;
    myVal = '**Hello**';
    formats = ['font', 'size', 'bold', 'italic', 'underline',
        'strike', 'list', 'indent', 'align', 'link',
        'image', 'clean', 'table', 'header', 'color'];

    connectedCallback() {
        console.log('emailSender.js attachtoentityid - connectedCallback: ' + this.attachtoentityid);
        this.showEmailForm = true;
        // Check which Badge icon to use based on Badge's Label
        switch(this.emailType) {
            case 'New Install':
                this.myVal = 'Thank you for installing our app! I would like to setup a brief call to walk your team through how to best configure and use the app. Please let me know when it is a good date and time for us to meet!';
                this.defaultSubject = 'Thank you for installing!';
              break;
            case 'License Expiration':
                this.myVal = 'I am reaching out to let you know that your License for our app is expiring soon. I would like to connect to setup a call for us to review your license renewal options.  Please let me know when it is a good date and time for us to meet!';
                this.defaultSubject = 'License Expiration';
            break;
            default:
          }

        }

        sendEmail(event) {
            var inputTo = this.template.querySelector(".inputEmail");
            var emailVal = inputTo.value;
            console.log('emailSender.js email' + emailVal);

            var inputSubject = this.template.querySelector(".inputSubject");
            var subjectVal = inputSubject.value;
            console.log('emailSender.js subject' + subjectVal);

            var inputBody = this.template.querySelector('lightning-input-rich-text');
            var bodyVal = inputBody.value;
            console.log('emailSender.js bodyVal' + bodyVal);
            console.log('emailSender.js attachtoentityid - SendEmail: ' + this.attachtoentityid);

            if (emailVal.length > 0 && subjectVal.length > 0 && bodyVal.length > 0)
            {
                this.showEmailForm = false;
                this.showResults = true;
                apexSendEmail({ body: bodyVal, 
                    subject: subjectVal,
                    email: emailVal,
                    recordId: this.attachtoentityid
                 })
                 .then(result => {
                    //this.sendResult = result;
                })
                .catch(error => {
                    this.error = error;
                }); 
            }
        }

}