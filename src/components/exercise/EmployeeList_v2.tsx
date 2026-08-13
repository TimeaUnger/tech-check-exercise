import { useState } from "react";

const employeesData = [
  {
    id: 1,
    name: "John Smith",
    department: "Frontend",
    active: true,
  },
  {
    id: 2,
    name: "Anna Brown",
    department: "Backend",
    active: true,
  },
  {
    id: 3,
    name: "Peter Wilson",
    department: "QA",
    active: false,
  },
  {
    id: 4,
    name: "Sarah Davis",
    department: "Frontend",
    active: true,
  },
];

/*

EmployeeList
---------------------------
1. az employee-kat propsként kapja
legyen saját state-je
legyen egy deactivateEmployee függvénye, ami id-t kap
az adott employee active értékét állítsa false-ra
renderelje az employee-kat EmployeeCard komponensekkel

EmployeeCard
-----------------------------------
egy employee adatait kapja
jelenítse meg:
1. name
2. department
3. Active / Inactive
4. legyen Deactivate button
kattintáskor adja át az employee id-ját a parent callbacknek

*/

interface Employee {
    id: number;
    name: string;
    department: string;
    active: boolean;
}

interface EmployeeListProps {
    employee: Employee[];
}

interface EmployeeCardProps {
    employee: Employee;
    handleActive: (id: number) => void;
}



export const EmployeeList = ({employee}: EmployeeListProps) => {

    const [employees, setEmployees] = useState<Employee[]>(employee)

    const handleActive = (id: number) => {
        setEmployees((prev) => (
            prev.map((employee) => (
                employee.id === id) ?
                {...employee, active: false}
            : employee
                
            ))
        )
    }

    return (
        employees.map((employee) => (
            <EmployeeCard 
                employee={employee}
                handleActive={handleActive}
            />
        ))
    )

}

export const EmployeeCard = ({employee, handleActive}: EmployeeCardProps) => {

    return (
        <div key={employee.id}>
            <div>{employee.name}</div>
            <div>{employee.department}</div>
            <div>{employee.active ? "Active" : "Inactive"}</div>
            <button onClick={() => handleActive(employee.id)}>{employee.active ? "Active" : "Inactive" }</button>
        </div>
    )
}