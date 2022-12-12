public with sharing class ProductVideoController {
    
    @AuraEnabled(Cacheable=true)
    public static String getVideos(String recordId, String maxNumVideos, String locale){

        System.debug('ProductVideoController - getVideos() begin');

        System.debug('User language code: ' + UserInfo.getLanguage());

        System.debug('locale: ' + locale);

        List<ProductVideo> pvList = new List<ProductVideo>();

        Date currentDate = Date.today();

        Integer limitValue = Integer.valueOf(maxNumVideos);

        String localePrefix = locale.substring(0,2);

        System.debug('localePrefix: ' + localePrefix);

        String likeValue = localePrefix + '%';

        List<Product_Video__c> pvObjList = new List<Product_Video__c>();

        pvObjList = [Select Id, Title__c, Description__c, Language__c, YouTube_Video_Id__c, Type__c, Video_URI__c, 
        (Select Language__c, Title__c, Description__c from Product_Video_I18Ns__r)
        from Product_Video__c 
        where Product__c = :recordId
        and Active__c = true
        and Start_Date__c <= :currentDate
        and End_Date__c >= :currentDate 
        with SECURITY_ENFORCED 
        order by Sequence__c 
        limit :limitValue 
        ];

        System.debug('pvObjList: ' + JSON.serialize(pvObjList));

        for(Product_Video__c pvObj : pvObjList) {

            ProductVideo pv = new ProductVideo();
            pv.id = pvObj.Id;
            pv.title = pvObj.Title__c;
            pv.description = pvObj.Description__c;
            pv.type = pvObj.Type__c;
            pv.youTubeVideoId = pvObj.YouTube_Video_Id__c;
            pv.videoUri = pvObj.Video_URI__c;

            if(locale == pvObj.Language__c) {
                // We are good to go
                System.debug('matching language found with parent record');
            }
            else {
                // See if there is a translation for the user's specific locale

                Boolean translationFound = false;

                for(Product_Video_I18N__c pi18n : pvObj.Product_Video_I18Ns__r) {
                    if(locale == pi18n.Language__c) {

                        System.debug('exact match locale found with I18N record');

                        pv.title = pi18n.Title__c;
                        pv.description = pi18n.Description__c;
                        translationFound = true;
                        break;
                    }
                }

                if(translationFound == false) {
                    // See if there is a translation for the user's locale prefix

                    for(Product_Video_I18N__c pi18n : pvObj.Product_Video_I18Ns__r) {

                        if(localePrefix == pi18n.Language__c.substring(0,2)) {

                            System.debug('partial match locale found with I18N record');

                            pv.title = pi18n.Title__c;
                            pv.description = pi18n.Description__c;
                            translationFound = true;
                            break;
                        }
                    }
                }
            }

            pvList.add(pv);
        }

        System.debug('total recs found = ' + pvList.size());

        System.debug('ProductVideoController - getVideos() exit');

        return JSON.serialize(pvList);
    }

    public class ProductVideo {
        public String id {get; set;}
        public String title {get; set;}
        public String description {get; set;}
        public String type {get; set;}
        public String youTubeVideoId {get; set;}
        public String videoUri {get; set;}
    }

}