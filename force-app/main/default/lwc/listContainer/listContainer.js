/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, api, wire } from 'lwc';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4e20c86 (added formfactor to message)
import FORM_FACTOR from '@salesforce/client/formFactor';
import getLicenseData from '@salesforce/apex/listContainerController.getLicenseData';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";
=======
//import getLastestPackageInstalls from '@salesforce/apex/listContainerController.getLastestPackageInstalls';
import getLicenseData from '@salesforce/apex/listContainerController.getLicenseData';
<<<<<<< HEAD
>>>>>>> f88ac2d (added NBA)
=======
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";
>>>>>>> 3ef6593 (Added Msg Channel)

export default class ListContainer extends LightningElement {
    hasLMAInstalls = true;
    @api title;
    @api maxRecords;
    @api showMoreLinkVisible;
    @api launchedViaModal;
<<<<<<< HEAD
<<<<<<< HEAD
    @api licenseIds;
    @api filter;
    @api startdt;
    @api yearFormat;
    @api monthFormat;
    @api dayFormat;
    @api weekDayFormat;
    @api starttime;
    @api endtime;
    @api availability;
    @api maintenanceid;
    @api maintenancelink;
    @api orgtype;

=======
>>>>>>> a94e476 (first committo labs)
=======
    @api licenseIds;
    @api filter;
>>>>>>> 6aab12d (comit july 2020)
    ulCssClass = 'slds-m-around_medium';
    latestInstalls;
    error;
    isMobile = false;
    selctedOnMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
<<<<<<< HEAD
<<<<<<< HEAD
    headerIconName;
    @wire(MessageContext)
    messageContext;
    computedChildClassName;
<<<<<<< HEAD
<<<<<<< HEAD
    actionType;
    isLoading = false;
<<<<<<< HEAD
<<<<<<< HEAD
    hasSubHeader = false;
    isCustomersImpacted;
    
    availabilityText;
    computedAvailabilityIcon;
    computedIconSize;
    screenWidth;
    hasData;

    
=======
>>>>>>> 4e20c86 (added formfactor to message)

=======
    headerIconName;
>>>>>>> c2aec72 (dynamic header icons)
    @wire(MessageContext)
    messageContext;
=======
>>>>>>> bc9f56d (test)

=======
    actionType;
>>>>>>> a94e476 (first committo labs)
=======
>>>>>>> a7a817b (fixed styles)

    connectedCallback() {
<<<<<<< HEAD

      this.screenWidth = window.screen.width;
      console.log('listContainer.js orgtype: ' + this.orgtype);
      console.log('listContainer.js - screenWidth: ' + this.screenWidth);
      console.log('listContainer.js licenseids: ' + this.licenseids);
      if (!this.maintenanceid)
      {
        this.maintenanceid = '';
        console.log('listContainer.js maintenanceid after if: ' + this.maintenanceid);
      }
      else
        this.hasSubHeader = true;
      
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
      
=======
=======
    hasSubHeader = false;
    isCustomersImpacted;
    @api startdt;
    @api yearFormat;
    @api monthFormat;
    @api dayFormat;
    @api weekDayFormat;
    @api starttime;
    @api endtime;
    @api availability;
    availabilityText;
    computedAvailabilityIcon;
    computedIconSize;
    screenWidth;

    @api maintenanceid;

    connectedCallback() {

      this.screenWidth = window.screen.width;
      console.log('listContainer.js - screenWidth: ' + this.screenWidth);
      console.log('listContainer.js licenseids: ' + this.licenseids);
      if (!this.licenseIds)
      {
        this.licenseIds = '';
        console.log('listContainer.js licenseids after if: ' + this.licenseids);
      }
      else
        this.hasSubHeader = true;
<<<<<<< HEAD
>>>>>>> 6aab12d (comit july 2020)
        
>>>>>>> c2aec72 (dynamic header icons)
=======
      
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
      
>>>>>>> d3c0005 (adding maintenance lwc changes)
        // Check which header icon to use based on selected App Builder Title
        switch(this.title) {
            case 'Latest Installs per App':
                this.headerIconName = 'utility:refresh';
<<<<<<< HEAD
<<<<<<< HEAD
                this.actionType = 'latestInstalls';
                this.filter = this.title;
                this.isCustomersImpacted = false;
<<<<<<< HEAD
              break;
            case 'Upcoming License Expirations':
                this.headerIconName = 'utility:alert';
                this.actionType = 'licensesExpiring';
                this.filter = this.title;
                this.isCustomersImpacted = false;
            break;
            default:
              this.headerIconName = 'utility:salesforce1';
              this.isCustomersImpacted = true;
=======
=======
                this.actionType = 'latestInstalls';
>>>>>>> a94e476 (first committo labs)
=======
>>>>>>> 6aab12d (comit july 2020)
              break;
            case 'Licenses Expiring Soon':
                this.headerIconName = 'utility:alert';
                this.actionType = 'licensesExpiring';
                this.filter = this.title;
                this.isCustomersImpacted = false;
            break;
            default:
<<<<<<< HEAD
>>>>>>> c2aec72 (dynamic header icons)
=======
              this.headerIconName = 'utility:salesforce1';
              this.isCustomersImpacted = true;
>>>>>>> 6aab12d (comit july 2020)
          }
        
        // Check if LMA is installed and update hasLMAInstalls variable

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
<<<<<<< HEAD
<<<<<<< HEAD
            this.computedChildClassName = 'desktop';
            this.computedIconSize = 'x-small';

            if (this.screenWidth <= 1440){
              this.computedChildClassName = 'desktopSmall';
            }
<<<<<<< HEAD
=======
>>>>>>> 4e20c86 (added formfactor to message)
=======
            this.computedChildClassName = 'desktop';
>>>>>>> bc9f56d (test)
=======
>>>>>>> d3c0005 (adding maintenance lwc changes)
          break;
        case 'Medium':
            this.isTablet = true;
            this.formfactorName = 'Tablet';
<<<<<<< HEAD
<<<<<<< HEAD
            this.computedChildClassName = 'desktop';
            this.computedIconSize = 'xx-small';
<<<<<<< HEAD
=======
>>>>>>> 4e20c86 (added formfactor to message)
=======
            this.computedChildClassName = 'desktop';
>>>>>>> bc9f56d (test)
=======
>>>>>>> d3c0005 (adding maintenance lwc changes)
          break;
        case 'Small':
            this.isMobile = true;
            this.formfactorName = 'Phone';
<<<<<<< HEAD
<<<<<<< HEAD
            this.computedChildClassName = 'mobile';
            this.computedIconSize = 'xx-small';
<<<<<<< HEAD
=======
            this.computedChildClassName = 'mobile';
>>>>>>> bc9f56d (test)
=======
>>>>>>> d3c0005 (adding maintenance lwc changes)
        break;
        default:
      }

      // Remove CSS Margins from ul element if launched via Modal
      if (this.launchedViaModal)
        this.ulCssClass = '';
<<<<<<< HEAD
=======
        break;
        default:
      }
>>>>>>> 4e20c86 (added formfactor to message)
    }

<<<<<<< HEAD
    @wire(getLicenseData, { rowsLimit: '$maxRecords', dataFilter: '$filter', maintenanceId: '$maintenanceid' })
=======
    @wire(getLicenseData, { rowsLimit: '3', dataFilter: '$title' })
=======
    }

<<<<<<< HEAD
    @wire(getLicenseData, { rowsLimit: '$maxRecords', dataFilter: '$title' })
>>>>>>> a94e476 (first committo labs)
=======
    @wire(getLicenseData, { rowsLimit: '$maxRecords', dataFilter: '$filter', licenseIds: '$licenseIds' })
>>>>>>> 6aab12d (comit july 2020)
    wiredLatestInstalls({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.latestInstalls = data;
            this.error = undefined;
            this.isLoading = false;
        } else if (error) {
            this.error = error;
            this.latestInstalls = undefined;
        }
    }

    handleOptionClick(event) {
        /*event.preventDefault();

        const clickedRowValue = event.target.licenseid;
        
        const message = {
            messageToSend: clickedRowValue,
            actionType: 'displayNba',
            sourceComponent: this.title,
            formFactor: this.formfactorName
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
        
    */
    }

    viewMoreClick() {        
        const message = {
            messageToSend: this.title,
            actionType: this.actionType,
            sourceComponent: this.title,
            formFactor: this.formfactorName
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
  }




<<<<<<< HEAD
    /*
    @wire(getLastestPackageInstalls)
>>>>>>> f88ac2d (added NBA)
    wiredLatestInstalls({ error, data }) {
      console.log('listContainer.js wire adapter ' + this.filter);
        this.isLoading = true;
       if (data) {
            this.hasData = true;
            this.latestInstalls = data;
            this.error = undefined;
            this.isLoading = false;
            console.log('listContainer.js wire adapter filter: ' + this.filter);
            console.log('listContainer.js wire data length: ' + data.length);
            if (data.length === 0){
              console.log('listContainer.js no data entered if ' );
              this.hasData = false;
            }

        } else if (error) {
            this.error = error;
            this.latestInstalls = undefined;
        }

    }
<<<<<<< HEAD

    handleOptionClick(event) {

    }

    viewMoreClick() {        
        const message = {
            messageToSend: this.title,
            actionType: this.actionType,
            sourceComponent: this.title,
            formFactor: this.formfactorName
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
  }




=======
    */
>>>>>>> f88ac2d (added NBA)
=======
>>>>>>> 01969aa (modalmodifylicense)
}