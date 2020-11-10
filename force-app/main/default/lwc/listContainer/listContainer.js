/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, api, wire } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
import getLicenseData from '@salesforce/apex/listContainerController.getLicenseData';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class ListContainer extends LightningElement {
    hasLMAInstalls = true;
    @api title;
    @api maxRecords;
    @api showMoreLinkVisible;
    @api launchedViaModal;
    @api licenseIds;
    @api filter;
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
            case 'Licenses Expiring Soon':
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

    @wire(getLicenseData, { rowsLimit: '$maxRecords', dataFilter: '$filter', licenseIds: '$licenseIds' })
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




}