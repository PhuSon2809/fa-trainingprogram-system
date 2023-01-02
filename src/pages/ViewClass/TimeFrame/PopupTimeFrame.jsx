import React from 'react'
import { LocationIconWhite, StarIconWhite, TrainerIcon } from '~/components/Icons';

function PopupTimeFrame() {
    return (
        <div className='classDetail'>
            <p style={{ fontWeight: "700" }}>Fresher Develop Operation</p>
            <p>Day 10 of 31</p>
            <div style={{ display: "flex" }}>
                <p style={{ marginRight: "5px" }}>Unit 6: </p> <p style={{ fontWeight: "700" }}> MVC Architecture in ASP.NET</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ marginRight: "20px" }}><LocationIconWhite /> Location</p> <p>FTown2</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ marginRight: "23px" }}><TrainerIcon /> Trainner </p> <p>Dinh Vu Quoc Trung</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ marginRight: "32px" }}><StarIconWhite /> Admin</p> <p>Ly Lien Lien Dung</p>
            </div>

        </div>
    )

}

export default PopupTimeFrame;
