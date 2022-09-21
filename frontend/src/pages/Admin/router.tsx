import { Route, Routes } from "react-router-dom";

import { ContainerAdmin } from "../../components/ContainerAdmin";

export function Router() {

    return (
        <>
            <Routes>
                <Route element={<ContainerAdmin />} path="/user" />
            </Routes>
        </>
    )
}