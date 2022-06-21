import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import './App.css';

function App() {
  let component = {
    type: "capacitor",
    nominal_capacitance: 0.00, // float
    nominal_capacitance_msg: '',
    working_voltage: 0, // number
    working_voltage_msg: '',
    tolerance: 0.00, // float - between zero and one
    tolerance_msg: '',
    working_temperature: 0, // number
    working_temperature_msg: '',
    temperature_coefficient: 0.00, // float - between zero and one
    temperature_coefficient_msg: ''
  }
  const [components, setComponents] = useState([component]);

  const updateValue = (event, index) => {
    let {id, value} = event.target;
    let msgKey = `${id}_msg`;
    let msg = '';
    if (id !== 'type') {
      if (isNaN(Number(value))) {
        msg = 'Value must be a number';
      } else if (Number(value) < 0) {
        msg = 'Value cannot be less than 0'
      } else if (['nominal_capacitance', 'tolerance', 'temperature_coefficient'].includes(id) && Number(value) > 1) {
        msg = 'Value cannot be more than 1'
      }
    }
    let tempArr = [];
    components.forEach((item, i) => {
      if (i === index) {
        tempArr.push({...item, [id]: value, [msgKey]: msg})
      } else {
        tempArr.push({...item})
      }
    });
    setComponents(tempArr);
  }

  const deleteItem = (index) => {
    let tempArr = [];
    components.forEach((item, i) => {
      if (i !== index) {
        tempArr.push({...item})
      }
    });
    setComponents(tempArr);
  }

  const duplicateItem = (index) => {
    let tempArr = [];
    components.forEach((item, i) => {
      tempArr.push({...item})
      if (i === index) {
        tempArr.push({...item})
      }
    });
    setComponents(tempArr);
  }

  const handleSubmit = () => {
    let errorExists = false;
    components.forEach((item, i) => {
      let messagesLength = (item.nominal_capacitance_msg + item.working_temperature_msg + item.tolerance_msg + item.working_voltage_msg + item.temperature_coefficient_msg).length;
      if (messagesLength > 0) {
        errorExists = true;
      }
    });
    if (errorExists) {
      alert("Please fix the errors before submitting.")
    } else {
      alert("You have successfully submit.")
    }
  }

  let inputStyle = {
    background: 'none',
    border: 'none',
    width: '100%',
  }

  return (
    <>
      <Table striped bordered={true} hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Nominal Capacitance</th>
            <th>Working Voltage</th>
            <th>Tolerance</th>
            <th>Working Temperature</th>
            <th>Temperature Coefficient</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        { components &&
          components.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <select
                  id='type'
                  value={item.type}
                  onChange={(event) => updateValue(event, i)}
                  style={inputStyle}
                >
                  <option value='capacitor'>Capacitor</option>
                  <option value='resistor'>Resistor</option>
                  <option value='transistor'>Transistor</option>
                </select>
              </td>
              <td>
                <OverlayTrigger
                  show={item.nominal_capacitance_msg !== ''}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-nominal_capacitance_msg`} className="tooltipClass">
                      {item.nominal_capacitance_msg}
                    </Tooltip>
                  }
                >
                  <input
                    id="nominal_capacitance"
                    type="text"
                    value={item.nominal_capacitance}
                    onChange={(event) => updateValue(event, i)}
                    style={inputStyle}
                  />
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  show={item.working_voltage_msg !== ''}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-working_voltage_msg`} className="tooltipClass">
                      {item.working_voltage_msg}
                    </Tooltip>
                  }
                >
                  <input
                    id="working_voltage"
                    type="text"
                    value={item.working_voltage}
                    onChange={(event) => updateValue(event, i)}
                    style={inputStyle}
                  />
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  show={item.tolerance_msg !== ''}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-tolerance_msg`} className="tooltipClass">
                      {item.tolerance_msg}
                    </Tooltip>
                  }
                >
                  <input
                    id="tolerance"
                    type="text"
                    value={item.tolerance}
                    onChange={(event) => updateValue(event, i)}
                    style={inputStyle}
                  />
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  show={item.working_temperature_msg !== ''}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-working_temperature_msg`} className="tooltipClass">
                      {item.working_temperature_msg}
                    </Tooltip>
                  }
                >
                  <input
                    id="working_temperature"
                    type="text"
                    value={item.working_temperature}
                    onChange={(event) => updateValue(event, i)}
                    style={inputStyle}
                  />
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  show={item.temperature_coefficient_msg !== ''}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-temperature_coefficient_msg`} className="tooltipClass">
                      {item.temperature_coefficient_msg}
                    </Tooltip>
                  }
                >
                  <input
                    id="temperature_coefficient"
                    type="text"
                    value={item.temperature_coefficient}
                    onChange={(event) => updateValue(event, i)}
                    style={inputStyle}
                  />
                </OverlayTrigger>
              </td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
                  <Dropdown.Item href="#" onClick={() => duplicateItem(i)}>Duplicate</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => deleteItem(i)}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={() => setComponents([...components, component])}>
          Add another item
        </Button>
      </div>
      <div className="mb-2" style={{display: 'flex', justifyContent: 'end', marginTop: '16px'}}>
        <Button variant="success" size="lg" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default App;
