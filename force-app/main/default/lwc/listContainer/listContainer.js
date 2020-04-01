import { LightningElement, api, wire } from 'lwc';
import getLastestPackageInstalls from '@salesforce/apex/listContainerController.getLastestPackageInstalls';

export default class ListContainer extends LightningElement {
    hasLMAInstalls = true;
    @api title;
    latestInstalls;
    error;

    connectedCallback() {
        // Check if LMA is installed and update hasLMAInstalls variable
    }

    @wire(getLastestPackageInstalls)
    wiredLatestInstalls({ error, data }) {
        if (data) {
            this.latestInstalls = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.latestInstalls = undefined;
        }
    }
}