import { LightningElement, api, wire } from 'lwc';
//import getLastestPackageInstalls from '@salesforce/apex/listContainerController.getLastestPackageInstalls';
import getLicenseData from '@salesforce/apex/listContainerController.getLicenseData';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class ListContainer extends LightningElement {
    hasLMAInstalls = true;
    @api title;
    latestInstalls;
    error;

    @wire(MessageContext)
    messageContext;


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