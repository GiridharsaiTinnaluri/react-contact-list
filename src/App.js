import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar_component'
import ContactListPerson from './components/contactList_component';
import CreateContact from './components/ceateContact_component';
import EditContact from './components/editContact_component';

let id= 10;
function App() {
  
  //initilizing all state and variables
  const [contactList, setContactList] = useState([]);
  const [openCreateContact, setOpenCreateContact] = useState(false);
  const [openEditContact, setOpenEditContact] = useState({
    isOpen: false,
    contactDetails: {}
  });

  // runs only one time - when component mounted
  // used to fetch and set the all contacts
  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) =>{ console.log(data); setContactList(data)});
  }, []);

  // used to delete an contact item from a list 
  const handleDelete = (contact) => {
    const filteredArray = contactList.filter((item, index) => {
        if(item.id !== contact.id && item.name.toLowerCase() !== contact.name.toLowerCase()) {
          return item;
        }
    })

    setContactList(filteredArray);
  }

  // changes the condition to display EditContact component
  const handleRenderEdit = (contact) => {
      setOpenEditContact(prev => { return {isOpen: !prev.isOpen, contactDetails: contact}});
  }

  // changes the condition to display createContact component
  const handleRenderCreateContact = () => {
    setOpenCreateContact(prev => !prev);
  }

  // send a post request to create contact 
  // and add new contact to the existing list
  const handleCreateContact = (inputValue) => {
      console.log(inputValue);

      const newContact = {
        id: ++id
        ,name: inputValue.name
        ,phone: inputValue.phone
        ,username: inputValue.username
        ,website: inputValue.website
        ,email: inputValue.email
        ,company: {
                    name: inputValue.companyName,
                    catchPhrase: inputValue.companyCatchPhrase,
                    bs: inputValue.companyBs
                  }
        ,address: {
                    city: inputValue.addressCity
                    ,street: inputValue.addressStreet
                    ,suite: inputValue.addressSuite
                    ,zipcode: inputValue.addressZipcode
                  }
      }

      fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        body: JSON.stringify(newContact)
      })
        .then((response) => response.json())
        .then((data) =>{ console.log(data);});

      console.log(newContact)
      setContactList(prev => [...prev, newContact])
      setOpenCreateContact(prev => !prev)
  }

  // send a put request to update contact
  // and made changes to the existing contact list
  const handleUpdateContact = (inputValue) => {
    const filteredArray = contactList.filter((item, index) => {
      if(item.id !== inputValue.id) {
        return item;
      }
    });

    const updateContact = {
      id: inputValue.id
      ,name: inputValue.name
      ,phone: inputValue.phone
      ,username: inputValue.username
      ,website: inputValue.website
      ,email: inputValue.email
      ,company: {
                  name: inputValue.companyName,
                  catchPhrase: inputValue.companyCatchPhrase,
                  bs: inputValue.companyBs
                }
      ,address: {
                  city: inputValue.addressCity
                  ,street: inputValue.addressStreet
                  ,suite: inputValue.addressSuite
                  ,zipcode: inputValue.addressZipcode
                }
    }

    filteredArray.push(updateContact);
    setContactList(filteredArray);
    setOpenEditContact(prev => !prev)
  }

  // conditional rendering
  //used to display Create contact component
  if(openCreateContact) {
    return (
      <div>
        {/* Navbar */}
        <Navbar></Navbar>

        {/* displays create contact component */}
        <div className='App-main'>
          <CreateContact handleCreateContact={handleCreateContact}></CreateContact>
        </div>
      </div>
    )
  }

  // conditional Rendering
  //used to display Edit contact component
  if(openEditContact.isOpen) {
    return (
      <div>
        {/* Navbar */}
        <Navbar></Navbar>

        {/* display */}
        <div className='App-main'>
          <EditContact handleUpdateContact={handleUpdateContact} contcatPersonDetails={openEditContact.contactDetails}></EditContact>
        </div>
      </div>
    )
  }

  // shows all contact lists
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* display all Contacts */}
      <div className='App-main'>
        <div className='app-contactList-wrapper'>
            {/* create Contact */}
            <div className='create-contact'>
                  <button type='button' onClick={handleRenderCreateContact}> + Create Contact </button>
            </div>

            {/* display all contacts in the list */}
            {
              contactList && contactList.map((item, i) => {
                 return <ContactListPerson 
                                    contactPersonDetails={item} 
                                    id={item.id}
                                    handleDelete={() => handleDelete(item)}
                                    handleEdit={() => handleRenderEdit(item)}
                        >
                        </ContactListPerson>
                })
            }
        </div>
      </div>
    </div>
  );
}

export default App;
