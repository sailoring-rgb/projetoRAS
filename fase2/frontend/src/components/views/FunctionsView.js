import { useState } from "react";
import { Functions } from "../blocks/Functions.js";
import NotificationsModalView from "./NotificationsModalView.js";

function FunctionsView({ closeModal }) {
    const [displayFunctions, setDisplayFunctions] =
        useState(false);

    return (
        <main className="container" onClick={closeModal}>
            <Functions
                closeModal={() => setDisplayFunctions(false)}
            />
        </main>
    );
}
export default FunctionsView;
