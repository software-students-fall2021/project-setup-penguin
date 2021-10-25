import "./UpdateCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import CardEditor from "../../common/card-editor/CardEditor";
import { TEST_TEMPLATE_DATA } from "../../common/constants";


function UpdateCard() {
    const [form, setForm] = useState(TEST_TEMPLATE_DATA);
    return(
        <div>
            <h2>Update Your Card</h2>
            <CardEditor form={form} setForm={setForm} />
            <Link
                to={{
                    pathname: "/accountpage",
                    state: { templateData: form }, //sends updated card data to account page
                    //TO DO: Update account page to accept new info
                }}
                id="cardUpdateButton"
            >
            Update Card
            </Link>
    </div>
    );
}

export default UpdateCard;