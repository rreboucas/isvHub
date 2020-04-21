/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { LightningElement, api } from 'lwc';

export default class cBadge extends LightningElement {
    @api label;
    @api recordid;

    connectedCallback() {
        this.classList.add('active');
    }

    selectHandler(event) {
        // Prevents the anchor element from navigating to a URL.
        console.log('badge.js selectHandler - record id' + this.recordid);
        event.preventDefault();

        // check what's the badge label to create appropriate payload
        var payload;
        switch(this.label) {
            case 'View Recommendations':
                {
                    payload = {recId: this.recordid, action:"nba"};
                    break;
                }
            
            default:
              // code block
          }

        // Creates the event with the record ID data.
        const selectedEvent = new CustomEvent('selected', { detail: payload });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}
