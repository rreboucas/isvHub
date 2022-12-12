import { LightningElement } from 'lwc';
import dataMatchJob from '@salesforce/apex/isvConsoleMapController.getMatchLeadsCountryAndStateJob';

export default class DataMatchJob extends LightningElement {
    

    showAcceptForm = true;
    isLoading = false;
    showResults = false;
    showClose = false;
    jobResults;

    runJob(event) {
        // run job
        this.showAcceptForm = false;
        this.isLoading = true;
        dataMatchJob()
            .then(result => {
                this.jobResults = result;
                this.isLoading = false;
                this.showResults = true;
            })
            .catch(error => {
                this.error = error;
            });
    }

    cancelJob(event) {
        showAcceptForm = false;
        this.showClose = true;
    }

}