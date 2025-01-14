sap.ui.define(["sap/ui/core/ValueState"],function(ValueState){
    'use strict'

    return {

        formatAvailabilityText(sValue){
            const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle()
            

            return sValue && new Date(sValue) <= new Date() ? oBundle.getText("unavailable") : oBundle.getText("available")
        },

        formatAvailabilityState(sValue){
            return sValue && new Date(sValue) <= new Date() ? ValueState.Error : ValueState.Success
        }

    }
})