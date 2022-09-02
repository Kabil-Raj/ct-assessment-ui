import React, { useState, useEffect } from "react";
import "./customerData.css"
import getData from "../api/getCustomerdata";
import Pagination from "../pagination/pagination";




function CustomerData() {

    var custAttribute1 = "Nationality";
    var custAttribute2 = "Age Verified";
    var custAttribute3 = "Source Of Funds";
    var custAttribute4 = "ID Expiry";
    var custAttribute5 = "Customer Type";
    var custAttribute6 = "Expected Income";

    const [customerMetaData, setCustomerMetaData] = useState()

    const [showList, setShowList] = useState(false)

    const [customerData, setCustomerData] = useState([])

    const [updatedCustomerData, setUpdatedCustomerData] = useState({})

    const [currentPage, setCurrentPage] = useState(1)

    const [listPerPage] = useState(5)

    const indexOfLastList = currentPage * listPerPage;
    const indexOfFirstList = indexOfLastList - listPerPage;

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        const fetchCustomerMetaData = async () => {
            const resp = await getData.getCustomerMetadata()
            setCustomerMetaData(resp.data.structure)
        }
        fetchCustomerMetaData()
        getData.saveMetaDataInSession(customerMetaData);
    }, [])

    const showCustomerList = () => {
        setShowList(!showList)
        const fetchCustomerData = async () => {
            const resp = await getData.getCustomerData()
            setCustomerData(resp.data)
        }
        fetchCustomerData();
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUpdatedCustomerData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const sendUpdatedCustomerData = (customer) => {
        getData.updateCustomerData(customer, updatedCustomerData)
    }

   


    return (
        <div className="customerData">
            <h1>Welcome, please click here to show or hide the user list</h1>
            <button className="showCustomerList" onClick={() => showCustomerList()}>Click</button>
            {showList &&
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Id</th>
                                <th>Customer Name</th>
                                <th>Date Of Birth</th>
                                <th>Country</th>
                                {(customerMetaData[0].label === custAttribute1 && customerMetaData[0].state !== "hidden") && <th>{custAttribute1}</th>}
                                {(customerMetaData[1].label === custAttribute2 && customerMetaData[1].state !== "hidden") && <th>{custAttribute2}</th>}
                                {(customerMetaData[2].label === custAttribute3 && customerMetaData[2].state !== "hidden") && <th>{custAttribute3}</th>}
                                {(customerMetaData[3].label === custAttribute4 && customerMetaData[3].state !== "hidden") && <th>{custAttribute4}</th>}
                                {(customerMetaData[4].label === custAttribute5 && customerMetaData[4].state !== "hidden") && <th>{custAttribute5}</th>}
                                {(customerMetaData[5].label === custAttribute6 && customerMetaData[5].state !== "hidden") && <th>{custAttribute6}</th>}
                                <th>Update</th>
                            </tr>
                        </thead>
                        {customerData.slice(indexOfFirstList
                            , indexOfLastList).map(customer => {
                                return (
                                    <tbody key={customer.customerId}>
                                        <tr>
                                            <td>{customer.customerId}</td>
                                            <td>{customer.customerName}</td>
                                            <td>{customer.dateOfBirth}</td>
                                            <td>{customer.country}</td>
                                            {customerMetaData[0].state !== "hidden" && (customerMetaData[0].state === "read-write" ? <td><input name="nationality" type="text" defaultValue={customer.nationality} /></td> : <td>{customer.nationality}</td>)}
                                            {customerMetaData[1].state !== "hidden" && (customerMetaData[1].state === "read-write" ? <td>
                                                <label htmlFor="ageVerify">
                                                    <select name="ageVerified" id="ageVerify" defaultValue={customer.ageVerified} onChange={(event) => { handleChange(event) }} >
                                                        <option value="true"> True</option>
                                                        <option value="false"> False</option>
                                                    </select>
                                                </label>
                                            </td> : <td>{customer.ageVerified.toString()}</td>)}
                                            {customerMetaData[2].state !== "hidden" && (customerMetaData[2].state === "read-write" ? <td><input name="sourceOfFunds" type="text" defaultValue={customer.sourceOfFunds} onChange={(event) => { handleChange(event) }} /></td> : <td>{customer.sourceOfFunds}</td>)}
                                            {customerMetaData[3].state !== "hidden" && (customerMetaData[3].state === "read-write" ? <td><input name="idExpiry" type="text" defaultValue={customer.idExpiry} /></td> : <td>{customer.idExpiry}</td>)}
                                            {customerMetaData[4].state !== "hidden" && (customerMetaData[4].state === "read-write" ? <td>
                                                <label htmlFor="customerType">
                                                    <select name="customerType" id="customerType" defaultValue={customer.customerType} onChange={(event) => { handleChange(event) }} >
                                                        <option value="Corporate"> Corporate</option>
                                                        <option value="Individual"> Individual</option>
                                                        <option value="Bank"> Bank</option>
                                                    </select>
                                                </label>
                                            </td> : <td>
                                                {customer.customerType}
                                            </td>)}
                                            {customerMetaData[5].state !== "hidden" && (customerMetaData[5].state === "read-write" ? <td><input name="expectedIncome" type="number" defaultValue={customer.expectedIncome} onChange={(event) => { handleChange(event) }} /></td> : <td>{customer.expectedIncome}</td>)}
                                            <td><button className="updateCustomerData" onClick={() => sendUpdatedCustomerData(customer)}>Update</button></td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }

                    </table>
                    <Pagination listPerPage={listPerPage} totalList={customerData.length} paginate={paginate} />
                </div>}
        </div>
    )
}

export default CustomerData;