import { useEffect, useState } from "react";



const ContactListPerson = (props) => {
    // initilizing all the variables and states
    const [contactPersonDetails, setContactPersonDetails] = useState('');
    const [open, setOpen] = useState(false);
    
    // runs every time the props changes and component mounted.
    useEffect(() => {
        setContactPersonDetails(props.contactPersonDetails);
    }, [props]);

    // used to toggle Delete and Edit options in contact list
    const handleOpenOptions = () => {
        setOpen((prev) => !prev);
    }

    return (
        <div className="contactList-card" 
             onMouseEnter={handleOpenOptions} onMouseLeave={handleOpenOptions}
        >
            {/* contact Edit div - appears onhover */}
            {
                open && <div className="contactList-editOptions" >
                            <div
                                className="cursor-pointer" 
                                onClick={props.handleDelete}>
                                    Delete
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={props.handleEdit}>
                                    Edit
                            </div>
                        </div>
            }

            {/* shows person details */}
            <div className="contactList-personDetails">
                <table>
                    <tbody>
                    {/* name */}
                    <tr>
                        <th>Name: </th>
                        <td>{contactPersonDetails.name}</td>
                    </tr>

                    {/* username */}
                    <tr>
                        <th>Username: </th>
                        <td>{contactPersonDetails.username}</td>
                    </tr>

                    {/* email */}
                    <tr>
                        <th>Email: </th>
                        <td>{contactPersonDetails.email}</td>
                    </tr>

                    {/* address */}
                    <tr>
                        <th>Address: </th>
                        <td>
                            <address>
                                {contactPersonDetails?.address?.suite} <br/>
                                {contactPersonDetails?.address?.street} <br/>
                                {contactPersonDetails?.address?.city} <br/>
                                {contactPersonDetails?.address?.zipcode}
                            </address>
                        </td>
                    </tr>

                    {/* phone number */}
                    <tr>
                        <th>Phone: </th>
                        <td>{contactPersonDetails.phone}</td>
                    </tr>

                    {/* website */}
                    <tr>
                        <th>website: </th>
                        <td>{contactPersonDetails.website}</td>
                    </tr>

                    {/* company */}
                    <tr>
                        <th>Company: </th>
                        <td>
                            {contactPersonDetails.company?.name} <br/>
                            {contactPersonDetails.company?.catchPhrase} <br/>
                            {contactPersonDetails.company?.bs} <br/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ContactListPerson;