import { LightningElement, api } from 'lwc';
import youTubeNotFoundLabel from '@salesforce/label/c.B2B_YouTube_ID_Not_Found';
import mp4NotFoundLabel from '@salesforce/label/c.B2B_MP4_URI_not_found';

export default class ProductVideoRecord extends LightningElement {

    @api youTubeId;
    @api type;
    @api videoUri;

    label = {
        youTubeNotFoundLabel,
        mp4NotFoundLabel
    };

    constructor() {
        super();
    }

    renderedCallback() {
        console.log('productVideoRecord - inside ctor');
        console.log('youTubeId = ' + this.youTubeId);
        console.log('type = ' + this.type);
        console.log('videoUri = ' + this.videoUri);
    }
    
    get isYouTube() {
        if(this.type === 'YouTube') {
            return true;
        }
        else {
            return false;
        }
    }

    get isMp4() {
        if(this.type === 'MP4') {
            return true;
        }
        else {
            return false;
        }
    }

}