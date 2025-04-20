import { scrollToNext, titleCase } from "../helper"

export default function TechnicalSkills({previous}){
    const technicalSkills = ["languages", "frameworks", "developerTools", "libraries"]
    return(
        <>
            <h1>Technical skills</h1>
            {technicalSkills.map(skill=>(
                <>
                <label htmlFor={skill}>{titleCase(skill)}{(skill === "languages" || skill === "libraries") && <span id="mandatory">*</span>}</label>
                <input type="text" id={skill} name={skill} required={skill === "languages" || skill === "libraries"}></input>
                </>
            ))}
            <button type="button" onClick={()=>scrollToNext(previous)}>Previous</button>
        </>
    )
}