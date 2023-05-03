import {  useEffect, useState } from 'react';

const EditContact = (props) => {

    // initilizing all the variables and states
    const [inputValue, setInputValue] = useState({
        name: ''
        ,id: ''
        ,username: ''
        ,email: ''
        ,addressSuite:''
        ,addressStreet: ''
        ,addressCity: ''
        ,addressZipcode: ''
        ,phone: ''
        ,website: ''
        ,companyName: ''
        ,companyCatchPhrase: ''
        ,companyBs: ''
    });
    const [error, setError] = useState('');

    // used to update the input fiels and hold the input value
    const handleChangeInput = (e) => {
        setInputValue(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // used to validate the input fiels and update contact 
    const handleSubmit = (e) => {
        e.preventDefault();

        // input required check
        if(
            !inputValue.name.trim() || !inputValue.username.trim() ||
            !inputValue.email.trim() || !inputValue.phone.trim() ||
            !inputValue.website.trim() || !inputValue.addressCity.trim() ||
            !inputValue.addressStreet.trim() || !inputValue.addressSuite.trim() ||
            !inputValue.addressZipcode.trim() || !inputValue.companyName.trim() ||
            !inputValue.companyCatchPhrase.trim() || !inputValue.companyBs.trim()
          ) {
            // set errors
            return setError("All fields are required.");
        }
        //calling props func to update
        props.handleUpdateContact(inputValue);
    }

    // runs only once when mounted to set the states
    useEffect(() => {
        setInputValue({
            name: props.contcatPersonDetails.name
            ,id: props.contcatPersonDetails.id
            ,username: props.contcatPersonDetails.username
            ,email: props.contcatPersonDetails.email
            ,addressSuite: props.contcatPersonDetails.address.suite
            ,addressStreet: props.contcatPersonDetails.address.street
            ,addressCity: props.contcatPersonDetails.address.city
            ,addressZipcode: props.contcatPersonDetails.address.zipcode
            ,phone: props.contcatPersonDetails.phone
            ,website: props.contcatPersonDetails.website
            ,companyName: props.contcatPersonDetails.company.name
            ,companyCatchPhrase: props.contcatPersonDetails.company.catchPhrase
            ,companyBs: props.contcatPersonDetails.company.bs
        })
    }, [])

    return (
            <form>
                <table>
                        <tbody>
                        {/* name */}
                        <tr>
                            <th>update: </th>
                            <td>
                                <input type="text" placeholder='Name' name="name" value={inputValue.name} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>

                        {/* username */}
                        <tr>
                            <th>Username: </th>
                            <td>
                                <input type="text" placeholder='User Name' name="username" value={inputValue.username} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>

                        {/* email */}
                        <tr>
                            <th>Email: </th>
                            <td>
                                <input type="email" placeholder='Email' name="email" value={inputValue.email} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>

                        {/* address */}
                        <tr>
                            <th>Address: </th>
                            <td>
                                <input type="text" placeholder='Suite' name="addressSuite" value={inputValue.addressSuite} onChange={(e) => handleChangeInput(e)} required/>
                                <input type="text" placeholder='Street' name="addressStreet" value={inputValue.addressStreet} onChange={(e) => handleChangeInput(e)} required/>
                                <input type="text" placeholder='City' name="addressCity" value={inputValue.addressCity} onChange={(e) => handleChangeInput(e)} required/>
                                <input type="text" placeholder='Zip code' name="addressZipcode" value={inputValue.addressZipcode} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>

                        {/* phone number */}
                        <tr>
                            <th>Phone: </th>
                            <td>
                                <input type="text" placeholder='phone' name="phone" value={inputValue.phone} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>

                        {/* website */}
                        <tr>
                            <th>website: </th>
                            <td>
                                <input type="text" placeholder='website' name="website" value={inputValue.website} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>

                        {/* company */} 
                        <tr>
                            <th>Company: </th>
                            <td>
                                <input type="text" placeholder='Company name' name="companyName" value={inputValue.companyName} onChange={(e) => handleChangeInput(e)} required/>
                                <input type="text" placeholder='Catch phrase' name="companyCatchPhrase" value={inputValue.companyCatchPhrase} onChange={(e) => handleChangeInput(e)} required/>
                                <input type="text" placeholder='Company bs' name="companyBs" value={inputValue.companyBs} onChange={(e) => handleChangeInput(e)} required/>
                            </td>
                        </tr>
                        </tbody>
                </table>
                <div style={{color:'red', fontSize:'0.5rem'}}>{error}</div>
                <button type='button' onClick={(e) => handleSubmit(e)}> update </button>
            </form>
    )
}

export default EditContact;