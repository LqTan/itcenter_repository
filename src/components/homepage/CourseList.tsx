import React, { useState } from 'react';
import '../../styles/CourseList.css';
import { BsCalendar2Event, BsCashStack } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useCurriculumContext } from "../contents/CurriculumContext.tsx";

const CourseList: React.FC = () => {
    const navigate = useNavigate();
    const { curriculums, loading } = useCurriculumContext();
    const [selectedProgram, setSelectedProgram] = useState<string>('Tất cả');
    const [visibleCourses, setVisibleCourses] = useState<number>(8); // Initially display 8 courses

    const handleProgramSelect = (programName: string) => {
        setSelectedProgram(programName);
        setVisibleCourses(8); // Reset the number of visible courses when selecting a new program
    };

    const displayedCourses = selectedProgram === 'Tất cả'
        ? curriculums.flatMap(curriculum => curriculum.courses).slice(0, visibleCourses)
        : curriculums
        .find(curriculum => curriculum.title === selectedProgram)
        ?.courses.slice(0, visibleCourses) || [];

    const loadMoreCourses = () => {
        const totalCourses = selectedProgram === 'Tất cả'
            ? curriculums.flatMap(curriculum => curriculum.courses).length
            : curriculums.find(curriculum => curriculum.title === selectedProgram)?.courses.length || 0;

        setVisibleCourses(prev => Math.min(prev + 4, totalCourses));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center course-list-subject">Chương trình đào tạo</h2>
            <div className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <p>
                    Chương trình học đa dạng và thường xuyên cập nhật công nghệ mới.
                    Hãy để chúng tôi đồng hành cùng bạn trên hành trình chinh phục tri thức - vững vàng bước vào thế
                    giới công nghệ 4.0.
                </p>
            </div>

            <div className="d-flex flex-wrap justify-content-center mb-4">
                <button
                    className={`btn btn-outline-primary m-2 ${selectedProgram === 'Tất cả' ? 'active' : ''}`}
                    onClick={() => handleProgramSelect('Tất cả')}
                >
                    <i className="bi bi-grid"></i> Tất cả
                </button>
                {curriculums.map((curriculum) => (
                    <button
                        key={curriculum.id_curriculum}
                        className={`btn btn-outline-primary m-2 ${selectedProgram === curriculum.title ? 'active' : ''}`}
                        onClick={() => handleProgramSelect(curriculum.title)}
                    >
                        <i className="bi bi-book"></i> {curriculum.title}
                    </button>
                ))}
            </div>

            <div className="row">
                {displayedCourses.map((course, index) => (
                    <div key={index} className="col-md-3 col-sm-6 mb-4 d-flex">
                        <div className="card course-card text-center w-100">
                            <img src={course.course_thumbnail || 'https://via.placeholder.com/200x190'} className="card-img-top" alt={course.title}
                                 style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h6 className="card-title mb-2">{course.title}</h6>
                                {/* Add calendar icon for start date */}
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <BsCalendar2Event className="me-2 text-primary" size={20} />
                                    <span className="text-muted">{new Date(course.opening_day).toLocaleDateString()}</span>
                                </div>
                                {/* Add cash icon for course fee */}
                                <div className="d-flex justify-content-between">
                                    <div className="text-muted d-flex align-items-center">
                                        <BsCashStack className="me-2 text-success" size={20} />
                                        <del>{course.original_fee}</del>
                                    </div>
                                    <div className="text-danger d-flex align-items-center">
                                        <BsCashStack className="me-2 text-danger" size={20} />
                                        {course.current_fee}
                                    </div>
                                </div>
                                <button className="btn btn-dark text-white w-100 mt-3" onClick={() => navigate(`/course-detail/${course.id_course}`)}>Chi tiết</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* "Load more" button */}
            {displayedCourses.length < (selectedProgram === 'Tất cả'
                    ? curriculums.flatMap(curriculum => curriculum.courses).length
                    : curriculums.find(curriculum => curriculum.title === selectedProgram)?.courses.length || 0
            ) && (
                <div className="text-center">
                    <button className="btn btn-primary" onClick={loadMoreCourses}>Xem thêm</button>
                </div>
            )}
        </div>
    );
};

export default CourseList;
