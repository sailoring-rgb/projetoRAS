import { useState } from "react";
import { AdminFunctions } from "../blocks/AdminFunctions.js";

function AdminFunctionsView({ closeModal }) {
    const [displayFunctions, setDisplayFunctions] =
        useState(false);

    return (
        <main className="container" onClick={closeModal}>
            <AdminFunctions
                closeModal={() => setDisplayFunctions(false)}
            />
        </main>
    );
}
export default AdminFunctionsView;
