import { useState } from "react";
import { EspFunctions } from "../blocks/EspFunctions.js";

function EspFunctionsView({ closeModal }) {
    const [displayFunctions, setDisplayFunctions] =
        useState(false);

    return (
        <main className="container" onClick={closeModal}>
            <EspFunctions
                closeModal={() => setDisplayFunctions(false)}
            />
        </main>
    );
}
export default EspFunctionsView;
