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

public without sharing class PostInstallHandler implements InstallHandler {
    public static void onInstall(InstallContext context){
        Date expiry = Date.valueOf(CountdownTimerController.getExpirationDate());
        Date today = date.today();
        Date notification1 = expiry.addDays(-1);
        Date notification2 = expiry.addDays(-7);
        
        List<Date> dates = new List<Date>();
        if(notification1 > today){
            dates.add(notification1);
            if(notification2 > today){
                dates.add(notification2);
            }
        }
        CountdownTimerController.setNotificationDates(dates);
    }
}
