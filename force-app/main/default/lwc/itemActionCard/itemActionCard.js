/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { isNarrow, isBase } from './utils';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class ItemActionCard extends LightningElement {
    @api title;
    @api date;
    @api iconName;
    @api company;
    @api licenseid;
    @api parenttitle;
    isMobile = false;
    isTablet = false;
    isDesktop = false;
    formfactorName;
    rowIconName;
    computedChildClassName;
    computedIconSize;
    computedYearFormat;
    computedMonthFormat;
    computedDayFormat;
    computedWeekDayFormat;

    @track privateVariant = 'base';

    connectedCallback() {
        // Check which Row icon to use based on Parent Container's Title
        switch(this.parenttitle) {
            case 'Latest Installs per App':
                this.rowIconName = 'standard:person_account';
              break;
            case 'Licenses Expiring Soon':
                this.rowIconName = 'standard:today';
            break;
            default:
          }

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
            this.computedChildClassName = 'desktop';
            this.computedIconSize = 'x-small';
            this.computedYearFormat = '2-digit';
            this.computedMonthFormat = 'short';
            this.computedDayFormat = '2-digit';
            this.computedWeekDayFormat = 'long';
          break;
        case 'Medium':
            this.isTablet = true;
            this.formfactorName = 'Tablet';
            this.computedChildClassName = 'desktop';
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

    badgeSelected(event) {
        console.log('itemActionCard.js badgeSelected' + event);
        

    }
}