import { useState, useEffect } from "react";
import { scrollToNext, isNextDisabled } from "../helper";

const Education = ({ schNo, previous, next }) => {
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        const newInputs = Array.from({ length: schNo }, () => ({
            collegeName: '',
            location: '',
            degree: '',
            duration: '',
        }));
        setInputs(newInputs);
    }, [schNo]);

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [field]: value };
        setInputs(newInputs);
    };

    return (
        <>
            {inputs.length > 0 && (
                inputs.map((input, index) => (
                    <div key={index}>
                        <label htmlFor={`collegeName-${index}`}>College/School Name:<span id="mandatory">*</span></label>
                        <input
                            id={`collegeName-${index}`}
                            name={`eduCollegeName-${index}`}
                            type="text"
                            required
                            value={input.collegeName}
                            onChange={(e) => handleInputChange(index, 'collegeName', e.target.value)}
                        />
                        <br />
                        <label htmlFor={`location-${index}`}>Location:<span id="mandatory">*</span></label>
                        <input
                            id={`location-${index}`}
                            name={`eduLocation-${index}`}
                            type="text"
                            required
                            value={input.location}
                            onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                        />
                        <br />
                        <label htmlFor={`degree-${index}`}>Degree:<span id="mandatory">*</span></label>
                        <input
                            id={`degree-${index}`}
                            name={`eduDegree-${index}`}
                            type="text"
                            required
                            value={input.degree}
                            onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                        />
                        <br />
                        <label htmlFor={`duration-${index}`}>Duration:<span id="mandatory">*</span></label>
                        <input
                            id={`duration-${index}`}
                            name={`eduDuration-${index}`}
                            type="text"
                            placeHolder="Aug2019-Apr2023"
                            required
                            value={input.duration}
                            onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                        />
                        <br />
                    </div>
                ))
            )}
            <button type="button" onClick={() => scrollToNext(previous)}>Previous</button>
            <button type="button" onClick={() => scrollToNext(next)} disabled={isNextDisabled(inputs)}>Next</button>
        </>
    );
};

export default Education;
