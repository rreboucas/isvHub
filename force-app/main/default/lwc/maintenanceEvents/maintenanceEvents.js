/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { LightningElement, api, wire } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { refreshApex } from '@salesforce/apex';
import getTrustEvents from '@salesforce/apex/statusServerController.getEvents';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class MaintenanceEvents extends LightningElement {
    hasLMAInstalls = true;
    hasBackRecords = false;
    hasNextRecords;
    @api title;
    @api orgtype;
    @api maxRecords;
    titleLabel;
    eventsdatabackup;
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
    offSet;
    leftIndexLabel;
    leftIndex;
    rightIndex;
    numrecords;

    @wire(getTrustEvents, { dataFilter: '$title', orgType: '$orgtype' })
    wiredLatestInstalls({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.eventsdatabackup = data;
            console.log('maintenanceEvents.js eventsdatabackup: ' + this.eventsdatabackup);
            this.numrecords = data.length;            
            
            if (this.numrecords > this.maxRecords)
            {
              this.rightIndex = this.maxRecords;
              this.hasNextRecords = true;
            }
            else
            {
              this.rightIndex = this.numrecords;
            }
            this.eventsData = data.slice(this.leftIndex, this.rightIndex);
            this.error = undefined;
            this.isLoading = false;
        } else if (error) {
            this.error = error;
            this.eventsData = undefined;
        }
    }
    handler() {
      refreshApex(this.eventsData);
    }

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
      console.log('maintenanceEvents.js orgtype: ' + this.orgtype);
        this.leftIndex = 0;
        this.leftIndexLabel = 1;
        this.offSet = '1';
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


    pressRight(event) {
      this.leftIndex = parseInt(this.rightIndex) + 1;
      this.leftIndexLabel = this.leftIndex;
      this.rightIndex = parseInt(this.leftIndex) + parseInt(this.maxRecords);
      if (this.numrecords <= this.rightIndex)
      {
        this.rightIndex = this.numrecords;
        this.hasNextRecords = false;
      }
      this.hasBackRecords = true;
      /*
      getTrustEvents()
            .then(result => {
              this.eventsdatabackup = result;
              this.eventsData = data.slice(this.leftIndex, this.rightIndex);
            })
            .catch(error => {
                this.error = error;
            });
            */
      
      this.eventsData = this.eventsdatabackup.slice(this.leftIndex, this.rightIndex);
      refreshApex(this.wiredLatestInstalls);
      
  }

    pressLeft(event) {
      this.leftIndex = parseInt(this.leftIndex) - parseInt(this.maxRecords);
      if (this.leftIndex <= 1)
      {
        this.leftIndex = 1;
        this.hasBackRecords = false;
      }
      this.leftIndexLabel = this.leftIndex;
      this.rightIndex = parseInt(this.rightIndex) - parseInt(this.maxRecords);
      if (this.numrecords > this.rightIndex)
        this.hasNextRecords = true;
      this.eventsData = this.eventsdatabackup.slice(this.leftIndex, this.rightIndex);
      refreshApex(this.wiredLatestInstalls);
      }

    
}