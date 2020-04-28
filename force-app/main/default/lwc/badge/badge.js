/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class cBadge extends NavigationMixin(LightningElement) {
    @api label;
    @api recordid;
    badgeIconName;
    payload;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        //this.classList.add('active');

        // Check which Badge icon to use based on Badge's Label
        switch(this.label) {
            case 'View License':
                this.badgeIconName = 'action:preview';
              break;
            case 'Extend Expiration':
                this.badgeIconName = 'action:preview';
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
            default:
              // code block
          }

        
    }
}
