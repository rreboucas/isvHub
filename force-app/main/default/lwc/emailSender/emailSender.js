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

    @api orgid;
    @api instancename;
    @api maintenancename;
    @api startdt;

    @api endtime;
    @api availability;
    @api orgtype;

    @api licenseid;
    @api maintenanceid;

    @api maintenancelink;
    @api isaccount;

    activityType;
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
        console.log('emailSender.js - connectedCallback - startdt: ' + this.startdt);
        const enUSFormatter = new Intl.DateTimeFormat('en-US');
        console.log('emailSender.js - connectedCallback - enUSFormatter: ' + enUSFormatter);
        const startdatetime = new Date(this.startdt);
        console.log('emailSender.js - connectedCallback - startdatetime: ' + startdatetime);
        const startdate = startdatetime.getDate();
        console.log('emailSender.js connectedCallback - startdate: ' + startdate);
        console.log('emailSender.js connectedCallback - startdatetime.getDate: ' + startdatetime.getDate());
        console.log('emailSender.js connectedCallback - startdatetime.getTime: ' + startdatetime.getTime());

        const enddatetime = new Date(this.endtime);
        console.log('emailSender.js connectedCallback - enddatetime: ' + enddatetime);
        console.log('emailSender.js connectedCallback - enddatetime.getDate: ' + enddatetime.getDate());
        console.log('emailSender.js connectedCallback - enddatetime.getTime: ' + enddatetime.getTime());

        this.showEmailForm = true;
        // Check which Badge icon to use based on Badge's Label
        switch(this.emailType) {
            case 'New Install':
                this.myVal = 'Thank you for installing our app! I would like to setup a brief call to walk your team through how to best configure and use the app. Please let me know when it is a good date and time for us to meet!';
                this.defaultSubject = 'Thank you for installing!';
                this.activityType = 'Welcome';
              break;
            case 'License Expiration':
                this.myVal = 'I am reaching out to let you know that your License for our app is expiring soon. I would like to connect to setup a call for us to review your license renewal options.  Please let me know when it is a good date and time for us to meet!';
                this.defaultSubject = 'License Expiration';
                this.activityType = 'Expiration';
            break;
            case 'Upcoming Maintenance':
                this.myVal = 'I am reaching out to let you know that there is an upcoming Platform Maintenance ' + this.maintenancename + ' scheduled for your ' + this.orgtype + ' Salesforce org id ' + this.orgid + ' on ' + enUSFormatter.format(startdatetime) + ' and your org is scheduled to be ' + this.availability + ' from ' + startdatetime.toTimeString() + ' to ' + enddatetime.toTimeString() + '.  You can look at more details about this maintenance through the following link as well: ' + 'https://status.salesforce.com/maintenances/' +  this.maintenanceid + ' . Please let us know if you have any questions.';
                this.defaultSubject = 'Planned ' + this.orgtype + ' Maintenance Alert';
                this.activityType = 'Maintenance';
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
                    recordId: this.attachtoentityid,
                    activityType: this.activityType,
                    licenseId: this.licenseid,
                    maintenanceId: this.maintenanceid,
                    isAccount: this.isaccount
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