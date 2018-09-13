import * as React from 'react';
import './App.css';
import { setAddressFields } from './helpers/autoFill';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class App extends React.Component<any, any> {
  constructor() {
    super({});
    this.state = {
      form: {
        physical_address_1: '',
        city: '',
        state: '',
        zip: '',
        county: ''
      },
      addressSearch: ''
    }
  }

  changeHandler = (e: any) => {
    const state = Object.assign({}, this.state);
    state.form[e.target.name] = e.target.value;
    this.setState(state);
  }

  autoCompleteLocation = async (address: any) => {
    this.setState({ addressSearch: address });
    const results = await geocodeByAddress(address);
    if (results[0].address_components) {
      await setAddressFields(results[0].address_components, this.state.form)
      this.setState(this.state.form);
      console.log(this.state.form);
    }
  }

  render() {
    const inputProps = {value: this.state.addressSearch,onChange: this.autoCompleteLocation,placeholder: 'Auto complete Address...'}
    return (
      <div>
        <PlacesAutocomplete inputProps={inputProps} />
        <input value={this.state.form.physical_address_1} name="physical_address_1" type="text" onChange={this.changeHandler} placeholder="Physical Address 1" required />
        <input value={this.state.form.city} name="city" placeholder="City" type="text" onChange={this.changeHandler} />
        <input value={this.state.form.state} name="state" type="text" placeholder="state" onChange={this.changeHandler} required />
        <input value={this.state.form.zip} name="zip" type="text" placeholder="zip" onChange={this.changeHandler} required />
        <input value={this.state.form.county} name="county" type="text" placeholder="county" onChange={this.changeHandler} required />
      </div>
    );
  }
}


export default App;
