/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { LightningElement, api, wire } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
<<<<<<< HEAD
<<<<<<< HEAD
import { refreshApex } from '@salesforce/apex';
=======
>>>>>>> 6aab12d (comit july 2020)
=======
import { refreshApex } from '@salesforce/apex';
>>>>>>> 4e992a8 ( adding pagination)
import getTrustEvents from '@salesforce/apex/statusServerController.getEvents';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class MaintenanceEvents extends LightningElement {
    hasLMAInstalls = true;
<<<<<<< HEAD
<<<<<<< HEAD
    hasBackRecords = false;
    hasNextRecords;
=======
>>>>>>> 6aab12d (comit july 2020)
=======
    hasBackRecords = false;
<<<<<<< HEAD
    hasNextRecords = true;
>>>>>>> 4e992a8 ( adding pagination)
=======
    hasNextRecords;
>>>>>>> 4ca298f (bf rm pagination)
    @api title;
    @api orgtype;
    @api maxRecords;
    titleLabel;
<<<<<<< HEAD
<<<<<<< HEAD
    eventsdatabackup;
=======
>>>>>>> 6aab12d (comit july 2020)
=======
    eventsdatabackup;
>>>>>>> 4ca298f (bf rm pagination)
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
<<<<<<< HEAD
<<<<<<< HEAD
    offSet;
    leftIndexLabel;
    leftIndex;
    rightIndex;
<<<<<<< HEAD
    rightIndexLabel;
=======
>>>>>>> 4ca298f (bf rm pagination)
    numrecords;

    @wire(getTrustEvents, { dataFilter: '$title', orgType: '$orgtype' })
    wiredLatestInstalls({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.eventsdatabackup = data;
<<<<<<< HEAD
            console.log('maintenanceEvents.js eventsdatabackup: ' + this.eventsdatabackup);
            this.numrecords = data.length;
         
            

            if (this.numrecords > 3)
            {
              this.rightIndex = 2;
              this.rightIndexLabel = this.rightIndex + 1;
=======
            this.numrecords = data.length;            
            
            if (this.numrecords > this.maxRecords)
            {
              this.rightIndex = this.maxRecords;
>>>>>>> 4ca298f (bf rm pagination)
              this.hasNextRecords = true;
            }
            else
            {
<<<<<<< HEAD
              this.hasNextRecords = false;
            }
            this.eventsData = data.slice(0, 3);
            this.rightIndex = 3;


=======
              this.rightIndex = this.numrecords;
            }
            this.eventsData = data.slice(this.leftIndex, this.rightIndex);
>>>>>>> 4ca298f (bf rm pagination)
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
<<<<<<< HEAD
=======
>>>>>>> 6aab12d (comit july 2020)
=======
    offSet;
>>>>>>> 4e992a8 ( adding pagination)
=======
>>>>>>> 4ca298f (bf rm pagination)

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e6a0a85 (added maintenance email capabilities)
      console.log('maintenanceEvents.js orgtype: ' + this.orgtype);
        this.leftIndex = 0;
        this.leftIndexLabel = 1;
        this.offSet = '1';
=======
        
>>>>>>> 6aab12d (comit july 2020)
=======
      
=======
        this.leftIndex = 0;
        this.leftIndexLabel = 1;
>>>>>>> 4ca298f (bf rm pagination)
        this.offSet = '1';
>>>>>>> 4e992a8 ( adding pagination)
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

    pressRight(event) {
      this.leftIndex = this.rightIndex;
      
      this.rightIndex = this.leftIndex + 3;
      
      if (this.numrecords <= this.rightIndex)
      {
        this.rightIndex = this.numrecords;
        this.hasNextRecords = false;
      }
      this.hasBackRecords = true;
      
      console.log('maintenanceEvents.js - pressRight - rightIndex: ' + this.rightIndex);
      console.log('maintenanceEvents.js - pressRight - leftIndex: ' + this.leftIndex);

      this.rightIndexLabel = this.rightIndex ;
      this.leftIndexLabel = this.leftIndex + 1;

      this.eventsData = this.eventsdatabackup.slice(this.leftIndex, this.rightIndex);
      console.log('maintenanceEvents.js - eventsData : ' + this.eventsData);
      refreshApex(this.wiredLatestInstalls);
      
  }

    pressLeft(event) {
      this.leftIndex = parseInt(this.leftIndex) - 3;
      this.rightIndex = parseInt(this.rightIndex) - 3;
      if (this.leftIndex <= 1)
      {
        this.leftIndex = 0;

        this.hasBackRecords = false;
      }
    
        this.leftIndexLabel = this.leftIndex + 1 ;
        this.rightIndexLabel = this.rightIndex ;
      
      
      
      
      if (this.numrecords > this.rightIndex)
        this.hasNextRecords = true;


      console.log('maintenanceEvents.js - pressRight - rightIndex: ' + this.rightIndex);
      console.log('maintenanceEvents.js - pressRight - leftIndex: ' + this.leftIndex);

      this.eventsData = this.eventsdatabackup.slice(this.leftIndex, this.rightIndex);
      refreshApex(this.wiredLatestInstalls);
      }

    
=======
    @wire(getTrustEvents, { rowsLimit: '$maxRecords', dataFilter: '$title', orgType: '$orgtype' })
=======
    
    
    @wire(getTrustEvents, { rowsLimit: '$maxRecords', dataFilter: '$title', orgType: '$orgtype', offSet: '$offSet' })
>>>>>>> 4e992a8 ( adding pagination)
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
<<<<<<< HEAD
>>>>>>> 6aab12d (comit july 2020)
=======
    handler() {
      refreshApex(this.eventsData);
    }
    
/*
    getNewData() {
      this.isLoading = true;
      getTrustEvents({ rowsLimit: this.maxRecords, dataFilter: this.title, orgType: this.orgtype, offSet: this.offSet })
      .then((result) => {
          this.eventsData = result;
          this.error = undefined;
          this.isLoading = false;
      })
      .catch((error) => {
          this.error = error;
          this.eventsData = undefined;
      });
    }
    */
=======
>>>>>>> 4ca298f (bf rm pagination)

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
<<<<<<< HEAD
>>>>>>> 4e992a8 ( adding pagination)
=======

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

    
>>>>>>> 4ca298f (bf rm pagination)
}