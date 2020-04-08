/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, api, wire } from 'lwc';
<<<<<<< HEAD
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

    ulCssClass = 'slds-m-around_medium';
    latestInstalls;
    error;
    isMobile = false;
    selctedOnMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    headerIconName;
    @wire(MessageContext)
    messageContext;
    computedChildClassName;
    actionType;
    isLoading = false;
    hasSubHeader = false;
    isCustomersImpacted;
    
    availabilityText;
    computedAvailabilityIcon;
    computedIconSize;
    screenWidth;
    hasData;

    

    @wire(MessageContext)
    messageContext;


    connectedCallback() {

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
      
        // Check which header icon to use based on selected App Builder Title
        switch(this.title) {
            case 'Latest Installs per App':
                this.headerIconName = 'utility:refresh';
                this.actionType = 'latestInstalls';
                this.filter = this.title;
                this.isCustomersImpacted = false;
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
          }
        
        // Check if LMA is installed and update hasLMAInstalls variable

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
            this.computedChildClassName = 'desktop';
            this.computedIconSize = 'x-small';

            if (this.screenWidth <= 1440){
              this.computedChildClassName = 'desktopSmall';
            }
          break;
        case 'Medium':
            this.isTablet = true;
            this.formfactorName = 'Tablet';
            this.computedChildClassName = 'desktop';
            this.computedIconSize = 'xx-small';
          break;
        case 'Small':
            this.isMobile = true;
            this.formfactorName = 'Phone';
            this.computedChildClassName = 'mobile';
            this.computedIconSize = 'xx-small';
        break;
        default:
      }

      // Remove CSS Margins from ul element if launched via Modal
      if (this.launchedViaModal)
        this.ulCssClass = '';
    }

<<<<<<< HEAD
    @wire(getLicenseData, { rowsLimit: '$maxRecords', dataFilter: '$filter', maintenanceId: '$maintenanceid' })
=======
    @wire(getLicenseData, { rowsLimit: '3', dataFilter: '$title' })
    wiredLatestInstalls({ error, data }) {
        if (data) {
            this.latestInstalls = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.latestInstalls = undefined;
        }
    }

    handleOptionClick(event) {
        event.preventDefault();

        const clickedRowValue = event.target.licenseid;
        
        const message = {
            messageToSend: clickedRowValue,
            sourceComponent: 'LWC'
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
        
        
        //this._selectTabAndFireSelectEvent(clickedRowValue, { hasFocus: true });
    }




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
}