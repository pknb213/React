import React from 'react';
import { Link, Redirect} from "react-router-dom";

class LoginCheck extends React.Component {
    isLogin = false;

    render(){
        return (
            <div>
                {
                    !this.isLogin && <Redirect to="/"/>
                }
                로그인 되었습니다.
            </div>
        )
    }
}

export default LoginCheck;