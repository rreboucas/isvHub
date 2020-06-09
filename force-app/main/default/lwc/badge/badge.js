/*
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

    badgeIconName;
    payload;
    sendEmail = false;
    emailType;
    iconCSSClass;
    computedBadgeLabelPadding;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.computedBadgeLabelPadding = 'slds-p-left_xx-small';

        // Check which Badge icon to use based on Badge's Label
        switch(this.label) {
            case 'View License':
                this.badgeIconName = 'utility:dynamic_record_choice';
              break;
            case 'View Account':
            case 'Account':
                this.badgeIconName = 'utility:company';
            break;
            case 'View Lead':
            case 'Lead':
                this.badgeIconName = 'utility:advertising';
                this.computedBadgeLabelPadding = 'slds-p-left_x-small';
            break;
            case 'Create Opportunity':
                this.badgeIconName = 'utility:new';
            break;
            case 'Opportunity':
                this.badgeIconName = 'utility:new';
                this.computedBadgeLabelPadding = 'slds-p-left_x-small';
            break;
            case 'Extend Expiration':
            case 'Expiration':
                this.badgeIconName = 'utility:edit';
            break;
            case 'Send E-mail':
                this.badgeIconName = 'utility:email';
                this.sendEmail = true;
                this.emailType = 'New Install';
            break;
            case 'Notify Customer':
            case 'Customer':
                this.badgeIconName = 'utility:email';
                this.sendEmail = true;
                this.emailType = 'License Expiration';
                console.log('badge.js ConnectedCallBack - sendEmail: ' + this.sendEmail);
                console.log('badge.js ConnectedCallBack - email: ' + this.email);
            break;
            case 'Directions':
                this.badgeIconName = 'utility:trail';
            break;
            default:
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
            case 'Customer':
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
