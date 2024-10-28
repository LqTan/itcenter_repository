export interface Course {
    id_course: string;
    title: string;
    id_curriculum: string;
    opening_day: string;
    original_fee: number;
    current_fee: number;
    course_thumbnail: string | null;
}