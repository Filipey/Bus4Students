import { useCallback, useState } from "react"
import { Student } from "../interface"
import { RequestsService } from "../services"

export const useBus4Student = () => {

    const [students, setStudents] = useState<Student[]>([])
    const [studentByCpf, setStudentByCpf] = useState<Student>()

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

    return {
        students,
        studentByCpf,
        getAllStudent,
        getStudentByCpf,
        deleteStudent,
    }
}