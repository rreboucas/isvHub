/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, track, api, wire } from 'lwc';
import getLocationData from '@salesforce/apex/isvConsoleMapController.getLocationData';
import getOrgURL from '@salesforce/apex/isvConsoleMapController.getOrgURL';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";
import { NavigationMixin } from 'lightning/navigation';
import getLeads from '@salesforce/apex/manageData.getLicenceLeadIdsWithoutAddress';
import getAccounts from '@salesforce/apex/manageData.getLicenceAccountIdsWithoutAddress';

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

export default class IsvConsoleMap extends NavigationMixin(LightningElement) {
    
    @api title;
    mapMarkers = [];
    error;
    numberOfMarkers;
    isMobile = false;
    showFooter = false;
    showSetup = false;
    showGoToDataQualityRules = false;
    showUpdateRecsPrompt = false;
    showRefreshLWC = false;
    numOfLeads;
    numOfAccts;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    selectedMarkerValue ;
    selectedStep = 'Step1';
    

    @wire(getOrgURL) orgURL;
    @wire(getLeads) 
    wiredLeads({ error, data }) {
        if (data) {
            this.numOfLeads = data.length;
            console.log('isvConsoleMap.js numOfLeads: ' + this.numOfLeads);
        }
        else if (error) {
            this.error = error;
        }
    }
    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.numOfAccts = data.length;
            console.log('isvConsoleMap.js numOfAccts: ' + this.numOfAccts);
        }
        else if (error) {
            this.error = error;
        }
    }
    
    @wire(MessageContext)
    messageContext;
    
    connectedCallback() {
        // Check formfactor being used to access this LWC
        switch(FORM_FACTOR) {
            case 'Large':
                this.isDesktop = true;
                this.formfactorName = 'Desktop';
              break;
            case 'Medium':
                this.isTablet = true;
                this.formfactorName = 'Tablet';
              break;
            case 'Small':
                this.isMobile = true;
                this.formfactorName = 'Phone';
            break;
            default:
    
          }
          
         
    }

    @wire(getLocationData)
    wiredLocations({ error, data }) {
        if (data) {
            this.mapMarkers = data;
            this.error = 'No Data found';
            this.numberOfMarkers = data.length;
        }
        else if (error) {
            this.error = error;
            this.mapMarkers = undefined;
        }
    }
    
    
    @track markersTitle = "My Customers";

    selectStep1() {
        this.selectedStep = 'Step1';
        this.showApexJobButton = false;
        this.showRefreshLWC = false;
        this.showUpdateRecsPrompt = false;
        this.showGoToDataQualityRules = true;
    }
 
    selectStep2() {
        this.selectedStep = 'Step2';
        this.showApexJobButton = true;
        this.showRefreshLWC = false;
        this.showUpdateRecsPrompt = false;
        this.showGoToDataQualityRules = false;
    }
 
    selectStep3() {
        this.selectedStep = 'Step3';
        this.showGoToDataQualityRules = false;
        this.showApexJobButton = false;
        this.showRefreshLWC = false;
        this.showUpdateRecsPrompt = true;

    }

    selectStep4() {
        this.selectedStep = 'Step4';
        this.showGoToDataQualityRules = false;
        this.showApexJobButton = false;
        this.showUpdateRecsPrompt = false;
        this.showRefreshLWC = true;


    }
    refreshLWC(event) {
        location.reload();
    }

    navToUpdateLeadRecords(event) {
        console.log('isvConsoleMap.js - navToUpdateLeadRecords ');
        const message = {
            actionType: 'openLeadUpdate'
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
    }

    navToUpdateAcctRecords(event) {
        console.log('isvConsoleMap.js - navToUpdateAcctRecords ');
        const message = {
            actionType: 'openAccountUpdate'
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
    }

    navToQualityRules(event) {
        // nav to /lightning/setup/CleanRules/home
        
       this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: this.orgURL.Url + '/lightning/setup/SetupOneHome/home?setupApp=all'
        }
    },
    false 
     );
        
     

    }

    showSetupInstructions(event) {
        this.showFooter = false;
        this.showSetup = true;
        this.selectStep1();
    }

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
        console.log('isvConsoleMap.js selectedMarkerValue: ' + this.selectedMarkerValue);
        this.showSetup = false;
        this.showFooter = true;
    }

    runDataMatchJob(event) {
        console.log('isvConsoleMap.js - runDataMatchJob ');
        const message = {
            actionType: 'runLeadsMatchJob'
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
    }

    badgeSelected(event) {
        console.log('isvConsoleMap.js badgeSelected' + event);
        const recId = event.detail.recId;
        const action = event.detail.action;

        switch(action) {
            case 'nba':
                {
                    // Send Message to Modal Launcher Component to Open NBA on a Mobile Modal
                    const message = {
                        messageToSend: recId,
                        actionType: 'displayNba',
                        sourceComponent: 'ISVConsoleMap',
                        formFactor: this.formfactorName
                    };
                    console.log('isvConsoleMap.js message' + message);
                    publish(this.messageContext, ISVCONSOLEMC, message);
                    break;
                }
            case 'NavToRecord':
                //
              break;
            case 'ConvertLead':
                //
            break;
            case 'NotifySales':
                //
            break;
            default:
              // code block
          }

    }


}