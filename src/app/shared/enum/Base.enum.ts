export enum Gender {
    Male = 0,
    Female = 1
  }
  
  export enum MaritalStatus {
    Single = 0,
    Married = 1
  }
  
  export enum MilitaryStatus {
    NotServed = 0,
    Served = 1
  }
  
  export enum DriverLicense {
    A = 0,
    B = 1,
    C = 2,
    D = 3,
    AB = 4,
    CD = 5,
    BCD = 6
  }
  
  export function getGenderString(gender: number): string {
    switch (gender) {
      case Gender.Male:
        return 'Male';
      case Gender.Female:
        return 'Female';
      default:
        return 'Unknown';
    }
  }
  
  export function getMaritalStatusString(status: number): string {
    switch (status) {
      case MaritalStatus.Single:
        return 'Single';
      case MaritalStatus.Married:
        return 'Married';
      default:
        return 'Unknown';
    }
  }
  
  export function getMilitaryStatusString(status: number): string {
    switch (status) {
      case MilitaryStatus.NotServed:
        return 'Not Served';
      case MilitaryStatus.Served:
        return 'Served';
      default:
        return 'Unknown';
    }
  }
  
  export function getDriverLicenseString(license: number): string {
    switch (license) {
      case DriverLicense.A:
        return 'A';
      case DriverLicense.B:
        return 'B';
      case DriverLicense.C:
        return 'C';
      case DriverLicense.D:
        return 'D';
      case DriverLicense.AB:
        return 'AB';
      case DriverLicense.CD:
        return 'CD';
      case DriverLicense.BCD:
        return 'BCD';
      default:
        return 'Unknown';
    }
  }
  
  