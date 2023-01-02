import React, { useState, useEffect } from 'react';
import styles from "./SelectUP.module.scss";
import classNames from "classnames/bind";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AddIcon, ModifyIcon, GradeBlueIcon, VisibilityBlueIcon, VisibilityOffBlueIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

export default function SelectUP({ close, dataPermission, changeData, setChangeData, nameRow, nameCol, setClose }) {

    const [auth, setAuth] = useState('');
    const [dataNow, setDataNow] = useState(dataPermission?.filter(data => data.roleName === nameRow)[0] || [])

    useEffect(() => {
        if (dataPermission) setDataNow(dataPermission?.filter(data => data.roleName === nameRow)[0])
    }, [dataPermission])

    //cancel button 
    useEffect(() => {
        if (close) {
            setAuth("")
            setClose(!close)
        }
    }, [close])

    const handleChange = (e) => {
        console.log(e.target.value);
        setAuth(e.target.value);
        var cloneArr = [...changeData, [nameRow, nameCol, e.target.value]]
        setChangeData(cloneArr)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 158 }}>

                <Select
                    placeholder='Permission'
                    value={auth}
                    onChange={(e) => handleChange(e)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'italic',
                        fontWeight: '400',
                        padding: '10px 0px',
                        color: "#474747",
                        background: '#FFFFFF',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.16)',
                        borderRadius: '10px',
                        width: '158px',
                        height: '30px',
                        '& .MuiSelect-select': {
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '17px',
                            color: '#474747',
                        }
                    }}
                >
                    <MenuItem value="">
                        <em>{dataNow ? dataNow?.authorities?.filter(au => au.resource === nameCol)[0]?.permission : 'Permission'}</em>
                    </MenuItem>
                    <MenuItem id="1" value={'NO_ACCESS'}> <span className={cx("Item")}><VisibilityOffBlueIcon /> Access denied</span></MenuItem>
                    <MenuItem id="2" value={'VIEW'}> <span className={cx("Item")}><VisibilityBlueIcon /> View</span></MenuItem>
                    <MenuItem id="3" value={'MODIFY'}> <span className={cx("Item")}><ModifyIcon /> Modify</span></MenuItem>
                    <MenuItem id="4" value={'CREATE'}> <span className={cx("Item")}><AddIcon /> Create</span></MenuItem>
                    <MenuItem id="5" value={'FULL_ACCESS'}>  <span className={cx("Item")}><GradeBlueIcon /> Full access</span></MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}