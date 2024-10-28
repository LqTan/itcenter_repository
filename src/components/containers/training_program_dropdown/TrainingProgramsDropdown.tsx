import React, { useState, useRef } from 'react';
import { useCurriculumContext } from "../../contents/CurriculumContext.tsx";
import '../../../styles/TrainingProgramsDropdown.css'; // Tùy chỉnh CSS nếu cần

const TrainingProgramsDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { curriculums, loading } = useCurriculumContext();
    const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Tạo ref cho dropdown

    const handleMouseLeaveDropdown = (event: React.MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
            setHoveredProgram(null); // Đặt hoveredProgram về null khi chuột ra ngoài
            onClose(); // Gọi onClose
        }
    };

    const handleMouseEnterTitle = () => {
        setHoveredProgram(null); // Đặt hoveredProgram về null khi hover vào tiêu đề
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className={`dropdown-menu ${isOpen ? 'show' : ''}`}
            onMouseLeave={handleMouseLeaveDropdown}
            style={{minWidth: '600px'}}
            ref={dropdownRef}
        >
            <div className="d-flex p-3">
                <div className="me-4 flex-fill">
                    <h6 onMouseEnter={handleMouseEnterTitle}>Chương trình đào tạo</h6>
                    <hr className="bg-dark"/>
                    <ul className="list-unstyled">
                        {curriculums.map((curriculum, index) => (
                            <li
                                key={index}
                                className="d-flex align-items-center mb-2"
                                onMouseEnter={() => setHoveredProgram(curriculum.id_curriculum)}
                            >
                                <i className="bi bi-book" style={{fontSize: '1rem', marginRight: '10px'}}></i>
                                <a className="text-black text-decoration-none" href="">
                                    <span className="me-auto pe-2">{curriculum.title}</span>
                                </a>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-fill">
                    {hoveredProgram ? (
                        <>
                            <h6>Khóa học của {curriculums.find((c) => c.id_curriculum === hoveredProgram)?.title}</h6>
                            <hr className="bg-dark"/>
                            <ul className="list-unstyled">
                                {curriculums
                                    .find((c) => c.id_curriculum === hoveredProgram)
                                    ?.courses.map((course, index) => (
                                        <li key={index} className="d-flex align-items-center mb-2">
                                            <i className="bi bi-journal-code"
                                               style={{fontSize: '1rem', marginRight: '10px'}}></i>
                                            <a className="text-black text-decoration-none" href="">
                                                <span className="me-auto">{course.title}</span>
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <h6>Khóa học nổi bật</h6>
                            <hr className="bg-dark"/>
                            <ul className="list-unstyled">
                                {curriculums.map((curriculum, index) => (
                                    <li key={index} className="d-flex align-items-center mb-2">
                                        <i className="bi bi-star" style={{fontSize: '1rem', marginRight: '10px'}}></i>
                                        <a className="text-black text-decoration-none" href="">
                                            <span className="me-auto">{curriculum.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainingProgramsDropdown;
