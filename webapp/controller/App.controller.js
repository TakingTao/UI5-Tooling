sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/ui/core/Fragment",
    "ui5/product/list/model/models",
    "ui5/product/list/model/formatter"
],function(Controller,Fragment,models,formatter){
    "use strict"

    return Controller.extend('ui5.product.list.controller.App',{
        formatter:formatter,

        onPressCreateNewProduct() {
            const oData = this.getView().getModel("input").getData()

            // Validate input
            if (!this._validate()) return

            // Add a new item to the list
            const oProductModel = this.getView().getModel("product")
            const aItems = oProductModel.getProperty("/items")
            
            aItems.push(oData)
            oProductModel.setProperty("/items",aItems)

            // Close the dialog
            this._oCreateProductDialog.close()

            console.log(this.getView().getModel("input").getData())

        },

        onPressDelete(oEvent) {

            const oItem = oEvent.getParameter("listItem")

            // Remove the item from the list
            const oModel = this.getView().getModel("product")
            const iIndex = oItem.getBindingContext("product").getPath().split("/").pop()
            
            oModel.getData().items.splice(iIndex,1)
            oModel.refresh()

        },

        onPressAddNewProduct() {
            if(!this._oCreateProductDialog){
                Fragment.load({
                    id: this.getView().getId(),
                    name: "ui5.product.list.view.fragments.CreateProduct",
                    controller: this
                }).then(oDialog => {
                    this._oCreateProductDialog = oDialog
                    this.getView().addDependent(oDialog)
                    oDialog.open()
                })
            }else{
                this._oCreateProductDialog.open()
            }
        },

        onAfterCloseDialog() {
            this.getOwnerComponent().setModel(models.createInputModel(),"input")
            this.getOwnerComponent().setModel(models.createValidationModel(),"validation")
        },

        onPressCancelNewProduct() {
            this._oCreateProductDialog.close()
        },

        _validate() {
            const oInput = this.getView().getModel("input").getData()
            const oValidationModel = this.getView().getModel("validation")

            // Check mandatory inputs
            oValidationModel.setProperty("/Name", !!oInput.Name)
            oValidationModel.setProperty("/Category", !!oInput.Category)
            oValidationModel.setProperty("/Price", !!oInput.Price)
            oValidationModel.setProperty("/ReleaseDate", !!oInput.ReleaseDate)

            // Return validation status
            return !Object.values(oValidationModel.getData()).includes(false)
        }
    })
})