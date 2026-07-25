export type Assignment = {
  id: string;
  title: string;
  courseId: string;
  dueDate: string;
  dueLabel: string;
  completed: boolean;
};

export type Course = {
  id: string;
  code: string;
  name: string;
  professor: string;
  email: string;
  days: string;
  startTime: string;
  endTime: string;
  location: string;
  announcement: string;
};

export type Student = {
  firstName: string;
  lastName: string;
  major: string;
  studentId: string;
  email: string;
  mealBalance: number;
};

export const student: Student = {
  firstName: 'Joseph',
  lastName: 'Blake',
  major: 'Computer Science',
  studentId: '0000000',
  email: 'student@example.edu',
  mealBalance: 245.5,
};

export const courses: Course[] = [
  {
    id: 'csc270',
    code: 'CSC 270',
    name: 'Computer Science',
    professor: 'Professor John Smith',
    email: 'jsmith@example.edu',
    days: 'Monday and Wednesday',
    startTime: '2:00 PM',
    endTime: '3:15 PM',
    location: 'Science Building, Room 204',
    announcement:
      'Remember to bring your laptop to the next class meeting.',
  },
  {
    id: 'cyb210',
    code: 'CYB 210',
    name: 'Introduction to Cybersecurity',
    professor: 'Professor Sarah Johnson',
    email: 'sjohnson@example.edu',
    days: 'Tuesday and Thursday',
    startTime: '11:00 AM',
    endTime: '12:15 PM',
    location: 'Nexus Building, Room 126',
    announcement:
      'The cybersecurity lab will take place during Thursday’s class.',
  },
  {
    id: 'mat141',
    code: 'MAT 141',
    name: 'Calculus I',
    professor: 'Professor Michael Davis',
    email: 'mdavis@example.edu',
    days: 'Monday and Wednesday',
    startTime: '9:00 AM',
    endTime: '10:15 AM',
    location: 'Alumnae Hall, Room 114',
    announcement:
      'Office hours will be held Tuesday afternoon this week.',
  },
];

export const assignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Programming Assignment 1',
    courseId: 'csc270',
    dueDate: '2026-09-12T23:59:00',
    dueLabel: 'Due September 12',
    completed: false,
  },
  {
    id: 'assignment-2',
    title: 'Chapter 3 Quiz',
    courseId: 'csc270',
    dueDate: '2026-09-18T23:59:00',
    dueLabel: 'Due September 18',
    completed: false,
  },
  {
    id: 'assignment-3',
    title: 'Network Security Reflection',
    courseId: 'cyb210',
    dueDate: '2026-09-14T23:59:00',
    dueLabel: 'Due September 14',
    completed: false,
  },
  {
    id: 'assignment-4',
    title: 'Threat Analysis Worksheet',
    courseId: 'cyb210',
    dueDate: '2026-09-21T23:59:00',
    dueLabel: 'Due September 21',
    completed: false,
  },
  {
    id: 'assignment-5',
    title: 'Limits Homework',
    courseId: 'mat141',
    dueDate: '2026-09-13T23:59:00',
    dueLabel: 'Due September 13',
    completed: false,
  },
  {
    id: 'assignment-6',
    title: 'Derivatives Practice',
    courseId: 'mat141',
    dueDate: '2026-09-20T23:59:00',
    dueLabel: 'Due September 20',
    completed: false,
  },
];

export function getCourseById(id: string) {
  return courses.find((course) => course.id === id);
}

export function getAssignmentsForCourse(courseId: string) {
  return assignments.filter(
    (assignment) => assignment.courseId === courseId
  );
}

export function getCourseForAssignment(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function getUpcomingAssignments() {
  return [...assignments]
    .filter((assignment) => !assignment.completed)
    .sort(
      (firstAssignment, secondAssignment) =>
        new Date(firstAssignment.dueDate).getTime() -
        new Date(secondAssignment.dueDate).getTime()
    );
}