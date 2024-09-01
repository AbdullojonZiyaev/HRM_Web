import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import {
  ChangePassword,
  City,
  Company,
  CompanyPaginator,
  Role,
  User,
  UserInfo,
  PagedList,
  UserCreateDto,
  UserUpdateDto,
  CompanyCreateDto,
  CompanyUpdateDto,
  Department,
  DepartmentCreateDto,
  DepartmentUpdateDto,
  MinimalDivision,
  MinimalEmployee,
  MinimalVacancy,
  Employee,
  Division,
  Position,
  News,
  Order,
  OrderType,
} from '../interfaces/Base.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private url: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.url = this.config.getApiUrl();
  }

  getUserInfo() {
    return this.http.get<UserInfo>(`${this.url}api/User/user-info`);
  }
  getListUser() {
    return this.http.get<User>(`${this.url}api/User/GetListUsers`);
  }
  getUsers(name: string = '', page: number = 1, size: number = 10): Observable<PagedList<User>> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this.http.get<PagedList<User>>(`${this.url}api/User/`, { params });
  }
  addUser(createUserDto: UserCreateDto): Observable<User> {
    return this.http.post<User>(`${this.url}api/User/add`, createUserDto);
  }
  editUser(editUserDto: UserUpdateDto): Observable<User> {
    return this.http.put<User>(`${this.url}api/User/edit`, editUserDto);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<void>(`${this.url}api/User/${id}`);
  }
  updateUser(role: User): Observable<User> {
    return this.http.put<User>(`${this.url}api/User/UpdateUser`, role);
  }
  getCurrentUser() {
    return this.http.get<User>(`${this.url}api/User/current`);
  }

  //======Functional ==========
  getFunctionals() {
    return this.http.get<string[]>(`${this.url}api/Functional`);
  }
  //=========Role part ==============
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/roles`);
  }
  addRole(role: Role): Observable<Role> {
    debugger;
    return this.http.post<Role>(`${this.url}api/Role/AddRole`, role);
  }
  deleteRole(id: number): Observable<any> {
    const url = `${this.url}api/Role/${id}`;
    return this.http.delete(url);
  }
  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.url}api/Role/UpdateRole`, role);
  }

  changePassword(passwords: ChangePassword): Observable<ChangePassword> {
    return this.http.post<ChangePassword>(
      `${this.url}api/user/change-password`,
      passwords
    );
  }
  //=============City part ==========================
  getCities() {
    return this.http.get<City[]>(`${this.url}api/City/AllCity`);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.url}api/City/AddCity`, city);
  }

  deleteCity(id: number): Observable<any> {
    const url = `${this.url}api/City/${id}`;
    return this.http.delete(url);
  }
  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.url}api/City/UpdateCity`, city);
  }

  //=================Company part========================

  getCompanySearch(
    page: number,
    size: number,
    fullname?: string,
    cityId?: number | null
  ) {
    let url = `${this.url}api/Company/Search?&page=${page}&size=${size}`;

    if (fullname) {
      url += `&fullname=${fullname}`;
    }
    if (cityId) {
      url += `&cityId=${cityId}`;
    }
    return this.http.get<CompanyPaginator>(url);
  }

  getCompany(name: string = '', page: number = 1, size: number = 10): Observable<PagedList<Company>> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this.http.get<PagedList<Company>>(`${this.url}api/Company/`, { params });
  } 
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.url}api/Company/AllCompanies`);
  } 
  addCompany(createCompanyDto: CompanyCreateDto): Observable<Company> {
    return this.http.post<Company>(`${this.url}api/Company/AddCompany`, createCompanyDto);
  }
  updateCompany(companyUpdateDto: CompanyUpdateDto): Observable<Company> {
    return this.http.put<Company>(`${this.url}api/Company/UpdateCompany`, companyUpdateDto);
  }
  deleteCompany(id: number): Observable<any> {
    const url = `${this.url}api/Company/${id}`;
    return this.http.delete(url);
  }
  getCompanyById(id: number): Observable<any> {
    const url = `${this.url}api/Company/${id}`;
    return this.http.get(url);
  }
  //=====================Department Part===================
  getDepartment(name: string = '', page: number = 1, size: number = 10): Observable<PagedList<Company>> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this.http.get<PagedList<Company>>(`${this.url}api/Department/`, { params });
  } 
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.url}api/Department/AllDepartments`);
  } 
  addDepartment(createDepartmentDto: DepartmentCreateDto): Observable<Department> {
    return this.http.post<Department>(`${this.url}api/Department/AddDepartment`, createDepartmentDto);
  }
  updateDepartment(departmentUpdateDto: DepartmentUpdateDto): Observable<Department> {
    return this.http.put<Department>(`${this.url}api/Department/UpdateDepartment`, departmentUpdateDto);
  }
  deleteDepartment(id: number): Observable<any> {
    const url = `${this.url}api/Department/${id}`;
    return this.http.delete(url);
  }
  getMinimalDivisionsByDepartmentId(departmentId: number): Observable<MinimalDivision[]> {
    return this.http.get<MinimalDivision[]>(`${this.url}api/Department/${departmentId}/minimal-divisions`);
  }

  getMinimalEmployeesByDepartmentId(departmentId: number): Observable<MinimalEmployee[]> {
    return this.http.get<MinimalEmployee[]>(`${this.url}api/Department/MinimalEmployees/${departmentId}`);
  }

  getMinimalVacanciesByDepartmentId(departmentId: number): Observable<MinimalVacancy[]> {
    return this.http.get<MinimalVacancy[]>(`${this.url}api/Department/${departmentId}/minimal-vacancies`);
  }
//=====================Employee Part===================
  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}api/Employee/${employeeId}`);
  }
  getEmployeesMin(): Observable<MinimalEmployee[]> {
    return this.http.get<MinimalEmployee[]>(`${this.url}api/Employee/AllEmployeesMin`);
  }
  
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.url}api/Employee/AddEmployee`, employee);
  }
  
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}api/Employee/UpdateEmployee`, employee);
  }
  
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}api/Employee/${id}`);
  }
  //=====================Division Part===================
  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.url}api/Division/AllDivisions`);
  } 

  addDivision(division: Division): Observable<any> {
    return this.http.post(`${this.url}api/Division/AddDivision`, division);
  }
  
  updateDivision(division: Division): Observable<any> {
    return this.http.put(`${this.url}api/Division/UpdateDivision`, division);
  }
  
  deleteDivision(id: number): Observable<any> {
    return this.http.delete(`${this.url}/D/${id}`);
  }
  getMinimalEmployeesByDivisionId(divisionId: number): Observable<MinimalEmployee[]> {
    return this.http.get<MinimalEmployee[]>(`${this.url}api/Division/MinimalEmployees/${divisionId}`);
  }
  
  //=====================Position Part===================
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}api/Position/AllPositions`);
  }
  deletePosition(id: number): Observable<Position> {
    return this.http.delete<Position>(`${this.url}api/News/${id}`);
  }
  addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.url}api/Position/AddPosition`, position);
  }
  updatePosition(position: Position): Observable<Position> {
    return this.http.put<Position>(`${this.url}api/Position/UpdatePosition`, position);
  }
  
  getMinimalEmployeesByPositionId(positionId: number): Observable<MinimalEmployee[]> {
    return this.http.get<MinimalEmployee[]>(`${this.url}api/Position/MinimalEmployees/${positionId}`);
  }
//=====================News Part===================
  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.url}api/News`);
  }
  addNews(news: News): Observable<News> {
    return this.http.post<News>(`${this.url}api/News`, news);
  }
  updateNews(news: News): Observable<News> {
    return this.http.put<News>(`${this.url}api/News/UpdateNews`, news);
  }
  deleteNews(id: number): Observable<News> {
    return this.http.delete<News>(`${this.url}api/News/${id}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}api/Order`);
  }
  getOrderType(): Observable<OrderType[]> {
    return this.http.get<OrderType[]>(`${this.url}api/OrderType`);
  }
  addOrderType(orderType: OrderType): Observable<OrderType> {
    return this.http.post<OrderType>(`${this.url}api/OrderType`, orderType);
  }
  deleteOrderType(id: number): Observable<OrderType> {
    return this.http.delete<OrderType>(`${this.url}api/OrderType/${id}`);
  }
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}api/Order`, order);
  }
  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.url}api/Order/${id}`);
  }
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}api/Order/${orderId}`);
  }
}
