import { LightningElement, api, wire } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
import getLicenseData from '@salesforce/apex/listContainerController.getLicenseData';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class ListContainer extends LightningElement {
    hasLMAInstalls = true;
    @api title;
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


    connectedCallback() {
        
        // Check which header icon to use based on selected App Builder Title
        switch(this.title) {
            case 'Latest Installs per App':
                this.headerIconName = 'utility:refresh';
              break;
            case 'Licenses Expiring Soon':
                this.headerIconName = 'utility:alert';
            break;
            default:
          }
        
        // Check if LMA is installed and update hasLMAInstalls variable

        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
        case 'Large':
            this.isDesktop = true;
            this.formfactorName = 'Desktop';
            this.computedChildClassName = 'desktop';
          break;
        case 'Medium':
            this.isTablet = true;
            this.formfactorName = 'Tablet';
            this.computedChildClassName = 'desktop';
          break;
        case 'Small':
            this.isMobile = true;
            this.formfactorName = 'Phone';
            this.computedChildClassName = 'mobile';
        break;
        default:
      }
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
            actionType: 'displayNba',
            sourceComponent: this.title,
            formFactor: this.formfactorName
        };
        publish(this.messageContext, ISVCONSOLEMC, message);
        

    }




}