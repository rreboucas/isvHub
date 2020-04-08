<aura:attribute name="strategyName" type="String" description="StrategyDevName needed for nba engine"/><aura:attribute name="onBehalfOfId" type="String" description="entity (human, machine) that the strategy was executed for"/><aura:attribute name="strategyExecutionId" type="String" default="" description="Execution ID that uniquely identifies execution results"/>
	<aura:attribute name="propositions" type="Object" description="Model data for propositions" />
	<aura:attribute name="maxDisplayPropositions" type="Integer" default="4" description="Number of propositions for display" />
	<aura:attribute name="singleColumn" type="Boolean" description="Align propositions in a single column, useful for limited space" />
	<aura:attribute name="widgetTitle" type="String" description="Title to show in the widget header." default="{!$Label.nbaGeneral.WidgetTitle}" />
	<aura:attribute name="recordId" type="String" description="Context recordId." />
	<aura:attribute name="error" type="Boolean" description="If there is any error while fetching propositions" />
	<aura:attribute name="showNbaWidget" type="Boolean" description="show Propositions else show launchedFlow" />
	<aura:attribute name="showEinstein" type="Boolean" default="true" description="show the Einstein logo" />















(function s(){ return (
function evaledScript() {$A.componentService.addComponentClass("markup://lightning:nextBestActions",function() {
return {
  "meta":{
    "name":"lightning$nextBestActions",
    "extends":"markup://aura:component"
  },
  "controller":{
    "handleStrategyNameChange":function(cmp, event, helper) {
        helper.handleStrategyNameChange(cmp);
    },
    "handleLabelChange":function(cmp, event, helper) {
        helper.handleLabelChange(cmp);
    },
    "handleMaxPropositionsChange":function(cmp, event, helper) {
        helper.handleMaxPropositionsChange(cmp);
    },
    "handleRecordIdChange":function(cmp, event, helper) {
        helper.handleRecordIdChange(cmp);
    },
    "handleOrientationChange":function(cmp, event, helper) {
        helper.handleOrientationChange(cmp);
    }
  },
  "helper":{
    "createNbaComponent":function(cmp) {

        var nbaComponentAttributes = {
                'aura:id' : 'internalNbaComponent',
                'strategyName' : cmp.get('v.strategyName'),
                'maxDisplayPropositions' : cmp.get('v.maxPropositions'),
                'widgetTitle' : cmp.get('v.label'),
                'recordId' : cmp.get('v.recordId'),
                'singleColumn' : cmp.helper.isSingleColumn(cmp)
            };

        $A.createComponent('runtime_communities_nba:nbaWidget', nbaComponentAttributes,
            function(nbaComponent, status, error) {
                if (status === 'SUCCESS') {
                    
                    nbaComponent.set('v.strategyName', cmp.get('v.strategyName'));
                    nbaComponent.set('v.maxDisplayPropositions', cmp.get('v.maxPropositions'));
                    nbaComponent.set('v.widgetTitle', cmp.get('v.label'));
                    nbaComponent.set('v.recordId', cmp.get('v.recordId'));
                    nbaComponent.set('v.singleColumn', cmp.helper.isSingleColumn(cmp));

                    cmp.index('internalNbaComponent', nbaComponent.getGlobalId());
                    cmp.set('v.privateNbaComponent', nbaComponent);
                } else if (status === 'INCOMPLETE') {
                    console.warn("No response from server or client is offline."); 
                } else if (status === 'ERROR') {
                    console.warn("Error: " + error); 
                }
            }
        );
    },
    "handleStrategyNameChange":function(cmp) {
        this.handleAttributeChange(cmp, 'v.strategyName', cmp.get('v.strategyName'));
    },
    "handleLabelChange":function(cmp) {
        this.handleAttributeChange(cmp, 'v.widgetTitle', cmp.get('v.label'));
    },
    "handleMaxPropositionsChange":function(cmp) {
        this.handleAttributeChange(cmp, 'v.maxDisplayPropositions', cmp.get('v.maxPropositions'));
    },
    "handleRecordIdChange":function(cmp) {
        this.handleAttributeChange(cmp, 'v.recordId', cmp.get('v.recordId'));
    },
    "handleOrientationChange":function(cmp) {
        this.handleAttributeChange(cmp, 'v.orientation', cmp.helper.isSingleColumn(cmp));
    },
    "handleAttributeChange":function(cmp, key, value) {
        var nbaComponent = cmp.get('v.privateNbaComponent');

        if (nbaComponent && nbaComponent.isValid && nbaComponent.isValid()) {
            nbaComponent.set(key, value);
        }
    },
    "isSingleColumn":function(cmp) {
        return cmp.get('v.orientation') !== 'horizontal';
    }
  },
  "renderer":{
    "afterRender":function(cmp, helper) {
        cmp.superAfterRender();
        helper.createNbaComponent(cmp);
    },
    "unrender":function(cmp) {
        var nbaComponent = cmp.get('v.privateNbaComponent');

        if (nbaComponent && nbaComponent.isValid && nbaComponent.isValid()) {
            nbaComponent.destroy();
        }

        cmp.superUnrender();
    }
  }
};
});
return {
  "xs":"G",
  "descriptor":"markup://lightning:nextBestActions",
  "ad":[
    ["body","aura://Aura.Component[]","G",false,[]],
    ["strategyName","aura://String","G",true],
    ["maxPropositions","aura://Integer","G",false,4],
    ["label","aura://String","G",false],
    ["recordId","aura://String","G",false],
    ["orientation","aura://String","G",false,"vertical"],
    ["privateNbaComponent","aura://Aura.Component","p",false,null]
  ],
  "hd":[
    {
      "x":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"c.handleStrategyNameChange"
      },
      "v":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"v.strategyName"
      },
      "n":"change"
    },
    {
      "x":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"c.handleMaxPropositionsChange"
      },
      "v":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"v.maxPropositions"
      },
      "n":"change"
    },
    {
      "x":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"c.handleLabelChange"
      },
      "v":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"v.label"
      },
      "n":"change"
    },
    {
      "x":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"c.handleRecordIdChange"
      },
      "v":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"v.recordId"
      },
      "n":"change"
    },
    {
      "x":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"c.handleOrientationChange"
      },
      "v":{
        "exprType":"PROPERTY",
        "byValue":false,
        "path":"v.orientation"
      },
      "n":"change"
    }
  ],
  "fa":[
    {
      "descriptor":"body",
      "value":[
        {
          "componentDef":{
            "descriptor":"markup://aura:expression"
          },
          "attributes":{
            "values":{
              "value":{
                "descriptor":"value",
                "value":{
                  "exprType":"PROPERTY",
                  "byValue":false,
                  "target":"lightning:nextBestActions",
                  "path":"v.privateNbaComponent"
                }
              }
            }
          }
        }
      ]
    }
  ],
  "mv":43.0
} }
)})();