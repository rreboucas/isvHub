import { LightningElement, api, wire } from 'lwc';
//import getLastestPackageInstalls from '@salesforce/apex/listContainerController.getLastestPackageInstalls';
import getLicenseData from '@salesforce/apex/listContainerController.getLicenseData';

export default class ListContainer extends LightningElement {
    hasLMAInstalls = true;
    @api title;
    latestInstalls;
    error;

    connectedCallback() {
        // Check if LMA is installed and update hasLMAInstalls variable
    }

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

    /*
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
    */
}