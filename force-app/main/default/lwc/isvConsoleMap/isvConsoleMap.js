<<<<<<< HEAD
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
=======
import { LightningElement, track, api, wire } from 'lwc';
import getLocationData from '@salesforce/apex/isvConsoleMapController.getLocationData';

export default class IsvConsoleMap extends LightningElement {
>>>>>>> 033b27d (added map controller apex)
    
    @api title;
    mapMarkers = [];
    error;
<<<<<<< HEAD
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

=======
    
>>>>>>> 033b27d (added map controller apex)
    @wire(getLocationData)
    wiredLocations({ error, data }) {
        if (data) {
            this.mapMarkers = data;
<<<<<<< HEAD
            this.error = 'No Data found';
            this.numberOfMarkers = data.length;
        }
        else if (error) {
=======
            this.error = undefined;
        } else if (error) {
>>>>>>> 033b27d (added map controller apex)
            this.error = error;
            this.mapMarkers = undefined;
        }
    }
    
<<<<<<< HEAD
    
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


=======
    /*
    mapMarkers = [
        {
            value: 'US1',
            location: {
                State: "Texas",
                Country: 'USA',
            },

            icon: 'custom:custom26',
            title: "US1",
        },
        {
            value: 'US2',
            location: {
                State: 'Florida',
                Country: 'US',
            },

            icon: 'custom:custom96',
            title: 'US2',
        },
        {
            value: 'France3',
            location: {
                City: 'Saint-Jean-Cap-Ferrat',
                Country: 'France',
            },

            title: 'Saint-Jean-Cap-Ferrat',
        },
        {
            value: 'France4',
            location: {
                City: 'Villefranche-sur-Mer',
                Country: 'France',
            },

            icon: 'custom:custom92',
            title: 'Villefranche-sur-Mer',
        },
        {
            value: 'France5',
            location: {
                City: 'Antibes',
                Country: 'France',
            },

            icon: 'custom:custom61',
            title: 'Antibes',
        },
        {
            value: 'France6',
            location: {
                City: 'Juan-les-Pins',
                Country: 'France',
            },

            icon: 'custom:custom74',
            title: 'Juan-les-Pins',
        },
        {
            value: 'France7',
            location: {
                City: 'Cannes',
                Country: 'France',
            },

            icon: 'custom:custom3',
            title: 'Cannes',
        },
        {
            value: 'France8',
            location: {
                City: 'Saint-Raphaël',
                Country: 'France',
            },

            icon: 'custom:custom54',
            title: 'Saint-Raphaël',
        },
        {
            value: 'France9',
            location: {
                City: 'Fréjus',
                Country: 'France',
            },

            icon: 'custom:custom88',
            title: 'Fréjus',
        },
        {
            value: 'France10',
            location: {
                City: 'Sainte-Maxime',
                Country: 'France',
            },

            icon: 'custom:custom92',
            title: 'Sainte-Maxime',
        },
    ]; */
    @track markersTitle = "My Customers";

    @track selectedMarkerValue = 'France1';

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
    }
>>>>>>> 033b27d (added map controller apex)
}