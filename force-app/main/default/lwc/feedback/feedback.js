import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Feedback extends NavigationMixin(LightningElement) {

    navigateToFeedback(event) {
        console.log('feedback.js navigateToFeedback ');

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://salesforce.quip.com/dy2xAl2c8ZpZ'
            }
        },
        false 
         );

    }

}