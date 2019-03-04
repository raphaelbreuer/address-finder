import * as React from 'react';
import './App.css';
import { setAddressFields } from './helpers/autoFill';
import axios from 'axios';
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
      addressSearch: '',
      propertyResults: {
        ppc: '',
      },
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
    }
    const result = await axios.get('https://cw3a8g5er2.execute-api.us-east-1.amazonaws.com/dev/getppccode/?city=' + this.state.form.city);
    console.log(result.data);
  }

  render() {
    const inputProps={value: this.state.addressSearch, onChange: this.autoCompleteLocation, placeholder:'Start Typing Address Here...'}
    return (
      <div className="container text-center">

        <div className="card">
          <PlacesAutocomplete inputProps={inputProps}/>
          <div className="card-body form-group">
            <label>Street Address</label>
            <input className="form-control" value={this.state.form.physical_address_1} name="physical_address_1" type="text" onChange={this.changeHandler} placeholder="Physical Address 1" required />
            <label>City</label>
            <input className="form-control" value={this.state.form.city} name="city" placeholder="City" type="text" onChange={this.changeHandler} />
            <label>State</label>
            <input className="form-control" value={this.state.form.state} name="state" type="text" placeholder="state" onChange={this.changeHandler} required />
            <label>Zip</label>
            <input className="form-control" value={this.state.form.zip} name="zip" type="text" placeholder="zip" onChange={this.changeHandler} required />
            <label>County</label>
            <input className="form-control" value={this.state.form.county} name="county" type="text" placeholder="county" onChange={this.changeHandler} required />
          </div>

          <div className="card-footer">

          </div>

        </div>
      </div>

    );
  }
}


export default App;
