import { LightningElement, track, api, wire } from 'lwc';
import getOrgURL from '@salesforce/apex/isvConsoleMapController.getOrgURL';
import { NavigationMixin } from 'lightning/navigation';

export default class VideoPlayer extends NavigationMixin(LightningElement) {
    @api vidyardId;
    iframeURL;
    orgURL;

    @wire(getOrgURL)
    wiredOrg({error, data}) {
        if (data) {
            this.orgURL = data;
            console.log('videoPlayer.js: ' + this.orgURL);
            this.iframeURL = this.orgURL.substring(this.orgURL.indexOf("=") + 1, this.orgURL.indexOf("]")) + '/apex/videoPlayer?vidyardId=' + this.vidyardId;
        }
        else if (error) {
            this.error = error;
        }
    }

    connectedCallback() {
        console.log('#### vidyardId: ' + this.orgURL);
        const url = this.orgURL;
        //this.iframeURL = this.orgURL.Url + '/apex/videoPlayer?vidyardId=' + this.vidyardId;
    }



    
}