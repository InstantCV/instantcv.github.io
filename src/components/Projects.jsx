import { useState, useEffect } from "react"
import { isNextDisabled, scrollToNext } from "../helper";

export default function Projects({remExpNo, previous, next}){
    const [inputs, setInputs] = useState([]);
        const [current, setCurrent] = useState([]);
    
        useEffect(() => {
            const newInputs = Array.from({ length: remExpNo }, () => ({
                projectName: "",
                toolsUsed: "",
                duration: "",
                points: ""
            }));
            setInputs(newInputs);

            const newCurrent = Array.from({ length: remExpNo }, () => false);
            setCurrent(newCurrent);
        }, [remExpNo]);
    
        const handleToggle = (index) => {
            const newCurrent = Array.from({ length: remExpNo }, () => false);
            newCurrent[index] = true;
            setCurrent(newCurrent);
        };
    
        const handleInputChange = (index, field, value) => {
            const newInputs = [...inputs];
            newInputs[index] = { ...newInputs[index], [field]: value };
            setInputs(newInputs);
        };

        const inputsWithoutDuration = inputs.map((input) => {
            const { projectName, toolsUsed, points } = input;
            return { projectName, toolsUsed, points };
        })
    
        return (
            <>
                <h1>Projects</h1>
                {inputs.length > 0 && inputs.map((input, index) => (
                    <details className="flex flex-col items-center text-center" open={current[index]} key={index} onClick={() => handleToggle(index)}>
                        <summary>Project-{index + 1}</summary>
                        <label htmlFor={`projectName-${index}`}>Project Name:<span id="mandatory">*</span></label>
                        <input
                            id={`projectName-${index}`}
                            name={`projectName-${index}`}
                            type="text"
                            required
                            value={input.projectName}
                            onChange={(e) => handleInputChange(index, 'projectName', e.target.value)}
                        />
                        <br />
                        <label htmlFor={`toolsUsed-${index}`}>Tools used:<span id="mandatory">*</span></label>
                        <input
                            id={`toolsUsed-${index}`}
                            name={`proToolsUsed-${index}`}
                            type="text"
                            required
                            value={input.toolsUsed}
                            onChange={(e) => handleInputChange(index, 'toolsUsed', e.target.value)}
                        />
                        <br />
                        <label htmlFor={`duration-${index}`}>Duration:</label>
                        <input
                            id={`duration-${index}`}
                            name={`proDuration-${index}`}
                            type="text"
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
                            placeholder="End each point with a '|' except for last point  for example: point1|point2|point3"
                            name={`proPoints-${index}`}
                            required
                            value={input.points}
                            onChange={(e) => handleInputChange(index, 'points', e.target.value)}
                        ></textarea>
                        <br />
                    </details>
                ))}
                <button type="button" onClick={() => scrollToNext(previous)}>Previous</button>
                <button disabled={isNextDisabled(inputsWithoutDuration)} type="button" onClick={() => scrollToNext(next)}>Next</button>
            </>
        );
}