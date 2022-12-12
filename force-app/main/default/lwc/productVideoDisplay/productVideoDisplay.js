import { LightningElement, api, wire } from 'lwc';
import getVideos from '@salesforce/apex/ProductVideoController.getVideos';
import USER_LOCALE from '@salesforce/i18n/locale';
import productVideosLabel from '@salesforce/label/c.B2B_Product_Videos';

export default class ProductVideoDisplay extends LightningElement {

    @api recordId;
    @api maxNumVideos;
    @api displayType;
    @api activeSectionName;

    get locale() {
        return USER_LOCALE.replace('-', '_');
    }

    label = {
        productVideosLabel
    };

    videos;

    constructor() {
        super();
        console.log('USER_LOCALE: ' + USER_LOCALE);
    }

    renderedCallback() {
        //console.log('locale: ' + this.locale);
    }

    @wire(getVideos, {recordId: '$recordId', maxNumVideos: '$maxNumVideos', locale: '$locale'})
	loadVideos(result) {
        console.log('inside loadVideos()');
        console.log(result);
        
		if (result.data) {
            console.log('success!');

            this.videos = JSON.parse(result.data);

            if(this.videos.length > 0) {
                this.activeSectionName = this.videos[0].id;
            }
		}
    }

    get useAccordian() {
        if(this.displayType === 'Accordian') {
            return true;
        }
        else {
            return false;
        }
    }

    get useTabset() {
        if(this.displayType === 'Tabset') {
            return true;
        }
        else {
            return false;
        }
    }

    get hasVideos() {
        if(this.videos && this.videos.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    
}