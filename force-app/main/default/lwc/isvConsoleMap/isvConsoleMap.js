import { LightningElement, track, api, wire } from 'lwc';
import getLocationData from '@salesforce/apex/isvConsoleMapController.getLocationData';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { publish, MessageContext } from 'lightning/messageService';
import ISVCONSOLEMC from "@salesforce/messageChannel/ISVConsole__c";

export default class IsvConsoleMap extends LightningElement {
    
    @api title;
    mapMarkers = [];
    error;
    numberOfMarkers;
    isMobile = false;
    selctedOnMobile = false;
    isTablet = false;
    isDesktop = false;
    selectedMarkerValue ;
    
    @wire(MessageContext)
    messageContext;
    
    connectedCallback() {
        // Check formfactor being used to access this LWC
      switch(FORM_FACTOR) {
            case 'Large':
                this.isDesktop = true;
              break;
            case 'Medium':
                this.isTablet = true;
              break;
            case 'Small':
                this.isMobile = true;
            break;
            default:
              
              
          }
    }

    @wire(getLocationData)
    wiredLocations({ error, data }) {
        if (data) {
            this.mapMarkers = data;
            this.error = 'No Data found';
            this.numberOfMarkers = data.length;
        } 
        else  {
            this.error = 'No Data returned from Salesforce Org';
            this.numberOfMarkers = 0;
            
            this.mapMarkers = [
                {
                    value: 'France1',
                    location: {
                        City: "Cap-d'Ail",
                        Country: 'France',
                    },
        
                    icon: 'custom:custom26',
                    title: "Cap-d'Ail",
                },
            ];


        }
    }
    
    
    @track markersTitle = "My Customers";


    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
        if (this.isMobile)
            this.selctedOnMobile = true;
    }

    badgeSelected(event) {
        console.log('isvConsoleMap.js badgeSelected' + event);
        const recId = event.detail.recId;
        const action = event.detail.action;

        switch(action) {
            case 'nba':
                {
                    // Send Message to Modal Launcher Component to Open NBA on a Mobile Modal
                    const message = {
                        messageToSend: recId,
                        sourceComponent: 'ISVConsoleMap'
                    };
                    console.log('isvConsoleMap.js message' + message);
                    publish(this.messageContext, ISVCONSOLEMC, message);
                    break;
                }
            case 'NavToRecord':
                //
              break;
            case 'ConvertLead':
                //
            break;
            case 'NotifySales':
                //
            break;
            default:
              // code block
          }

    }


}