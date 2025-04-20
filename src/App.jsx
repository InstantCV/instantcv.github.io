import { useRef, useState, useEffect } from "react";
import Education from "./components/Education";
import TechnicalSkills from "./components/TechnicalSkills"
import { handleSubmit, scrollToNext } from "./helper";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import { useNavigate } from "react-router";

function App() {

if(window.innerWidth <768){
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1>Mobile version is not supported for now</h1>
      <h2>Please open in desktop</h2>
    </div>
  )
}

  const navigate = useNavigate()
  const handleNavigation = (e) => {
    handleSubmit(e)
    navigate("/final-resume")
  }

  const centerStyle = "h-screen flex items-center justify-center flex-col";
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);
  const sectionRef5 = useRef(null);
  const sectionRef6 = useRef(null);
  const form = useRef(null)

  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [phNo,setPhNo] = useState('')
  const [schNo,setSchNO] = useState(1)
  const [expNo,setExpNO] = useState(0)
  const [remExpNo,setRemExpNo] = useState(0)
  const [fieldsFilled, setFieldsFilled] = useState(false)

    useEffect(() => {
      const handleFormChange = () => {
      if (form.current) {
        const formObject = Object.fromEntries(new FormData(form.current).entries());
        const proDuration = Object.keys(formObject).filter(key=>key.startsWith("proDuration"))
        const keysToDelete = ["frameworks", "developerTools", "gitHub", "linkedIn", proDuration].flat()
        for (let key of keysToDelete){
          delete formObject[key]
        }
        setFieldsFilled(Object.values(formObject).every(value => value !== ""));
      }
      };

      if (form.current) {
      form.current.addEventListener("input", handleFormChange);
      }

      return () => {
      if (form.current) {
        form.current.removeEventListener("input", handleFormChange);
      }
      };
    }, []);
    
  return (
    <>
      <div ref={sectionRef1} className={centerStyle}>
        <h1>Create resume in 5 min</h1>
        <h3>No signup needed</h3>
        <button onClick={() => scrollToNext(sectionRef2)}>Get started</button>
        <p>Fields with "<span id="mandatory">*</span>" are mandatory to fill</p>
      </div>

      <form ref={form} onSubmit={handleNavigation}>
        <div ref={sectionRef2} className={centerStyle}>
          <div>
            <label className="pr-5" htmlFor="name">Name:<span id="mandatory">*</span></label>
            <input id="name" name="name" type="text" required onChange={e=>setName(e.target.value)}/>
            <br></br>
            <h2>Contact Info</h2>
            <label htmlFor="phNo">Phone no:<span id="mandatory">*</span></label>
            <input id="phNo" name="phNo" type="text" pattern="^\+?[0-9]\d{1,14}$" required onChange={e=>setPhNo(e.target.value)}></input>
            <br></br>
            <label htmlFor="email">Email:<span id="mandatory">*</span></label>
            <input id="email" name="email" type="email" required onChange={e=>setEmail(e.target.value)}></input>
            <br></br>
            <label htmlFor="linkedIn">LinkedIn:</label> 
            <input id="linkedIn" type="text"></input>
            <br></br>
            <label htmlFor="gitHub">GitHub:</label> 
            <input id="gitHub" type="text"></input>
          </div>
          <button type="button" onClick={() => scrollToNext(sectionRef1)}>Back</button>
          <button disabled={!(name && phNo && email)} type="button" onClick={() => scrollToNext(sectionRef3)}>Next</button>
        </div>

        <div ref={sectionRef3} className={centerStyle}>
          <label htmlFor="schNo">How many college/school you want to mention (Max:2)</label>
          <input value={schNo} id="schNo" type="number" onChange={e=>setSchNO(Number(e.target.value))} min={1} max={2}></input>
          {schNo > 0 && <Education schNo={schNo} previous={sectionRef2} next={sectionRef4}/>}
        </div>

        <div ref={sectionRef4} className={centerStyle}>
        <h3>You can add upto 5 Experience and projects combined</h3>
        <label htmlFor="expNo">No. of Experience you want to mention:</label>
        <input id="expNo" type="number" onChange={e=>setExpNO(Number(e.target.value))} min={0} max={5}></input>
        {expNo > 0 ? <Experience expNo={expNo} previous={sectionRef3} next={expNo === 5 ? sectionRef6 : sectionRef5}/> : <button type="button" onClick={()=>scrollToNext(sectionRef5)}>Skip</button>}
        </div>

        <div ref={sectionRef5} className={centerStyle}>
        <h3>You can add upto {5-expNo} projects</h3>
        <label htmlFor="remExpNo">No. of Experience you want to mention:</label>
        <input id="remExpNo" type="number" onChange={e=>setRemExpNo(Number(e.target.value))} min={0} max={5-expNo}></input>
        {remExpNo > 0 ? <Projects remExpNo={remExpNo} previous={expNo === 0 ? sectionRef3 : sectionRef4} next={sectionRef6}/> : <><button type="button" onClick={()=>scrollToNext(sectionRef4)}>Previous</button> <button type="button" onClick={()=>scrollToNext(sectionRef6)}>Skip</button></>}
        </div>

        <div ref={sectionRef6} className={centerStyle}>
          <TechnicalSkills previous={expNo === 5 ? sectionRef4 : sectionRef5}/>
          <input id="submit" disabled={!fieldsFilled} type="submit" />
        </div>
      </form>
    </>
  );
}

export default App;
