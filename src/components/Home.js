import { useEffect, useRef } from "react";

export default function Home() {
    const dynamicRef = useRef(null);

    const skills = [" HTML", "CSS", "JAVASCRIPT", "REACT.js", "NODE.js", "MONGODB", "C Programming", "DSA", "PYTHON", "MYSQL"];

    useEffect(() => {
    const skills = [" HTML", "CSS", "JAVASCRIPT", "REACT.js", "C Programming", "DSA", "PYTHON", "MYSQL"];

        let skillIndex = 0;
        let charIndex = 0;
        let timeout;

        const typeSkill = () => {
            if (!dynamicRef.current) return;

            if (charIndex < skills[skillIndex].length) {
                dynamicRef.current.textContent += skills[skillIndex].charAt(charIndex);
                charIndex++;
                timeout = setTimeout(typeSkill, 100);
            } else {
                timeout = setTimeout(eraseSkill, 1000);
            }
        };

        const eraseSkill = () => {
            if (!dynamicRef.current) return;

            if (charIndex > 0) {
                dynamicRef.current.textContent = skills[skillIndex].substring(0, charIndex - 1);
                charIndex--;
                timeout = setTimeout(eraseSkill, 100);
            } else {
                skillIndex = (skillIndex + 1) % skills.length;
                timeout = setTimeout(typeSkill, 200);
            }
        };

        typeSkill();

        return () => clearTimeout(timeout); // cleanup
    }, []);

    return (
        <div>
            <div className="hero" id="hero">
                <div className="info">
                    <h1>
                        Hello, I am <span className="highlight">Harsh</span>
                    </h1>
                    <p className="secondary">A passionate developer and learner.</p>
                    <p className="skills">
                        My skills are: <span className="dynamic highlight" ref={dynamicRef}></span>
                        <span className="cursor">|</span>
                    </p>
                    
                    <div className="skillSection">
                        <ul>
                            {skills.map((skill, index) =>{
                                return(
                                <li key = {index} className="skillList">
                                    {skill}
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="img">
                    <img src="/stats.png" alt="about-me" />
                </div>
            </div>
            
        </div>
    );
}
