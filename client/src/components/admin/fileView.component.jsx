import React from 'react'
import Button from 'react-bootstrap/Button';
import { CSVLink } from 'react-csv'

export const FileView = ({data, fileName, color}) => {
    return (
        <Button type='button' variant="warning" className={`btn btn-outline-${color}`}>
            <CSVLink data={data} filename={fileName} style={{color:'black'}}><b>{fileName}</b></CSVLink>
        </Button>
    )
}