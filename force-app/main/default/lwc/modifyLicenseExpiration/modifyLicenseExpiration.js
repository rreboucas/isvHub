/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { LightningElement, api } from 'lwc';


export default class ModifyLicenseExpiration extends LightningElement {
    @api recordid;
    showModifyForm = false;
    showResults = false;

    connectedCallback() {
        this.showModifyForm = true;
    }
    

    handleSuccess(event) {
        this.showModifyForm = false;
        this.showResults = true;
    }
}