import React, { useState } from 'react';
import { Button, ButtonRadio, ButtonToggle } from './components/common/Button';
import { Field, FieldLarge, FieldNumber } from './components/common/Field';
import { PickerDrop, PickerDate } from './components/common/Picker';

function App() {
    // Text field
    const [field, setField] = useState('');
    const handleFieldChange = (e) => {
        setField(e.target.value); // update name state, NOT selectedOption
    };

    // Large text field
    const [fieldL, setFieldL] = useState('');
    const handleFieldLargeChange = (e) => {
        setFieldL(e.target.value); // update description state, NOT selectedOption
    };

    //Number Field
    const [num, setAge] = useState(0);
    const handleNumChange = (e) => {
        setAge(e.target.value);
    };

    //date field
    const [date, setDate] = useState('null');

    //Dropdown
    const [drop, setDrop] = useState('');
    const handleDropChange = (e) => setDrop(e.target.value);

    // Radio button
    const [selectedOption, setSelectedOption] = useState('option1');
    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Toggle button
    const [isToggled, setIsToggled] = useState(false);
    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };

    // Regular button
    const handleSubmit = () => {
        alert(
            `Text: ${field}\nBig text:\n${fieldL}\nYour Number: ${num}\nDate: ${date}\nYour choice: ${drop}\nYou selected: ${selectedOption}\nToggle is: ${isToggled ? 'ON' : 'OFF'}`
        );
    };

    return (
        <div style={{padding: '40px', fontFamily: 'Arial, sans-serif'}}>
            <h1>Components</h1>

            <h2>Assorted Fields</h2>
            <Field
                label="Regular Field"
                value={field}
                onChange={handleFieldChange}
                placeholder="Enter some words."
            />
            <FieldLarge
                label="Large Field"
                value={fieldL}
                onChange={handleFieldLargeChange}
                placeholder="Enter many words."
                rows={8}
            />
            <FieldNumber
                label="Number Field"
                value={num}
                onChange={handleNumChange}
                min={0}
                max={99}
                step={1}
                placeholder="Enter number"
            />
            <h2>Pickers</h2>
            <PickerDate
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <PickerDrop
                label="Choose an option"
                value={drop}
                onChange={handleDropChange}
                placeholder="Choose an option"
                options={[
                    { value: 'Robots', label: 'Robots' },
                    { value: 'Insects', label: 'Insects' },
                    { value: 'Squids', label: 'Squids' },
                ]}
            />


            <h2>Radio Buttons</h2>
            <ButtonRadio
                label="Option 1"
                name="choices"
                value="option1"
                checked={selectedOption === 'option1'}
                onChange={handleRadioChange}
            />
            <ButtonRadio
                label="Option 2"
                name="choices"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleRadioChange}
            />

            <h2 style={{marginTop: '30px'}}>Toggle Button</h2>
            <ButtonToggle isOn={isToggled} onToggle={handleToggle}/>

            <h2 style={{marginTop: '30px'}}>Submit Button</h2>
            <Button label="Submit" onClick={handleSubmit}/>
        </div>
    );
}

export default App;
