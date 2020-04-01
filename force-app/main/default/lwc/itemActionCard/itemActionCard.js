/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, api, wire, track } from 'lwc';
import { classSet } from 'c/utils';
import { isNarrow, isBase } from './utils';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";
import { NavigationMixin } from 'lightning/navigation';

export default class ItemActionCard extends NavigationMixin(LightningElement) {
    @api title;
<<<<<<< HEAD
    @api installdate;
    @api expiredate;
=======
    @api date;
>>>>>>> 33dcdb1 (added)
    @api iconName;
    @api company;
    @api licenseid;
    @api parenttitle;
    @api packageversionid;
    @api leadid;
    @api accountid;
    @api email;
    @api launchedviamodal;
    @api iscustomersimpacted;
    
    @api orgid;
    @api instancename;
    @api maintenancename;
    @api startdt;
    @api endtime;
    @api availability;
    @api licenseids;

    @api maintenanceid;
    @api maintenancelink;
    @api orgtype;

    fullTitle;
    fullCompany;
    whichDate;
    companyId;
    isMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    rowIconName;
    computedChildClassName;
    computedHeaderIconSize;
    computedIconSize;
    computedYearFormat;
    computedMonthFormat;
    computedDayFormat;
    computedWeekDayFormat;
    packgVersionURL;
    topBadgeLabel;
    midleBadgeLabel;
    lowerBadgeLabel;
    hasAccount = true;
    screenWidth;

    computedPckgIconPadding;
    computedAcctIconPadding;
    computedClockIconPadding;
    computedBadgePadding;
    computedAcctButtonPadding;

    notifymaintenance;

    @track privateVariant = 'base';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        console.log('ItemActionCard.js orgtype: ' + this.orgtype);
        this.notifymaintenance = false;
        console.log('ItemActionCard.js licenseids: ' + this.licenseids);
        if (this.maintenanceid)
        {
            this.notifymaintenance = true;
            console.log('ItemActionCard.js notifymaintenance after if: ' + this.notifymaintenance);
        }
        this.licenseidsforemail = this.licenseids;
        console.log('ItemActionCard.js notifymaintenance: ' + this.notifymaintenance);
        this.screenWidth = window.screen.width;
        console.log('ItemActionCard.js - screenWidth: ' + this.screenWidth);
        this.fullTitle = this.title;
        this.fullCompany = this.company;
        // Set the CompanyID variable value based on if the lead is converted into an account or not
        console.log('ItemActionCard.js - this.leadid - before: ' + this.leadid);
        console.log('ItemActionCard.js - this.accountid - before: ' + this.accountid);
        if(this.accountid.length > 1){
            console.log('ItemActionCard.js - Account ID length is > 1: ' + this.accountid.length);
            this.companyId = this.accountid;
        }
        else {
            console.log('ItemActionCard.js - Account ID is null or empty ');
            this.companyId = this.leadid;
            this.hasAccount = false;  
        }

        this.computedPckgIconPadding = 'slds-p-top_xx-small';
        this.computedAcctIconPadding = 'slds-p-top_xx-small';
        this.computedClockIconPadding = 'slds-p-top_xxx-small';
        this.computedBadgePadding = 'slds-p-top_xx-small';
        this.computedAcctButtonPadding = 'slds-p-top_xxx-small' ;
        this.computedPckgButtonPadding = 'slds-p-top_xxx-small' ;
        this.computedDateButtonPadding = 'slds-p-top_none' ;

        console.log('ItemActionCard.js - this.companyId - after: ' + this.companyId);

        // Check which Row icon to use based on Parent Container's Title
        switch(this.parenttitle) {
            case 'Latest Installs per App':
                this.rowIconName = 'standard:person_account';
                this.lowerBadgeLabel = 'Send E-mail';
                this.topBadgeLabel = 'View License';
                if (this.hasAccount)
                    this.midleBadgeLabel = 'View Account';
                else
                    this.midleBadgeLabel = 'View Lead' ;
                this.whichDate = this.installdate;
              break;
            case 'Upcoming License Expirations':
                this.rowIconName = 'standard:today';
                this.topBadgeLabel = 'Extend Expiration';
                if (this.launchedviamodal || FORM_FACTOR == 'Small')
                    this.topBadgeLabel = 'Expiration';
                this.midleBadgeLabel = 'Create Opportunity';
                if (this.screenWidth <= 1440)
                this.midleBadgeLabel = 'Opportunity';
                this.lowerBadgeLabel = 'Notify Customer';
                if (this.launchedviamodal || FORM_FACTOR == 'Small')
                    this.lowerBadgeLabel = 'Customer';
                this.whichDate = this.expiredate;
            break;
            default:
                this.rowIconName = 'standard:person_account';
                this.lowerBadgeLabel = 'Send E-mail';
                this.topBadgeLabel = 'Notify Customer';
                if (this.hasAccount)
                    this.midleBadgeLabel = 'View Account';
                else
                    this.midleBadgeLabel = 'View Lead' ;
                this.whichDate = this.installdate;
          }

        console.log('ItemActionCard.js - FORM_FACTOR: ' + FORM_FACTOR);
        console.log('ItemActionCard.js - flexipageRegionWidth: ' + this.flexipageRegionWidth);
        

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
                this.computedChildClassName = 'desktopSmall';
                this.computedDateButtonPadding = 'slds-p-top_none'
                this.computedYearFormat = 'numeric';
                this.computedMonthFormat = 'numeric';
                this.computedDayFormat = 'numeric';
                this.computedWeekDayFormat = 'narrow';
                if (this.company.length > 24)
                    this.company = this.company.substring(0, 22) + '...';
                if (this.title.length > 24)
                this.title = this.title.substring(0, 22) + '...';
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
            this.computedPckgIconPadding = 'slds-p-top_small';
            this.computedAcctIconPadding = 'slds-p-top_medium';
            this.computedBadgePadding = 'slds-p-top_small';
            this.computedClockIconPadding = 'slds-p-top_xx-small';
            this.computedAcctButtonPadding = 'slds-p-top_x-small';
            this.computedPckgButtonPadding = 'slds-p-top_x-small' ;
            this.computedDateButtonPadding = 'slds-p-top_x-small' ;
            this.computedIconSize = 'xx-small';
            this.computedYearFormat = 'numeric';
            this.computedMonthFormat = 'numeric';
            this.computedDayFormat = 'numeric';
            this.computedWeekDayFormat = 'narrow';
            if (this.company.length > 24){
                this.company = this.company.substring(0, 22) + '...';
            }
            if (this.title.length > 24){
                this.title = this.title.substring(0, 22) + '...';
            }
        break;
        default:
      }
    }

    packageHandlelick(event) {
        // Navigate to the Package Version record page
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.packageversionid,
                actionName: 'view'
            }
        });
    }

    companyHandlelick(event) {
        // Navigate to the Account or Lead record page
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();
        console.log('ItemActionCard.js - companyHandlelick - this.companyId : ' + this.companyId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.companyId,
                actionName: 'view'
            }
        });
    }

    sendNotifyEmailHandler() {
        
        console.log('ItemActionCard.js - sendNotifyEmailHandler ');
        // Send Message to modalLauncher Aura LC to send email to impacted customers
        const message = {
            messageToSend: this.companyId,
            email: this.email,
            emailType: 'Upcoming Maintenance',
            actionType: 'sendEmail',
            starttime: this.startdt,
            endtime: this.endtime,
            availavility: this.availability,
            maintenancename: this.maintenancename,
            orgid: this.orgid,
            formFactor: this.formfactorName,
            licenseid: this.licenseid,
            orgtype: this.orgtype,
            sourceComponent: this.hasAccount,
            maintenanceid: this.maintenanceid
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
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


}