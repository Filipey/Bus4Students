import { Route, Routes } from "react-router-dom";

import { ContainerUser } from "../../components/ContainerUser";

export function Router() {

    return (
        <>
            <Routes>
                <Route element={<ContainerUser />} path="/user" />
            </Routes>
        </>
    )
}