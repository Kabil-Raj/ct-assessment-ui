import axios from "axios";

const apiurl = "http://localhost:8080/customers"

const sessionStorageName = "CustomerMetaData"

class GetCustomerdata {

    getCustomerMetadata() {
      return axios.get(apiurl + "/metadata")
    }

    saveMetaDataInSession(custMetadata) {
        sessionStorage.setItem(sessionStorageName,custMetadata)
    }

    getDataFromSessionStorage() {
       return sessionStorage.getItem(sessionStorageName);
    }

     getCustomerData() {
        return axios.get(apiurl + "/list");
    }

    updateCustomerData(customerExistingData, updatedCustomerData) {
        const customer = {
            customerId: customerExistingData.customerId,
            customerName: customerExistingData.customerName,
            dateOfBirth: customerExistingData.dateOfBirth,
            country: customerExistingData.country,
            nationality: customerExistingData.nationality,
            ageVerified :  updatedCustomerData.ageVerified,
            sourceOfFunds : updatedCustomerData.sourceOfFunds,
            idExpiry: customerExistingData.idExpiry,
            customerType : updatedCustomerData.customerType,
            expectedIncome: updatedCustomerData.expectedIncome
        }

        axios.post(apiurl+ "/"+customerExistingData.customerId,customer)
        .then(response => {
            console.log("Response " +response.data)
        })
    }
}

export default new GetCustomerdata();