
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 * 
 * Author: Michael Holt
 * Created Date: 04-Oct-2020
 * 
 */

public with sharing class CountdownTimerController { 
    @AuraEnabled
    public Static String getExpirationDate(){
        Organization org = [SELECT TrialExpirationDate FROM Organization];
        return string.valueOf(org.TrialExpirationDate);
    }
}
