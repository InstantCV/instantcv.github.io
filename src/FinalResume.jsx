import { convertToArrayOfObjects } from "./helper";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function FinalResume() {
    document.title = "Final Resume"
    const resumeContent = JSON.parse(sessionStorage.getItem("resumeContent"));
    const education = convertToArrayOfObjects(resumeContent, "edu");
    const experience = convertToArrayOfObjects(resumeContent, "exp");
    const projects = convertToArrayOfObjects(resumeContent, "pro");

    const contentRef = useRef();

    const handleDownloadPdf = () => {
        const element = contentRef.current;
        element.style.border = "none";
    
        const options = {
            margin: [0, 0],
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };
    
        html2pdf()
            .from(element)
            .set(options)
            .save()
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100">
            <div
                ref={contentRef}
                className="border-2 border-solid border-black w-[794px] h-auto flex flex-col p-6 bg-white"
                style={{ boxSizing: "border-box" }}
            >
                <h1 className="text-center mb-0">{resumeContent.name}</h1>
                <div className="text-center text-sm mt-2">
                    {`${resumeContent.phNo} | ${resumeContent.email} ${
                        resumeContent.linkedIn ? ` | ${resumeContent.linkedIn}` : ""
                    } ${resumeContent.gitHub ? ` | ${resumeContent.gitHub}` : ""}`}
                </div>
                <h4>Education</h4>
                <table className="p-4 pt-0 w-full">
                    {education.map((edu, index) => (
                        <tbody key={index}>
                            <tr>
                                <td className="text-left w-1/2"><strong>{edu.eduCollegeName}</strong></td>
                                <td className="text-right w-1/2">{edu.eduLocation}</td>
                            </tr>
                            <tr>
                                <td className="text-left w-1/2"><i>{edu.eduDegree}</i></td>
                                <td className="text-right w-1/2"><i>{edu.eduDuration}</i></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                {experience.length > 0 && (
                <>
                <h4>Experience</h4>
                <table className="p-4 pt-0 w-full">
                    {experience.map((exp, index) => (
                        <tbody key={index}>
                            <tr>
                                <td className="text-left min-w-1/2">
                                    <strong>{exp.expRole}</strong>
                                </td>
                                <td className="text-right w-1/2">{exp.expDuration}</td>
                            </tr>
                            <tr>
                                <td className="text-left w-1/2"><strong>{exp.expCompany}</strong></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {exp.expPoints.split("|").map((point, index) => (
                                        <li className="ml-3 w-full" key={index}>{point}</li>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                </>
                )}
                {projects.length > 0 && (
                <>
                <h4>Projects</h4>
                <table className="p-4 pt-0 w-full">
                    {projects.map((pro, index) => (
                        <tbody key={index}>
                            <tr>
                                <td className="text-left min-w-1/2">
                                    <strong>{pro.projectName}</strong>
                                    <span> | </span>
                                    <i>{pro.proToolsUsed}</i>
                                </td>
                                {pro.proDuration && <td className="text-right">{pro.proDuration}</td>}
                            </tr>
                            <tr className="">
                                <td colSpan={2}>
                            {pro.proPoints.split("|").map((point, index) => (
                                <li className="ml-3 w-full" key={index}>{point}</li>
                            ))}
                            </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                </>
                )}
                <h4>Technical Skills</h4>
                <p className="m-0 ml-4">
                    <strong>Languages:</strong> {`${resumeContent.languages}`}
                </p>
                {resumeContent.frameworks && <p className="m-0 ml-4">
                    <strong>Frameworks:</strong> {`${resumeContent.frameworks}`}
                </p>}
                <p className="m-0 ml-4">
                    <strong>Libraries:</strong> {`${resumeContent.libraries}`}
                </p>
                {resumeContent.developerTools && <p className="m-0 ml-4">
                    <strong>Developer Tools:</strong> {`${resumeContent.developerTools}`}
                </p>}
            </div>
            <button
                onClick={handleDownloadPdf}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Download PDF
            </button>
        </div>
    );
}
