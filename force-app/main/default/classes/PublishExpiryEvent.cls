/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 * 
 * Author: Michael Holt
 * Created Date: 17-Jan-2020
 * 
 */

public with sharing class PublishExpiryEvent implements Schedulable{
    public static void execute(SchedulableContext SC) {
        String expiry = Date.valueOf(CountdownTimerController.getExpirationDate()).format();
        eventbus.publish(new Org_Expiry_Notification__e(Expiry_Date__c = expiry));
    }
}