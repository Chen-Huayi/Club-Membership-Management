import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";
import React from "react";


export default function Settings () {

    return(
        <div className="settings-content">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Settings</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >

                <Link to="/reset-password">Change your password</Link><br/>
                <Link to="">666</Link><br/>
                <Link to="">666</Link><br/>
                <Link to="">666</Link><br/>

            </Card>
        </div>
    )
}
