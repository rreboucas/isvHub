/*
<<<<<<< HEAD
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class cBadge extends NavigationMixin(LightningElement) {
    @api label;
    @api recordid;
    @api email;
    @api launchedviamodal;
    @api urlparams;
    @api maintenanceid;
    
    
    badgeiconname;

    payload;
    sendEmail = false;
    emailType;
    iconCSSClass;
    computedBadgeLabelPadding;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.computedBadgeLabelPadding = 'slds-p-left_xx-small';
        console.log('badge.js maintenanceid: ' + this.maintenanceid);
        // Check which Badge icon to use based on Badge's Label
        switch(this.label) {
            case 'View License':
                this.badgeiconname = 'utility:dynamic_record_choice';
              break;
            case 'View Account':
            case 'Account':
                this.badgeiconname = 'utility:company';
            break;
            case 'View Lead':
            case 'Lead':
                this.badgeiconname = 'utility:advertising';
                this.computedBadgeLabelPadding = 'slds-p-left_x-small';
            break;
            case 'Create Opportunity':
                this.badgeiconname = 'utility:new';
            break;
            case 'Opportunity':
                this.badgeiconname = 'utility:new';
                this.computedBadgeLabelPadding = 'slds-p-left_x-small';
            break;
            case 'Extend Expiration':
            case 'Expiration':
                this.badgeiconname = 'utility:edit';
            break;
            case 'Send E-mail':
                this.badgeiconname = 'utility:email';
                this.sendEmail = true;
                this.emailType = 'New Install';
            break;
            case 'Notify Customer':
            case 'Customer':
                this.badgeiconname = 'utility:email';
                this.sendEmail = true;
                this.emailType = 'License Expiration';
                if (this.maintenanceid)
                    this.emailType = 'Notify Maintenance'
                console.log('badge.js ConnectedCallBack - sendEmail: ' + this.sendEmail);
                console.log('badge.js ConnectedCallBack - email: ' + this.email);
            break;
            case 'Directions':
                this.badgeiconname = 'utility:trail';
            break;
            default:
                this.badgeiconname = 'utility:people';
            break;
          }

          // If Parent Container was launched on a mobile Modal, add CSS class to add padding to icon:
          if (FORM_FACTOR == 'Small')
          {
            if (this.label != 'Opportunity')
                this.computedBadgeLabelPadding = 'slds-p-left_x-small';
            if (this.launchedviamodal)
                this.iconCSSClass = '';
          }


          
    }

    selectHandler(event) {
        // Prevents the anchor element from navigating to a URL.
        //console.log('badge.js selectHandler - record id' + this.recordid);
        event.preventDefault();

        // check what's the badge label to create appropriate payload

        switch(this.label) {
            case 'Create Opportunity':
            case 'Opportunity':
                {

                    
            
                    this[NavigationMixin.Navigate]({
                        type: 'standard__objectPage',
                        attributes: {
                            objectApiName: 'Opportunity',
                            actionName: 'new'
                        }
                    });
                }
            break;
            case 'View Recommendations':
                {
                    // Send Message to Parent LWC to handle
                    this.payload = {recId: this.recordid, action:"nba"};

                    // Creates the event with the record ID data.
                    const selectedEvent = new CustomEvent('selected', { detail: this.payload });

                    // Dispatches the event.
                    this.dispatchEvent(selectedEvent);

                    break;
                }
            case 'View Account':
            case 'Account':
            case 'View Lead':
            case 'Lead':
            case 'View License':
                {
                    // Navigate to the Package Version record page
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: this.recordid,
                            actionName: 'view'
                            }
                        });
                }
            break;
            case 'Directions':
                {
                    // Navigate to the Package Version record page
                    // example: &destination=43.12345,-76.12345
                    this[NavigationMixin.Navigate]({
                        type: 'standard__webPage',
                        attributes: {
                            url: this.urlparams
                        }
                        });
                }
            break;
            case 'Extend Expiration':
            case 'Expiration':
                {
                    
                    // Send Message to modalLauncher Aura LC to open modifyLicenseExpiration LWC
                    const message = {
                        messageToSend: this.recordid,
                        actionType: 'licenseExpirationUpdate',
                        sourceComponent: 'badge.js - ' + this.label,
                        formFactor: this.formfactorName
                    };
                    publish(this.messageContext, ISVCONSOLEMC, message);
                }
            break;
            case 'Send E-mail':
            case 'Notify Customer':
            case 'Customer':
                {
                    if (this.maintenanceid)
                        this.dispatchEvent(new CustomEvent('notifyimpactedcustomers'));
                    else
                    {
                    // Send Message to modalLauncher Aura LC to oen modifyLicenseExpiration LWC
                    const message = {
                        messageToSend: this.recordid,
                        email: this.email,
                        emailType: this.emailType,
                        actionType: 'sendEmail',
                        sourceComponent: 'badge.js - ' + this.label,
                        formFactor: this.formfactorName
                    };
                    publish(this.messageContext, ISVCONSOLEMC, message);
                    }
                }
            break;
            default:
              // dispatch event to parent LWC
              this.dispatchEvent(new CustomEvent('seeimpactedcustomers'));
          }

        
    }
}
=======
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class cBadge extends NavigationMixin(LightningElement) {
    @api label;
    @api recordid;
    @api email;

    badgeIconName;
    payload;
    sendEmail = false;
    emailType;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        //this.classList.add('icon');
        //this.classList.add('label');

        // Check which Badge icon to use based on Badge's Label
        switch(this.label) {
            case 'View License':
                this.badgeIconName = 'utility:dynamic_record_choice';
                this.classList.add('viewlicense');
              break;
            case 'View Account':
                this.badgeIconName = 'utility:company';
                this.classList.add('viewaccount');
            break;
            case 'View Lead':
                this.badgeIconName = 'utility:advertising';
                this.classList.add('viewlead');
            break;
            case 'Create Opportunity':
            case 'Opportunity':
                this.badgeIconName = 'utility:new';
                this.classList.add('createoppty');
            break;
            case 'Extend Expiration':
                this.badgeIconName = 'utility:edit';
                this.classList.add('expiration');
            break;
            case 'Send E-mail':
                this.badgeIconName = 'utility:email';
                this.sendEmail = true;
                this.emailType = 'New Install';
                this.classList.add('email');
            break;
            case 'Notify Customer':
                this.badgeIconName = 'utility:email';
                this.sendEmail = true;
                this.emailType = 'License Expiration';
                console.log('badge.js ConnectedCallBack - sendEmail: ' + this.sendEmail);
                console.log('badge.js ConnectedCallBack - email: ' + this.email);
                this.classList.add('notification');
            break;
            default:
          }
    }

    selectHandler(event) {
        // Prevents the anchor element from navigating to a URL.
        console.log('badge.js selectHandler - record id' + this.recordid);
        event.preventDefault();

        // check what's the badge label to create appropriate payload

        switch(this.label) {
            case 'Create Opportunity':
            case 'Opportunity':
                {

                    
            
                    this[NavigationMixin.Navigate]({
                        type: 'standard__objectPage',
                        attributes: {
                            objectApiName: 'Opportunity',
                            actionName: 'new'
                        }
                    });
                }
            break;
            case 'View Recommendations':
                {
                    // Send Message to Parent LWC to handle
                    this.payload = {recId: this.recordid, action:"nba"};

                    // Creates the event with the record ID data.
                    const selectedEvent = new CustomEvent('selected', { detail: this.payload });

                    // Dispatches the event.
                    this.dispatchEvent(selectedEvent);

                    break;
                }
            case 'View Account':
            case 'View Lead':
            case 'View License':
                {
                    // Navigate to the Package Version record page
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: this.recordid,
                            actionName: 'view'
                            }
                        });
                }
            break;
            case 'Extend Expiration':
                {
                    
                    // Send Message to modalLauncher Aura LC to oen modifyLicenseExpiration LWC
                    const message = {
                        messageToSend: this.recordid,
                        actionType: 'licenseExpirationUpdate',
                        sourceComponent: 'badge.js - ' + this.label,
                        formFactor: this.formfactorName
                    };
                    publish(this.messageContext, ISVCONSOLEMC, message);
                }
            break;
            case 'Send E-mail':
            case 'Notify Customer':
                {
                    
                    // Send Message to modalLauncher Aura LC to oen modifyLicenseExpiration LWC
                    const message = {
                        messageToSend: this.recordid,
                        email: this.email,
                        emailType: this.emailType,
                        actionType: 'sendEmail',
                        sourceComponent: 'badge.js - ' + this.label,
                        formFactor: this.formfactorName
                    };
                    publish(this.messageContext, ISVCONSOLEMC, message);
                }
            break;
            default:
              // code block
          }

        
    }
}
>>>>>>> ed6f09d (added badge)
