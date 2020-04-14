export interface UserModel {
  id: string;
  name: string;
  readonly password: string;
  seller: boolean;
  university_id: string;
  semester_id: string;
  course_id: string;
}
