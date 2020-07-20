/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { LightningElement, api, wire } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
import getTrustEvents from '@salesforce/apex/statusServerController.getEvents';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class MaintenanceEvents extends LightningElement {
    hasLMAInstalls = true;
    @api title;
    @api orgtype;
    @api maxRecords;
    titleLabel;
    eventsData;
    error;
    isMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    isLoading = false;
    actionType;
    headerIconName;
    ulCssClass = 'slds-m-around_medium';
    computedChildClassName;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        
        // Check which header icon to use based on selected App Builder Title
        switch(this.title) {
            case 'Upcoming Releases':
                this.headerIconName = 'utility:date_time';
                this.actionType = 'newreleases';
                this.titleLabel = 'Upcoming Platform Releases - ' + this.orgtype ; 
              break;
            case 'Past Maintenances':
                this.headerIconName = 'utility:locker_service_api_viewer';
                this.actionType = 'pastmaintenance';
                this.titleLabel = 'Past Platform Maintenances - ' + this.orgtype ; 
            break;
            default:
          }
        

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
            this.computedChildClassName = 'desktop';
          break;
        case 'Medium':
            this.isTablet = true;
            this.formfactorName = 'Tablet';
            this.computedChildClassName = 'desktop';
          break;
        case 'Small':
            this.isMobile = true;
            this.formfactorName = 'Phone';
            this.computedChildClassName = 'mobile';
        break;
        default:
      }

    }

    @wire(getTrustEvents, { rowsLimit: '$maxRecords', dataFilter: '$title', orgType: '$orgtype' })
    wiredLatestInstalls({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.eventsData = data;
            this.error = undefined;
            this.isLoading = false;
        } else if (error) {
            this.error = error;
            this.eventsData = undefined;
        }
    }
}