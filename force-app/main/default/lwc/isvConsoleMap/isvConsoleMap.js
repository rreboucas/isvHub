import { LightningElement, track, api, wire } from 'lwc';
import getLocationData from '@salesforce/apex/isvConsoleMapController.getLocationData';

export default class IsvConsoleMap extends LightningElement {
    
    @api title;
    mapMarkers = [];
    error;
    
    @wire(getLocationData)
    wiredLocations({ error, data }) {
        if (data) {
            this.mapMarkers = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.mapMarkers = undefined;
        }
    }
    
    /*
    mapMarkers = [
        {
            value: 'US1',
            location: {
                State: "Texas",
                Country: 'USA',
            },

            icon: 'custom:custom26',
            title: "US1",
        },
        {
            value: 'US2',
            location: {
                State: 'Florida',
                Country: 'US',
            },

            icon: 'custom:custom96',
            title: 'US2',
        },
        {
            value: 'France3',
            location: {
                City: 'Saint-Jean-Cap-Ferrat',
                Country: 'France',
            },

            title: 'Saint-Jean-Cap-Ferrat',
        },
        {
            value: 'France4',
            location: {
                City: 'Villefranche-sur-Mer',
                Country: 'France',
            },

            icon: 'custom:custom92',
            title: 'Villefranche-sur-Mer',
        },
        {
            value: 'France5',
            location: {
                City: 'Antibes',
                Country: 'France',
            },

            icon: 'custom:custom61',
            title: 'Antibes',
        },
        {
            value: 'France6',
            location: {
                City: 'Juan-les-Pins',
                Country: 'France',
            },

            icon: 'custom:custom74',
            title: 'Juan-les-Pins',
        },
        {
            value: 'France7',
            location: {
                City: 'Cannes',
                Country: 'France',
            },

            icon: 'custom:custom3',
            title: 'Cannes',
        },
        {
            value: 'France8',
            location: {
                City: 'Saint-Raphaël',
                Country: 'France',
            },

            icon: 'custom:custom54',
            title: 'Saint-Raphaël',
        },
        {
            value: 'France9',
            location: {
                City: 'Fréjus',
                Country: 'France',
            },

            icon: 'custom:custom88',
            title: 'Fréjus',
        },
        {
            value: 'France10',
            location: {
                City: 'Sainte-Maxime',
                Country: 'France',
            },

            icon: 'custom:custom92',
            title: 'Sainte-Maxime',
        },
    ]; */
    @track markersTitle = "My Customers";

    @track selectedMarkerValue = 'France1';

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.detail.selectedMarkerValue;
    }
}