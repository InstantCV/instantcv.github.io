import { useState, useEffect } from "react";
import { isNextDisabled, scrollToNext } from "../helper";

export default function Experience({ expNo, previous, next }) {
    const [inputs, setInputs] = useState([]);
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        const newInputs = Array.from({ length: expNo }, () => ({
            role: "",
            company: "",
            duration: "",
            points: ""
        }));
        setInputs(newInputs);

        const newCurrent = Array.from({ length: expNo }, () => false);
        setCurrent(newCurrent);
    }, [expNo]);

    const handleToggle = (index) => {
        const newCurrent = Array.from({ length: expNo }, () => false);
        newCurrent[index] = true;
        setCurrent(newCurrent);
    };

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [field]: value };
        setInputs(newInputs);
    };


    return (
        <>
            <h1>Experience</h1>
            {inputs.length > 0 && inputs.map((input, index) => (
                <details className="flex flex-col items-center text-center" open={current[index]} key={index} onClick={() => handleToggle(index)}>
                    <summary>Experience-{index + 1}</summary>
                    <label htmlFor={`role-${index}`}>Role:<span id="mandatory">*</span></label>
                    <input
                        id={`role-${index}`}
                        name={`expRole-${index}`}
                        type="text"
                        required
                        value={input.role}
                        onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                    />
                    <br />
                    <label htmlFor={`company-${index}`}>Company:<span id="mandatory">*</span></label>
                    <input
                        id={`company-${index}`}
                        name={`expCompany-${index}`}
                        type="text"
                        required
                        value={input.company}
                        onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                    />
                    <br />
                    <label htmlFor={`duration-${index}`}>Duration:<span id="mandatory">*</span></label>
                    <input
                        id={`duration-${index}`}
                        name={`expDuration-${index}`}
                        type="text"
                        required
                        value={input.duration}
                        onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                    />
                    <br />
                    <label htmlFor={`points-${index}`}>
                        Points you want to mention<span id="mandatory">*</span>
                    </label>
                    <br />
                    <textarea
                        id={`points-${index}`}
                        rows={5}
                        cols={100}
                        placeHolder="End each point with a '|' except for last point  for example: point1|point2|point3"
                        name={`expPoints-${index}`}
                        required
                        value={input.points}
                        onChange={(e) => handleInputChange(index, 'points', e.target.value)}
                    ></textarea>
                    <br />
                </details>
            ))}
            <button type="button" onClick={() => scrollToNext(previous)}>Previous</button>
            <button disabled={isNextDisabled(inputs)} type="button" onClick={() => scrollToNext(next)}>Next</button>
        </>
    );
}
