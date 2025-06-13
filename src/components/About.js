import me from '../assets/me.jpg'
import skills from '../assets/skills.jpg'
import goal from '../assets/goal.png'

export default function About() {
    return (
        <>
            <div className="about">

                <div className=" container about-section my-5">
                    <div className="aboutText">
                        <h2>About Me</h2>
                        <p>
                            Hi! I'm <strong className="highlight">Harsh</strong>, a <strong className="highlight">19-year-old</strong> student currently pursuing my <strong className="highlight">Bachelor of Computer Applications (BCA)</strong> in my first year.
                            I'm passionate about <strong className="highlight">technology</strong>, solving real-world problems, and building things that live on the internet.
                        </p>
                        <h3>What I'm Currently Focusing On:</h3>
                        <ul>
                            <li>Mastering <strong className="highlight">web development</strong> (HTML, CSS, JavaScript, React)</li>
                            <li>Improving my understanding of <strong className="highlight">data structures and algorithms</strong></li>
                            <li>Exploring <strong className="highlight">backend development</strong> with Node.js and MongoDB</li>
                        </ul>
                        <h3>What I Enjoy Most:</h3>
                        <ul>
                            <li>Creating <strong className="highlight">responsive</strong> and <strong className="highlight">user-friendly</strong> interfaces</li>
                            <li>Turning <strong className="highlight">ideas into real projects</strong></li>
                            <li><strong className="highlight">Debugging</strong> and solving technical challenges</li>
                        </ul>
                    </div>
                    <div className="aboutImg"><img src={me} alt="" /></div>
                </div>

                <div className="container about-section my-5">
                    <div className="aboutImg"><img src={skills} alt="skills" /></div>
                    <div className="aboutText">
                        <h2>My Skills</h2>
                        <p>
                            I'm particularly interested in full-stack development, open-source contributions, and creating digital tools that improve daily life.
                            I enjoy working with frontend frameworks like React, and I'm actively learning backend development with Node.js and MongoDB.
                        </p>
                        <h3>Technologies I'm Comfortable With:</h3>
                        <p>
                            I regularly work with:
                        </p>
                        <ul>
                            <li>Frontend: <strong className="highlight">HTML, CSS, JavaScript, React</strong></li>
                            <li>Backend: <strong className="highlight">Node.js, Python</strong></li>
                            <li>Version Control: <strong className="highlight">Git & GitHub</strong></li>
                            <li>Design: <strong className="highlight">Bootstrap, responsive UI principles</strong></li>
                            <li>Other: <strong className="highlight">C programing, Mysql, MongoDB</strong></li>

                        </ul>
                        <p>
                            I'm always curious and love learning new things to sharpen my skills and build something impactful.
                        </p>
                    </div>
                </div>

                <div className="container about-section my-5">
                    <div className="aboutText">
                        <h2>My Goal</h2>
                        <p>
                            My goal is to become a skilled software developer who not only writes great code but also builds meaningful solutions that make a difference.
                            I'm focused on sharpening my development skills and excited to collaborate on innovative projects that create real impact.
                        </p>
                        <ul>
                            <li><strong className="highlight">Become a skilled full-stack developer.</strong></li>
                            <li><strong className="highlight">Build real-world applications that create impact.</strong></li>
                            <li><strong className="highlight">Focus on both frontend and backend technologies.</strong></li>
                            <li><strong className="highlight">Create user-friendly and meaningful solutions.</strong></li>
                        </ul>
                    </div>
                    <div className="aboutImg"><img src={goal} alt="goals" /></div>
                </div>
            </div>
        </>
    );
}
