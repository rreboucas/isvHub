import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import setNotificationDates from '@salesforce/apex/CountdownTimerController.setNotificationDates';
import getScheduledNotifications from '@salesforce/apex/CountdownTimerController.getScheduledNotifications';

export default class NotificationConfig extends LightningElement {
    @api daysBeforeExpiry;

    tomorrowDate;
    expiryDate;
    date1;
    date2;

    date1Valid;
    date2Valid;

    currentNotifications;

    get dateValidity(){
        return !(this.date1Valid && this.date2Valid);
    }

    connectedCallback(){
        this.setValidDateRange();
        this.getScheduledNotifications();
    }

    /*
        setValidDateRange
        Sets the permitted range in for the calendar selection.
        Valid range between tomorrow and the day before org expiry
    */
    setValidDateRange(){
        var today = new Date();
        this.tomorrowDate = new Date();
        this.expiryDate = new Date();

        this.expiryDate.setDate(today.getDate() + this.daysBeforeExpiry);
        this.expiryDate = this.formatDate(this.expiryDate);
        
        this.tomorrowDate.setDate(today.getDate() + 1);
        this.tomorrowDate = this.formatDate(this.tomorrowDate);
    }

    formatDate(date){
        date = date.toDateString();
        date = date.substring(4);
        date = [date.slice(0, 6), ', ', date.slice(7)].join('');
        return date;
    }

    handleSelect(event){
        if(event.target.name == 'notification1'){
            this.date1 = event.target.value;
            if(event.target.validity.valid){
                this.date1Valid = true;
            }else{
                this.date1Valid = false;
            }
        }else{
            this.date2 = event.target.value;
            if(event.target.validity.valid){
                this.date2Valid = true;
            }else{
                this.date2Valid = false;
            }
        }
    }

    getScheduledNotifications(){
        getScheduledNotifications()
        .then((result) => {
            if(result != ''){
                this.currentNotifications = result
            }else{
                this.currentNotifications = null;
            }
            
        })
        .catch((error) => {
            this.showToast('Error', error.body.message, 'error')
        });

    }
        
    handleSave(){
        var dates = [this.date1, this.date2];
        setNotificationDates({dates: dates})
        .then((result) => {
            if(result.includes('cancelled')){
                this.showToast('Success', result, 'warning')
            }else{
                this.showToast('Success', result, 'success')
            }
            this.getScheduledNotifications();
        })
        .catch((error) => {
            this.showToast('Error', error.body.message, 'error')
        });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

}