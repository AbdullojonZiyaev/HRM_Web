import { DriverLicense, Gender, MaritalStatus, MilitaryStatus } from "../enum/Base.enum";

export interface IErrorMessages {
  [key: string]: string;
}
export interface LoginUser {
  username: string;
  password: string;
}
export interface UserInfo {
  roleName: string;
  firstName: string;
  secondName: string;
  username: string;
  storeName: string;
  functionals: string[];
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  exprires: number;
}
export interface User {
  id: number;
  roleId: number;
  roleName: string;
  firstName: string;
  secondName: string;
  surname: string;
  username: string;
  phone: string;
  address: string;
  position: string;
  companyId: number | null;
  companyName: string;
  isActived : boolean;
}
export class UserCreateDto {
  firstName!: string;
  secondName!: string;
  surname!: string;
  username!: string;
  password!: string;
  phone!: string;
  address!: string;
  position!: string;
  companyId!: number;
  roleId!: number;
  isActived!: boolean;
}
export interface UserUpdateDto {
  id: number;
  firstName: string;
  secondName: string;
  surname: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  position: string;
  companyId: number;
  roleId: number;
  isActived: boolean;
}
export interface PagedList<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
export interface Role {
  id?: number;
  name: string;
  functionals: string[];
}
export interface City {
  id?: number;
  name: string;
}

export interface Company {
  id?: number;
  fullname: string;
  address: string;
  cityId: number;
  cityName?: string;
  inn: string;
  statement: string;
  sertificat: string;
  director: string;
  sertificatNumber: string;
  dataSertificat: Date;
  dataPoliceConclusion: Date;
  contractNumber: string;
  dataContract: Date;
}
export interface CompanyCreateDto{
    fullname: string;
    address: string;
    inn: string;
    email: string;
    phone: string;
    director: string;
    cityId?: number;
}
export interface CompanyUpdateDto{
  id : number;
  fullname: string;
  address: string;
  inn: string;
  email: string;
  phone: string;
  director: string;
  cityId?: number;
}
export interface CompanyPaginator {
  result: Company[];
  currentPage: number;
  page: number;
  totalCount: number;
}
export interface Department {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  headOfDepartment: string;
  companyId: number;
  companyName: string;
}
export interface DepartmentCreateDto{
  fullname: string;
  email: string;
  phone: string;
  headOfDepartment: string;
  companyID: number;
}
export interface DepartmentUpdateDto{
  id: number;
  fullname: string;
  email: string;
  phone: string;
  headOfDepartment: string;
  companyID: number;
}
export interface MinimalDivision {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  headOfDivision: string;
}

export interface MinimalEmployee {
  id: number;
  fullname: string;
  positionTitle:string;
  departmentId: number;
  companyId: number;
  companyName: string;
  departmentName: string;
  isInReserve: boolean;
  divisionId: number;
  divisionName: string;
}

export interface MinimalVacancy {
  id: number;
  title: string;
  description: string;
  salary: number;
  datePosted: Date;
  isActive: boolean;
}
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  surName: string;
  dateOfBirth: Date;
  address: string;
  email: string;
  phone: string;
  dateOfHire: Date;
  salary: number;
  gender: Gender;
  nationality: string;
  education: string;
  degreeName: string;
  personalSkills: string;
  computerSkills: string;
  qualifications: string;
  languageKnowledge: string;
  party: string;
  previousJob: string;
  maritalStatus: MaritalStatus;
  militaryStatus: MilitaryStatus;
  driverLicense: DriverLicense;
  numberOfChildren: number;
  specialization: string;
  insuranceStatus: string;
  companyId: number;
  companyName: string;
  departmentId: number;
  departmentName: string;
  divisionId?: number;
  divisionName?: string;
  positionId?: number;
  positionName?: string;
  isInReserve: boolean;
}

export interface Position {
  id: number;
  title: string;
  description: string;
  salary: number;
  employmentType: string;
  responsibilities: string;
  requirements: string;
  qualifications: string;
  companyId: number;
  companyName: string; 
  departmentId: number;
  departmentName: string; 
  divisionId: number;
  divisionName: string; 
  isActive: boolean;
  employees: Employee[]; 
}
export interface Division {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  headOfDivision: string;
  departmentId?: number;
  departmentName: string; 
}

export interface News {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  tags: string;
  recordDate: Date;
}

export interface Order {
  id: number; // Assuming DbRecord contains 'id'
  orderNumber: string;
  employeeId: number;
  employeeName: string;
  orderTypeId: number;
  orderTypeName: string;
  description: string;
  activationDate: Date;
  userId: number;
  userName: string;
  approved: boolean;
  signedBy: string;
  companyId: number;
  companyName: string;
  departmentId: number;
  departmentName: string;
  divisionId: number;
  divisionName: string;
}

export interface OrderType {
  id: number; // Assuming DbRecord contains 'id'
  name: string;
  description: string;
  orderCategory: string;
  orders: Order[]; // Assuming that the relationship is one-to-many
} 

export { MaritalStatus, MilitaryStatus, DriverLicense, Gender };

