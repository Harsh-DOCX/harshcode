import { useEffect, useRef } from 'react';
import allProject from '../ProjectList.json';

export default function Project() {
    const projects = allProject;
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => {
            cardsRef.current.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    return (
        <div className="projects">
            <div className="project-list">
                {projects.map((item, index) => (
                    <div
                        key={index}
                        className='projectCard blurOnScroll'
                        ref={el => cardsRef.current[index] = el}
                    >
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                        <button onClick={() => window.open(item.link, "_blank")}>Visit</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
