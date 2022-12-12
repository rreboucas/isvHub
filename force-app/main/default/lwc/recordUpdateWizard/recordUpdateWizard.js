import { LightningElement, api } from 'lwc';
import getLeads from '@salesforce/apex/manageData.getLicenceLeadIdsWithoutAddress';
import getAccounts from '@salesforce/apex/manageData.getLicenceAccountIdsWithoutAddress';
import { refreshApex } from '@salesforce/apex';

export default class RecordUpdateWizard extends LightningElement {

    @api objectApiName;
    recordid;
    isLead = false;
    isAccount = false;
    showLastUpdateButton = false;
    showCloseScreen = false;
    showUpdateForm = true;
    records;
    numberOfRecordsLabel;
    numberOfUpdatedRecords = 0;
    numberOfRecIndexesZeroBased;
    currentRecIndex;
    error;

    handleSuccess(event) {

        this.numberOfUpdatedRecords = this.numberOfUpdatedRecords + 1; 
        if (this.currentRecIndex != this.numberOfRecIndexesZeroBased)
        {
            this.currentRecIndex = this.currentRecIndex + 1;

            if (this.objectApiName === 'Lead')
                this.recordid = this.records[this.currentRecIndex].sfLma__Lead__c;
            if (this.objectApiName === 'Account')
                this.recordid = this.records[this.currentRecIndex].sfLma__Account__c;
        }
        if (this.currentRecIndex === this.numberOfRecIndexesZeroBased - 1)
            this.showLastUpdateButton = true;

        if (this.currentRecIndex === this.numberOfRecIndexesZeroBased - 1)
        {
            this.showCloseScreen = true;
            this.showUpdateForm = false;

        }  
         
            

        refreshApex(this.records);
    }

    

    connectedCallback() {
        

        switch(this.objectApiName) {
            case 'Lead':
                this.isLead = true;

                getLeads()
                    .then(result => {
                        this.records = result;
                        console.log('recordUpdateWizard.js - getLeads ' + this.records);
                        this.setupInitialData(this.objectApiName);
                        
                    })
                    .catch(error => {
                        this.error = error;
                    });
              break;
            case 'Account':
                this.isAccount = true;

                getAccounts()
                    .then(result => {
                        this.records = result;
                        this.setupInitialData(this.objectApiName);
                        console.log('recordUpdateWizard.js - getAccounts ' + this.records);
                    })
                    .catch(error => {
                        this.error = error;
                    });

              break;
            default:
    
          }
    }

    setupInitialData(objName) {
        console.log('recordUpdateWizard.js - setupInitialData ' );
        this.currentRecIndex = 0;
        this.numberOfRecordsLabel = this.records.length;
        console.log('recordUpdateWizard.js - setupInitialData - numberOfRecordsLabel: ' + this.numberOfRecordsLabel);
        if (this.numberOfRecordsLabel && this.numberOfRecordsLabel >= 1)
        {
            this.numberOfRecIndexesZeroBased = this.numberOfRecordsLabel - 1;
            if (objName === 'Lead')
                this.recordid = this.records[0].sfLma__Lead__c;
            if (objName === 'Account')
                this.recordid = this.records[0].sfLma__Account__c;

                console.log('recordUpdateWizard.js - setupInitialData - recordid: ' + this.recordid);
        }
        
    }
}