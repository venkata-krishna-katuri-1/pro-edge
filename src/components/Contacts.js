import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactApp = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    Contacts.getAll((err, fetchedContacts) => {
      if (err) {
        console.error(err);
        return;
      }
      setContacts(fetchedContacts);
    });
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const handleClosePopup = () => {
    setSelectedContact(null);
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={{ padding: 10 }}>
        <Text>{item.displayName}</Text>
        <Text>{item.phoneNumbers[0]?.number}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredContacts = contacts.filter((contact) =>
    contact.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchTerm}
      />

      <FlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.recordID}
      />

      <Modal visible={selectedContact !== null} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Name: {selectedContact?.displayName}</Text>
          <Text>Number: {selectedContact?.phoneNumbers[0]?.number}</Text>
          <Button title="Close" onPress={handleClosePopup} />
        </View>
      </Modal>
    </View>
  );
};

export default ContactApp;
