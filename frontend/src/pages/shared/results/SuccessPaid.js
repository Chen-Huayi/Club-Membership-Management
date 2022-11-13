import { Button, Result } from 'antd';
import React from 'react';
import {Link} from "react-router-dom";

const SuccessPaid = () => (
    <Result
        status="success"
        title="Successfully Purchased Green Space Club Membership!"
        subTitle="Order number: ???????????????"
        style={{margin: 200}}
        extra={[
            <Button type="primary" key="console" size="large" shape="round" >
                <Link to="/">Back Home</Link>
            </Button>
        ]}
    />
);
export default SuccessPaid;