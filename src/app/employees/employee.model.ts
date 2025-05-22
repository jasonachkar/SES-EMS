export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  workPhone?: string;
  workEmail: string;
  personalPhone?: string;
  personalEmail?: string;
  hoursPerWeek: number;
  employmentType: string;
  titleIds: string[];         // use for references, or use titleNames: string[]
  departmentIds: string[];    // use for references, or use departmentNames: string[]
  isDeleted?: boolean;
}