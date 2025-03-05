
export interface Course {
  id: string;
  title: string;
  type: 'individual' | 'organization' | 'teachers' | 'students';
  description: string;
  duration: string;
  price: string;
  image: string;
  language: string;
  startDate: string;
}

export interface CourseFormData {
  title: string;
  type: 'individual' | 'organization' | 'teachers' | 'students';
  description: string;
  duration: string;
  price: string;
  image: string;
  language: string;
  startDate: string;
}
