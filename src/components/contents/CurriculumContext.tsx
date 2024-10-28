import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Course } from "../../mock_data/mockCourse.ts";
import { Curriculum } from "../../mock_data/mockCurriculum.ts";

interface CurriculumContextProps {
    curriculums: Curriculum[];
    loading: boolean;
}

const CurriculumContext = createContext<CurriculumContextProps | undefined>(undefined);

export const useCurriculumContext = () => {
    const context = useContext(CurriculumContext);
    if (!context) {
        throw new Error('useCurriculumContext must be used within a CurriculumProvider');
    }
    return context;
};

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurriculumsAndCourses = async () => {
            try {
                setLoading(true);
                const token = sessionStorage.getItem('token');

                const { data: curriculumData } = await axios.get<Curriculum[]>('http://localhost:3001/curriculums', {
                    headers: {
                        Authorization: `Bearer ${token}`, // nhớ thay thế token hợp lệ
                    },
                });

                const { data: coursesData } = await axios.get<Course[]>('http://localhost:3001/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`, // nhớ thay thế token hợp lệ
                    },
                });

                const curriculumWithCourses = curriculumData.map((curriculum: Curriculum) => ({
                    ...curriculum,
                    courses: coursesData.filter((course: Course) => course.id_curriculum === curriculum.id_curriculum),
                }));

                setCurriculums(curriculumWithCourses);
            } catch (error) {
                console.error('Error fetching curriculums and courses', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurriculumsAndCourses();
    }, []);

    return (
        <CurriculumContext.Provider value={{ curriculums, loading }}>
            {children}
        </CurriculumContext.Provider>
    );
};
