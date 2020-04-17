import { LightningElement, track, api, wire } from 'lwc';
import getLocationData from '@salesforce/apex/isvConsoleMapController.getLocationData';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class IsvConsoleMap extends LightningElement {
    
    @api title;
    mapMarkers = [];
    error;
    numberOfMarkers;
    isMobile = false;
    selctedOnMobile = false;
    isTablet = false;
    isDesktop = false;
    
    
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
              // code block
          }
    }

    @wire(getLocationData)
    wiredLocations({ error, data }) {
        if (data) {
            this.mapMarkers = data;
            this.error = undefined;
            this.numberOfMarkers = data.length;
        } else if (error) {
            this.error = error;
            this.mapMarkers = undefined;
        }
    }
    
    
    @track markersTitle = "My Customers";

    @track selectedMarkerValue = 'France1';

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
        if (this.isMobile)
            this.selctedOnMobile = true;
    }
}