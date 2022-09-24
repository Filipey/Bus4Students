import { useCallback, useState } from "react"
import { Student } from "../schemas"
import { RequestsService } from "../services"

export const useBus4Student = () => {

    const [students, setStudents] = useState<Student[]>([])
    const [studentByCpf, setStudentByCpf] = useState<Student>()
    const [totalStudents, setTotalStudents] = useState<number>()

    const getAllStudent = useCallback(async () => {

        const { status, data } = await RequestsService.getAllStudents();

        if (status != 200) throw new Error();

        setStudents(data)
    }, [])

    const getStudentByCpf = useCallback(async (cpf: string) => {

        const { status, data } = await RequestsService.getStudentByCpf(cpf);

        if (status != 200) throw new Error();

        setStudentByCpf(data)
    }, [])

    const deleteStudent = useCallback(async (cpf: string) => {

        const { status, data } = await RequestsService.deleteStudent(cpf)

        if (status != 204) throw new Error();

    }, [])

    const getTotalStudents = useCallback(async () => {
        const { status, data } = await RequestsService.getTotalStudents()
        console.log(data)
        if (status != 200) throw new Error();

        setTotalStudents(data);
    }, [])

    return {
        students,
        studentByCpf,
        totalStudents,
        getAllStudent,
        getStudentByCpf,
        getTotalStudents,
        deleteStudent,
    }
}