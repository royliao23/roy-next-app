import React from "react";
import useForm from "./hooks/useForm";
import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Form from "@/components/Form/Form";
import InputText from "@/components/InputText/InputText";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";
import transformAddress, { RawAddressModel } from "./core/models/address";
import styles from "./App.module.css";
import { Address as AddressType } from "./types";

interface FormValues {
  postCode: string;
  houseNumber: string;
  firstName: string;
  lastName: string;
  selectedAddress: string;
}

const initialFormValues: FormValues = {
  postCode: '',
  houseNumber: '',
  firstName: '',
  lastName: '',
  selectedAddress: ''
};

function App() {
  const { values, handleChange, resetForm } = useForm<FormValues>(initialFormValues);
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setAddresses([]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${values.postCode}&streetnumber=${values.houseNumber}`
      );
      
      if (!response.ok) throw new Error('Address lookup failed');
      
      const data = await response.json();
      
      // FIX: Use data.details instead of data.addresses
      const transformed = data.details.map((addr: any) => 
        transformAddress({
          ...addr,
          houseNumber: values.houseNumber,
          lat: addr.lat.toString(), // Ensure string type if needed
          lon: addr.long.toString() // Note: API uses "long" but transform might expect "lon"
        })
      );
      
      setAddresses(transformed);
    } catch (err) {
      setError('Failed to fetch addresses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.firstName.trim() || !values.lastName.trim()) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!values.selectedAddress || !addresses.length) {
      setError("No address selected");
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === values.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ 
      ...foundAddress, 
      firstName: values.firstName.trim(), 
      lastName: values.lastName.trim() 
    });
    resetForm();
  };

  const handleClearAll = () => {
    resetForm();
    setAddresses([]);
    setError(undefined);
  };

  return (
    <main className={styles.main}>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        
        <Form 
          label="🏠 Find an address" 
          submitText={isLoading ? 'Searching...' : 'Find'}
          loading={isLoading}
          onFormSubmit={handleAddressSubmit}
          formEntries={[
            {
              name: "postCode",
              placeholder: "Post Code",
              extraProps: {
                value: values.postCode,
                onChange: handleChange
              }
            },
            {
              name: "houseNumber",
              placeholder: "House number",
              extraProps: {
                value: values.houseNumber,
                onChange: handleChange
              }
            }
          ]}
        />

        {addresses.length > 0 && (
          <fieldset className={styles.addressSelection}>
            <legend>Select an address:</legend>
            {addresses.map((address) => (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                value={address.id}
                checked={values.selectedAddress === address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            ))}
          </fieldset>
        )}

        {values.selectedAddress && (
          <Form 
            label="✏️ Add personal info to address" 
            submitText="Add to addressbook"
            onFormSubmit={handlePersonSubmit}
            formEntries={[
              {
                name: "firstName",
                placeholder: "First name",
                extraProps: {
                  value: values.firstName,
                  onChange: handleChange
                }
              },
              {
                name: "lastName",
                placeholder: "Last name",
                extraProps: {
                  value: values.lastName,
                  onChange: handleChange
                }
              }
            ]}
          />
        )}

        {error && <ErrorMessage message={error} />}

        <Button variant="clear" onClick={handleClearAll}>
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;