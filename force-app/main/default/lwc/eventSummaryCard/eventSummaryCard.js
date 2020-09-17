/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { LightningElement, api, track, wire } from 'lwc';
import { classSet } from 'c/utils';
import { isNarrow, isBase } from './utils';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class EventSummaryCard extends NavigationMixin(LightningElement) {
    @api title;
    @api id;
    @api startdt;
    @api enddt;
    @api starttime;
    @api endtime;
<<<<<<< HEAD
    @api 
    get numimpacted() {
        return this._numimpacted;
    }
    set numimpacted(value) {
        console.log('EventSummaryCard.js - numimpacted setter : ');
        this._numimpacted = value;

        if (this.numimpacted == '1')
            this.badgeLabel = this._numimpacted + ' Customer';
        else
            this.badgeLabel = this._numimpacted + ' Customers';
    }
=======
    @api numimpacted;
>>>>>>> 6aab12d (comit july 2020)
    @api impactedlicenseids;
    @api iconName;
    @api instancename;
    @api availability;
<<<<<<< HEAD
    @api orgtype;

    @api maintenanceid;
    
    maintenancelink;   
=======

    
>>>>>>> 6aab12d (comit july 2020)

    isMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    computedHeaderIconSize;
    computedIconSize;
    computedChildClassName;
    computedYearFormat;
    computedMonthFormat;
    computedDayFormat;
    computedWeekDayFormat;
    badgeLabel;
    computedAvailabilityIcon;
    availabilityText;
<<<<<<< HEAD
    computedPckgButtonPadding;
    computedAvailabilityPadding;
=======
>>>>>>> 6aab12d (comit july 2020)

    @track privateVariant = 'base';

    @wire(MessageContext)
    messageContext;

<<<<<<< HEAD
    renderedCallback() {
        console.log('EventSummaryCard.js renderedCallback: ' );
    }

    connectedCallback() {
        this.screenWidth = window.screen.width;
        this.computedPckgButtonPadding = 'slds-p-left_small';
        this.computedAvailabilityPadding = 'slds-p-left_xxx-small';
=======
    connectedCallback() {
        this.screenWidth = window.screen.width;
>>>>>>> 6aab12d (comit july 2020)

        if (this.availability == 'fullyAvailable')
        {
            this.availabilityText = 'Available';
            this.computedAvailabilityIcon = 'utility:success'
        }
        if (this.availability == 'unavailable')
        {
            this.availabilityText = 'Unavailable';
            this.computedAvailabilityIcon = 'utility:ban'
        }
<<<<<<< HEAD
        console.log('EventSummaryCard.js orgtype: ' + this.orgtype);
=======

>>>>>>> 6aab12d (comit july 2020)
        console.log('EventSummaryCard.js - id: ' + this.id);
        console.log('EventSummaryCard.js - numimpacted: ' + this.numimpacted);
        console.log('EventSummaryCard.js - impactedlicenseids: ' + this.impactedlicenseids);
        //Populate badge label - # of customers:
        if (this.numimpacted == '1')
            this.badgeLabel = this.numimpacted + ' Customer';
        else
            this.badgeLabel = this.numimpacted + ' Customers';

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
            this.computedChildClassName = 'desktopLarge';
            this.computedHeaderIconSize = 'small';
            this.computedIconSize = 'x-small';
            this.computedYearFormat = '2-digit';
            this.computedMonthFormat = 'short';
            this.computedDayFormat = '2-digit';
            this.computedWeekDayFormat = 'long';
            
            if (this.screenWidth <= 1440){
<<<<<<< HEAD
                this.computedChildClassName = 'desktopSmall_events';
=======
                this.computedChildClassName = 'desktopSmall';
>>>>>>> 6aab12d (comit july 2020)
                this.computedYearFormat = 'numeric';
                this.computedMonthFormat = 'numeric';
                this.computedDayFormat = 'numeric';
                this.computedWeekDayFormat = 'narrow';
            }
          break;
        case 'Medium':
            this.isTablet = true;
            this.formfactorName = 'Tablet';
            this.computedChildClassName = 'desktop';
            this.computedHeaderIconSize = 'small';
            this.computedIconSize = 'xx-small';
            this.computedYearFormat = '2-digit';
            this.computedMonthFormat = 'short';
            this.computedDayFormat = '2-digit';
            this.computedWeekDayFormat = 'long';
          break;
        case 'Small':
            this.isMobile = true;
            this.formfactorName = 'Phone';
            this.computedChildClassName = 'mobile';
            this.computedHeaderIconSize = 'x-small';
            this.computedIconSize = 'xx-small';
            this.computedYearFormat = 'numeric';
            this.computedMonthFormat = 'numeric';
            this.computedDayFormat = 'numeric';
            this.computedWeekDayFormat = 'narrow';
        break;
        default:
      }
    }

    set variant(value) {
        if (isNarrow(value) || isBase(value)) {
            this.privateVariant = value;
        } else {
            this.privateVariant = 'base';
        }
    }

    @api get variant() {
        return this.privateVariant;
    }

    @track showFooter = true;
    renderedCallback() {
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
    }

    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    get computedWrapperClassNames() {
        return classSet('slds-card').add({
            'slds-card_narrow': isNarrow(this.privateVariant)
        });
    }

    get hasIcon() {
        return !!this.iconName;
    }

    get hasStringTitle() {
        return !!this.title;
    }

    navigateToWebPage(event) {
        event.preventDefault();
<<<<<<< HEAD
        this.maintenancelink = this.id.split("-")[0];
=======
>>>>>>> 6aab12d (comit july 2020)
        // Navigate to a URL
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://status.salesforce.com/maintenances/' + this.id.split("-")[0]
            }
        },
        false // Replaces the current page in your browser history with the URL
      );
    }

    seeimpactedcustomersHandler() {
        // Send Message to modalLauncher Aura LC to open modifyLicenseExpiration LWC
<<<<<<< HEAD
<<<<<<< HEAD
        console.log('EventSummaryCard.js - this.impactedlicenseids: ' + this.impactedlicenseids);
        var licenseIdsArray = this.impactedlicenseids.split(',');
        console.log('EventSummaryCard.js - licenseIdsArray: ' + licenseIdsArray);
        const message = {
            messageToSend: licenseIdsArray,
=======
=======
        console.log('EventSummaryCard.js - this.impactedlicenseids: ' + this.impactedlicenseids);
>>>>>>> 4e992a8 ( adding pagination)
        const message = {
            messageToSend: this.impactedlicenseids,
>>>>>>> 6aab12d (comit july 2020)
            actionType: 'viewImpactedCustomers',
            sourceComponent: 'eventSummaryCard.js - ' + this.label,
            formFactor: this.formfactorName,
            title: this.title + ' - ' + this.instancename,
            startdt: this.startdt,
            yearFormat: this.computedYearFormat,
            monthFormat: this.computedMonthFormat,
            dayFormat: this.computedDayFormat,
            weekDayFormat: this.computedWeekDayFormat,
<<<<<<< HEAD
            availability: this.availability,
            endtime: this.endtime,
            orgtype: this.orgtype,
            maintenanceid: this.id.split("-")[0]
=======
            starttime: this.starttime,
            endtime: this.endtime
>>>>>>> 6aab12d (comit july 2020)
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
    }

}