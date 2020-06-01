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
import { getRecord } from 'lightning/uiRecordApi';

const ACCT_FIELDS = [
    'Account.Name',
    'Account.BillingLatitude',
    'Account.BillingLongitude',
    'Account.BillingStreet',
    'Account.BillingState',
    'Account.BillingCity',
    'Account.BillingCountry',
    'Account.ShippingLatitude',
    'Account.ShippingLongitude',
    'Account.ShippingStreet',
    'Account.ShippingState',
    'Account.ShippingCity',
    'Account.ShippingCountry',
];

<<<<<<< HEAD
const LEAD_FIELDS = [
    'Lead.Company',
    'Lead.Street',
    'Lead.City',
    'Lead.State',
    'Lead.Country',
    'Lead.Latitude',
    'Lead.Longitude',
];

=======
>>>>>>> 84b8eb1 (added account viewer to map)
export default class MapActionCard extends NavigationMixin(LightningElement) {


  
    @api recordid;
    @api launchedviamodal;

    objectname = "Account";
    isMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    rowIconName;
    computedChildClassName;
    computedHeaderIconSize;
    computedIconSize;
    topBadgeLabel;
    midleBadgeLabel;
    screenWidth;
    coordinates;


    computedAcctIconPadding;
    computedClockIconPadding;
    computedBadgePadding;
    computedAcctButtonPadding;
    computedCountryPadding;

    account;
<<<<<<< HEAD
    lead;
=======
>>>>>>> 84b8eb1 (added account viewer to map)
    street;
    city;
    state;
    country;
    latitude;
    longitude;
    company;
    hasData = false;
    uri;

    @track privateVariant = 'base';

<<<<<<< HEAD
    connectedCallback() {
        console.log('mapActionCard.js - connectedCallback ');
    }

    renderedCallback() {
        console.log('mapActionCard.js  - RenderdCallback ');
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
    }

    @wire(getRecord, { recordId: '$recordid', fields: LEAD_FIELDS })
    wiredLead({ error, data }) {
        if (error) {
            console.log('mapActionCard.js error fetching Lead data ');
        } else if (data) {
            this.lead = data;
            this.objectname = 'Lead';
            this.company = this.lead.fields.Company.value;
            this.street = this.lead.fields.Street.value;
            this.city = this.lead.fields.City.value;
            this.state = this.lead.fields.State.value;
            this.country = this.lead.fields.Country.value;
            this.latitude = this.lead.fields.Latitude.value;
            console.log('mapActionCard.js lead latitude: ' + this.latitude.toString());
            this.longitude = this.lead.fields.Longitude.value;
            console.log('mapActionCard.js lead longitude: ' + this.longitude.toString());

            this.initializeComponent();
            this.hasData = true;
        }
        else if (data == null)
        {
            console.log('mapActionCard.js  Lead data is null ');
        }
    } 

    @wire(getRecord, { recordId: '$recordid', fields: ACCT_FIELDS })
    wiredRecord({ error, data }) {
        if (error) {
            console.log('mapActionCard.js error fetching account data ');
        } else if (data) {
            this.account = data;
            this.objectname = 'Account';
=======
    @wire(getRecord, { recordId: '$recordid', fields: ACCT_FIELDS })
    wiredRecord({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading account',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.account = data;
>>>>>>> 84b8eb1 (added account viewer to map)
            this.company = this.account.fields.Name.value;
            this.street = this.account.fields.BillingStreet.value;
            if (this.street == null)
                this.street = this.account.fields.ShippingStreet.value;
            this.city = this.account.fields.BillingCity.value;
            if (this.city == null)
                this.city = this.account.fields.ShippingCity.value;
            this.state = this.account.fields.BillingState.value;
            if (this.state == null)
                this.state = this.account.fields.ShippingState.value;
            this.country = this.account.fields.BillingCountry.value;
            if (this.country == null)
                this.country = this.account.fields.ShippingCountry.value;
            this.latitude = this.account.fields.BillingLatitude.value;
<<<<<<< HEAD
            console.log('mapActionCard.js latitude - billing: ' + this.latitude.toString());
            if (this.latitude == null)
            {
                this.latitude = this.account.fields.ShippingLatitude.value;
                console.log('mapActionCard.js latitude - shipping: ' + this.latitude.toString());
            }
            this.longitude = this.account.fields.BillingLongitude.value;
            console.log('mapActionCard.js longitude - billing: ' + this.longitude.toString());
            if (this.longitude == null)
            {
                this.longitude = this.account.fields.ShippingLongitude.value;
                console.log('mapActionCard.js longitude - shipping: ' + this.longitude.toString());
            }
            
            console.log('mapActionCard.js latitude - final' + this.latitude.toString());
            console.log('mapActionCard.js longitude - final' + this.longitude.toString());
=======
            if (this.latitude == null)
                this.latitude = this.account.fields.ShippingLatitude.value;
            this.longitude = this.account.fields.BillingLongitude.value;
            if (this.longitude == null)
                this.longitude = this.account.fields.ShippingLongitude.value;
>>>>>>> 84b8eb1 (added account viewer to map)

            this.initializeComponent();
            this.hasData = true;
        }
<<<<<<< HEAD
        else if (data == null)
        {
            console.log('mapActionCard.js  account data is null ');
        }
=======
>>>>>>> 84b8eb1 (added account viewer to map)
    }

    initializeComponent() {

        // https://www.google.com/maps/dir/Current+Location/43.12345,-76.12345
        console.log('mapActionCard.js latitude' + this.latitude.toString());
        console.log('mapActionCard.js longitude' + this.longitude.toString());
        this.classList.add('acctHeader');
        this.classList.add('companyPadding');
        
        this.screenWidth = window.screen.width;
        console.log('mapActionCard.js - screenWidth: ' + this.screenWidth);

        this.computedAcctIconPadding = 'slds-p-top_xx-small';
        this.computedClockIconPadding = 'slds-p-top_xxx-small';
        this.computedBadgePadding = 'slds-p-top_xx-small';
        this.computedAcctButtonPadding = 'slds-p-top_x-small slds-p-left_small' ;;
        this.computedCountryPadding = 'slds-p-top_none' ;
        this.midleBadgeLabel = 'Directions';

        // Check which Row icon to use based on Parent Container's Title
        switch(this.objectname) {
            case 'Account':
                this.rowIconName = 'standard:account';
                this.topBadgeLabel = 'Account';
              break;
            case 'Lead':
                this.rowIconName = 'standard:lead';
                this.topBadgeLabel = 'Lead';
            break;
            default:
          }

        console.log('mapActionCard.js - FORM_FACTOR: ' + FORM_FACTOR);
        console.log('mapActionCard.js - flexipageRegionWidth: ' + this.flexipageRegionWidth);
        

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
            this.computedChildClassName = 'desktopLarge';
            this.computedHeaderIconSize = 'small';
            this.computedIconSize = 'x-small';
            this.uri = 'https://www.google.com/maps/dir/Current+Location/' + this.latitude.toString() + ',' + this.longitude.toString();
            
            if (this.screenWidth <= 1440){
                this.computedChildClassName = 'desktopSmall';
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
          break;
        case 'Small':
            this.isMobile = true;
            this.formfactorName = 'Phone';
            this.computedChildClassName = 'mobile';
            this.computedHeaderIconSize = 'small';
            this.computedAcctIconPadding = 'slds-p-top_medium';
            this.computedBadgePadding = 'slds-p-top_small';
            this.computedClockIconPadding = 'slds-p-top_xx-small';
            this.computedAcctButtonPadding = 'slds-p-top_xxx-small slds-p-left_x-small';
            this.computedPckgButtonPadding = 'slds-p-top_x-small' ;
            this.computedCountryPadding = 'slds-p-top_x-small' ;
            this.computedIconSize = 'xx-small';
            if (this.company.length > 24){
                this.company = this.company.substring(0, 22) + '...';
            }
            if (this.title.length > 24){
                this.title = this.title.substring(0, 22) + '...';
            }
            
            //this.uri = 'https://www.google.com/maps/dir/?api=1&destination=43.12345,-76.12345';
            // https://maps.apple.com/?daddr=37.331778,-122.031375
            this.uri = 'https://maps.apple.com/?daddr=' + this.latitude.toString() + ',' + this.longitude.toString();
        break;
        default:
      }
      this.coordinates = encodeURI(this.uri);
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
<<<<<<< HEAD
    
=======
    renderedCallback() {
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
    }
>>>>>>> 84b8eb1 (added account viewer to map)

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